import {Component} from 'react';
import $ from 'jquery';
import {Navigate,Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import setCookies from '../cookies/setCookie';
import getCookie from '../cookies/getCookie';
import setSessionStorage from '../session/setSessionStorage';
import Auth from '../../Auth';
import setHeader from '../../setHeader';
const URL = 'http://localhost:3001/user/';
class LoginComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
      email:"",
      password:"",
      emailCheck:"",
      emailValue:"",
      passCheck:"",
      passValue:"",
      Redirect:"",
      returnData:"",
      tokenDecoded:""
     };
     this.onSubmitLogin = this.onSubmitLogin.bind(this);
     this.onChangeEmail = this.onChangeEmail.bind(this);
     this.onChangePassword = this.onChangePassword.bind(this);
     this.getEmailCheck = this.getEmailCheck.bind(this);
     this.checkTokenLife = this.checkTokenLife.bind(this);
   }
   onChangeEmail =(e)=>{
     this.setState({email: e.target.value});
   }
   onChangePassword =(e)=>{
    this.setState({password: e.target.value});
   }
   onSubmitLogin = (e)=>{
    e.preventDefault();
    const data = {
      email:this.state.email,
      password:this.state.password,
      refreshToken:getCookie('refreshToken'),
      accessToken:getCookie('accessToken'),
    }
    axios.post(URL+'login',data).then(res=>{
      Swal.fire({
        icon: 'success',
        text:res.data.message,
        showCancelButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#e3342f',
      })
      //  console.log(res.data.user);
       this.setState({returnData:res.data.user})
       if(res.data.user !==""){
        setCookies("refreshToken",res.data.user[1]);
        setCookies("accessToken",res.data.user[0]);
        setCookies("authenticated",true); 
        setCookies('user',JSON.stringify(res.data.user[2]));
        const getrole = JSON.parse(getCookie("user"));
        setCookies('role',getrole.role);
       }
      this.loginAuth();
      // this.checkTokenLife();
    }).catch(err=>{
      console.log(err);
    });
   }
   getEmailCheck=(email)=>{
    if(this.state.emailValue == this.state.email){
      this.setState({emailCheck:'email is correct'})
    }
    axios.post(URL+'emailcheck/'+email).then(res=>{
      this.setState({emailValue:res.data.data.email});
       console.log(this.state.emailValue);
    })
    .catch(err=>{
      console.log(err);
    })
   }
   loginAuth(){
    Auth.login();
    this.setState({Redirect:getCookie('authenticated')});
   }
   checkTokenLife(){
    axios.post(URL+'checktokenlife').then(res=>{
       this.setState({tokenDecoded:res.data.tokendecoded})
    }).catch(err=>{
      console.log(err);
    })
  }
  getNewAccessToken(){
    const data = {"refresToken":getCookie('refreshToken')}
    axios.post(URL+'userIndex',data).then(res=>{
       setCookies("refreshToken",res.data.user[1]);
        setCookies("accessToken",res.data.user[0]);
        // setCookies("authenticated",true);
   }).catch(err=>{
     console.log(err);
   })
  }
   componentDidMount(){
    this.setState({Redirect:getCookie('authenticated')})
    if(getCookie('accessToken') !==""){
      setHeader(getCookie('accessToken'));
    }
   }
   render(){
    return(
        
        <div className="container">
            
            <div className="row">
                  <div className="col-md-12">
                       <div className="grap-content">
                            {this.state.Redirect === "true"?(
                              <Navigate to="/" exact/>
                            ):(<></>)
                          }
                            <form action="#" onSubmit={this.onSubmitLogin}>
                              <legend>Form Login</legend>
                            
                              <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" name="email" onChange={this.onChangeEmail} placeholder="Enter Email" onClick={()=>this.getEmailCheck(this.state.email)} required/>
                                {
                                  this.state.email === this.state.emailValue ?(
                                    <span className="btn btn-success">{this.state.emailCheck}</span>
                                  ):(<span className="btn btn-warning">Email does not exist</span>)
                                }
                              </div>
                              <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Enter Password" onChange={this.onChangePassword} required/>
                              </div>

                              <div className="form-group">
                              <input type="checkbox" name="remember_token" value="1" /> remember 
                              <br/>
                              <Link className="text-blue" to="/register">Go to register your account</Link>
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
export default LoginComponent;