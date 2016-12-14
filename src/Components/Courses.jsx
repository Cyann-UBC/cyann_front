import React, { Component } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import '../css/App.css';
import '../css/main.css';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import FaCog from 'react-icons/lib/fa/cog';
import FaUser from 'react-icons/lib/fa/user';
import FaSearchPlus from 'react-icons/lib/fa/search-plus';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import GoX from 'react-icons/lib/go/x';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';

import face from '../../picture/face.jpg';
import cyann_logo from '../../picture/cyann_logo.png';

import FacebookLogin from 'react-facebook-login';


class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            curUserId:'',
            fontWeight1:'300',
            fontWeight2:'300',
            fontWeight3:'300',
            fontWeight4:'300',
            data:"",
            selection:'',
            background:'none',
            ifshowtext: false,
            ifShowQuestion:true,
            ifShowContent:false,
            ifShowUploadForm:false,
            ifShowReadUploadForm:false,
            ifShowAssignment:false,
            ifShowReadings:false,
            background2:'none',
            postSource:[],
            postTitle:'',
            postContent:'',
            postViewing:'',
            authorId:'',
            commentsViewing:[],
            commentContent:'',
            courseName:[],
            author:'',
            createdAt:'',
            ifShowEditPost:false,
            commentEditing:'',
            ifEditComment:'',
            firstId:'',
            showLoginModal: false,
            user_authenticated: false,
            user_id:'',
            user_email:'',
            user_tokenExpire:'',
            user_accessToken:'',
            user_picture:'',
            jwt:'',
            user_type:'Student',
            allCoursesList:[],
            coursesEnrolled:[],
            thisCourse:'',
            keywords:'',
            studentList:[],
            postTypeIsStudent:true,
            errorMsg:'',
            ifShowCourseList:false,
            assignmentList:[],
            ReadingsList:[],
            file: '',
            showModal:false,
        }
    }
    componentWillMount(){
      var r = this.props.location.query.jwt;
      if (r === undefined){
        browserHistory.push('/');
      }
    }
    componentDidMount(){
      this.setState({jwt:this.props.location.query},()=>this.getUserCourse())
      console.log(this.props.location.query)
      this.setState({jwt:this.props.location.query},()=>this.getCurUser())
    }
    loginModalClose=()=>{
        this.setState({showLoginModal:false});
    }
    loginModalOpen=()=>{
        this.setState({showLoginModal:true});
    }

    getAllCourses=()=>{
      fetch("http://localhost:8080/api/courses",{method:"GET",headers: {
      'Authorization': 'Bearer '+this.state.jwt.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({allCoursesList:responseData.data})
          console.log(responseData.data)
          //console.log(responseData.data[0].instructor[0].name)
          this.setState({ifShowCourseList:true})
          this.addCourse()
      })

    }

    getUserCourse(){
      fetch("http://localhost:8080/api/users/my/courseData",{method:"GET",headers: {
      'Authorization': 'Bearer '+this.state.jwt.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({coursesEnrolled:responseData})
      })
    }

 getAssignment(id){
        this.setState({thisCourse:id})
        fetch("http://localhost:8080/api/"+id+"/files/assignments",{method:"GET",headers: {
          'Authorization': 'Bearer '+ this.state.jwt.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({assignmentList:responseData.files})
          console.log(responseData.files)
          //console.log(this.state.assignmentList+"supoose to be the same as above")
          this.setFontWeight3()
      })
    }

getReadings(id){
        this.setState({thisCourse:id})
        fetch("http://localhost:8080/api/"+id+"/files/readings",{method:"GET",headers: {
          'Authorization': 'Bearer'+ this.state.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({ReadingsList:responseData.files})
          console.log(responseData.files)
          //console.log(this.state.assignmentList+"supoose to be the same as above")
          this.setFontWeight5()
      })
    }

    getCourse(id){
      this.setState({thisCourse:id})
      this.getAllUser(id)

    }

    getPosts(id){
      fetch("http://localhost:8080/api/courses/"+id+"/posts",{method:"GET",headers: {
      'Authorization': 'Bearer '+this.state.jwt.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
          console.log(responseData.data)
          this.setState({postSource:responseData.data})
          if(responseData.data.length>0){
            this.setState({firstId:responseData.data[0]._id})
          }
          if(this.state.postTypeIsStudent){
            this.setFontWeight1()
          }
          else{
            this.setFontWeight2()
            console.log("lalalaa")
          }

      })
    }
    getAllUser(id){
      fetch("http://localhost:8080/api/courses/users/"+id,{method:"GET",headers: {
      'Authorization': 'Bearer '+this.state.jwt.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        this.setState({studentList:responseData})
        //  this.setFontWeight4()
      })
    }

    getCurUser=()=>{
        fetch("http://localhost:8080/api/users/my",{method:"GET",headers: {
        'Authorization': 'Bearer '+this.state.jwt.jwt
        }})
        .then((response) => response.json())
        .then((responseData) => {
          console.log("here")
          console.log(responseData)
          this.setState({userName:responseData.userInfo.name})
          this.setState({user_picture:responseData.userInfo.profileImg})

          this.setState({curUserId:responseData.userInfo._id})
          console.log(responseData.userInfo._id)
          console.log(this.state.curUserId)
        })
    }

    // setPassword(event){
    //     this.setState({password:event.target.value})
    // }
    updateQuestionTitle(event){
        this.setState({postTitle:event.target.value})
    }
    updateQuestionContent(event){
        this.setState({postContent:event.target.value})
    }
    updateComment(event){
        this.setState({commentContent:event.target.value})
    }
    updateKeywords(event){
      this.setState({keywords:event.target.value},()=>{this.filterPost()})
    }
    setBackground=()=>{
        this.setState({background:'#60848C'})
    }

    setFontWeight1=()=>{
      this.setState({ifShowContent:true})

      this.setState({background:'#60848C'})
        this.setState({selection:
                       <div id="student_post_list">
                           <input id="searchbar" placeholder="Search.." onChange={this.updateKeywords.bind(this)}></input>
                           <FaSearchPlus style={{position:"absolute",width:25,height:25,top:23,left:145,color:'#17B3C1',zIndex:'1'}}/>

                           <button id="new_post"  type="button" onClick={this.updateList.bind(this)}>New Post</button>

                           <FaPlusCircle style={{position:"absolute",width:23,height:23,top:23,left:295,color:'cyann'}}/>
                           <p style={{position:'relative',top:80,left:20,fontSize:20}}>{this.state.errorMsg}</p>

                           <div>
                               <p id="post_h2">Post List</p>
                               <ul id="aaa">
                                   {this.state.postSource.map(function(post,i){
                                     this.setState({postTypeIsStudent:true})
                                     this.setState({thisCourse:post.course})
                                     if(post.author.userType=="student"){
                                     if(post.author._id===this.state.jwt.id){
                                       return(
                                        <li id="b" onClick={this.showContent.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.getContent(post._id)}>
                                              <GoX id="delete_post" onClick={()=>this.deletePost(post._id)}/>
                                              <dt id="post_title" style={{top:-32}}> {post.title}</dt>
                                              <dd id="post_body" style={{top:-32}}>{post.content}</dd>
                                            </a>
                                        </span>
                                        </li>
                                       )
                                     }
                                     else{
                                       return(
                                        <li id="b" onClick={this.showContent.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.getContent(post._id)}>
                                              <dt id="post_title"> {post.title}</dt>
                                              <dd id="post_body">{post.content}</dd>
                                            </a>
                                        </span>
                                        </li>
                                       )
                                     }
                                   }
                                   },this)}

                               </ul>
                           </div>
                       </div>})
        this.getContent(this.state.firstId)
        this.setState({fontWeight1:'900'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'300'})

    }
    setFontWeight2=()=>{
      this.setState({ifShowContent:true})

      this.setState({background:'#60848C'})

        this.setState({selection:
                       <div id="prof_post_list">
                         <input id="searchbar" placeholder="Search.." onChange={this.updateKeywords.bind(this)}></input>
                         <FaSearchPlus style={{position:"absolute",width:25,height:25,top:23,left:145,color:'#17B3C1',zIndex:'1'}}/>
                         <p style={{position:'relative',top:80,left:20,fontSize:20}}>{this.state.errorMsg}</p>

                         <div>
                             <p id="post_h2">Post List</p>
                             <ul id="aaa">
                                 {this.state.postSource.map(function(post,i){
                                   this.setState({postTypeIsStudent:false})

                                   this.setState({thisCourse:post.course} )
                                   if(post.author.userType=="instructor"){
                                     return(
                                      <li id="b" onClick={this.showContent.bind(this)}>
                                        <span>
                                          <a href="#" onClick={()=>this.getContent(post._id)}>
                                            <dt id="post_title" style={{top:-5}}> {post.title}</dt>
                                            <dd id="post_body" style={{top:-5}}>{post.content}</dd>
                                          </a>
                                      </span>
                                      </li>
                                     )
                                 }
                                 },this)}

                             </ul>
                         </div>


                      </div>})
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'900'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'300'})

        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }

    setFontWeight3=()=>{
       this.setState({background:'#60848C'})
       this.setState({selection:
                        <div id="student_post_list">

                           <div>
                               <p id="post_h2">Assignments</p>
                               <ul id="aaa">
                                   {this.state.assignmentList.map(function(assn,i){
                                    //console.log(assn)
                                       return(

                                    <li id="b" onClick={this.showAssignment.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.downloadFile('assignments',assn)}>

                                              <dt id="post_title" style={{top:5}}> {assn} </dt>
                                            </a>
                                        </span>
                                    </li>
                                       )
                                   },this)}

                               </ul>
                           </div>
                       </div>})

        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'900'})
        this.setState({fontWeight4:'300'})
        this.setState({fontWeight5:'300'})

        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }
   setFontWeight5=()=>{
          //this.getAssignment()
        //console.log(this.state.assignmentList)
      this.setState({background:'#60848C'})
 this.setState({selection:
                        <div id="student_post_list">

                           <div>
                               <p id="post_h2">Readings</p>
                               <ul id="aaa">
                                   {this.state.ReadingsList.map(function(read,i){
                                    //console.log(assn)
                                       return(

                                    <li id="b" onClick={this.showReadings.bind(this)}>
                                          <span>
                                            <a href="#" onClick={()=>this.downloadFile('readings',read)}>
                                                <GoX id="delete_post" onClick={()=>this.deleteFile('readings',read)}/>
                                              <dt id="post_title" style={{top:5}}> {read} </dt>
                                            </a>
                                        </span>
                                    </li>
                                       )
                                   },this)}

                               </ul>
                           </div>
                       </div>})

        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'300'})
        this.setState({fontWeight5:'900'})

        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }
    setFontWeight4=()=>{
      // this.getAllUser()
      this.setState({background:'#60848C'})

        this.setState({selection:
          <div>
            <p style={{position:'relative',top:50, color:'white',fontSize:20}}>student list</p>
            <ul id="studentList">
            {this.state.studentList.map(function(student,i){
              if(student.userType==="student"){
              return(
                <li id="d">
                     <dt style={{position:'relative',left:70}}>{student.name}</dt>
                     <dd style={{position:'relative',left:70}}> honour points: {student.honor}</dd>
                     <FaEnvelopeO id="email" onClick={()=>this.sendMail(student.email)}/>
                     <img src={student.profileImg} id="studentPic"/>
                  </li>
              )
            }
            },this)}
          </ul>

          </div>
        })
        this.setState({fontWeight1:'300'})
        this.setState({fontWeight2:'300'})
        this.setState({fontWeight3:'300'})
        this.setState({fontWeight4:'900'})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }

    sendMail(emailAddr) {
      // window.open('mailto:luvian@hotmail.ca?subject=subject&body=Testing Email')
      //location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSub+'&body='+emailBody;
      console.log(emailAddr)
      location.href = 'mailto:'+emailAddr+'?subject=&body='

    }

    updateList=()=>{
      console.log(this.state.thisCourse)
        this.setState({ifshowtext:true})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
        this.setState({postTitle:''})
        this.setState({postContent:''})
    }
    showAssignment=()=>{

        this.setState({ifShowContent:false})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:true})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }
    showReadings=()=>{
        this.setState({ifShowContent:false})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:true})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }
    showContent=()=>{
        this.setState({ifShowContent:true})
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }
    showQuestion=()=>{
        this.setState({ifshowtext:false})
        this.setState({ifShowQuestion:true})
        this.setState({ifShowContent:false})
        this.setState({ifShowEditPost:false})
        this.setState({ifShowUploadForm:false})
        this.setState({ifShowAssignment:false})
        this.setState({ifShowReadings:false})
        this.setState({ifShowReadUploadForm:false})
        this.setState({ifShowCourseForm:false})
    }

