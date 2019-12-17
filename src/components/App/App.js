import React, {useState, useEffect} from 'react';
import Error from '../Error';
import Profile from '../Profile';
import Loading from '../Loading';

import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isAborted, setIsAborted] = useState(false);
  const [signal, setSignal] = useState({});
  const [countOfClicks, setCountOfClicks] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    
    setSignal(controller.signal);
    setIsLoading(true);
    setIsError(false);

    const fetchData = async () => {
      fetch('https://randomuser.me/api/', controller.signal)
        .then(result => result.json())
        .then(result => {
          setIsLoading(false);
          setData(result.results[0])
        })
        .catch(error => {
          if(error.name === 'AbortError') {
            console.error('User aborted the request...');
          }
          console.error(error);
          setIsError(true)
        })
    }

    fetchData();

    return () => {
      controller.abort();
      setData(null);
    }
  }, [countOfClicks, isAborted]);

  function handleGetRandomUser() {
    setCountOfClicks(countOfClicks + 1);
    setIsAborted(false);
  }

  function handleAbortRequest() {
    setIsAborted(true);
  }
  
  return (
    <>
      {isError && <Error/>}
      <div className="app">
        <div className="app__buttons">
          <button className="app__button" onClick={handleGetRandomUser}>Random User</button>
          {!isAborted && <button className="app__button" disabled={!isLoading} onClick={handleAbortRequest}>Break connection</button>}
        </div>
        {isLoading || isAborted ? <Loading/> : <Profile response={data}/>}
      </div>
    </>
  );
}
