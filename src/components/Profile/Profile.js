import React, {useEffect, useState, useContext, Suspense} from 'react';

import withTheme, {themes} from '../withTheme/withTheme.js';
import './Profile.css';

export default function Profile(props) {
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [picture, setPicture] = useState(null);
  const theme = useContext(withTheme);

  useEffect(() => {
    const res = props.response;

    if(res) {
      setName(`${res.name.first} ${res.name.last}`);
      setGender(res.name.title);
      setEmail(res.email);
      setAge(res.dob.age);
      setPicture(res.picture.large);
    }

  }, [props.response]);

  return (
    <section className="profile">
      <div className="profile__image-placeholder">
        <img className="profile__image" 
        src={picture}
        alt={`On the picture is beautiful ${gender} ${name}`}
        title={`On the picture is beautiful ${gender} ${name}`}
        style={{boxShadow: `5px 5px 10px 0 ${themes[theme].imageShadow}`}}/>
      </div>
      <h3 className="profile__name">{name} {age}</h3>
      <p className="profile__email">{email}</p>
    </section>
  )
}