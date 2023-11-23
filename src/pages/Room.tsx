import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useSocket from "../hooks/useSocket";
import {UserRoom} from "../types/user/UserRoom";
import {Card} from "../types/cards/Card";
import UsersInRoom from "../components/room/UsersInRoom";
const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);
  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);
  const [myUser, setMyUser] = useState<UserRoom | undefined>(undefined);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);

  const startGame = () => {
    socket?.emitWithAck('startGame', id).then((response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('error from startGame : ', response.error);
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }

    socket?.on('connect', () => {
      socket?.emitWithAck('joinRoom', id).then((response: any) => {
        if (response.hasOwnProperty('error')) {
          console.log('error from joinRoom : ', response.error);
        } else {
          setGameIsStarted(response.gameIsStarted);
        }
      }).catch((err) => {
        console.error(err);
      });
    });

    socket?.on('members', (newMembers: UserRoom[]) => {
      setMembers(newMembers);
      console.log('myUser : ', newMembers.find((member) => member.socketId === socket?.id));
      setMyUser(newMembers.find((member) => member.socketId === socket?.id));
    });

    socket?.on('gameStarted', (value: boolean) => {
      setGameIsStarted(value);
    });

    socket?.on('cards', (newCards: Card[]) => {
      console.log('[Room] cards updated ! : ', newCards);
      setCards(newCards);
    });

    socket?.on('disconnect', () => {
      socket?.emit('leaveRoom', id);
      socket?.disconnect();
    });

    return () => {
      socket?.off('connect');
      socket?.off('members');
      socket?.off('gameStarted');
      socket?.off('cards');
      socket?.off('cardPlayed');
      socket?.off('disconnect');
    };
  }, []);

  if (socket === undefined || !socket.connected) {
    return (
      <div>
        <p>Connexion en cours...</p>
      </div>
    );
  }

  if (!gameIsStarted) {
    return (
      <UsersInRoom members={members} number={members.length} gameIsStarted={gameIsStarted}/>
    );
  } else {

  }

  return (
    <div>
      <p>Coucou</p>
    </div>
  );
};

export default Room;
