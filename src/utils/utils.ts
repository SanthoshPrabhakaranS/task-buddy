import { DragEndEvent } from '@dnd-kit/core';
import { clsx, type ClassValue } from 'clsx';
import { isToday, format } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { Task } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDate = (date: string) => {
  return isToday(new Date(date)) ? 'Today' : format(date, 'dd MMM, yyyy');
};

export const handleDragEnd = async (event: DragEndEvent, setTasks: any) => {
  const { active, over } = event;

  if (!over) return;
  if (over && active.id !== over?.id) {
    setTasks((tasks: Task[]) => {
      const oldIndex = tasks.findIndex((task: Task) => task.id === active.id);
      const newIndex = tasks.findIndex((task: Task) => task.id === over?.id);

      // Reorder the tasks
      const newTasks = [...tasks];
      const [movedTask] = newTasks.splice(oldIndex, 1);
      newTasks.splice(newIndex, 0, movedTask);

      return newTasks;
    });
  }
};
