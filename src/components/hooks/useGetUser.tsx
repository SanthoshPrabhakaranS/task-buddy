import { useCallback, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';

const useGetUser = () => {
  const [user, setUser] = useState<any>();

  const fetchuser = useCallback(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        setUser(userData);
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
