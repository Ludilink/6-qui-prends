import React from "react";

interface Props {
  text: string
  username: string
  room: string
}

const JoinButton: React.FC<Props> = ({ text, username, room }) => {
  return (
    <div className="button-container-inner">
      <button className="button" disabled={username.trim().length === 0 || !/[a-zA-Z]+-[a-zA-Z]+-[a-zA-Z]+/.test(room as string)}>{text}</button>
    </div>
  );
};

export default JoinButton;