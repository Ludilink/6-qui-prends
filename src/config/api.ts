import { type User } from 'types/user/User';
import { type UserLoginDTO } from 'types/user/UserLoginDTO';
import { type UserRegisterDTO } from 'types/user/UserRegisterDTO';
import { post } from 'config/requests';
import { type UserRegistered } from 'types/user/UserRegistered';
import { jwtDecode } from 'jwt-decode';
import { type Login201 } from 'types/api/Login201';
import { type JwtDecoded } from 'types/api/JwtDecoded';
import { type Response401 } from 'types/api/Response401';
import { type Response400 } from 'types/api/Response400';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = {
  logIn: async (user: UserLoginDTO): Promise<User> => {
    const response = await post(`${BASE_URL}/users/auth/login`, user);
    if (response.status !== 201) {
      const res: Response401 = await response.json();
      throw new Error(res.message);
    }
    const jwt: Login201 = await response.json();

    const connectedUser: JwtDecoded = jwtDecode(jwt.access_token);

    return {
      id: connectedUser.id,
      username: connectedUser.username,
      access_token: jwt.access_token
    };
  },

  register: async (user: UserRegisterDTO): Promise<UserRegistered> => {
    const response = await post(`${BASE_URL}/users/auth/sign-up`, user);
    if (response.status !== 201) {
      if (response.status === 400) {
        const res: Response400 = await response.json();
        throw new Error(res.message.map((m) => m).join(', '));
      } else if (response.status === 409) {
        const res: Response401 = await response.json();
        throw new Error(res.message);
      }
    }
    return await response.json() as UserRegistered;
  }
};

export default api;
