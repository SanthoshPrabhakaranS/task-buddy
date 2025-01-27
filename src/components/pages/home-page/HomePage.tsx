import { useCallback, useEffect, useMemo, useState } from 'react';
import MenuBar from './MenuBar';
import Navbar from './Navbar';
import Filters from './filters/index';
import TaskList from '../../task-list';
import useTasks from '../../hooks/useTasks';
import { useGlobalContext } from '../../../context/GlobalContext';
import CreateEditTaskModal from '../../modals/create-edit-task-modal/index';
import { FormState } from '../../../utils/types';
import { DeleteTaskModal } from '../../modals/delete-task-modal';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState<string>('List');
  const { createTask, fetchTasks, tasks, setTasks, editTask, deleteTask } =
    useTasks();
  const {
    handleModalAction,
    description,
    setDescription,
    category,
    setCategory,
    dueDate,
    setDueDate,
    status,
    setStatus,
    file,
    setFile,
    taskTitle,
    setTaskTitle,
    taskId,
    formState,
    openCreateEditModal,
    openDeleteTaskModal,
    handleDeleteTaskModalAction,
  } = useGlobalContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleTasks, setVisibleTasks] = useState<number>(8);

  const handleMenuClick = useCallback(
    (menu: string) => {
      setActiveMenu(menu);
    },
    [setActiveMenu]
  );

  useEffect(() => {
    setTasks([...tasks]);
  }, [setTasks, fetchTasks]);

  const _renderView = useMemo(() => {
    if (activeMenu === 'List') {
      return (
        <TaskList
          tasks={tasks}
          createTask={createTask}
          setTasks={setTasks}
          fetchTasks={fetchTasks}
          handleModalAction={handleModalAction}
          visibleTasks={visibleTasks}
          setVisibleTasks={setVisibleTasks}
        />
      );
    } else {
      return <div>Board</div>;
    }
  }, [
    activeMenu,
    tasks,
    createTask,
    setTasks,
    fetchTasks,
    handleModalAction,
    editTask,
    deleteTask,
    visibleTasks,
    setVisibleTasks,
  ]);

  const editableData = useMemo(() => {
    if (taskId && formState === FormState.EDIT) {
      return tasks.find((task) => task.id === taskId);
    }
  }, [taskId, tasks, formState]);

  const handleDeleteTask = useCallback(async () => {
    if (taskId) {
      setLoading(true);
      await deleteTask(taskId);
      await fetchTasks();
      setLoading(false);
      handleDeleteTaskModalAction();
    }
  }, [taskId, deleteTask, fetchTasks, handleDeleteTaskModalAction]);

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='p-[2rem] flex flex-col gap-5'>
        {openCreateEditModal && (
          <CreateEditTaskModal
            tasks={tasks}
            createTask={createTask}
            fetchTasks={fetchTasks}
            handleModalAction={handleModalAction}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            dueDate={dueDate}
            setDueDate={setDueDate}
            status={status}
            setStatus={setStatus}
            file={file}
            setFile={setFile}
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            loading={loading}
            setLoading={setLoading}
            editableData={editableData}
            formState={editableData ? FormState.EDIT : FormState.CREATE}
            editTask={editTask}
          />
        )}

        {openDeleteTaskModal && (
          <DeleteTaskModal
            handleDeleteTask={handleDeleteTask}
            loading={loading}
          />
        )}

        <Navbar />
        <MenuBar activeMenu={activeMenu} handleMenuClick={handleMenuClick} />
        <Filters />
      </div>
      {_renderView}
    </div>
  );
};

export default HomePage;
