import React, { useContext, useEffect } from 'react';
import SocketProvider from 'contexts/SocketProvider';
import Room from 'pages/Room';
import { UserContext } from 'contexts/UserProvider';
import LoginRegisterModal from 'components/user/LoginRegisterModal';
import { useNavigate, useParams } from 'react-router-dom';

const SocketLayout = () => {
  const { id } = useParams<{ id: string }>();
  const [{ user }] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }
  }, []);

  if (user === undefined) {
    return (
      <LoginRegisterModal />
    );
  }
  return (
    <SocketProvider user={user} slug={id as string}>
      <Room />
    </SocketProvider>
  );
};

export default SocketLayout;
