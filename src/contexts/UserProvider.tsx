import React, { type Dispatch, type PropsWithChildren, createContext, useReducer } from 'react';
import { type Action } from '../types/Action';
import { initialUserState, type UserActionType, UserReducer, type UserState } from './userReducer';

export const UserContext = createContext<[UserState, Dispatch<Action<UserActionType>>]>([
  initialUserState,
  () => null
]);
const initializeState = (): UserState => {
  const user = localStorage.getItem('user');
  if (user != null) {
    return {
      user: JSON.parse(user),
      loading: false
    };
  }
  return initialUserState;
};

const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialUserState, initializeState as any);

  return (
    <UserContext.Provider value={ [state, dispatch] }>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
