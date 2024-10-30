import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const useCheckPermission = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const checkPermission = (permission: string) => {
    if (user && user.permissions.some((perm) => perm.name === permission)) {
      return true;
    } else {
      return false;
    }
  };

  return { checkPermission };
};

export default useCheckPermission;