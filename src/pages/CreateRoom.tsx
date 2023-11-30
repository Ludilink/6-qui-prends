
import React, {useState} from 'react';
import InputText from "../components/global/InputText";
import Button from "../components/homepage/Button";
import {RoomOptions} from "../types/RoomOptions";
import redis from "../config/redis";
import {useNavigate} from "react-router-dom";
import useUser from "../hooks/useUser";
import JoinButton from "../components/homepage/JoinButton";

const CreateRoom: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [pseudo, setPseudo] = useState<string>('');
  const navigate = useNavigate();
  const { logIn } = useUser();

  const createRoom = async () => {
    let user = await logIn(pseudo);
    const obj: RoomOptions = {
      maxPlayers: 8,
      host: {
        userId: user.id,
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
    await logIn(pseudo);
    navigate(`/room/${room}`);
  };

  return (
    <div className="create-room-container">
      {error !== '' && <p>{error}</p>}
      <InputText placeholder="Pseudo" label="Entrez votre Pseudo" onChange={(event) => { setPseudo(event.target.value)}} value={pseudo}/>
      <div className="button-container" onClick={() => {
        void (async () => {
          if (pseudo.trim().length !== 0) {
            await createRoom();
          }
        })();
      }}>
        <Button text="Creez une partie" username={pseudo}/>
      </div>
      <InputText placeholder="xxx-xxx-xxx" label="Nom du salon" onChange={(event) => { setRoom(event.target.value)}} value={room}/>
      <div className="button-container" onClick={() => {
        void (async () => {
          if (pseudo.trim().length !== 0 && room.trim().length !== 0 && /[a-zA-Z]+-[a-zA-Z]+-[a-zA-Z]+/.test(room)) {
            await joinRoomClick();
          }
        })();
      }}>
        <JoinButton text="Rejoindre une partie" username={pseudo} room={room}/>
      </div>
    </div>
  );
};

export default CreateRoom;
