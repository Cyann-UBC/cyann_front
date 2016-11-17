import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router';
import '../css/Home.css';

import iphone from '../../picture/iphone.png';
import FacebookLogin from 'react-facebook-login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated:false
    }
  }
  componentWillMount(){

  }
  responseFacebook = (response) => {
    console.log(response);
    if (response.status === "unknown")
      this.setState({authenticated:false});
    else
      this.setState({authenticated:true});
  }
  authenication_link(){
    if(this.state.authenticated){
      return(
        <div id="au_link">
          <button id="course_link"><Link style={{color:"white"}} to="/courses">Start with your Courses >></Link></button>
          <button id="course_link" style={{top:20}}><Link style={{color:"white"}} to="/about">Start with your Profile >></Link></button>
        </div>
      )
    }
    else{
      return(
        <div id="au_link">
          <FacebookLogin
            appId="959862910786642"
            autoLoad
            callback={this.responseFacebook}
            icon="fa-facebook"/>
        </div>
      )
    }
  }
  render(){
    var login_div;
    if (this.state.authenticated)
      login_div = <div id="au_link">
                    <button id="course_link"><Link style={{color:"white"}} to="/courses">Start with your Courses >></Link></button>
                    <button id="course_link" style={{top:20}}><Link style={{color:"white"}} to="/about">Start with your Profile >></Link></button>
                    <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
                  </div>;
    else
      login_div = <div id="au_link">
                    <FacebookLogin
                      appId="959862910786642"
                      autoLoad
                      callback={this.responseFacebook}
                      icon="fa-facebook"/>
                  </div>;

    return (
      <div id="overall">
        <img src={logo} className="App-logo" alt="logo" />

        <p id="m">Cyann</p>
        <p id="m">Welcome to Cyann Web!</p>
        <p id="m">Cyann is the learning forum for the new generation.<br/>
                  Make your learning and teaching more interactive.<br/>
                  Make your ideas heard.<br/></p>
        {login_div}

        <button id="CreateUser_link">
          <Link to="/CreateUser" style={{color:"white"}}>New User >></Link>
        </button>

          <img src={iphone} id="iphone1" width={197} height={390}/>
          <img src={iphone} id="iphone2" width={197} height={390}/>
        </div>
    );
  }
}
export default Home;