postComment=()=>{
  if(this.state.commentContent.length === 0){
    alert("content Empty!")
  }
  else{
        var comment = {
            'content': this.state.commentContent,
            }

        var formBody = []
        for (var property in comment) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(comment[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing+"/comments",{method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+this.state.jwt.jwt
        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
            this.getComment()
        })

        document.getElementById("newComment").value = "";
      }
    }
 saveLocally(blob,type,status){
    var blob = new Blob([blob], {type: type});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, "file");
    }
    else {
        var csvURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', "file");
        tempLink.setAttribute('target', '_blank');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
  }
downloadFile=(type,filename)=>{
      var href=''
      var status=''
      var filename = encodeURIComponent(filename);
        fetch("http://localhost:8080/api/"+this.state.thisCourse+"/files/"+ type +"/download?fileName="+filename,{method:"GET",
        headers: {
            accept: 'application/pdf',
            'Authorization': 'Bearer '+this.state.jwt.jwt
        }})
          .then((response)=> {
            status=response.status
            response.blob()
        .then((blob)=> {
            console.log(status)
               this.saveLocally(blob,blob.type,status)
        })
          })

          // this.setState({selection:
          //     <div>
          //       <object width="700" height="700" style={{position:"absolute",left:50,top:5}} data={response.blob()}>
          //       </object>
          //     </div>
          // })
    }
    getComment=()=>{
        fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing+"/comments",{method:"get",headers: {
        'Authorization': 'Bearer '+this.state.jwt.jwt
        }})
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData.data)
         this.setState({commentsViewing:responseData.data})
        })
    }

    postQuestion=()=>{
      if(this.state.postTitle.length === 0 || this.state.postContent.length === 0){
        alert("title or content Empty!")
      }
      else{
        var post = {
            'title': this.state.postTitle,
            'content': this.state.postContent,
            }

        var formBody = []
        for (var property in post) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(post[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts",{method:"POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+this.state.jwt.jwt

        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
        fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts",{method:"GET",
        headers: {
        'Authorization': 'Bearer '+this.state.jwt.jwt
        }})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({postSource:responseData.data})
            this.getContent(responseData.data[0]._id)
            this.setState({ifShowContent:!this.state.ifShowContent})

            this.setFontWeight1()
            document.getElementById("updatePostTitle").value = "";
            document.getElementById("updatePostContent").value = "";

        })

        })
      }
    }

    cancelPostQuestion=()=>{
      var r = confirm("are you sure you want to quit creating new post?");
      if(r==true){
        this.getContent(this.state.firstId)
        this.setState({ifShowQuestion:false})
        this.setState({ifShowContent:true})
        document.getElementById("updatePostTitle").value = "";
        document.getElementById("updatePostContent").value = "";
      }
    }

    getContent(id){
       fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+id,{method:"get",
       headers: {
       'Authorization': 'Bearer '+this.state.jwt.jwt
       }})
        .then((response) => response.json())
        .then((responseData) => {
           console.log(responseData.data)
         this.setState({postViewing:responseData.data._id})
         this.setState({postTitle:responseData.data.title})
         this.setState({author:responseData.data.author.name})
         this.setState({authorId:responseData.data.author._id})
         this.setState({postContent:responseData.data.content})
         this.setState({commentsViewing:responseData.data.comments})
         this.setState({createdAt:responseData.data.createdAt})
        })
    }

    userPortfilio(){
    }

    deletePost=(id)=>{
      //alert("Are you sure you want to quit?");
      var body = {
          'userId': this.state.userId
          }

      var formBody = []
      for (var property in body) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(body[property]);
          formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
    var r = confirm("Are you sure you want to delete this post?");
    if (r == true) {
        fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+id,{method:"DELETE",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+this.state.jwt.jwt

        },
        body:formBody})
        .then((response) => response.json())
        .then((responseData) => {
        fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/",{method:"GET",
        headers: {
        'Authorization': 'Bearer '+this.state.jwt.jwt
        }})
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({postSource:responseData.data})
          this.getContent(responseData.data[0]._id)
          this.setState({ifShowContent:this.state.ifShowContent})

          this.setFontWeight1()
          })
        })

    }
  }

  deleteComment=(commentId)=>{
    var body = {
        'userId': this.state.userId
        }

    var formBody = []
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    var r = confirm("Are you sure you want to delete this comment?");
    if (r == true) {
      fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing+"/comments/"+ commentId,{method:"DELETE",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+this.state.jwt.jwt

      },
      body:formBody})
      .then((response) => response.json())
      .then((responseData) => {
      fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing+"/comments/"+ commentId,{method:"GET",
      headers: {
      'Authorization': 'Bearer '+this.state.jwt.jwt
      }})
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({ifShowContent:true})

        this.getComment()
        this.setState({ifEditComment:true})
        })
      })

    }

  }

  upvote=(commentId)=>{
    var body = {
        'userId': this.state.userId,
        }

    var formBody = []
    for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing+"/comments/"+commentId+"/upvote",{method:"put",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+this.state.jwt.jwt

    },
    body:formBody})
    .then((response) => response.json())
    .then((responseData) => {
      console.log("aaa")
      console.log(responseData.message)
      alert(responseData.message)
    })
  }

