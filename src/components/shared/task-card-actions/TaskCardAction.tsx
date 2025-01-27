import { FC } from 'react';
import { assets } from '../../../assets';
import Popover from '../popover';
import { TASK_ACTIONS } from '../../../utils/constants';
import { cn } from '../../../utils/utils';
import { useGlobalContext } from '../../../context/GlobalContext';
import { FormState } from '../../../utils/types';

interface TaskCardActionProps {
  handleModalAction?: () => void;
  taskId: string;
}

const TaskCardAction: FC<TaskCardActionProps> = ({
  handleModalAction,
  taskId,
}) => {
  const { setTaskId, setFormState, handleDeleteTaskModalAction } =
    useGlobalContext();

  const _renderOption = (icon: string, text: string) => {
    return (
      <div
        onClick={() => {
          setTaskId(taskId);
          if (text === 'Edit') {
            setFormState(FormState.EDIT);
            handleModalAction && handleModalAction();
          } else {
            handleDeleteTaskModalAction();
          }
        }}
        className='flex items-center gap-2 cursor-pointer'
      >
        <img className='w-[14px] h-[14px]' src={icon} alt='icon' />
        <p
          className={cn(
            'text-[15px] font-semibold',
            text == 'Delete' && 'text-red-600'
          )}
        >
          {text}
        </p>
      </div>
    );
  };

  return (
    <Popover
      position='left'
      trigger={
        <img
          className='w-[20px] cursor-pointer'
          src={assets.ThreeDotsImg}
          alt='assign'
        />
      }
      content={
        <div className='flex flex-col gap-2 relative z-50'>
          {TASK_ACTIONS.map((item) => (
            <div key={item.id}>{_renderOption(item.icon, item.title)}</div>
          ))}
        </div>
      }
      className='rounded-[20px] bg-[#FFF9F9] border-primary/20 w-[150px] z-50'
    />
  );
};

export default TaskCardAction;
