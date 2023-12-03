import React from 'react';
import { type UserRoom } from 'types/user/UserRoom';
import {GameStatus} from "../../types/game/GameStatus";

interface Props {
  members: UserRoom[]
  number: number
  gameStatus: GameStatus
}

const UsersInRoom: React.FC<Props> = ({ members, number, gameStatus }) => {
  console.log("members : ", members)
  console.log("gameStatus : ", gameStatus)
  return (
    <div className='user-list'>
      <div className='user-counter'>
        <div className='counter'>{number}</div>
      </div>
      <ul>
        {members.length !== 0 && gameStatus !== GameStatus.UNSTARTED ? members.map((member, index) => (
          <li className={'' + (member.hasToPlay ? '' : 'checkmark ') + (member.status === 'Online' ? '' : 'offline')} key={index}>
            <div className='user-name'>
              {member.username}
            </div>
            <div className='user-points'>
              {member.bullsLost} pts
            </div>
            <img src="/images/check.png" alt="Checkmark" />
          </li>
        )) : members.map((member, index) => (
          <li className={member.status === 'Online' ? '' : 'offline'} key={index}>
            {member.username}
          </li>
          ))}
      </ul>
    </div>
  );
};

export default UsersInRoom;
