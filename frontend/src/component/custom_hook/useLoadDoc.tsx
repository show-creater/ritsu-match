import { useEffect } from 'react';
import LoadDoc from '../function/LoadDoc';

export const useLoadDoc = ({persondata, setPersondata, setScrollcheck, isLogin}) => {
  useEffect(() => {
    if (isLogin) {
      LoadDoc({persondata, setPersondata, setScrollcheck, isLogin});
    }
  }, [isLogin]);
};
