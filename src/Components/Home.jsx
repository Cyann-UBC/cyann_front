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
      authenticated:false,
      username:""
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
  responseFacebook = (response) => {
    console.log(response);
    if (response.status === "unknown")
      this.setState({authenticated:false});
    else
      this.setState({authenticated:true, username:response.name});
  }
  render(){
    var login_div, access_div;
    if (this.state.authenticated) {
      login_div = <div id="au_link">
                    <button id="course_link"><Link style={{color:"white"}} to="/courses">Start with your Courses >></Link></button>
                    <button id="course_link" style={{top:20}}><Link style={{color:"white"}} to="/about">Start with your Profile >></Link></button>
                  </div>;
      access_div = <div id="ac_div"><p>Hello, {this.state.name}</p>
                     <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
                   </div>;
    }else {
      login_div = <div id="au_link">
                    <FacebookLogin
                      appId="959862910786642"
                      autoLoad
                      callback={this.responseFacebook}
                      icon="fa-facebook"/>
                  </div>;
      access_div = <div></div>;
    };

    return (
      <div id="overall">

        {access_div}
        <div id="logo_div">
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <section id="intro_message">
          <h1 id="m" style={{fontSize:45}}>Cyann</h1>
          <p id="m">Welcome to Cyann Web!<br/>
                    Cyann is the learning forum for the new generation.<br/>
                    Make your learning and teaching more interactive.<br/>
                    Make your ideas heard.<br/></p>
        </section>

        {login_div}

        <button id="course_link" style={{top:520,left:200}}>
          <Link to="/CreateUser" style={{color:"white"}}>New User >></Link>
        </button>

          <img src={iphone} id="iphone1" width={197} height={390}/>
          <img src={iphone} id="iphone2" width={197} height={390}/>
        </div>
    );
  }
}
export default Home;
