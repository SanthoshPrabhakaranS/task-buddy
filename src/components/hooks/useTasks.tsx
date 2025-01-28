import { useCallback, useEffect, useState } from 'react';
import { Activity, Task } from '../../utils/types';
import { db } from '../../firebase/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { cloudinaryConfig } from '../config/CloudinaryConfig';
import { toast } from 'sonner';
import { useGlobalContext } from '../../context/GlobalContext';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from '../storage/storage';
import { SORT_STATE } from '../../utils/constants';

const useTasks = () => {
  const { tasks, setTasks } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = new Storage().getItem('userId');

  const generateId = useCallback(() => {
    return uuidv4().slice(0, 8);
  }, [uuidv4]);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true);

    try {
      if (!userId) {
        console.log('User is not authenticated');
        setError('User is not authenticated');
      }

      const querySnapshot = await getDocs(
        query(collection(db, 'tasks'), where('userId', '==', userId))
      );
      const tasks = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.data().title,
          dueOn: doc.data().dueOn,
          status: doc.data().status,
          category: doc.data().category,
          description: doc.data().description,
          attachment: doc.data().attachment,
          activity: doc.data().activity,
        } as Task;
      });

      setTasks([...tasks]);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setTasks, userId]);

  const uploadAttachmentInCloud = useCallback(
    async (task: Task, fileURL: string | null) => {
      if (task.attachment) {
        const cloudFormData = new FormData();
        cloudFormData.append('file', task.attachment);
        cloudFormData.append('upload_preset', cloudinaryConfig.uploadPreset);
        cloudFormData.append(
          'cloud_name',
          cloudinaryConfig.cloudName as string
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
          {
            method: 'POST',
            body: cloudFormData,
          }
        );

        const data = await res.json();
        fileURL = data.url;

        task.attachment = fileURL;
      }

      return task;
    },
    [cloudinaryConfig.cloudName, cloudinaryConfig.uploadPreset]
  );

  // Create task
  const createTask = useCallback(
    async (task: Task) => {
      try {
        let fileURL = null;
        let activities: Activity[] = [];

        if (userId === undefined) {
          console.log('User is not authenticated');
          setError('User is not authenticated');
        }

        if (task.attachment) {
          const updatedTask = await uploadAttachmentInCloud(task, fileURL);
          task = updatedTask;
        }

        activities.push({
          id: generateId(),
          updatedAt: new Date().toISOString(),
          action: 'You created this task',
        });

        const docRef = await addDoc(collection(db, 'tasks'), {
          ...task,
          userId: userId,
          activity: activities,
        });
        setError(null);
        await fetchTasks();
        toast.success('Task created successfully!');
        return docRef.id;
      } catch (error) {
        setError('Failed to create task');
      }
    },
    [setError, fetchTasks, uploadAttachmentInCloud, userId]
  );

  //Edit Task
  const editTask = useCallback(
    async (task: Task) => {
      try {
        let fileURL = null;
        let activityUpdates: Activity[] = [];
        console.log(tasks);

        const unUpdatedTask = tasks.find((temp) => temp.id == task.id);

        if (task.attachment && unUpdatedTask?.attachment != task.attachment) {
          const updatedTask = await uploadAttachmentInCloud(task, fileURL);

          task = updatedTask;
          activityUpdates.push({
            id: generateId(),
            action: 'You uploaded file',
            updatedAt: new Date().toISOString(),
          });
        }

        if (unUpdatedTask?.status && unUpdatedTask?.status !== task.status) {
          activityUpdates.push({
            id: generateId(),
            action: `You changed the status from ${
              unUpdatedTask?.status ?? 'TO-DO'
            } to ${task.status}`,
            updatedAt: new Date().toISOString(),
          });
        }

        if (
          unUpdatedTask?.category &&
          unUpdatedTask?.category !== task.category
        ) {
          activityUpdates.push({
            id: generateId(),
            action: `You changed the category from ${unUpdatedTask?.category} to ${task.category}`,
            updatedAt: new Date().toISOString(),
          });
        }

        if (
          unUpdatedTask?.description &&
          unUpdatedTask?.description !== task.description
        ) {
          activityUpdates.push({
            id: generateId(),
            action: `You updated the description`,
            updatedAt: new Date().toISOString(),
          });
        }

        if (unUpdatedTask?.title && unUpdatedTask?.title !== task.title) {
          activityUpdates.push({
            id: generateId(),
            action: `You updated the title`,
            updatedAt: new Date().toISOString(),
          });
        }

        const taskRef = doc(db, 'tasks', task.id);

        await updateDoc(taskRef, {
          title: task.title,
          dueOn: task.dueOn,
          status: task.status,
          category: task.category,
          description: task.description ?? '',
          attachment: task.attachment ?? '',
          activity: [...(unUpdatedTask?.activity || []), ...activityUpdates],
        });

        setError(null);
        await fetchTasks();
        toast.success('Task updated successfully!');
      } catch (error) {
        console.log('Error', error);
        setError('Failed to edit task');
      }
    },
    [
      fetchTasks,
      setError,
      uploadAttachmentInCloud,
      userId,
      tasks,
      generateId,
      updateDoc,
      db,
      doc,
      addDoc,
      collection,
      where,
      query,
      getDocs,
      deleteDoc,
    ]
  );

  // Delete task
  const deleteTask = useCallback(
    async (taskId: string) => {
      try {
        const taskRef = doc(db, 'tasks', taskId);
        await deleteDoc(taskRef);
        setError(null);
        await fetchTasks();
        toast.success('Task deleted successfully!');
      } catch (error) {
        setError('Failed to delete task');
      }
    },
    [setError, fetchTasks]
  );

  // Filter tasks by category and date
  const handleFilterByCategoryAndDate = useCallback(
    async (categoryValue?: string, dueDateValue?: string) => {
      try {
        if (categoryValue === 'ALL' && !dueDateValue) {
          await fetchTasks();
          return;
        }

        let queryRef = query(collection(db, 'tasks'));

        queryRef = query(queryRef, where('userId', '==', userId));

        // Apply category filter
        if (categoryValue && categoryValue !== 'ALL') {
          queryRef = query(queryRef, where('category', '==', categoryValue));
        }

        // Apply date filter
        if (dueDateValue) {
          queryRef = query(queryRef, where('dueOn', '==', dueDateValue));
        }

        const querySnapshot = await getDocs(queryRef);

        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId,
          title: doc.data().title,
          dueOn: doc.data().dueOn,
          status: doc.data().status,
          category: doc.data().category,
          description: doc.data().description,
          attachment: doc.data().attachment,
        }));

        setTasks(tasks);
      } catch (error) {
        setError('Failed to filter tasks');
        console.error(error);
      }
    },
    [fetchTasks, setTasks]
  );

  // Filter tasks by search value
  const filterBySearch = useCallback(
    async (searchValue: string) => {
      try {
        let queryRef = query(collection(db, 'tasks'));

        queryRef = query(queryRef, where('userId', '==', userId));

        const querySnapshot = await getDocs(queryRef);

        const allTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          dueOn: doc.data().dueOn,
          status: doc.data().status,
          category: doc.data().category,
          description: doc.data().description,
          attachment: doc.data().attachment,
          userId: doc.data().userId,
        }));

        const filteredTasks = allTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.description
              ?.toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            task.category.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.status.toLowerCase().includes(searchValue.toLowerCase())
        );

        setTasks(filteredTasks);
      } catch (error) {
        setError('Failed to filter tasks');
        console.error(error);
      }
    },
    [setTasks, setError]
  );

  // Bulk status update
  const bulkStatusUpdate = useCallback(
    async (taskIds: string[], newStatus: string) => {
      try {
        const batch = writeBatch(db);

        taskIds.forEach((taskId) => {
          const taskRef = doc(db, 'tasks', taskId);

          const updateData = {
            status: newStatus,
            activity: [
              {
                id: generateId(),
                updatedAt: new Date().toISOString(),
                action: `You changed the status to ${newStatus}`,
              },
            ],
          };

          batch.update(taskRef, updateData);
        });
        await batch.commit();
        await fetchTasks();
        toast.success('Tasks status updated successfully!');
      } catch (error) {
        console.log('Error', error);
        setError('Failed to update task status');
      }
    },
    [setError, fetchTasks, generateId, setTasks, updateDoc, writeBatch, doc, db]
  );

  // Bulk delete tasks
  const bulkDeleteTasks = useCallback(
    async (taskIds: string[]) => {
      try {
        const batch = writeBatch(db);

        taskIds.forEach((taskId) => {
          const taskRef = doc(db, 'tasks', taskId);
          batch.delete(taskRef);
        });

        await batch.commit();
        await fetchTasks();
        toast.success('Tasks deleted successfully!');
      } catch (error) {
        setError('Failed to delete tasks');
      }
    },
    [setError, fetchTasks, writeBatch, doc, db]
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  // Sort tasks by due date
  const sortTasksByDueDate = useCallback(
    (state: string) => {
      if (state === SORT_STATE.ASC) {
        const sortedTasks = tasks.sort((a, b) => {
          return new Date(a.dueOn).getTime() - new Date(b.dueOn).getTime();
        });
        console.log(sortedTasks, 'Asc');

        setTasks([...sortedTasks]);
      } else {
        const sortedTasks = tasks.sort((a, b) => {
          return new Date(b.dueOn).getTime() - new Date(a.dueOn).getTime();
        });
        console.log(sortedTasks, 'Desc');

        setTasks([...sortedTasks]);
      }
    },
    [tasks, setTasks, SORT_STATE]
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    setTasks,
    createTask,
    editTask,
    deleteTask,
    handleFilterByCategoryAndDate,
    filterBySearch,
    bulkStatusUpdate,
    bulkDeleteTasks,
    sortTasksByDueDate,
  };
};

export default useTasks;
