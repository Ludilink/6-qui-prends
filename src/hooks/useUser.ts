import { useContext } from 'react';
import api from 'config/api';
import { UserContext } from 'contexts/UserProvider';
import { UserActionType } from '../contexts/userReducer';
import { type UserLoginDTO } from '../types/user/UserLoginDTO';
import { type UserRegisterDTO } from '../types/user/UserRegisterDTO';
import { type User } from '../types/user/User';

const useUser = () => {
  const [, dispatch] = useContext(UserContext);

  const logIn = async (userDto: UserLoginDTO): Promise<void> => {
    dispatch({ type: UserActionType.SET_LOADING, payload: true });
    try {
      const user: User = await api.logIn(userDto);
      dispatch({ type: UserActionType.SET_USER, payload: user });
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      dispatch({ type: UserActionType.SET_LOADING, payload: false });
    }
  };

  const signUp = async (userDto: UserRegisterDTO): Promise<void> => {
    dispatch({ type: UserActionType.SET_LOADING, payload: true });

    try {
      const user = await api.register(userDto);
      const userLoginDto: UserLoginDTO = {
        email: user.email,
        password: userDto.password
      };
      await logIn(userLoginDto);
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
    signUp,
    logOut
  };
};

export default useUser;
