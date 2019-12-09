import React, {useState, useEffect} from 'react';
import Error from '../Error';
import Profile from '../Profile';
import Loading from '../Loading';

import './App.css';

const useDataApi = (calls) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [count, setCounts] = useState(calls);
  const [signal, setSignal] = useState({});
  const [url, setUrl] = useState('https://randomuser.me/api/');

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      setIsInterrupted(false);
      setData(null);

      await fetch(url, signal)
        .then(result => result.json())
        .then(result => {
          setData(result.results[0]);
        })
        .catch(error =>  {
          if(error.name === 'AbortError') {
            setIsInterrupted(true);
            console.error(error);
            return;
          } 
          setIsError(true);
        })
    }
    fetchData();
  }, [count]);

  return [{ data, isLoading, isError, isInterrupted }, setCounts, setSignal];
};

export default function App() {
  let _abortController = {};
  const [count, setCount] = useState(0);
  const [{ data, isLoading, isError, isInterrupted }, setCounts, setSignal] = useDataApi(count);

  useEffect(() => {
    setCounts(count);

    return () => {
      _abortController = new AbortController();
      _abortController.abort();
      setSignal(_abortController.abort());
    };
  }, [count, data])

  function handleAbortRequest() {
    _abortController = new AbortController();
    _abortController.abort();
    setSignal(_abortController.abort());
  }

  if(isError) {
    return <Error/>;
  }
  
  return (
    <div className="app">
      <div className="app__buttons">
        <button className="app__button" onClick={() => setCount(count + 1)}>Random User</button>
        {!isInterrupted && 
          <button className="app__button" 
            disabled={!isLoading} onClick={handleAbortRequest}>Break connection</button>}
      </div>
      {isLoading && !data ? <Loading/> : <Profile response={data}/>}
    </div>
  );
}
