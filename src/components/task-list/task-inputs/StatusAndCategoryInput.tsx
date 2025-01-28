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
  triggerClassName?: string;
  label?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

const StatusAndCategoryInput: FC<StatusAndCategoryInputProps> = ({
  items,
  value,
  onChange,
  triggerElement,
  contentClassName,
  triggerClassName,
  label,
  position,
  disabled,
}) => {
  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <p className='text-[12px] font-semibold text-black/60'>{label}</p>
      )}
      <Popover
        position={position}
        dsiabled={disabled}
        trigger={
          <>
            {value ? (
              <p
                className={cn(
                  'mt-3 font-semibold text-black text-[14px]',
                  triggerElement && triggerClassName
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
                    'text-[13px] font-semibold tracking-wide cursor-pointer',
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
