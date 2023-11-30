import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from 'pages/Homepage';
import RoomLayout from 'components/layout/RoomLayout';
import CreateRoom from 'pages/CreateRoom';
import SocketLayout from 'components/layout/SocketLayout';
import RedirectToCreate from "components/room/RedirectToCreate";

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>404</div>
  },
  {
    path: '/room',
    element: <RoomLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '',
        element: <RedirectToCreate />
      },
      {
        path: ':id',
        element: <SocketLayout />
      },
      {
        path: 'create',
        element: <CreateRoom />
      }
    ]
  }
]);

export default Router;
