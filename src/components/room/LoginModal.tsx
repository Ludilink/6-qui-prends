import React, {useState} from "react";
import InputText from "../global/InputText";
import Button from "../homepage/Button";
import useUser from "../../hooks/useUser";

const LoginModal: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const { logIn } = useUser();

  const handleLoginClick = async (): Promise<void> => {
    await logIn(username);
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