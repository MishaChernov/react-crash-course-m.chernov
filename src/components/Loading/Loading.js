import React, {useContext} from 'react';
import {connect} from 'react-redux';

import './Loading.css';
import Themes from '../Themes';

function Loading(props) {
  const {theme} = props;
  const color = Themes[theme].foreground;

  return (
    <div className="lds-css ng-scope">
      <div style={{width:'100%', height:'100%'}} className="lds-ball">
        <div style={{backgroundColor: color}}></div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(Loading);