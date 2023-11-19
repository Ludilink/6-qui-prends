import { type Action } from 'types/Action';
import { type Socket } from 'socket.io-client';

export enum SocketActionType {
  SET_SOCKET = 'SET_SOCKET',
  SET_LOADING = 'SET_LOADING',
}

export interface SocketState {
  socket?: Socket
  loading: boolean
}

export const initialSocketState: SocketState = {
  socket: undefined,
  loading: true
};

export const SocketReducer = (state: SocketState, action: Action<SocketActionType>): SocketState => {
  switch (action.type) {
    case SocketActionType.SET_SOCKET:
      console.log('[DISPATCH] SET_SOCKET : ', action.payload);
      return {
        ...state,
        socket: action.payload
      };
    case SocketActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean
      };
  }
};
