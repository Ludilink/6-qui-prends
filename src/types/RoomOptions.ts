export interface RoomOptions {
  maxPlayers: number,
  host: {
    username: string
    socketId: string | null
  }
}
