import { FC, useCallback } from 'react';
import { Task, TaskStatus } from '../../utils/types';
import TaskCardAction from '../shared/task-card-actions';
import { useGlobalContext } from '../../context/GlobalContext';
import { cn, convertDate } from '../../utils/utils';
import {
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

interface BoardItemProps {
  task: Task;
}
const BoardItem: FC<BoardItemProps> = ({ task }) => {
  const { handleModalAction } = useGlobalContext();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id.toString(),
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        scale: isDragging ? 1.05 : 1,
        boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        backgroundColor: isDragging ? 'white' : 'transparent',
        borderRadius: isDragging ? '13px' : '0',
        zIndex: isDragging ? 10 : 'auto',
      }
    : undefined;

  const truncate = useCallback((str: string, n: number) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }, []);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='min-h-[110px] pt-4 px-4 pb-2 rounded-xl border border-black/10 flex flex-col justify-between gap-2 bg-white'
    >
      <div className='w-full flex flex-row justify-between items-start gap-3'>
        <p
          className={cn(
            'text-[16px] font-bold tracking-normal w-[85%]',
            task.status === TaskStatus.COMPLETED && 'line-through'
          )}
        >
          {truncate(task.title, 55)}
        </p>
        <div onClick={(e) => e.stopPropagation()}>
          <TaskCardAction
            handleModalAction={handleModalAction}
            taskId={task.id}
          />
        </div>
      </div>

      <div className='flex flex-row items-center justify-between font-semibold text-black/60'>
        <p className='text-[11px]'>{task.category}</p>
        <p className='text-[11px]'>{convertDate(task.dueOn)}</p>
      </div>
    </div>
  );
};

export default BoardItem;
