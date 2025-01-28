import { FC, useCallback, useState } from 'react';
import { cn, convertDate } from '../../utils/utils';
import { assets } from '../../assets';
import { Task, TaskStatus } from '../../utils/types';
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
  const { selectedTasks, setSelectedTasks } = useGlobalContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id.toString(),
    });

  const [loading, setLoading] = useState<boolean>(false);
  const { status } = useGlobalContext();
  const { editTask } = useTasks();

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

  const handleStatusChange = useCallback(
    async (status: string) => {
      setLoading(true);

      await editTask({
        ...item,
        status: status ?? item.status,
      });
      setLoading(false);
    },
    [item, status, editTask]
  );

  const handleOnSelect = useCallback(() => {
    if (selectedTasks.includes(item.id)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== item.id));
    } else {
      setSelectedTasks([...selectedTasks, item.id]);
    }
  }, [item.id, selectedTasks, setSelectedTasks]);

  return (
    <>
      <div
        ref={setNodeRef}
        className={cn(
          'md:grid md:grid-cols-4 w-full flex gap-4 text-black/60 text-[15px] relative p-3 border-b-black/10 font-medium'
        )}
        style={style}
      >
        <div className='flex flex-row items-center gap-2 max-md:w-full'>
          <input
            checked={selectedTasks.includes(item.id)}
            onChange={handleOnSelect}
            className='
            min-w-[16px] min-h-[16px] border-2 border-black/10 rounded-sm cursor-pointer accent-primary'
            type='checkbox'
          />
          <img
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={cn(
              'w-[25px] h-[25px] hidden md:block',
              isDragging && 'cursor-grabbing'
            )}
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
              'text-black truncate w-full max-w-[300px] sm:max-w-[360px] md:max-w-[200px]',
              item.status === TaskStatus.COMPLETED && 'line-through'
            )}
          >
            {item.title}
          </p>
        </div>
        <p className='text-black pl-2 hidden md:block'>
          {convertDate(item.dueOn)}
        </p>
        <div className='text-black pl-2 -mt-1 md:flex items-start hidden'>
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
        <div className='text-black pl-2 w-full flex flex-row items-center justify-end md:justify-between pr-2'>
          <p className='hidden md:block'>{item.category}</p>
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
