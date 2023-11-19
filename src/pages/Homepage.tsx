import React from 'react';
import Button from "../components/homepage/Button";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="homepage">
        <div className="homepage-logo">
          <img src="/images/6QP-logo.png" alt="Logo" />
        </div>
        <div className="homepage-link">
          <Button text="Jouer" path="/room/create" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
