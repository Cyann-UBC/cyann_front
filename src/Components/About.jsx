import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "Howdy dere",
      userName:"",
      password:"",
    }
  }

  setUserName(event){
    this.setState({userName:"event.target.value"})
  }
  setPassword(event){
    this.setState({password:event.target.value})
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          About Page
        </p>
        <div>
          <input type="text" value={this.state.userName} onChange={this.setUserName.bind(this)}/>
          <input type="text" value={this.state.password} onChange={this.setPassword.bind(this)}/>
        </div>
        <button>click</button>
      </div>
    );
  }
}

export default About;
