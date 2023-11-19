import { type Action } from 'types/Action';
import { type User } from 'types/user/User';

export enum UserActionType {
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
}

export interface UserState {
  user?: User
  loading: boolean
}

export const initialUserState: UserState = {
  user: undefined,
  loading: true
};

export const UserReducer = (state: UserState, action: Action<UserActionType>): UserState => {
  switch (action.type) {
    case UserActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case UserActionType.SET_LOADING:
      return {
        ...state,
        loading: action.payload as boolean
      };
  }
};