logout=()=>{
  this.setState({showModal:true});
}
closeModal=()=>{
  this.setState({showModal:false});
}
exit=()=>{
  this.setState({showModal:false,jwt:''});
  browserHistory.push('/');
}

editPost=()=>{
    this.setState({ifshowtext:false})
    this.setState({ifShowQuestion:false})
    this.setState({ifShowContent:false})
    this.setState({ifShowEditPost:true})
}

updatePost=()=>{
  var body = {
      'userId': this.state.userId,
      'title': this.state.postTitle,
      'content': this.state.postContent,
      }

  var formBody = []
  for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing,{method:"PUT",
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+this.state.jwt.jwt
  },
  body:formBody})
  .then((response) => response.json())
  .then((responseData) => {
    console.log(responseData.data)
    this.setState({postTitle:responseData.data.title})
    this.setState({postContent:responseData.data.conent})
    fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/",{method:"GET",
    headers: {
    'Authorization': 'Bearer '+this.state.jwt.jwt
    }})
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData)
      this.setState({postSource:responseData.data})
      this.setFontWeight1()
    })
  })

  this.setState({ifShowContent:true})
  this.setState({ifShowEditPost:false})

}

cancelUpdatePost=()=>{
    this.setState({ifShowContent:true})
    this.setState({ifShowEditPost:false})
}

