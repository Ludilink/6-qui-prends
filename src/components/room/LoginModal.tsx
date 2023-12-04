import React, {useContext, useState} from "react";
import InputText from "../global/InputText";
import Button from "../homepage/Button";
import useUser from "../../hooks/useUser";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../contexts/UserProvider";

const LoginModal: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const { logIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const [state] = useContext(UserContext);


  const handleLoginClick = async (): Promise<void> => {
    logIn(username).then(() => {
      setIsModalOpen(false);
    });
  }

  if (!isModalOpen || state.user !== undefined) {
    return null;
  }

  return (
    <div className="login-modal">
      <InputText placeholder="Pseudo" label="Entrez votre Pseudo" onChange={(event) => {
        setUsername(event.target.value)
      }} value={username}/>
      <div className="button-container" onClick={() => {
        void (async () => {
          if (username.trim().length !== 0) {
            await handleLoginClick();
          }
        })();
      }}>
        <Button text={"Se connecter"} username={username}/>
      </div>
    </div>
  );
};

export default LoginModal;