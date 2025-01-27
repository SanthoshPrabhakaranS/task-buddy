import { FC, useCallback, useMemo, useState } from 'react';
import { cn } from '../../utils/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { assets } from '../../assets';
import { Task, TaskStatus } from '../../utils/types';
import { format, isToday } from 'date-fns';
import TaskCardAction from '../shared/task-card-actions';
import StatusAndCategoryInput from './task-inputs/StatusAndCategoryInput';
import { TASK_STATUS } from '../../utils/constants';
import { useGlobalContext } from '../../context/GlobalContext';
import useTasks from '../hooks/useTasks';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  item: Task;
  tasks: Task[];
  handleModalAction?: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ item, tasks, handleModalAction }) => {
  // const { transition } = useSortable({
  //   id: item.id.toString(),
  //   data: {
  //     type: 'task',
  //     sortable: {
  //       containerId: item.status,
  //     },
  //   },
  // });
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id.toString(),
    });

  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useGlobalContext();
  const { editTask, setTasks } = useTasks();

  const style = transform
    ? {
        // transition: transition || 'transform 200ms ease, box-shadow 200ms ease',
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        backgroundColor: isDragging ? '#F9F9F9' : 'transparent',
        borderRadius: isDragging ? '13px' : '0',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        zIndex: isDragging ? 1 : 'auto',
      }
    : {
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
      };

  const date = useMemo(() => {
    return isToday(new Date(item.dueOn))
      ? 'Today'
      : format(item.dueOn, 'dd MMM, yyyy');
  }, [item.dueOn]);

  const handleStatusChange = useCallback(
    async (status: string) => {
      setLoading(true);
      // setTasks(
      //   tasks.map((task) => (task.id === item.id ? { ...task, status } : task))
      // );
      console.log(status);

      await editTask({
        ...item,
        status: status ?? item.status,
      });
      setLoading(false);
    },
    [item, status, editTask]
  );

  return (
    <>
      <div
        ref={setNodeRef}
        className={cn(
          'grid grid-cols-4 gap-4 text-black/60 text-[15px] relative p-3 border-b-black/10 font-medium'
        )}
        style={style}
      >
        <div className='flex flex-row items-center gap-2'>
          <input
            className='
            w-[16px] h-[16px] border-2 border-black/10 rounded-sm cursor-pointer'
            type='checkbox'
          />
          <img
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={cn('w-[25px] h-[25px]', isDragging && 'cursor-grabbing')}
            src={assets.DotsImg}
            alt='dots'
          />
          <img
            className='w-[25px] h-[25px]'
            src={
              item.status === TaskStatus.COMPLETED
                ? assets.CheckMarkGreen
                : assets.CheckMarkImg
            }
            alt='dots'
          />

          <p
            className={cn(
              'text-black',
              item.status === TaskStatus.COMPLETED && 'line-through'
            )}
          >
            {item.title}
          </p>
        </div>
        <p className='text-black pl-2'>{date}</p>
        <div className='text-black pl-2 -mt-1 flex items-start'>
          <StatusAndCategoryInput
            triggerElement={
              <button
                disabled={loading}
                className={cn(
                  'bg-[#DDDADD] p-2 py-1 relative -z-0 rounded-md text-[13px] w-auto whitespace-nowrap cursor-pointer ',
                  loading && 'cursor-not-allowed'
                )}
              >
                {item.status}
              </button>
            }
            items={TASK_STATUS}
            value={''}
            onChange={(value) => handleStatusChange(value)}
            contentClassName='mt-1 '
          />
        </div>
        <div className='text-black pl-2 w-full flex flex-row items-center justify-between pr-2'>
          {item.category}
          <TaskCardAction
            handleModalAction={handleModalAction}
            taskId={item.id}
          />
        </div>
      </div>
      <div
        className={cn(
          'w-full border-b border-b-black/10',
          item.id === tasks[tasks.length - 1].id && 'border-none'
        )}
      ></div>
    </>
  );
};

export default TaskCard;
