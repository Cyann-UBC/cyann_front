import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, Media, Image, Panel, Accordion, Tabs, Tab } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import '../css/Profile.css';
import cyann_logo from '../../picture/cyann_logo.png';


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_authenticated:false,
      user_type:'Student',
      user_name:'',
      user_id:'',
      user_email:'',
      user_picture:'',
      user_tokenExpire:'',
      user_jwt:'',
      user_posts:[],
      post_render:true,
      user_comments:[]
    }
  }
  componentWillMount(){
  }
  myPosts(){
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
  profile_panel(){
    return (
      <div id="profile_overall">
        <Media>
          <Media.Left align="top" style={{marginBottom:"2",marginTop:"5"}}>
            <img width={64} height={64} src={this.state.user_picture} alt="Image"/>
          </Media.Left>
          <Media.Body>
            <Media.Heading style={{color:"white"}}>你好, {this.state.user_name} !</Media.Heading>
            <p>{this.state.user_type}</p>
            <p>{this.state.user_id}</p>
            <p>{this.state.user_email}</p>
          </Media.Body>
        </Media>

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
    var render_panel;
    if (this.state.user_authenticated){
      if (this.state.post_render) this.myPosts();
      render_panel = this.profile_panel();
    }
    else {
      render_panel = (
        <div id="profile_overall">
          <h1>Please Login first to see your Proflie.
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
        </div>

        <div id="profile_container">
          {render_panel}
          <div style={{display:'none'}}><FacebookLogin
            appId="959862910786642"
            autoLoad={true}
            fields="name,email,picture"
            callback={this.FbResponse}
            size="metro"
            icon="fa-facebook"/>
          </div>
        </div>
      </div>)
  }
}

export default Profile;
