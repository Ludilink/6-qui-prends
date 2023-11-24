import { useContext } from 'react';
import { UserContext } from 'contexts/UserProvider';
import { UserActionType } from '../contexts/userReducer';
import { type User } from '../types/user/User';
import { v4 as uuid } from 'uuid';

const useUser = () => {
  const [, dispatch] = useContext(UserContext);

  const logIn = async (username: string): Promise<User> => {
    dispatch({ type: UserActionType.SET_LOADING, payload: true });
    try {
      const user: User = {
        id: uuid(),
        username
      };
      dispatch({ type: UserActionType.SET_USER, payload: user });
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch({ type: UserActionType.SET_LOADING, payload: false });
    }
  };

  const logOut = (): void => {
    dispatch({ type: UserActionType.SET_USER, payload: undefined });
    localStorage.removeItem('user');
  };

  return {
    logIn,
    logOut
  };
};

export default useUser;
