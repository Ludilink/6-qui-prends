export interface RoomOptions {
  maxPlayers: number,
  host: {
    userId: string
    username: string
    socketId: string | null
  }
}
