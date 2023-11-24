import { type UserRoom } from 'types/user/UserRoom';

export interface Message {
  timeSent: string
  text: string
  slug: string
}

export interface MessageReceived {
  message: Message
  user: UserRoom
}
