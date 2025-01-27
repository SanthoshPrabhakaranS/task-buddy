import { useCallback } from 'react';
import { assets } from '../../../assets';
import useGetUser from '../../hooks/useGetUser';
import Popover from '../../shared/popover';
import { auth } from '../../../firebase/firebase';

const UserProfile = () => {
  const { user } = useGetUser();

  const handleLogout = useCallback(() => {
    auth.signOut().then(() => {
      window.location.href = '/';
    });
  }, [auth]);

  return (
    <div className='cursor-pointer'>
      <Popover
        trigger={
          <div className='flex flex-row justify-center items-center gap-2'>
            {user?.photoURL ? (
              <img
                className='w-10 h-10 rounded-full'
                src={user?.photoURL}
                alt='profile-img'
              />
            ) : (
              <div className='w-10 h-10 rounded-full bg-gray-400'></div>
            )}
            {user?.displayName ? (
              <p className='whitespace-nowrap font-semibold text-black/60'>
                {user?.displayName}
              </p>
            ) : (
              <div className='w-[100px] h-5 bg-gray-400 rounded-md'></div>
            )}
          </div>
        }
        content={
          <div
            onClick={handleLogout}
            className='flex flex-row gap-2 items-center'
          >
            <img
              className='w-[14px] h-[14px]'
              src={assets.LogoutImg}
              alt='logout'
            />
            <p className='text-[13px] font-semibold'>Logout</p>
          </div>
        }
        className='w-[150px] rounded-[20px] bg-[#FFF9F9] border-primary/20'
      />
    </div>
  );
};

export default UserProfile;
