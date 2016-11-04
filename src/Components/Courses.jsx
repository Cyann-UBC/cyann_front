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
      selection:'',
      background1:'none',
        ifshowtext: false,
      background2:'none'
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

  setBackground1=()=>{
      this.setState({background1:'#60848C'})
      this.setState({background2:'none'})
  }
  setBackground2=()=>{
      this.setState({background2:'#60848C'})
      this.setState({background1:'none'})
  }
  
  setFontWeight1=()=>{
      this.setState({selection:
                     <div id="student_post_list">
                         <input id="searchbar" placeholder="Search.."></input>
                    <button style={{position:'absolute',top:20,left:290,right:-190}} type="button" onClick={this.updateList.bind(this)}>+</button>

                         <div>
                           <p id="post_h2">Post List</p>
                             <ul id="aaa">
                               <li id="b"><a href="#"><dt>question1</dt>
                                   
                                 <dd id="post_body">this question is about...</dd></a>
                                 </li>
                               <li id="b"><a href="#"><dt>question2</dt>
                                   
                                 <dd id="post_body">this question is about...</dd></a>
                                 </li>
                                 
                                 <li id="b"><a href="#"><dt>question3</dt>
                                   
                                 <dd id="post_body">this question is about...</dd></a>
                                 </li>
                              
                             </ul>
                         </div>
                         
                     </div>})
      this.setState({fontWeight1:'900'})
      this.setState({fontWeight2:'300'})
      this.setState({fontWeight3:'300'})
      this.setState({fontWeight4:'300'})
  }
    setFontWeight2=()=>{
      this.setState({selection:
                     <div id="prof_post_list">
                         <input id="searchbar" placeholder="Search.."></input>
                         <button id="new_post">new post</button>
                         
                       
                         
                     </div>})
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

    updateList=()=>{
  this.setState({ifshowtext:true})
}
    renderList=()=>{
  if(this.state.ifshowtext){
    return(
        <div>
      <input style={{position:'relative',width:250,top:10}}type="text" name="firstname"/>

  <input style={{position:'relative',width:250,height:600,top:40}}placeholder="question" type="text" name="lastname"/>
        </div>
    )
  }
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
              
              
          <ul id="course_list">   
            <ul id="course" button type="button"  data-toggle="collapse" data-target="#content"  onClick={this.setBackground1} style={{background:this.state.background1}}>CPEN321</ul>
              <div id="content" className="collapse">
                <ul> 
                  <button className="post" ><span onClick={this.setFontWeight1} style={{fontWeight:this.state.fontWeight1}}>Student Post </span></button>
                  <button className="post" ><span onClick={this.setFontWeight2} style={{fontWeight:this.state.fontWeight2}}>Professor Post </span></button>
                  <button className="post" ><span onClick={this.setFontWeight3} style={{fontWeight:this.state.fontWeight3}}>Homework </span></button>          
                    <button className="post" ><span onClick={this.setFontWeight4} style={{fontWeight:this.state.fontWeight4}}>Lecture notes </span></button>
                    
                </ul>
              </div>
                  
                  
             <ul id="course" button type="button"  data-toggle="collapse" data-target="#content2" onClick={this.setBackground2} style={{background:this.state.background2}}>ELEC331</ul>
               <div id="content2" className="collapse">
                <ul> 
                  <button className="post"><span onClick={this.setFontWeight1} style={{fontWeight:this.state.fontWeight1}}>Student Post </span></button>
                  <button className="post"><span onClick={this.setFontWeight2} style={{fontWeight:this.state.fontWeight2}}>Professor Post </span></button>
                  <button className="post"><span onClick={this.setFontWeight3} style={{fontWeight:this.state.fontWeight3}}>Homework </span></button>          
                    <button className="post"><span onClick={this.setFontWeight4} style={{fontWeight:this.state.fontWeight4}}>Lecture notes </span></button>
                    
                </ul>
              </div>
               
               
              </ul>
            </div>
            
            <div id="post_list" style={{height:window.innerHeight,width:window.innerWidth/3,backgroundColor:'#60848C'}}>
        
            
              
             <div> {this.state.selection}
                 
             </div>
            
                
            </div>
              
            <div style={{height:window.innerHeight,width:window.innerWidth/2,backgroundColor:'white'}}>
            
                 {this.renderList()}

            </div>
          </div>
        </div>

    );

}
  }

export default Courses;
