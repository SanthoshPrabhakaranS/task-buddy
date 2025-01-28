import { useCallback } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { assets } from '../../../assets';
import useTasks from '../../hooks/useTasks';
import { Storage } from '../../storage/storage';

const GoogleButton = () => {
  const { fetchTasks } = useTasks();
  const storage = new Storage();

  const googleSignIn = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      if (result.user) {
        storage.setItem('userId', JSON.stringify(result.user.uid));
        window.location.href = '/home';
      }
    });
  }, [auth, fetchTasks]);

  return (
    <div
      onClick={googleSignIn}
      className='bg-black flex p-3 max-md:px-8 justify-center items-center gap-3 rounded-[18px] h-[48px] md:h-[60px] mt-3 cursor-pointer hover:bg-black/90'
    >
      <img src={assets.GoogleLogo} alt='google-logo' className='w-5 h-5' />
      <p className='text-white font-bold text-[16px] md:text-[21px]'>
        Continue with Google
      </p>
    </div>
  );
};

export default GoogleButton;
