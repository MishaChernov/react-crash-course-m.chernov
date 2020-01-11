import React, {useRef, useEffect} from 'react';

import './Buttons.css';

export default function Buttons(props) {
  const {isLoading, 
        isAborted, setIsAborted, 
        countOfClicks, setCountOfClicks} = props;

  const breakButtonEl = useRef(null);
  const randomUserButtonEl = useRef(null);

  function handleGetRandomUser() {
    setCountOfClicks(countOfClicks + 1);
    setIsAborted(false);
    breakButtonEl.current.focus();
  }

  function handleAbortRequest() {
    setIsAborted(true);
    randomUserButtonEl.current.focus();
  }

  useEffect(() => {
    if(!isLoading) {
      randomUserButtonEl.current.focus();
    }
  }, [isLoading])

  return (
    <section className="buttons">
      <button className="buttons__btn" tabIndex={1} aria-disabled={!isAborted && isLoading} onClick={handleGetRandomUser} ref={randomUserButtonEl}>Random User</button>
      <button className="buttons__btn" tabIndex={2} aria-disabled={isAborted || !isLoading} onClick={handleAbortRequest} ref={breakButtonEl}>Break connection</button>
    </section>
  )
}