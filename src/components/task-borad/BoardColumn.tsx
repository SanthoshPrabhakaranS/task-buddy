import { FC } from 'react';
import { Task } from '../../utils/types';
import BoardItem from './BoardItem';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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
    <SortableContext
      items={column.tasks}
      strategy={verticalListSortingStrategy}
      id={column.title}
    >
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
    </SortableContext>
  );
};

export default BoardColumn;
