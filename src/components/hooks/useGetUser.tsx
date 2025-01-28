import { useCallback, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { Storage } from '../storage/storage';

const useGetUser = () => {
  const [user, setUser] = useState<any>();
  const storage = new Storage();

  const fetchuser = useCallback(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
        storage.setItem('userId', JSON.stringify(userData?.uid));
      } else {
        window.location.href = '/';
      }
    });
  }, [auth]);

  useEffect(() => {
    fetchuser();
  }, [fetchuser]);

  return {
    user,
  };
};

export default useGetUser;
