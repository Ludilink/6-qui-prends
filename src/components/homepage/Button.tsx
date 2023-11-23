import React from "react";

interface Props {
  text: string
}

const Button: React.FC<Props> = ({ text }) => {
  return (
    <div className="button-container-inner">
      <button>{text}</button>
    </div>
  );
};

export default Button;