import { FC } from 'react';
import Button from '../button';
import { CATEGORIES } from '../../../utils/constants';
import { cn } from '../../../utils/utils';

interface TaskCategoryRadioInputProps {
  value: string;
  onChange: (value: string) => void;
}

const TaskCategoryRadioInput: FC<TaskCategoryRadioInputProps> = ({
  onChange,
  value,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-[12px] text-black/60 font-semibold'>Task Category*</p>
      <div className='flex flex-row items-center gap-2'>
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            type='button'
            onClick={() => onChange(category.title)}
            className={cn(
              'h-[30px] w-[80px] flex justify-center font-bold items-center px-4 text-[10px] hover:text-white border border-black/10',
              value === category.title
                ? 'bg-primary text-white'
                : 'bg-lightGray text-black/60'
            )}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskCategoryRadioInput;
