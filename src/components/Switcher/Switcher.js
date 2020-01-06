import React, {useState, useEffect, ReactDOM} from 'react';

import './Switcher.css';

export default function Switcher(props) {
  const [isChecked, setIsChecked] = useState(false);

  function handleChecked(e) {
    setIsChecked(e.target.checked);
  }

  useEffect(() => {
    if(isChecked) {
      props.setTheme('dark');
    } else {
      props.setTheme('light');
    }
  }, [isChecked])

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