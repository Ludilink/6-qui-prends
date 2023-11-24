import React from 'react';
import RedirectButton from "../components/homepage/RedirectButton";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="homepage">
        <div className="homepage-logo">
          <img src="/images/6QP-logo.png" alt="Logo" />
        </div>
        <div className="homepage-link">
          <RedirectButton text="Jouer" path="/room/create" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
