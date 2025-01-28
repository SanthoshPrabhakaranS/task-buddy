import { FC } from 'react';
import { Task, TaskStatus } from '../../utils/types';
import ViewContainer from '../view-container';
import { cn, handleDragEnd } from '../../utils/utils';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import BoardColumn from './BoardColumn';
import LoadingContainer from '../loading-container/index';

interface TaskBoardProps {
  tasks: Task[];
  createTask: (task: Task) => Promise<string | undefined>;
  fetchTasks: () => void;
  setTasks: any;
  handleModalAction: () => void;
  tasksLoading: boolean;
}

const TaskBoard: FC<TaskBoardProps> = ({ setTasks, tasks, tasksLoading }) => {
  const COLUMNS_DATA = [
    {
      id: 1,
      title: 'TO-DO',
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
      className: 'bg-pink',
      noDataText: 'No tasks in To-Do',
    },
    {
      id: 2,
      title: 'IN-PROGRESS',
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
      className: 'bg-blue',
      noDataText: 'No tasks In Progress',
    },
    {
      id: 3,
      title: 'COMPLETED',
      tasks: tasks.filter((task) => task.status === TaskStatus.COMPLETED),
      className: 'bg-darkGreen',
      noDataText: 'No tasks Completed',
    },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  if (tasksLoading) {
    return <LoadingContainer />;
  }

  return (
    <ViewContainer>
      <div className='h-full flex flex-row gap-5'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={(e: DragEndEvent) => handleDragEnd(e, setTasks)}
        >
          {COLUMNS_DATA.map((column) => {
            return (
              <div
                className='w-[336px] h-full rounded-xl bg-lightGray p-3 border border-black/10 flex flex-col gap-8'
                key={column.id}
              >
                <div className='flex'>
                  <h1
                    className={cn(
                      'text-[14px] py-1 px-2 rounded-md font-semibold',
                      column.className
                    )}
                  >
                    {column.title}
                  </h1>
                </div>
                <BoardColumn column={column} />
              </div>
            );
          })}
        </DndContext>
      </div>
    </ViewContainer>
  );
};

export default TaskBoard;
