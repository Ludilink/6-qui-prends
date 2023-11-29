import React from "react";
import {UserRoom} from "../../types/user/UserRoom";

interface Props {
  members: UserRoom[]
}

const Classement: React.FC<Props> = ({ members }) => {
  return (
    <div className="win-modal">
        <div className="win-title">
          Classement
        </div>
      <div className="win-podium">
        <div className="win-podium-item second">
          <div className="win-podium-name">
            {members[0].username}
          </div>
          <div className="win-podium-points">
            {members[0].bullLost} pts
          </div>
          <div className="win-podium-block">
            <div className="number">
              2
            </div>
          </div>
        </div>
        <div className="win-podium-item first">
          <div className="win-podium-name">
            {members[1].username}
          </div>
          <div className="win-podium-points">
            {members[1].bullLost} pts
          </div>
          <div className="win-podium-block">
            <div className="number">
              1
            </div>
          </div>
        </div>
        {members.length >= 3 && (
          <div className="win-podium-item third">
          <div className="win-podium-name">
            {members[2].username}
          </div>
          <div className="win-podium-points">
            {members[2].bullLost} pts
          </div>
          <div className="win-podium-block">
            <div className="number">
              3
            </div>
          </div>
        </div>
        )}
      </div>
      {members.length >= 4 && (
        members.slice(3).map((member, index) => (
          <div className="win-item" key={index}>
            {index + 4} - {member.username} : {member.bullLost} pts
          </div>
        ))
      )}
    </div>
  )
}

export default Classement;