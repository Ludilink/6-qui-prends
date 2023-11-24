import React, { type Dispatch, type PropsWithChildren, useReducer } from 'react';
import { io } from 'socket.io-client';
import { initialSocketState, type SocketActionType, SocketReducer, type SocketState } from 'contexts/socketReducer';
import { type Action } from 'types/Action';
import {User} from "../types/user/User";

export const SocketContext = React.createContext<[SocketState, Dispatch<Action<SocketActionType>>]>([
  initialSocketState,
  () => null
]);

const initializeState = (prop: props): SocketState => {
  let user = localStorage.getItem('user')
  console.log('[SocketProvider] User is defined : ', user)
  if (prop.slug !== undefined && user !== null) {
    let newUser: User = JSON.parse(user)
    const state: SocketState = {
      socket: io(process.env.REACT_APP_WS_URL as string, { query: { userId: newUser.id, username: newUser.username, slug: prop.slug } }),
      loading: false
    };
    console.log('[SocketProvider] initializeState : ', state);
    return state;
  }
  return initialSocketState;
};

interface props {
  slug: string
}
const SocketProvider: React.FC<PropsWithChildren<props>> = ({ children, slug }) => {
  const [state, dispatch] = useReducer(SocketReducer, { slug }, initializeState as any);

  return (
    <SocketContext.Provider value={[state, dispatch]}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
