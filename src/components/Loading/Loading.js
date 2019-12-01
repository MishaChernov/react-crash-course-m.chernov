import React from 'react';

import './Loading.css';

function Loading() {
  return (
    <div className="lds-css ng-scope">
      <div style={{width:'100%', height:'100%'}} className="lds-ball">
        <div></div>
      </div>
    </div>
  );
}

export default Loading;