import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class Home extends Component {
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
      <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{display:'flex',flexDirection:'row',marginLeft:window.innerWidth/1.5}}>
          <h3 style={{marginRight:50}}>courses</h3>
          <h3 style={{marginRight:50}}>posts</h3>
          <h3 style={{marginRight:50}}>team</h3>
          <h3 style={{marginRight:50}}>about</h3>
        </div>
        <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center',marginTop:80}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cyann</h2>
        </div>
        <p className="App-intro">
          Home Page
        </p>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:"center"}}>
          <input style={{margin:20}} type="text" value={this.state.userName} onChange={this.setUserName.bind(this)}/>
          <input style={{margin:20}} type="text" value={this.state.password} onChange={this.setPassword.bind(this)}/>
        </div>
        <button>click</button>
      </div>
    );
  }
}

export default Home;
