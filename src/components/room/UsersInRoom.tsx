import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';
import {GameStatus} from "../../types/game/GameStatus";

interface Props {
  members: UserRoom[]
  number: number
  gameStatus: GameStatus
}

const UsersInRoom: React.FC<Props> = ({ members, number, gameStatus }) => {
  return (
    <div className='user-list'>
      <div className='user-counter'>
        <div className='counter'>{number}</div>
      </div>
      <ul>
        {gameStatus !== GameStatus.UNSTARTED && members.length > 0 && members.map((member, index) => (
          <li className={'' + (member.hasToPlay ? 'active' : '')} key={index}>
            <div className='user-name'>
              {member.username}
            </div>
            <div className='user-points'>
              {member.bullsLost} pts
            </div>
          </li>
        )) }
        {gameStatus === GameStatus.UNSTARTED && members.length > 0 && members.map((member, index) => (
          <li key={index}>
            {member.username}
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default UsersInRoom;
