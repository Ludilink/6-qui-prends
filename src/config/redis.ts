import { post } from 'config/requests';
import { type RoomOptions } from 'types/RoomOptions';
import { type User } from 'types/user/User';
import { type Room201 } from '../types/api/Room201';
import { type Response400 } from '../types/api/Response400';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const redis = {
  createRoom: async (body: RoomOptions, user: User): Promise<Room201> => {
    console.log('[CREATE ROOM] body : ', body);
    const response: Response = await post(`${BASE_URL}/room`, body, user.access_token);

    if (response.status !== 201) {
      const res: Response400 = await response.json();
      throw new Error(res.message.map((m) => m).join(', '));
    }

    return await response.json() as Room201;
  }

};

export default redis;
