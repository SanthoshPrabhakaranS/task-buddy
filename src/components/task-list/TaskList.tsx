import { SORT_STATE, TABLE_HEADERS } from '../../utils/constants';
import ListItem from './ListItem.tsx';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { Task, TaskStatus } from '../../utils/types.ts';
import { FC, useCallback, useEffect, useState } from 'react';
import useTasks from '../hooks/useTasks.tsx';
import ViewContainer from '../view-container/index.ts';
import { cn, handleDragEnd } from '../../utils/utils.ts';
import { assets } from '../../assets/index.ts';
import LoadingContainer from '../loading-container/LoadingContainer.tsx';

interface TaskListProps {
  tasks: Task[];
  createTask: (task: Task) => Promise<string | undefined>;
  fetchTasks: () => void;
  setTasks: any;
  handleModalAction: () => void;
  visibleTasks: number;
  setVisibleTasks: (value: number) => void;
  tasksLoading: boolean;
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  createTask,
  fetchTasks,
  setTasks,
  handleModalAction,
  setVisibleTasks,
  visibleTasks,
  tasksLoading,
}) => {
  const TASKLIST_ROWS = [
    {
      id: 1,
      title: 'To-Do',
      status: TaskStatus.TODO,
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
      className: 'bg-pink hover:bg-pink',
      noDataText: 'No tasks in To-Do',
      chevronColor: '#3E0344',
    },
    {
      id: 2,
      title: 'In Progress',
      status: TaskStatus.IN_PROGRESS,
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
      className: 'bg-blue hover:bg-blue',
      noDataText: 'No tasks in Progress',
      chevronColor: '#055167',
    },
    {
      id: 3,
      title: 'Completed',
      status: TaskStatus.COMPLETED,
      tasks: tasks.filter((task) => task.status === TaskStatus.COMPLETED),
      className: 'bg-green hover:bg-green',
      noDataText: 'No tasks Completed',
      chevronColor: '#0D7A0A',
    },
  ];

  const { sortTasksByDueDate } = useTasks();
  const [toggleSort, setToggleSort] = useState<string>(SORT_STATE.ASC);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSortAction = useCallback(() => {
    setToggleSort((prev) =>
      prev === SORT_STATE.ASC ? SORT_STATE.DESC : SORT_STATE.ASC
    );

    sortTasksByDueDate(toggleSort);
  }, [setToggleSort, toggleSort]);

  if (tasksLoading) {
    return <LoadingContainer />;
  }

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
          <div
            className='pl-2 flex flex-row items-center gap-2'
            key={header.id}
          >
            {header.title}{' '}
            <img
              src={assets.SortImg}
              onClick={handleSortAction}
              className={cn(
                'w-[11px] cursor-pointer',
                header.title === 'Due on' ? 'block' : 'hidden'
              )}
            />
          </div>
        ))}
      </div>

      <div className='w-full flex flex-col gap-4'>
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={(e: DragEndEvent) => handleDragEnd(e, setTasks)}
        >
          {TASKLIST_ROWS.map((row) => {
            return (
              <ListItem
                key={row.id}
                createTask={createTask}
                tasks={row.tasks}
                title={row.title}
                handleDragEnd={(e: DragEndEvent) => handleDragEnd(e, setTasks)}
                noDataMessage={row.noDataText}
                containerHeaderClasses={row.className}
                chevronColor={row.chevronColor}
                handleModalAction={handleModalAction}
                status={row.status}
                visibleTasks={visibleTasks}
                setVisibleTasks={setVisibleTasks}
              />
            );
          })}
        </DndContext>
      </div>
    </ViewContainer>
  );
};

export default TaskList;
