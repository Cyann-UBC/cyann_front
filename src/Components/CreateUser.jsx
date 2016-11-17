import React, { Component } from 'react';
import { Link } from 'react-router';
import '../css/Home.css';

import logo from '../logo.svg';
import FacebookLogin from 'react-facebook-login';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "Seriously?",
      userName:"",
      password:"",
      name:"",
      authenticated:false
    }
  }
  componentWillMount(){
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=959862910786642";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  componentDidMount(){
  }

  render(){
    // this.setState({name:response.name});
    return (
      <div id="overall">

        <div id="logo_div">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div id="message_div">
          <p id="m" style={{fontSize:"45"}}>Cyann</p>
          <p id="m" style={{fontSize:"25"}}>Welcome to Cyann Web!</p>
          <p id="m">Cyann is the learning forum for the new generation.<br/>
                    Make your learning and teaching more interactive.<br/>
                    Make your ideas heard.<br/></p>
        </div>

        <div id="form_div>">
          <p id="m" style={{fontSize:"35"}}>You are steps away from the best learning experiences!</p>
        </div>
      </div>

    )
  }
}

export default CreateUser;
