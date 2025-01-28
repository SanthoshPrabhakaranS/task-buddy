import { FC } from 'react';
import { Activity } from '../../../utils/types';
import { format } from 'date-fns';

interface ActivitySectionProps {
  activities: Activity[];
}

const ActivitySection: FC<ActivitySectionProps> = ({ activities }) => {
  return (
    <div className='w-full flex col-span-2 lg:col-span-1 lg:max-w-[350px] flex-col md:bg-lightGray lg:border-l mt-[-0.7rem]'>
      <div className='h-[43px] px-2 hidden lg:flex justify-start items-start bg-white'>
        <h1 className='font-medium mt-2 text-black/60'>Activity</h1>
      </div>
      <div className='p-2 py-3 flex flex-col gap-2 h-[495px] md:h-[425px] overflow-y-auto'>
        {activities.map((activity, index) => (
          <div
            key={index}
            className='flex w-full justify-between items-center gap-2'
          >
            <div className='flex flex-col gap-1 w-[50%]'>
              <p className='text-[12px] font-medium text-black/60'>
                {activity.action}
              </p>
            </div>
            <p className='text-[12px] font-medium text-black/40'>
              {format(new Date(activity.updatedAt), "MMM dd 'at' hh.mm a")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;
