import React, {useContext} from 'react';

import './Loading.css';
import withTheme, {themes} from '../withTheme/withTheme.js';

function Loading() {
  const theme = useContext(withTheme);

  return (
    <div className="lds-css ng-scope">
      <div style={{width:'100%', height:'100%'}} className="lds-ball">
        <div style={{backgroundColor: themes[theme].foreground}}></div>
      </div>
    </div>
  );
}

export default Loading;