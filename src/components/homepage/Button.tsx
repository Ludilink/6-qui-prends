import React from "react";

interface Props {
  text: string
  username: string
}

const Button: React.FC<Props> = ({ text, username }) => {
  return (
    <div className="button-container-inner">
      <button className="button" disabled={username.trim().length === 0}>{text}</button>
    </div>
  );
};

export default Button;