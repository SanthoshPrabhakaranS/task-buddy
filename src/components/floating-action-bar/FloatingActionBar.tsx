import { assets } from '../../assets';
import StatusAndCategoryInput from '../task-list/task-inputs/StatusAndCategoryInput';
import { TASK_STATUS } from '../../utils/constants';
import { useCallback, useState } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import useTasks from '../hooks/useTasks';
import { cn } from '../../utils/utils';
import { TaskStatus } from '../../utils/types';

const FloatingActionBar = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedTasks, setSelectedTasks, handleDeleteTaskModalAction } =
    useGlobalContext();
  const { bulkStatusUpdate } = useTasks();

  const handleStatusUpdate = useCallback(
    async (status: string) => {
      setLoading(true);
      await bulkStatusUpdate(selectedTasks, status);
      setLoading(false);
      setSelectedTasks([]);
    },
    [bulkStatusUpdate, selectedTasks, status, setLoading]
  );

  const handleBulkDelete = useCallback(async () => {
    handleDeleteTaskModalAction();
  }, [selectedTasks]);

  return (
    <div className='absolute w-[340px] sm:w-[370px] lg:w-auto bottom-0 left-1/2 -translate-x-1/2 flex flex-row gap-3 items-center bg-black rounded-2xl p-3'>
      <div className='py-1 h-[32px] md:h-[36px] text-[12px] border text-white font-medium flex flex-row items-center rounded-full sm:gap-2 px-3 sm:px-4 whitespace-nowrap'>
        <p>{selectedTasks.length} tasks selected</p>{' '}
        <img
          onClick={() => setSelectedTasks([])}
          className='cursor-pointer pr-2'
          src={assets.CloseImgWhite}
          alt='close'
        />
      </div>
      <img
        onClick={() => {
          setStatus(TaskStatus.COMPLETED);
          handleStatusUpdate(TaskStatus.COMPLETED);
        }}
        className='w-[17px] cursor-pointer'
        src={assets.TickSquareImg}
        alt='tick'
      />
      <div className='flex flex-row gap-1 sm:ml-6'>
        <StatusAndCategoryInput
          triggerElement={
            <div className='flex flex-col gap-1'>
              <div className='h-[32px] md:h-[36px] px-5 border-white border bg-[#131212] flex justify-between items-center text-[13px] truncate text-white font-semibold cursor-pointer relative rounded-full'>
                <p>Status</p>
              </div>
            </div>
          }
          disabled={loading}
          items={TASK_STATUS}
          value={status}
          onChange={(value) => {
            setStatus(value);
            handleStatusUpdate(value);
          }}
          position='top'
          contentClassName='mb-[3.5rem] bg-black !text-white'
          triggerClassName={cn(
            'h-[36px] px-5 border-white max-sm:text-[10px] border bg-[#131212] flex justify-between items-center text-[10px] text-white font-semibold cursor-pointer relative rounded-full mt-[-0rem] truncate',
            loading && 'cursor-not-allowed'
          )}
        />
        <button
          className='bg-red/20 h-[32px] md:h-[36px] text-[13px] font-semibold px-4 border rounded-full border-red text-red'
          onClick={handleBulkDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default FloatingActionBar;
