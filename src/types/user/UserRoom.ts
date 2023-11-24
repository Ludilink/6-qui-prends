export interface UserRoom {
  userId: string
  username: string
  socketId: string | null
  isHost: boolean
  hasToPlay: boolean
  bullLost: number
}
