import React from 'react';

import {ReactComponent as ErrorIcon} from './Error.svg';
import './Error.css';

function Error() {
  return (
    <div className="error">
      <ErrorIcon/>
      <h1>Something went wrong...</h1>
    </div>
  )
}

export default Error;