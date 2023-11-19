import React from 'react';
import { Outlet } from 'react-router-dom';

const RoomLayout = () => {
  return (
    <div className="room-layout">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default RoomLayout;
