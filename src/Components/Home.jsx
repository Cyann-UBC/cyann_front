import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import '../css/Home.css';

import iphone from '../../picture/iphone.png';
import FacebookLogin from 'react-facebook-login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated:false,
      is_student:false,
      is_instructor:false,
      user_name:"",
      user_id:"",
      user_email:"",
      user_accessToken:"",
      user_tokenExpire:"",
      user_picture:"",
      showModal:false,
      jwt:"9",
    }
  }
  componentWillMount(){
    // (function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=959862910786642";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));
  }
  responseFacebook = (response) => {
    // console.log(response);
    if (response.status === "unknown")
      this.setState({authenticated:false});
    else {
      this.setState({
        authenticated:true,
        user_name:response.name,
        user_id:response.id,
        user_email:response.email,
        user_tokenExpire:response.expiresIn,
        user_accessToken:response.accessToken,
        user_picture:response.picture.data.url,
        showModal:true});
      var result = response;
      console.log(result);
      // console.log(this.state.user_name);
      // console.log(this.state.user_id);
      // console.log(this.state.user_email);
      // console.log(this.state.user_accessToken);
      // console.log(this.state.user_expiresin);
      // console.log(this.state.user_picture);
      console.log('is_student = ' + this.state.is_student);
      console.log('is_instructor = ' + this.state.is_instructor);
      this.retreiveJWT(result);
    }
  }
  FbResponseStudent = (response) => {
    this.setState({is_student:true,is_instructor:false});
    this.responseFacebook(response);
  }
  FbResponseInstructor = (response) => {
    this.setState({is_student:false,is_instructor:true});
    this.responseFacebook(response);
  }
  close=()=> {
    this.setState({showModal:false});
  }

  open() {
    this.setState({showModal:true});
  }
  retreiveJWT(result){
    // console.warn(this.state.access_token)
    var body = {
    'userType': '',
    'socialToken': result.accessToken,
    'email':result.email,
    'profileImg':result.picture.data.url
    }

    if (this.state.is_student && !this.state.is_instructor)
      body.userType = 'Student';
    else if (!this.state.is_student && this.state.is_instructor)
      body.userType = 'Instructor';
    else
      body.userType = 'Unknown';

    var formBody = []
    // console.warn(JSON.stringify(body))
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var a = [];

    fetch('http://localhost:8080/api/users/register',{method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'},body:formBody})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({jwt:responseData.data.token});
      console.log(this.state.jwt);
      // console.log(responseData);
      // Actions.courseList({jwt:responseData})
    })
  }
  render(){
    const tooltip_coursePage = (
      <Tooltip id="tooltip">A page with a list of courses you registered.</Tooltip>
    );
    const tooltip_profilePage = (
      <Tooltip id="tooltip"><strong>Check your history</strong>, and <strong>register new courses</strong> on this page.</Tooltip>
    );

    return (
      <div id="overall">
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
        <div id="au_link">
          <div style={{padding:5}}><FacebookLogin
            appId="959862910786642"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.FbResponseStudent}
            size="metro"
            icon="fa-facebook"
            textButton="Login as Student"
          /></div>

          <div style={{padding:5}}><FacebookLogin
            appId="959862910786642"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.FbResponseInstructor}
            size="metro"
            style={{width:200}}
            icon="fa-facebook"
            textButton="Login as Instructor"
          /></div>
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.close}
          backdrop='static'
          bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Hello, {this.state.user_name} !</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <OverlayTrigger placement="bottom" overlay={tooltip_coursePage}>
              <Button bsSize="large"><Link to="/courses">Go to Courses</Link></Button>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={tooltip_profilePage}>
              <Button bsSize="large">Go to Profile</Button>
            </OverlayTrigger>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* <button id="course_link" style={{top:520,left:200}}>
          <Link to="/CreateUser" style={{color:"white"}}>New User >></Link>
        </button> */}

          <img src={iphone} id="iphone1" width={197} height={390}/>
          <img src={iphone} id="iphone2" width={197} height={390}/>
      </div>
    );
  }
}
export default Home;
