import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router';
import '../css/App.css';
 
import iphone from '../../picture/iphone.png';

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
    console.log("asdf")
  }
  setPassword(event){
    this.setState({password:event.target.value})
  }
    
 
    
  render() {
    return (
      <div style={{display:'absolute'}}>
        <div style={{display:'flex',flexDirection:'row',marginLeft:window.innerWidth/1.5,marginTop:20}}>
          <Link style={{marginRight:50}} to="/courses">courses</Link>
          <Link style={{marginRight:50}} to="/team">team</Link>
          <Link to="/about">about</Link>
        </div>
        <div style={{display:'absolute',position:'absolute',top:180,left:60}}>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p id="welcome"> Cyann </p>
        <p id="m1">Welcom to Cyann webpage!</p>
        <p id="m2">Cyann is a free online forum where students can..</p>
        
        <div>
            <img src={iphone} id="iphone1" width={197} height={390}/>
            <img src={iphone} id="iphone2" width={197} height={390}/>
        </div>
            
        <button id="student_login" onclick="document.getElementById('id01').style.display='block'">Student Login here</button>
            
        <button id="prof_login" onclick="document.getElementById('id01').style.display='block'">Professor Login here</button>
            
            
            
            

            
            
      </div>
            
            
    );
  }
}

export default Home;
