import React, { useEffect } from 'react';
import SocketProvider from 'contexts/SocketProvider';
import Room from 'pages/Room';
import { useNavigate, useParams } from 'react-router-dom';

const SocketLayout = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }
  }, [id, navigate]);

  return (
    <SocketProvider slug={id as string}>
      <Room />
    </SocketProvider>
  );
};

export default SocketLayout;