editComment=(id)=>{
  this.setState({ifEditComment:true})
  console.log(id)
  this.setState({commentEditing:id})
}

updateNewComment=()=>{
  var body = {
      'userId': this.state.userId,
      'content': this.state.commentContent,
      }

  var formBody = []
  for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/posts/"+this.state.postViewing+"/comments/"+this.state.commentEditing,{method:"PUT",
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer '+this.state.jwt.jwt

  },
  body:formBody})
  .then((response) => response.json())
  .then((responseData) => {
    this.getComment()
    //this.setState({commentContent:responseData.data.content})
    //this.setState({createdAt:responseData.data.updatedAt})
  })

    this.setState({ifEditComment:false})

}

cancelUpdateComment=()=>{
    this.setState({ifEditComment:false})
}

joinClass=(id)=>{
  console.log(id)
  var r = confirm("are you sure you want join this class?");
  if(r==true){
    fetch("http://localhost:8080/api/courses/addUser/"+id,{method:"put",
    headers: {
      'Authorization': 'Bearer '+this.state.jwt.jwt
    }})
      .then((response) => response.json())
      .then((responseData) => {
        //this.getUserCourse()
        //console.log(responseData.data)
        this.setState({selection:
          <p style={{position:"relative",top:100,left:10,fontSize:50,color:"white"}}>course joined!</p>
        })
        //this.setState({ifShowCourseList:false})
      })
    }
}

