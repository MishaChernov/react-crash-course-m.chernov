import React, {useState, useEffect, useRef} from 'react';
import Error from '../Error';
import Profile from '../Profile';
import Loading from '../Loading';
import Buttons from '../Buttons';

import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong...');
  const [isAborted, setIsAborted] = useState(false);
  const [signal, setSignal] = useState({});
  const [countOfClicks, setCountOfClicks] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    setSignal(signal);
    setIsLoading(true);
    setIsError(false);

    if(isAborted) {
      controller.abort();
    }

    const fetchData = async () => {
      fetch('https://randomuser.me/api/', {signal})
        .then(result => result.json())
        .then(result => {
          setIsLoading(false);
          setData(result.results[0]);
          return result.results[0];
        })
        .catch(err => {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted');
            setErrorMessage('Request aborted');
          } else {
            console.error('Uh oh, an error!', err);
          }
          setIsError(true)
        })
    }

    fetchData();

    return () => {
      controller.abort();
      setData(null);
    }
  }, [countOfClicks, isAborted]);
  
  return (
    <>
      {isError && <Error message={errorMessage}/>}
      <div className="app">
        <Buttons
          isLoading={isLoading} 
          isAborted={isAborted}
          setIsAborted={setIsAborted}
          countOfClicks={countOfClicks}
          setCountOfClicks={setCountOfClicks}/>
        {isLoading || isAborted ? <Loading/> : <Profile response={data}/>}
      </div>
    </>
  );
}
