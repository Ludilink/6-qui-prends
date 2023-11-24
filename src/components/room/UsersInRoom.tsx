import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';

interface Props {
  members: UserRoom[]
  number: number
  gameIsStarted: boolean
}

const UsersInRoom: React.FC<Props> = ({ members, number, gameIsStarted }) => {
  return (
    <div className='user-list'>
      <div className='user-counter'>
        <div className='counter'>{number}</div>
      </div>
      <ul>
        {gameIsStarted && members.length > 0 && members.map((member, index) => (
          <li className={'' + (member.hasToPlay ? 'active' : '')} key={index}>
            <div className='user-name'>
              {member.username}
            </div>
            <div className='user-points'>
              {member.bullLost} pts
            </div>
          </li>
        )) }
        {!gameIsStarted && members.length > 0 && members.map((member, index) => (
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
