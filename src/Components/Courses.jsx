import React, { Component } from 'react';
//import logo from '../logo.svg';
//import '../css/App.css';
import '../css/main.css';

import face from '../../picture/face.jpg';
class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: "Howdy dere",
      userName:"",
      password:"",
      message:'asd',
      fontWeight1:'300',
      fontWeight1:'300',
      fontWeight1:'300',
      fontWeight1:'300',
      data:"",
      selection:''
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
  setFontWeight1=()=>{
      this.setState({selection:'student post'})
      this.setState({fontWeight1:'900'})
      this.setState({fontWeight2:'300'})
      this.setState({fontWeight3:'300'})
      this.setState({fontWeight4:'300'})
  }
    setFontWeight2=()=>{
      this.setState({selection:'Prof post'})
      this.setState({fontWeight1:'300'})
      this.setState({fontWeight2:'900'})
      this.setState({fontWeight3:'300'})
      this.setState({fontWeight4:'300'})
  }
    setFontWeight3=()=>{
      this.setState({selection:'Homework'})
      this.setState({fontWeight1:'300'})
      this.setState({fontWeight2:'300'})
      this.setState({fontWeight3:'900'})
      this.setState({fontWeight4:'300'})
  }
    setFontWeight4=()=>{
      this.setState({selection:'readings'})
      this.setState({fontWeight1:'300'})
      this.setState({fontWeight2:'300'})
      this.setState({fontWeight3:'300'})
      this.setState({fontWeight4:'900'})
  }
  render() {
    return (
      <div className="App">
    

        <div style={{display:'flex',flexDirection:'row',backgroundColor:'white'}}>
         
         <div id="portfolio_bar"> 
           <p id="name">FirstName LastName</p> 
         </div> 
         <img src={face} id="face" style={{width:120,height:120}}/>
            
        
          <div style={{height:window.innerHeight,width:window.innerWidth/6,backgroundColor:'#17B3C1'}}>
              
              <ul id="course" button type="button"  data-toggle="collapse" data-target="#content">CPEN321</ul>
              <div id="content" className="collapse">
                <ul> 
                  <button className="post" onclick="display_post(1)"><span onClick={this.setFontWeight1} style={{fontWeight:this.state.fontWeight1}}>Student Post </span></button>
                  <button className="post" onclick="display_post(2)"><span onClick={this.setFontWeight2} style={{fontWeight:this.state.fontWeight2}}>Professor Post </span></button>
                  <button className="post" onclick="display_post(3)"><span onClick={this.setFontWeight3} style={{fontWeight:this.state.fontWeight3}}>Homework </span></button>          
                    <button className="post" onclick="display_post(4)"><span onClick={this.setFontWeight4} style={{fontWeight:this.state.fontWeight4}}>Lecture notes </span></button>
                    
                </ul>
              </div>
            </div>
            
    <div id="post_list" style={{height:window.innerHeight,width:window.innerWidth/3,backgroundColor:'#60848C'}}>
            
        <input style={{position:'absolute',width:130,top:0,left:350,boxSizing:'border-box',fontSize:16,backgroundColor:'white',padding:12}}
             name="search" placeholder="Search.."></input>
        
              
                <p>{this.state.selection}</p>
                <ul></ul>
            </div>
              
            <div style={{height:window.innerHeight,width:window.innerWidth/2,backgroundColor:'white'}}>

            </div>
          </div>
        </div>

    );
  }
}

export default Courses;
