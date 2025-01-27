import { Plus } from 'lucide-react';
import Popover from '../../shared/popover';
import { FC } from 'react';
import { cn } from '../../../utils/utils';

interface TaskStatus {
  id: number;
  title: string;
}

interface TaskCategory {
  id: number;
  title: string;
}

interface StatusAndCategoryInputProps {
  items: TaskStatus[] | TaskCategory[];
  value: string;
  onChange: (value: string) => void;
  triggerElement?: JSX.Element;
  contentClassName?: string;
  label?: string;
}

const StatusAndCategoryInput: FC<StatusAndCategoryInputProps> = ({
  items,
  value,
  onChange,
  triggerElement,
  contentClassName,
  label,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <p className='text-[12px] font-semibold text-black/60'>{label}</p>
      )}
      <Popover
        trigger={
          <>
            {value ? (
              <p
                className={cn(
                  'mt-3 font-semibold text-black text-[14px]',
                  triggerElement &&
                    'flex justify-center items-center h-[36px] border border-black/10 rounded-lg p-2 w-[190px] bg-lightGray cursor-pointer text-[12px] mt-0'
                )}
              >
                {value}
              </p>
            ) : (
              <>
                {triggerElement ? (
                  triggerElement
                ) : (
                  <div className='flex flex-row justify-center items-center gap-2 border border-gray-400 rounded-[20px] p-2 h-[36px] w-[36px] text-[14px] text-black/60 font-semibold cursor-pointer'>
                    <Plus className='text-black' />
                  </div>
                )}
              </>
            )}
          </>
        }
        content={
          <div className='flex flex-col gap-3'>
            {items.map((item) => {
              return (
                <p
                  className={cn(
                    'text-[13px] font-semibold tracking-wide cursor-pointer text-black',
                    value === item.title && 'text-primary'
                  )}
                  key={item.id}
                  onClick={() => onChange(item.title)}
                >
                  {item.title}
                </p>
              );
            })}
          </div>
        }
        className={cn(
          'w-[150px] rounded-[20px] bg-[#FFF9F9] border-primary/20',
          contentClassName
        )}
      />
    </div>
  );
};

export default StatusAndCategoryInput;
