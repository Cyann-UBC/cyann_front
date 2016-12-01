import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link, browserHistory } from 'react-router';
import { Modal, Button, Tooltip, OverlayTrigger, Media, Image, Panel, Accordion, Tabs, Tab } from 'react-bootstrap';
import '../css/Home.css';
import logo from '../logo.svg';
import iphone from '../../picture/iphone.png';
import cyann_logo from '../../picture/cyann_logo.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_authenticated:false,
      user_type:"Student",
      user_name:"",
      user_id:"",
      user_email:"",
      user_accessToken:"",
      user_tokenExpire:"",
      user_picture:"",
      showModal:false,
      user_jwt:"",
      user_posts:[],
      post_render:true,
      user_comments:[],
      profile_open:false,
    }
  }
  componentWillMount(){
  }
  componentDidMount(){
  }
  FbResponse = (response) =>{
    if (response.status === "unknown")
      this.setState({
        user_authenticated:false,
      });
    else {
      this.setState({
        user_authenticated:false,
        user_name:response.name,
        user_id:response.id,
        user_email:response.email,
        user_picture:response.picture.data.url,
        showModal:true,
      });
      console.log(this.state.user_name);
      console.log(this.state.user_id);
      console.log(this.state.user_email);
      var result = response;
      this.retreiveJWT(result);
    }
  }
  retreiveJWT(result){
    var body = {
    'userType': this.state.user_type,
    'socialToken': result.accessToken,
    'email':result.email,
    'profileImg':result.picture.data.url
    }

    var formBody = []
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8080/api/users/register',{method:'POST',headers: {'Content-Type': 'application/x-www-form-urlencoded'},body:formBody})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({user_jwt:responseData.jwt});
      this.setState({user_type:responseData.userType});
      console.log(this.state.user_jwt);
      console.log(responseData);
      this.setState({user_authenticated:true});
    });
  }
  FbResponseStudent = (response) => {
    this.setState({user_type:"Student"});
    this.FbResponse(response);
  }
  FbResponseInstructor = (response) => {
    this.setState({user_type:"Instructor"});
    this.FbResponse(response);
  }
  getMyPosts(){
    console.log("------" + this.state.user_jwt);
    fetch('http://localhost:8080/api/users/my/posts',{method:'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.state.user_jwt
    }})
    .then((response) => response.json())
    .then((responseData) => {
      console.log(this.state.user_jwt);
      console.log(responseData);
      this.setState({user_posts:responseData});
    })

    fetch('http://localhost:8080/api/users/my/comments',{method:'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this.state.user_jwt
    }})
    .then((response) => response.json())
    .then((responseData) => {
      console.log(this.state.user_jwt);
      console.log(responseData);
      this.setState({post_render:false});
      this.setState({user_comments:responseData});
    })
  }
  close=()=> {
    this.setState({showModal:false});
  }
  open() {
    this.setState({showModal:true});
  }
  linkToCourses() {
    browserHistory.push('/courses');
  }
  linkToProfile() {
    browserHistory.push('/profile');
  }
  linkToProf() {
    browserHistory.push('/prof');
  }
  profile_panel(){
    return (
      <div style-={{margin:10}}>
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Posts History">
            <Accordion id="profile_list">
              {this.state.user_posts.map(function(post,i){
                var temp_header = post.course.name + ": " + post.title;
                return(
                  <Panel header={temp_header} bsStyle="primary" eventKey={i} id="history_unit">
                    {post.content}
                  </Panel>
                )
              },this)}
            </Accordion>
          </Tab>

          <Tab eventKey={2} title="Comments History">
            <Accordion id="profile_list">
              {this.state.user_comments.map(function(post,i){
                var temp_header = post.course.name + ": " + post.title;
                return(
                  <Panel header={temp_header} bsStyle="primary" eventKey={i} id="history_unit">
                    {post.content}
                  </Panel>
                )
              },this)}
            </Accordion>
          </Tab>
        </Tabs>
      </div>
    );
  }
  render(){
    const tooltip_coursePage = (
      <Tooltip id="tooltip">A page with a list of courses you registered.</Tooltip>
    );
    const tooltip_profilePage = (
      <Tooltip id="tooltip"><strong>Check your history</strong>, and <strong>register new courses</strong> on this page.</Tooltip>
    );

    var page_link = (this.state.user_type === "Instructor") ? (
      <OverlayTrigger placement="bottom" overlay={tooltip_coursePage}>
        <Button bsStyle="primary" bsSize="large" onClick={this.linkToProf}>Go to Prof's Courses</Button>
      </OverlayTrigger>) : (
      <OverlayTrigger placement="bottom" overlay={tooltip_coursePage}>
        <Button bsStyle="primary" bsSize="large" onClick={this.linkToCourses}>Go to Courses</Button>
      </OverlayTrigger>);

    var render_panel;
    if (this.state.user_authenticated){
      if (this.state.post_render) this.getMyPosts();
      render_panel = this.profile_panel();
    }
    else {
      render_panel = (
        <div>
          <h1 style={{color:'white'}}>Please Login first to see your Proflie.
          </h1>

          <div><FacebookLogin
            appId="959862910786642"
            autoLoad={false}
            fields="name,email,picture"
            callback={this.FbResponse}
            size="metro"
            icon="fa-facebook"/>
          </div>
        </div>
      );
    }

    return (
      <div id="overall">
        <div id="logo_div">
          <img src={cyann_logo} className="App-logo" alt="logo" />
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
            <img src={this.state.user_picture} style={{float:'left', padding:5, width:30, height:30}}/>
            <Modal.Title style={{float:'left'}}>Hello, {this.state.user_name} !</Modal.Title>
            <p style={{float:'right', margin:5}}>
            <i>  {this.state.user_type},   {this.state.user_email}</i></p>
          </Modal.Header>

          <Modal.Body>

            <OverlayTrigger placement="bottom" overlay={tooltip_profilePage}>
              <Button bsStyle="primary" bsSize="large"
                onClick={ ()=> this.setState({ profile_open: !this.state.profile_open })}>
                Check out Profile
              </Button>
            </OverlayTrigger>

            <Panel collapsible expanded={this.state.profile_open}>
              {render_panel}
            </Panel>

            {page_link}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <img src={iphone} id="iphone1" width={197} height={390}/>
        <img src={iphone} id="iphone2" width={197} height={390}/>
      </div>
    );
  }
}
export default Home;
