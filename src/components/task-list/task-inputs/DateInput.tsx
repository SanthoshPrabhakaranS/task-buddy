import { CalendarRange } from 'lucide-react';
import Popover from '../../shared/popover';
import DatePicker from '../../shared/date-input';
import { FC, useMemo } from 'react';
import { format } from 'date-fns';
import { cn } from '../../../utils/utils';

interface DateInputProps {
  dueDate: string;
  setDueDate: (dueDate: string) => void;
  label?: string;
  triggerClassName?: string;
  title?: string;
  iconPosition?: 'left' | 'right';
  resetButton?: boolean;
}

const DateInput: FC<DateInputProps> = ({
  setDueDate,
  dueDate,
  label,
  triggerClassName,
  title,
  iconPosition = 'left',
  resetButton,
}) => {
  const date = useMemo(() => {
    if (dueDate) {
      return format(new Date(dueDate), 'dd/MM/yyyy');
    }
  }, [dueDate]);

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <p className='text-[12px] text-black/60 font-semibold'>{label}</p>
      )}
      <Popover
        trigger={
          <div
            className={cn(
              'flex flex-row justify-center items-center gap-2 border border-gray-400 rounded-[20px] p-2 h-[36px] text-[14px] text-black/60 font-semibold cursor-pointer w-[110px]',
              triggerClassName
            )}
          >
            {iconPosition === 'left' && (
              <CalendarRange size={20} className='text-black/50' />
            )}
            {date || title || 'Due Date'}
            {iconPosition === 'right' && (
              <CalendarRange size={17} className='text-black/50' />
            )}
          </div>
        }
        content={
          <div className='flex flex-col gap-2 items-center relative z-50'>
            <DatePicker
              onDateSelect={(date: Date) => {
                setDueDate(date.toISOString());
              }}
            />
            {resetButton && (
              <div
                onClick={() => setDueDate('')}
                className='cursor-pointer text-primary w-full p-2 text-center bg-white hover:bg-primary/10 shadow-md rounded-t-lg font-medium'
              >
                Reset
              </div>
            )}
          </div>
        }
        className='w-auto p-0 rounded-[20px] bg-[#FFF9F9]'
      />
    </div>
  );
};

export default DateInput;