addCourse=()=>{
  this.setState({background:'none'})
  this.setState({ifshowtext:false})
  this.setState({ifShowQuestion:false})
  this.setState({ifShowContent:false})
  this.setState({ifShowEditPost:false})
  if(this.state.ifShowCourseList){
    this.setState({selection:
      <div>
        <p style={{color:'white',fontSize:20,position:'relative',top:50}}>University of British Columbia</p>

        <ul id="allCourses">
          {this.state.allCoursesList.map(function(course,i){
            return(
              <li id="c">
                   <dt>{course.courseName}</dt>
                   <button id="joinButton" onClick={()=>this.joinClass(course._id)}>join class</button>
              </li>
            )
          },this)}

       </ul>
      </div>
    })
  }

}

filterPost(){
    var keywords = this.state.keywords
    fetch("http://localhost:8080/api/courses/"+this.state.thisCourse+"/search?keyword="+this.state.keywords+"&weeksAgo=9",{method:"GET",
          headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+this.state.jwt.jwt
          }})
    .then((response) => response.json())
    .then((responseData) => {
      console.warn(JSON.stringify(responseData))
      this.setState({postSource:responseData.data})
      if(responseData.data.length==0){
         this.setState({errorMsg:"no post found"})
      }
      else{
        this.setState({errorMsg:""})
      }
      if(this.state.postTypeIsStudent){
        this.setFontWeight1()
      }
      else{
        this.setFontWeight2()
      }


    })
    .catch((error)=>{
      this.refs.errorModal.open()
    })
    if(this.state.postTypeIsStudent){
      this.setFontWeight1()
    }
    else{
      this.setFontWeight2()
    }

  }

