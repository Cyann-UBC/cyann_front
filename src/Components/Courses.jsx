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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.message}</h2>
        </div>
        <p className="App-intro">
          Course Page
        </p>
        <div>
          <input type="text" value={this.state.userName} onChange={this.setUserName.bind(this)}/>
          <input type="text" value={this.state.password} onChange={this.setPassword.bind(this)}/>
        </div>
        <button onClick={()=>this.setState({message:this.state.data})}>click</button>
      </div>
    );
  }
}

export default Courses;
