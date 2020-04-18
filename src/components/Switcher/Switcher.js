import React from 'react';
import {connect} from 'react-redux';
import {changeTheme} from '../Redux/Reducer';
import './Switcher.css';

function Switcher(props) {

  function handleChecked(e) {

    if(e.target.checked) {
      props.changeTheme('dark');
    } else {
      props.changeTheme('light');
    }
  }

  return (
    <section className="switcher">
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

export default connect(mapStateToProps, {changeTheme})(Switcher);