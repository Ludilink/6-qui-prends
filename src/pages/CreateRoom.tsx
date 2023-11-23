
import React, {useContext, useState} from 'react';
import InputText from "../components/global/InputText";
import Button from "../components/homepage/Button";
import {UserContext} from "../contexts/UserProvider";
import {RoomOptions} from "../types/RoomOptions";
import redis from "../config/redis";
import {useNavigate} from "react-router-dom";

const CreateRoom: React.FC = () => {
  const [{ user }] = useContext(UserContext);
  const [error, setError] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const navigate = useNavigate();

  const createRoom = async () => {
    const obj: RoomOptions = {
      maxPlayers: 8,
      host: {
        username: pseudo,
        socketId: null
      }
    };
    redis.createRoom(obj).then((res) => {
      navigate(`/room/${res.slug}`);
    }).catch((err) => {
      setError(err.message);
      console.error(err);
    });
  }

  const joinRoomClick = async (): Promise<void> => {
    if (user === undefined) {
      setError('Vous devez être connecté pour rejoindre une partie');
      return;
    }
    navigate(`/room/${room}`);
  };

  return (
    <div className="create-room-container">
      {error !== '' && <p>{error}</p>}
      <InputText placeholder="Pseudo" label="Entrez votre Pseudo" onChange={(event) => { setPseudo(event.target.value)}} value={pseudo}/>
      <div className="button-container" onClick={() => {
        void (async () => {
          await createRoom();
        })();
      }}>
        <Button text="Creez une partie"/>
      </div>
      <InputText placeholder="xxx-xxx-xxx" label="Nom du salon" onChange={(event) => { setRoom(event.target.value)}} value={room}/>
      <div className="button-container" onClick={() => {
        void (async () => {
          await joinRoomClick();
        })();
      }}>
        <Button text="Rejoindre une partie"/>
      </div>
    </div>
  );
};

export default CreateRoom;
