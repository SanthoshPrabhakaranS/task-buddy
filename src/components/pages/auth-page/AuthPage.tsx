import useWindowWidth from '../../hooks/useWindowWidth';
import { cn } from '../../../utils/utils';
import { assets } from '../../../assets';
import GoogleButton from './GoogleButton';
import useGetUser from '../../hooks/useGetUser';
import { useEffect } from 'react';

const AuthPage = () => {
  const windowWidth = useWindowWidth();
  const { user } = useGetUser();

  useEffect(() => {
    if (user) {
      window.location.href = '/home';
    }
  }, [user]);

  return (
    <div className='w-full h-screen flex items-center relative overflow-hidden'>
      <img
        src={
          windowWidth > 800
            ? assets.LandingHeroImg
            : assets.LandingHeroMobileImg
        }
        alt='hero-img'
        className={cn(
          'w-full h-full absolute',
          windowWidth > 800 ? 'right-[-22%]' : 'object-cover'
        )}
      />

      <div className='flex flex-col max-md:mx-auto max-md:items-center gap-2 md:gap-3 md:pl-[5rem] relative z-30'>
        <img src={assets.Logo} alt='logo' className='w-[166px] h-[37px]' />
        <p className='text-[12px] md:text-[15px] font-medium max-w-[300px] md:max-w-[400px] max-md:text-center'>
          Streamline your workflow and track progress effortlessly{' '}
          <br className='hidden md:block' /> with our all-in-one task management
          app.
        </p>
        <GoogleButton />
      </div>
    </div>
  );
};

export default AuthPage;
