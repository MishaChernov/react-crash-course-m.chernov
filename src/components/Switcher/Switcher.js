import React, {useState, useEffect, ReactDOM} from 'react';
import {connect} from 'react-redux';
import {appReducer, changeTheme} from '../Redux/Reducer';

import './Switcher.css';

function Switcher(props) {
  const [isChecked, setIsChecked] = useState(false);
  const {theme} = props;

  function handleChecked(e) {
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    if(isChecked) {
      props.dispatch(changeTheme('dark'));
    } else {
      props.dispatch(changeTheme('light'));
    }
  }, [isChecked])

  return (
    <section className="switcher">
      {theme}
      <input className="switcher__control  hidden" id="switcher-control" type="checkbox" name="switcher" defaultChecked={false} onChange={handleChecked}/>

      <label className="switcher__label" htmlFor="switcher-control">
        <span className="switcher__item switcher__item--light">Light</span>
        <span className="switcher__item switcher__item--dark">Dark</span>
      </label>
    </section>
  )
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(Switcher);