import React, {useState, useEffect, useRef, lazy, Suspense} from 'react';
import Error from '../Error';
import Loading from '../Loading';
import Buttons from '../Buttons';
import Portal from '../Portal';
import Switcher from '../Switcher';

import store from '../Redux/Store';
import {Provider, connect} from 'react-redux';

import './App.css';
import Themes from '../Themes';
const Profile = lazy(() => import('../Profile'));

function App(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Something went wrong...');
  const [isAborted, setIsAborted] = useState(false);
  const [signal, setSignal] = useState({});
  const [countOfClicks, setCountOfClicks] = useState(0);
  const theme = 'light';

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
    console.log(store);

    return () => {
      controller.abort();
      setData(null);
    }
  }, [countOfClicks, isAborted]);
  
  return (
    <Provider store={store}>
      <Portal>
        <Switcher/>
      </Portal>

      <div className="app container" style={{backgroundColor: Themes[theme].background,
                                            color: Themes[theme].foreground}}>
        {isError && 
        <Error message={errorMessage}/>}

        <Buttons
          isLoading={isLoading} 
          isAborted={isAborted}
          setIsAborted={setIsAborted}
          countOfClicks={countOfClicks}
          setCountOfClicks={setCountOfClicks}/>

        <Suspense fallback={<Loading/>}>
          {!isLoading && !isAborted ? 
          <Profile response={data}/> : <Loading/>} 
        </Suspense>
      </div>
    </Provider>
  );
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  }
} 

export default connect(mapStateToProps)(App);