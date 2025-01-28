import Accordion from '../shared/accordion/index';
import { AddTaskInput } from './task-inputs/index.ts';
import { DragEndEvent, useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard.tsx';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../../utils/types.ts';
import { FC } from 'react';
import { cn } from '../../utils/utils.ts';
import ShowMoreOrLessButton from './ShowMoreOrLessButton.tsx';

interface ListItemProps {
  tasks: Task[];
  handleDragEnd: (event: DragEndEvent) => void;
  title: string;
  noDataMessage: string;
  containerHeaderClasses?: string;
  createTask?: (task: Task) => Promise<string | undefined>;
  handleModalAction?: () => void;
  chevronColor?: string;
  status: TaskStatus;
  visibleTasks: number;
  setVisibleTasks: (value: number) => void;
}

const ListItem: FC<ListItemProps> = ({
  tasks,
  title,
  noDataMessage,
  containerHeaderClasses,
  createTask,
  handleModalAction,
  chevronColor,
  status,
  setVisibleTasks,
  visibleTasks,
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Accordion
      chevronColor={chevronColor}
      className={cn('w-full relative rounded-t-[15px]', containerHeaderClasses)}
      title={`${title} (${tasks.length})`}
      isAccordionOpen={title == 'To-Do' ? true : false}
    >
      {title === 'To-Do' && <AddTaskInput createTask={createTask} />}
      <SortableContext
        items={tasks}
        strategy={verticalListSortingStrategy}
        id={status}
      >
        <div ref={setNodeRef}>
          {tasks.length > 0 ? (
            tasks
              .slice(0, visibleTasks)
              .map((item) => (
                <TaskCard
                  key={item.id}
                  item={item}
                  tasks={tasks}
                  handleModalAction={handleModalAction}
                />
              ))
          ) : (
            <div className='h-[30vh] flex justify-center items-center font-medium'>
              {noDataMessage}
            </div>
          )}

          <ShowMoreOrLessButton
            tasks={tasks}
            visibleTasks={visibleTasks}
            setVisibleTasks={setVisibleTasks}
          />
        </div>
      </SortableContext>
    </Accordion>
  );
};

export default ListItem;
