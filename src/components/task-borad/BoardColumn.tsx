import { FC } from 'react';
import { Task } from '../../utils/types';
import BoardItem from './BoardItem';
import { useDroppable } from '@dnd-kit/core';

interface BoardColumnProps {
  column: {
    id: number;
    title: string;
    tasks: Task[];
    className: string;
    noDataText: string;
  };
}

const BoardColumn: FC<BoardColumnProps> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.title,
  });

  return (
    <div
      ref={setNodeRef}
      className='w-full h-full flex flex-col gap-3 no-scrollbar'
    >
      {column.tasks.length > 0 ? (
        column.tasks.map((task) => {
          return <BoardItem task={task} key={task.id} />;
        })
      ) : (
        <div className='h-full justify-center flex items-center'>
          <p className='font-medium'>{column.noDataText}</p>
        </div>
      )}
    </div>
  );
};

export default BoardColumn;
