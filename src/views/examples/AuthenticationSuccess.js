import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function useTimer(time, onTimerEnd) {
  const [timeLeft, setTimeLeft] = useState(time);
  
  useEffect(
    () => {
      if(timeLeft !== 0)
        setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      else
        onTimerEnd();
    },
    [timeLeft, onTimerEnd]
  );

  return timeLeft;
}

const AuthenticationSuccess = () => {
  const history = useHistory();

  const timeLeft = useTimer(5, () => history.push("/admin"));

  return (
    <div className="main-content vh-100">      
      <div className="bg-gradient-info h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-white">Authentication Success!</h1>
        <p className="text-lead text-light">
          Redirecting to dashboard in {timeLeft} seconds...
        </p>
      </div>
    </div>
  );
};

export default AuthenticationSuccess;