import { clsx, type ClassValue } from 'clsx';
import { isToday, format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDate = (date: string) => {
  return isToday(new Date(date)) ? 'Today' : format(date, 'dd MMM, yyyy');
};
