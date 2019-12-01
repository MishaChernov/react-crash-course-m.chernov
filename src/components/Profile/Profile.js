import React from 'react';

import './Profile.css';

export default class Profile extends React.Component {
  state = {
    user: {
      name: null,
      gender: null,
      email: null,
      age: null,
      picture: null
    }
  }

  componentDidMount() {
    const res = JSON.parse(this.props.response);

    if(res) {
      this.setState({
        user: {
          name: `${res.name.first} ${res.name.last}`,
          gender: res.name.title,
          email: res.email,
          age: res.dob.age,
          picture: res.picture.large
        }
      })
    }
  }

  render() {
    const { name, email, age, picture, gender } = this.state.user;

    return (
      <section className="profile">
        <img className="profile__image" 
          src={picture} 
          alt={`On the picture is beautiful ${gender} ${name}`}
          title={`On the picture is beautiful ${gender} ${name}`}/>
        <h3 className="profile__name">{name} {age}</h3>
        <p className="profile__email">{email}</p>
      </section>
    )
  }
}