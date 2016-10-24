import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router';
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
          <li style={{marginRight:50}}><Link to="/courses">courses</Link></li>
          <li style={{marginRight:50}}><Link to="/team">team</Link></li>
          <li ><Link to="/about">about</Link></li>
        </div>
        <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center',marginTop:80}}>
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Cyann</h2>
        </div>
        <p className="App-intro">
          Home Page
        </p>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:"center"}}>
          <input style={{margin:20,width:300,height:45}} type="text" value={this.state.userName} onChange={this.setUserName.bind(this)}/>
          <input style={{margin:20,width:300,height:45}} type="text" value={this.state.password} onChange={this.setPassword.bind(this)}/>
        </div>
        <button>click</button>
      </div>
    );
  }
}

export default Home;
