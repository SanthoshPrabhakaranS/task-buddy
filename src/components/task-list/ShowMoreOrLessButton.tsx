import { FC, useCallback } from 'react';
import { Task } from '../../utils/types';

interface ShowMoreOrLessButtonProps {
  tasks: Task[];
  visibleTasks: number;
  setVisibleTasks: (value: number) => void;
}

const ShowMoreOrLessButton: FC<ShowMoreOrLessButtonProps> = ({
  setVisibleTasks,
  tasks,
  visibleTasks,
}) => {
  const handleShowMore = useCallback(() => {
    setVisibleTasks(
      visibleTasks + 8 > tasks.length ? tasks.length : visibleTasks + 5
    );
  }, [setVisibleTasks, tasks, visibleTasks]);

  const handleShowLess = useCallback(() => {
    setVisibleTasks(8);
  }, [setVisibleTasks]);

  return (
    <div>
      {tasks.length > visibleTasks && (
        <div className='w-full'>
          <button
            onClick={handleShowMore}
            className='text-darkBlue font-semibold cursor-pointer w-full flex justify-center items-center mt-2 underline'
          >
            Load more
          </button>
        </div>
      )}

      {tasks.length === visibleTasks && (
        <div className='w-full'>
          <button
            onClick={handleShowLess}
            className='text-darkBlue font-semibold cursor-pointer w-full flex justify-center items-center mt-2 underline'
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowMoreOrLessButton;
