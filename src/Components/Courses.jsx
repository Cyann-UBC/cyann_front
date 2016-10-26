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

  componenWillMount(){
    fetch("https://api.darksky.net/forecast/95e1651de91be5f6fdb246f1412a104f/37.8267,-122.4233")
    .then((response) => response.json())
    .then((responseData) => {
    this.setState({data:responseData.latitude})
    })
  }

componentDidMount(){
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
