import React from "react";
import { Link } from 'react-router-dom';

interface Props {
  text: string
  path: string
}

const RedirectButton: React.FC<Props> = ({ text, path }) => {
  return (
    <Link to={path}>
      <div className="button-container">
        <div className="button">
          { text }
        </div>
      </div>
    </Link>
  );
};

export default RedirectButton;