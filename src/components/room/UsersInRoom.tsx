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
        {gameIsStarted && members.length > 0 && members.map((member) => (
          <li className={'' + (member.hasToPlay ? 'active' : '') + (member.userId === winner?.userId ? ' winner' : '')} key={member.userId}>
            <div className='user-name'>
              {member.username}
            </div>
            <div className='user-bet'>
              {/* {member.bet} <- 2/5 exemple pour une mise de 5 avec déjà 2 win sur le round  */}
            </div>
            <div className='user-points'>
              {member.points} pts
            </div>
          </li>
        )) }
        {!gameIsStarted && members.length > 0 && members.map((member) => (
          <li key={member.userId}>
            {member.username}
          </li>
        ))
        }
      </ul>
    </div>
  );
};

export default UsersInRoom;
