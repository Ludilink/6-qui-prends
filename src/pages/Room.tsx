import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useSocket from "../hooks/useSocket";
import {UserRoom} from "../types/user/UserRoom";
import {Card} from "../types/cards/Card";
import UsersInRoom from "../components/room/UsersInRoom";
import MessagesList from "../components/messages/MessagesList";
import {Board} from "../types/game/Board";
import {Deck} from "../components/deck/Deck";
import {CardItem} from "../components/deck/CardItem";
import BoardCards from "../components/board/Board";
const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);
  const [gameIsStarted, setGameIsStarted] = useState<boolean>(false);
  const [myUser, setMyUser] = useState<UserRoom | undefined>(undefined);
  const [cards, setCards] = useState<Card[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [playerHasToPlay, setPlayerHasToPlay] = useState<UserRoom | undefined>(undefined);

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

    socket?.on('board', (newBoard: Board) => {
      console.log('[Room] board updated ! : ', newBoard);
      setBoard(newBoard);
    });

    socket?.on('disconnect', () => {
      socket?.emit('leaveRoom', id);
      socket?.disconnect();
    });

    socket?.on('playerHasToPlay', (user: UserRoom) => {
      console.log('[Room] playerHasToPlay updated ! : ', playerHasToPlay);
      setPlayerHasToPlay(user);
    });

    return () => {
      socket?.off('connect');
      socket?.off('members');
      socket?.off('gameStarted');
      socket?.off('cards');
      socket?.off('cardPlayed');
      socket?.off('disconnect');
      socket?.off('playerHasToPlay');
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
    <>
      <UsersInRoom members={members} number={members.length} gameIsStarted={gameIsStarted}/>

      {myUser?.isHost && (
        <div className='start-modal'>
          {members.length < 2 && (
            <div>
              <p>En attente de joueurs ...</p>
              <p>Il faut être au moins 2 joueurs pour lancer la partie !</p>
            </div>
          )}
          <button className={members.length < 2 ? 'disabled' : ''} onClick={startGame}>Lancer la partie</button>
        </div>
      )}
      {!myUser?.isHost && (
        <div className='start-modal'>
          <p>En attente de lancement de la partie ...</p>
        </div>
      )}

      <MessagesList/>
    </>
    );
  } else {
    return (
      <>
        <UsersInRoom members={members} number={members.length} gameIsStarted={gameIsStarted}/>

        {myUser?.hasToPlay && (
          <div className='player-to-play'>
            <p>Choisis ta carte</p>
          </div>
        )}

        {playerHasToPlay?.userId == myUser?.userId && (
          <div className='player-to-play'>
            <p>Tu dois choisir le slot a remplacer</p>
          </div>
        )}

        <BoardCards board={board} />

        <Deck cards={cards} />

        <MessagesList/>
      </>
    );
  }
};

export default Room;
