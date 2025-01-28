import { TABLE_HEADERS } from '../../utils/constants';
import ListItem from './ListItem.tsx';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { Task, TaskStatus } from '../../utils/types.ts';
import { FC, useEffect } from 'react';
import useTasks from '../hooks/useTasks.tsx';
import ViewContainer from '../view-container/index.ts';

interface TaskListProps {
  tasks: Task[];
  createTask: (task: Task) => Promise<string | undefined>;
  fetchTasks: () => void;
  setTasks: any;
  handleModalAction: () => void;
  visibleTasks: number;
  setVisibleTasks: (value: number) => void;
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  createTask,
  fetchTasks,
  setTasks,
  handleModalAction,
  setVisibleTasks,
  visibleTasks,
}) => {
  const { editTask } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    // if (over && active.id !== over?.id) {
    //   setTasks((tasks: any) => {
    //     const oldIndex = tasks.findIndex((task: any) => task.id === active.id);
    //     const newIndex = tasks.findIndex((task: any) => task.id === over?.id);

    //     // Reorder the tasks
    //     const newTasks = [...tasks];
    //     const [movedTask] = newTasks.splice(oldIndex, 1);
    //     newTasks.splice(newIndex, 0, movedTask);

    //     return newTasks;
    //   });
    // }

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const updatedTask = tasks.find((task) => task.id === taskId) as Task;

      if (updatedTask.status === newStatus) return;

      await editTask({
        ...updatedTask,
        status: newStatus,
      });
    } catch (error) {
      console.error(error, 'Failed to update task status');
    }
  };

  return (
    <ViewContainer>
      <div className='w-full border-b mb-2 hidden lg:block'></div>

      {/* Main Table Header */}
      <div
        className='hidden lg:grid grid-cols-4 gap-4 text-left text-[15px] font-semibold text-black/60'
        style={{
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
        }}
      >
        {TABLE_HEADERS.map((header) => (
          <div className='pl-2' key={header.id}>
            {header.title}
          </div>
        ))}
      </div>

      <div className='w-full flex flex-col gap-4'>
        {/* To-Do items */}
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <ListItem
            createTask={createTask}
            tasks={tasks.filter((task) => task.status === TaskStatus.TODO)}
            title='To-Do'
            handleDragEnd={handleDragEnd}
            noDataMessage='No tasks in To-Do'
            containerHeaderClasses='bg-pink hover:bg-pink'
            chevronColor='#3E0344'
            handleModalAction={handleModalAction}
            status={TaskStatus.TODO}
            visibleTasks={visibleTasks}
            setVisibleTasks={setVisibleTasks}
          />

          {/* In Progress items */}
          <ListItem
            tasks={tasks.filter(
              (task) => task.status === TaskStatus.IN_PROGRESS
            )}
            title='In Progress'
            handleDragEnd={handleDragEnd}
            noDataMessage='No tasks in Progress'
            containerHeaderClasses='bg-blue hover:bg-blue'
            chevronColor='#055167'
            handleModalAction={handleModalAction}
            status={TaskStatus.IN_PROGRESS}
            visibleTasks={visibleTasks}
            setVisibleTasks={setVisibleTasks}
          />

          {/* Completed items */}
          <ListItem
            tasks={tasks.filter((task) => task.status === TaskStatus.COMPLETED)}
            title='Completed'
            handleDragEnd={handleDragEnd}
            noDataMessage='No tasks Completed'
            containerHeaderClasses='bg-green hover:bg-green'
            chevronColor='#0D7A0A'
            handleModalAction={handleModalAction}
            status={TaskStatus.COMPLETED}
            visibleTasks={visibleTasks}
            setVisibleTasks={setVisibleTasks}
          />
        </DndContext>
      </div>
    </ViewContainer>
  );
};

export default TaskList;