renderList=()=>{
      if(this.state.ifShowEditPost){
        return(
          <div id="postPage">
            <div id="postTop">
                <p id="contentTitle">
                   <textarea id="updatePostTitle" onChange={this.updateQuestionTitle.bind(this)}>{this.state.postTitle}</textarea>
                </p>

                <p id="contentContent">
                    <textarea id="updatePostContent" onChange={this.updateQuestionContent.bind(this)}>{this.state.postContent}</textarea>
                </p>
                <p><button id="bu" onClick={()=>this.updatePost()}>submit</button><button id="bu" onClick={()=>this.cancelUpdatePost()}>cancel</button></p>
              </div>

              <ul id="commentList">
                {this.state.commentsViewing.map(function(comment,i){
                    return(
                        <li id="commentContent">
                            <p style={{fontSize:"10px",color:"#002859"}}>followup discussions</p>
                           <h2></h2>
                           <p style={{color:"#002859"}}>{comment.content}</p>

                          <h2></h2>
                          <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                          <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                          <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                        </li>
                    )
                },this)}
                <div id="commentContent">
                  <p style={{fontSize:"10px"}}>Start a new followup discussion</p>
                  <h2></h2>
                  <textarea onChange={this.updateComment.bind(this)}  id="newComment" ></textarea>
                  <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                  {/* <button id="newComment_cancel" onClick={()=>this.cancelPostComment()}>cancel</button> */}
                </div>
              </ul>

            </div>
        )
    }
    if(this.state.ifShowAssignment){
    return(

            <p> The file has been downloaded </p>
        )
    }

        if(this.state.ifShowContent){
          if(this.state.curUserId===this.state.authorId){
            return(
              <div id="postPage">
                <div id="postTop">
                    <p id="contentTitle" >
                       {this.state.postTitle}
                    </p>

                    <p id="contentContent">
                        {this.state.postContent}
                    </p>
                    <p style={{fontSize:"12px",color:"#002859"}}> <button id="bu" onClick={()=>this.editPost()}>edit</button> Posted by {this.state.author} Created at {this.state.createdAt}</p>
                  </div>

                  <ul id="commentList">
                    {this.state.commentsViewing.map(function(comment,i){
                      if(this.state.curUserId!=comment.author._id){
                        console.log("this")
                        console.log(this.state.curUserId)
                        console.log(comment.author._id)
                        return(
                          <li id="commentContent">
                            <p style={{fontSize:"10px",color:"#002859"}}>followup discussions</p>
                            <h2></h2>
                            <p>{comment.content}</p>

                            <h2></h2>
                            <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                            <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                            <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                          </li>
                        )

                      }
                      else if(this.state.ifEditComment&&comment._id===this.state.commentEditing){
                        return(
                          <li id="commentContent">
                        <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                         <h2></h2>
                         <textarea id="updateCom" onChange={this.updateComment.bind(this)} >{comment.content}</textarea>
                        <h2></h2>
                        <button id="bu" onClick={()=>this.updateNewComment()}>submit</button><button id="bu" onClick={()=>this.cancelUpdateComment()}>cancel</button>
                        <button id="bu" onClick={()=>this.deleteComment(comment._id)}>delete</button>
                        </li>
                        )
                      }
                      else if(this.state.curUserId===comment.author._id){
                        console.log("hahaha")

                          return(
                            <li id="commentContent">
                              <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                               <h2></h2>
                               <p>{comment.content}</p>

                              <h2></h2>
                              <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                              <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>
                              <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                            </li>
                        )
                      }
                    },this)}
                    <div id="commentContent">
                      <p style={{fontSize:"10px"}}>Start a new followup discussion</p>
                      <h2></h2>
                      <textarea onChange={this.updateComment.bind(this)}  id="newComment" ></textarea>
                      <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                      <button id="newComment_cancel" >cancel</button>
                    </div>
                  </ul>

                </div>
            )
          }
          else{
            return(
              <div id="postPage">
                <div id="postTop">
                    <p id="contentTitle">
                       {this.state.postTitle}
                    </p>

                    <p id="contentContent">
                        {this.state.postContent}
                    </p>
                    <p style={{fontSize:"12px",color:"#002859"}}> Posted by {this.state.author} Created at {this.state.createdAt}</p>
                  </div>

                  <ul id="commentList">
                    {this.state.commentsViewing.map(function(comment,i){
                      if(this.state.curUserId!=comment.author._id){
                        console.log("this")
                        console.log(this.state.curUserId)
                        console.log(comment.author._id)
                        return(
                          <li id="commentContent">
                            <p style={{fontSize:"10px",color:"#002859"}}>followup discussions</p>
                            <h2></h2>
                            <p>{comment.content}</p>

                            <h2></h2>
                            <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                            <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>

                            <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                          </li>
                        )

                      }
                      else if(this.state.ifEditComment&&comment._id===this.state.commentEditing){
                        return(
                          <li id="commentContent">
                        <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                         <h2></h2>
                         <textarea id="updateCom" onChange={this.updateComment.bind(this)} >{comment.content}</textarea>
                        <h2></h2>
                        <button id="bu" onClick={()=>this.updateNewComment()}>submit</button><button id="bu" onClick={()=>this.cancelUpdateComment()}>cancel</button>
                        <button id="bu" onClick={()=>this.deleteComment(comment._id)}>delete</button>
                        </li>
                        )
                      }
                      else if(this.state.curUserId===comment.author._id){
                        console.log("hahaha")

                          return(
                            <li id="commentContent">
                              <p style={{fontSize:"10px",color:"#002859"}}>followup discussions    <button id="bu" onClick={()=>this.editComment(comment._id)}>edit</button></p>
                               <h2></h2>
                               <p>{comment.content}</p>

                              <h2></h2>
                              <p style={{fontSize:"10px", color:"#002859"}}>good question    {comment.upvotes}</p>
                              <button id ="thumb" onClick={()=>this.upvote(comment._id)}><FaThumbsOUp /></button>
                              <p id="commentUser">Updated by {comment.author.name} at {comment.createdAt}</p>
                            </li>
                        )
                      }
                    },this)}
                    <div id="commentContent">
                      <p style={{fontSize:"10px"}}>Start a new followup discussion</p>
                      <h2></h2>
                      <textarea onChange={this.updateComment.bind(this)}  id="newComment" ></textarea>
                      <button id="newComment_submit" onClick={()=>this.postComment()}>submit</button>
                      <button id="newComment_cancel" >cancel</button>
                    </div>
                  </ul>

                </div>
            )
          }
        }
        if(this.state.ifshowtext){
            return(
                <div>
                    <input onChange={this.updateQuestionTitle.bind(this)} type="text"  id="newPost_title"/>
                    <textarea onChange={this.updateQuestionContent.bind(this)}  id="newPost_content" cols="70" rows="20" ></textarea>
                    <button id="newPost_submit" onClick={()=>this.postQuestion()}>submit</button>
                    <button id="newPost_cancel" onClick={()=>this.cancelPostQuestion()}>cancel</button>
                </div>
            )
        }
        if(this.state.ifShowQuestion){
            return(
                <div>
                    {/* <p style={{fontSize:30,position:'absolute',top:50,left:850,color:"blue"}}>welcome to Cyann</p> */}
                    <p style={{fontSize:30,position:'absolute',top:50,left:280,width:300,color:"white"}}>welcome to Cyann</p>
                    <img src={cyann_logo} id="logo" width={200} alt="logo" style={{position:"absolute",top:150,left:310}}/>
                </div>

            )
        }
    }

    getProfPosts(id){
      this.setState({postTypeIsStudent:false})
      this.getPosts(id)
    }
    getStuPosts(id){
      this.setState({thisCourse:id})
      this.setState({postTypeIsStudent:true})
      this.getPosts(id)
    }

    render() {
        return (
            <div className="App">
                <div style={{display:'flex'}}>
                    <div id="portfolio_bar">
                        <p id="name">{this.state.userName}</p>
                        <img src={this.state.user_picture} style={{position:"absolute",top:20,left:40,width:120,height:120}}/>
                        <FaCog id="setting" />
                        <FaSignOut id="signout" onClick={()=>this.logout()}/>
                        <button id="user" onClick={()=>this.userPortfilio()}><FaUser/></button>
                    </div>



                    <div style={{height:725,width:215,backgroundColor:'#17B3C1'}}>

                        <a href="#" id="addCourse" onClick={()=>this.getAllCourses()} >+ add another course</a>

                        <ul id="course_list">

                                {this.state.coursesEnrolled.map(function(course,i){
                                  return(
                                    <div>
                                    <ul id="course" data-toggle="collapse" data-target={"#"+i}
                                        onClick={this.setBackground}
                                        style={{background:this.state.background}}>
                                        <p onClick={()=>this.getCourse(course._id)}>{course.courseName}</p>
                                    </ul>
                                    <div id={i} className="collapse">
                                        <ul>
                                            <button className="post" onClick={()=>this.getStuPosts(course._id)}>
                                                <span
                                                    onClick={()=>this.setFontWeight1()}
                                                    style={{fontWeight:this.state.fontWeight1}}>
                                                    Student Post
                                                </span>
                                            </button>

                                            <button className="post" onClick={()=>this.getProfPosts(course._id)}>
                                                <span
                                                    onClick={(this.setFontWeight2)}
                                                    style={{fontWeight:this.state.fontWeight2}}>
                                                    Professor Post
                                                </span>
                                            </button>

                                            <button className="post" onClick={()=>this.getAssignment(course._id)}>
                                                <span
                                                    onClick={this.setFontWeight3}
                                                    style={{fontWeight:this.state.fontWeight3}}>
                                                    Assignments
                                                </span>
                                            </button>

                                            <button className="post" onClick={()=>this.getReadings(course._id)}>
                                                <span
                                                    onClick={this.setFontWeight5}
                                                    style={{fontWeight:this.state.fontWeight5}}>
                                                    Readings
                                                </span>
                                            </button>

                                            <button className="post" >
                                                <span
                                                    onClick={this.setFontWeight4}
                                                    style={{fontWeight:this.state.fontWeight4}}>
                                                    Enrolled Students
                                                </span>
                                            </button>
                                        </ul>
                                    </div>
                                  </div>

                                  )
                                },this)}


                        </ul>
                    </div>

                    <div style={{position:'absolute',left:215,height:725,width:430,backgroundColor:'#60848C'}}>

                        <div>
                            {this.state.selection}
                        </div>
                    </div>

                    <div style={{position:'absolute',left:645,height:725,width:645,backgroundColor:'white'}}>
                        <div style={{position:'absolute',left:-645}}>
                            {this.renderList()}
                        </div>
                    </div>

                    <Modal show={this.state.showModal} onHide={()=>this.closeModal()} bsSize='lg'>
                       <Modal.Header closeButton>
                         <Modal.Title>Are you sure you want to logout?</Modal.Title>
                       </Modal.Header>
                       <Modal.Footer>
                         <Button onClick={this.exit}>Yes</Button>
                         <Button onClick={this.closeModal}>No</Button>
                       </Modal.Footer>
                      </Modal>

                </div>
            </div>
        );
    }
}


export default Courses;
