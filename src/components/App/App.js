import React from 'react';
import Error from '../Error';
import Profile from '../Profile';
import Loading from '../Loading';

import './App.css';

export default class App extends React.Component {
  _abortController = {};

  state = {
    result: null,
    loading: false,
    error: null,
    hasError: false,
    isInterrupted: false
  }

  getResponse = async (url, signal) => {
    return await fetch(url, { signal }).then(res => res.json())
  }

  getRandomUser = () => {
    this.setState({
      loading: true,
      result: null,
      isInterrupted: false
    });

    this._abortController = new AbortController();

    this.getResponse('https://randomuser.me/api/', this._abortController.signal)
      .then((result) => {
        if (this.state.loading) {
          this.setState({
            result: JSON.stringify(result.results[0]),
            loading: false
          })
        }
      })
      .catch(err => {
        if(err.name === 'AbortError') {
          this.setState({
            isInterrupted: true
          })
          console.error(err);
          return;
        };

        this.setState({
          error: err,
          hasError: true
        })
      })
  }

  componentDidMount() {
    this.getRandomUser(this._abortController.signal);
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    })
  }

  render() {
    if(this.state.hasError) {
			return <Error/>;
    }
    
    const { result, loading, isInterrupted } = this.state;

    return (
      <div className="app">
        <div className="app__buttons">
          <button className="app__button" onClick={this.getRandomUser}>Random User</button>
          {!isInterrupted && 
            <button className="app__button" 
              onClick={() => this._abortController.abort()}
              disabled={!loading}>Break connection</button>}
        </div>
        {loading && !result ? <Loading/> : <Profile response={result}/>}
      </div>
    );
  }
}
