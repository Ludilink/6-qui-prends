export interface UserRoom {
  userId: string
  username: string
  socketId: string | null
  isHost: boolean
}
