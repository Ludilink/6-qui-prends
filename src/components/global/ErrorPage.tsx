import React from "react";
import {ClimbingBoxLoader} from "react-spinners";

interface Props {
  message: string
}

const ErrorPage: React.FC<Props> = ({ message}) => {
  return (
    <div className="loader">
    <ClimbingBoxLoader
      color="#ffffff"
      size={30}
    />
    <div className="loader-error">
      {message !== '' && (
        <p>{message}</p>
      )}
      {message === '' && (
        <p>Chargement en cours ...</p>
      )}
    </div>
  </div>
  )
}

export default ErrorPage