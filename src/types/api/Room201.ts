import { type UserRoom } from '../user/UserRoom';

export interface Room201 {
  slug: string
  maxPlayers: number
  currentPlayers: number
  password: string | null
  users: UserRoom[]
}
