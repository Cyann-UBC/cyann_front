import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "Howdy dere",
      userName:"",
      password:"",
      message:'asd',
      data:""
    }
  }

  componentWillMount(){

  }

componentDidMount(){
  fetch("https://api.github.com")
  .then((response) => response.json())
  .then((responseData) => {
    console.log(JSON.stringify(responseData))
  this.setState({message:responseData.current_user_url})
  })
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
      <div className="App">
        <div style={{display:'flex',flexDirection:'row',backgroundColor:'blue'}}>
          <div style={{height:window.innerHeight,width:window.innerWidth/6,backgroundColor:'red'}}>

          </div>

          <div style={{height:window.innerHeight,width:window.innerWidth/3,backgroundColor:'yellow'}}>

          </div>

          <div style={{height:window.innerHeight,width:window.innerWidth/2,backgroundColor:'green'}}>

          </div>
          
        </div>

      </div>
    );
  }
}

export default Courses;
