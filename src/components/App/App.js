import React, {useState, useEffect, useRef} from 'react';
import Error from '../Error';
import Profile from '../Profile';
import Loading from '../Loading';
import Buttons from '../Buttons';
import Switcher from '../Switcher';

import './App.css';

import withTheme, {themes} from '../withTheme/withTheme';

// const withTheme = React.createContext('dark');

export default function App() {
  const [theme, setTheme] = useState('light');
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
      <Switcher setTheme={setTheme}/>

      <withTheme.Provider value={theme}>
        <div className="app container" style={{backgroundColor: themes[theme].background,
                                               color: themes[theme].foreground}}>
          {isError && 
          <Error message={errorMessage} />}

          <Buttons
            isLoading={isLoading} 
            isAborted={isAborted}
            setIsAborted={setIsAborted}
            countOfClicks={countOfClicks}
            setCountOfClicks={setCountOfClicks}/>

          {isLoading || isAborted ? 
          <Loading/> : <Profile response={data} />}
        </div>
      </withTheme.Provider>
    </>
  );
}
