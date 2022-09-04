import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import $ from 'jquery';
import {Navigate} from 'react-router-dom';
import getCookie from '../cookies/getCookie';
const URL = 'http://localhost:3001/user/';
class RegisterComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
        name:"",
        email:"",
        phone:"",
        password:"",
        confirm_password:"",
        passAlert:"",
        emailCheck:"",
        phoneCheck:"",
        emailAlert:"",
        phoneAlert:"",
        role:"user",
        refreshToken:"",
        remember_token:"",
        redirect:"",
        message:""
     }
     this.onSubmitRegistration = this.onSubmitRegistration.bind(this);
     this.onChangeName = this.onChangeName.bind(this);
     this.onChangeEmail = this.onChangeEmail.bind(this);
     this.onChangePhone = this.onChangePhone.bind(this);
     this.onChangePassword = this.onChangePassword.bind(this);
     this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
     this.getEmailCheck = this.getEmailCheck.bind(this);
     this.getPhoneCheck = this.getPhoneCheck.bind(this);
   }
   onChangeName =(e)=>{
     this.setState({name:e.target.value});
   }
   onChangeEmail =(e)=>{
    this.setState({email:e.target.value});
   }
   onChangePhone =(e)=>{
    this.setState({phone:e.target.value});
   }
   onChangePassword =(e)=>{
     this.setState({password:e.target.value});
   }
   onChangeConfirmPassword =(e)=>{
    this.setState({confirm_password:e.target.value});
   }
   onSubmitRegistration =(e)=>{
     e.preventDefault();
     const data = {
      name:this.state.name,
      email:this.state.email,
      phone:this.state.phone,
      password:this.state.password,
      role:this.state.role,
      remember_token:this.state.remember_token,
      refreshToken:this.state.refreshToken,
     }
     if(this.state.password !== this.state.confirm_password)
     {
     }
     else if(this.state.email === this.state.emailCheck){
     }else if(this.state.phone === this.state.phoneCheck){
     }else{
     axios.post(URL+'registerUser',data).then(
        res=>{
          this.setState({message:res.data.message})
          Swal.fire({
            icon: 'success',
            text:res.data.message,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#e3342f',
          })
          // console.log(res.data.password);
          this.setState({redirect:"true"})
          // setSessionStorage('accessToken',res.data.data);
         })
       .catch(err=>{
        console.log(err);
       });
     }
   }
   getEmailCheck(email){
     axios.post(URL+'emailcheck/'+email).then(res=>{
      this.setState({emailCheck:res.data.data.email});
       console.log(this.state.emailCheck);
    })
    .catch(err=>{
      console.log(err);
    })
   }
   getPhoneCheck(phone){
    axios.post(URL+'phonecheck/'+phone).then(res=>{
      this.setState({phoneCheck:res.data.data.phone});
       console.log(this.state.phoneCheck);
    })
    .catch(err=>{
      console.log(err);
    })
   }
   componentDidMount(){
    this.setState({redirect:getCookie('authenticated')})
   }
   render(){
    return(
        
        <div className="container">
            
            <div className="row">
                  <div className="col-md-12">
                       <div className="grap-content">
                            <form action="#" onSubmit={this.onSubmitRegistration}>
                              <legend>Form Register</legend>
                              {
                                this.state.redirect ==="true" ?(
                                    <Navigate to="/login" />
                                ):(
                                <></>
                                )
                              }
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" onChange={this.onChangeName} placeholder="Enter Name..." required/>
                              </div>
                        
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" onChange={this.onChangeEmail} onClick={()=>this.getEmailCheck(this.state.email)} placeholder="Enter Email..." required/>
                                {
                                  this.state.email === this.state.emailCheck && this.state.email !== "" ?(
                                    <span className="btn btn-warning">Email is in use please try again</span>
                                  ):(<></>)
                                }
                                {
                                  this.state.email !== this.state.emailCheck && this.state.email !== ""  ?(
                                    <span className="btn btn-success">Email is correct</span>
                                  ):(<></>)
                                }
                              </div>
                            
                              <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" className="form-control" name="phone" onChange={this.onChangePhone} onClick={()=>this.getPhoneCheck(this.state.phone)} placeholder="Enter Phone Number..." required/>
                                {
                                  this.state.phone === this.state.phoneCheck && this.state.phone !=="" ?(
                                    <span className="btn btn-warning">Phone number is in use please try again</span>
                                  ):(<></>)
                                }
                                 {
                                  this.state.phone !== this.state.phoneCheck ?(
                                    <span className="btn btn-success">Phone number is correct</span>
                                  ):(<></>)
                                }
                              </div>
                              <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" onChange={this.onChangePassword} placeholder="Enter Password..." required/>
                              </div>
                            
                              <div className="form-group">
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input type="password" className="form-control" name="confirm_password" onChange={this.onChangeConfirmPassword} placeholder="Enter Confirm Password..." required/>
                                {
                                    this.state.password === this.state.confirm_password && this.state.password !=="" ?(
                                      <span className="btn btn-success">Password is correct</span>
                                    ):(<></>)
                                }
                                {
                                    this.state.password !== this.state.confirm_password && this.state.confirm_password !=="" ?(
                                      <span className="btn btn-warning">Password is not matched please try again</span>
                                    ):(<></>)
                                }
                              </div>
                              <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            
                       </div>
                  </div>
            </div>
            
        </div>
        
    )
   }
}
export default RegisterComponent;