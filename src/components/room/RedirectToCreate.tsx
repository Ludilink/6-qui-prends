import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ErrorPage from "../global/ErrorPage";

const RedirectToCreate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/room/create');
  }, [navigate]);

  return (
    <ErrorPage message={''} />
  )
}

export default RedirectToCreate;