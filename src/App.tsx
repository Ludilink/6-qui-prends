import React, { useContext, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from 'config/router';
import { UserContext } from './contexts/UserProvider';

const App: React.FC = () => {
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state.user !== undefined) {
      console.log('user is logged : ', state.user);
    }
  }, []);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
