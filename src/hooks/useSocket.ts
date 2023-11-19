import { useContext } from 'react';
import { SocketContext } from 'contexts/SocketProvider';

const useSocket = () => {
  const [{ socket }] = useContext(SocketContext);

  return socket;
};

export default useSocket;
