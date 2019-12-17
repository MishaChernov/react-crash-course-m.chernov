import React from 'react';

import {ReactComponent as ErrorIcon} from './Error.svg';
import './Error.css';

function Error(props) {
  return (
    <div className="error">
      <ErrorIcon/>
      <h1>{props.message}</h1>
    </div>
  )
}

export default Error;