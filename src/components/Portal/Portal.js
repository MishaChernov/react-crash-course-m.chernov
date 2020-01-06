import React from 'react';
import ReactDOM from 'react-dom';

export default function Portal(props) {
  return(
    <>
      {ReactDOM.createPortal(props.children, document.getElementById('portal'))}
    </>
  )
}