import React, { type Dispatch, type PropsWithChildren, useReducer } from 'react';
import { io } from 'socket.io-client';
import { type User } from 'types/user/User';
import { initialSocketState, type SocketActionType, SocketReducer, type SocketState } from 'contexts/socketReducer';
import { type Action } from 'types/Action';

export const SocketContext = React.createContext<[SocketState, Dispatch<Action<SocketActionType>>]>([
  initialSocketState,
  () => null
]);

const initializeState = (prop: props): SocketState => {
  if (prop.slug !== undefined) {
    const state: SocketState = {
      socket: io(process.env.REACT_APP_WS_URL as string, { query: { slug: prop.slug } }),
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
