import React from 'react';
import { Outlet } from 'react-router-dom';
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

const RoomLayout = () => {
  return (
    <div className="room-layout">
      <div className="container">
        <DndProvider backend={HTML5Backend}>
          <Outlet />
        </DndProvider>
      </div>
    </div>
  );
};

export default RoomLayout;
