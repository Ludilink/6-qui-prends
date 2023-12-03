import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useSocket from "../hooks/useSocket";
import {UserRoom} from "../types/user/UserRoom";
import {Card} from "../types/cards/Card";
import UsersInRoom from "../components/room/UsersInRoom";
import MessagesList from "../components/messages/MessagesList";
import {Board} from "../types/game/Board";
import {Deck} from "../components/deck/Deck";
import BoardCards from "../components/board/Board";
import {GameStatus} from "../types/game/GameStatus";
import Classement from "../components/win/Classement";
import ErrorPage from "../components/global/ErrorPage";
import useUser from "../hooks/useUser";

const Room: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logOut } = useUser();
  const socket = useSocket();
  const [members, setMembers] = useState<UserRoom[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.UNSTARTED);
  const [myUser, setMyUser] = useState<UserRoom | undefined>(undefined);
  const [cards, setCards] = useState<Card[]>([]);
  const [board, setBoard] = useState<Board | undefined>(undefined);
  const [playerHasToPlay, setPlayerHasToPlay] = useState<UserRoom | undefined>(undefined);
  const [winners, setWinners] = useState<UserRoom[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const startGame = () => {
    socket?.emitWithAck('startGame', id).then((response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('error from startGame : ', response.error);
        setErrorMessage(response.error);
        setTimeout(() => {
          navigate('/room/create');
        }, 3000);
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  const leaveRoom = () => {
    socket?.emitWithAck('quitRoom').then((response: any): void => {
      if (response.hasOwnProperty('error')) {
        console.log('error from leaveRoom : ', response.error);
        setErrorMessage(response.error);
        setTimeout(() => {
          navigate('/room/create');
        }, 3000);
        return;
      }
      logOut();
      navigate('/room/create');
    }).catch((err) => {
      console.error(err);
    });
  }

  useEffect(() => {
    if (id === undefined) {
      navigate('/');
    }

    socket?.on('connect', () => {
      socket?.emitWithAck('joinRoom', id).then((response: any) => {
        if (response.hasOwnProperty('error')) {
          console.log('error from joinRoom : ', response.error);
          setErrorMessage(response.error);
          setTimeout(() => {
            navigate('/room/create');
          }, 3000);
        } else {
          setGameStatus(response.gameStatus);
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
      setGameStatus(GameStatus.STARTED);
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

    socket?.on('winners', (winners: UserRoom[]) => {
      console.log('[Room] winners updated ! : ', winners);
      setWinners(winners);
      setGameStatus(GameStatus.END_GAME);
    });

    return () => {
      socket?.off('connect');
      socket?.off('members');
      socket?.off('gameStarted');
      socket?.off('cards');
      socket?.off('cardPlayed');
      socket?.off('disconnect');
      socket?.off('playerHasToPlay');
      socket?.off('winners');
    };
  }, [id, navigate, playerHasToPlay, socket]);

  if (socket === undefined || !socket.connected || errorMessage !== '') {
    return (
      <ErrorPage message={errorMessage} />
    );
  }

  if (gameStatus === GameStatus.UNSTARTED) {
    return (
    <>
      <UsersInRoom members={members} number={members.length} gameStatus={gameStatus}/>

      <div className='start-modal'>
        {myUser?.isHost ? (
          members.length < 2 ? (
            <div>
              <p>En attente de joueurs ...</p>
              <p>Il faut être au moins 2 joueurs pour lancer la partie !</p>
              <button onClick={leaveRoom}>Quitter la partie</button>
              <button className={members.length < 2 ? 'disabled' : ''} onClick={startGame}>Lancer la partie</button>
            </div>
          ) : (
            <div>
              <p>En attente de lancement de la partie ...</p>
              <button onClick={leaveRoom}>Quitter la partie</button>
              <button className={members.length < 2 ? 'disabled' : ''} onClick={startGame}>Lancer la partie</button>
            </div>
          )
        ) : (
          <div>
            <p>En attente de lancement de la partie ...</p>
            <button onClick={leaveRoom}>Quitter la partie</button>
          </div>
        )}
      </div>

      <MessagesList/>
    </>
    );
  } else {
    return (
      <>
        <UsersInRoom members={members} number={members.length} gameStatus={gameStatus}/>

        {myUser?.hasToPlay && (
          <div className='player-to-play'>
            <p>Choisis ta carte</p>
          </div>
        )}

        {playerHasToPlay?.userId === myUser?.userId && (
          <div className='player-to-play'>
            <p>Tu dois choisir le slot a remplacer</p>
          </div>
        )}

        {gameStatus === GameStatus.END_GAME && (
          <Classement members={winners} />
        )}

        <BoardCards board={board} />

        <Deck cards={cards} setCards={setCards} />

        <MessagesList/>
      </>
    );
  }
};

export default Room;
