import React,{Component} from 'react';
import {Navigate,Link} from 'react-router-dom';
import './App.css';
import RouteClass from './routes';
import axios from 'axios';
import Auth from './Auth';
import setCookie from './Components/cookies/setCookie';
import getCookie from './Components/cookies/getCookie';
import CartLength from './Components/helper/CartLength';
const URL = 'http://localhost:3001/user/';
class App extends Component {
   constructor(props){
    super(props);
    this.state = {
      tokenDecoded:"",
      newData:"",
      redirect:getCookie('authenticated'),
      data:"",
    }
   }
   checkTokenLife(){
      axios.post(URL+'checktokenlife').then(res=>{
         this.setState({tokenDecoded:res.data.tokendecoded})
         setCookie('tokendecoded',res.data.tokendecoded)
         this.setState({newData:JSON.parse(getCookie('tokendecoded'))})
         console.log(JSON.parse(this.state.tokenDecoded))
      }).catch(err=>{
        console.log(err);
      })
   }
   getAvatar(){
      const newData = JSON.parse(getCookie("user"));
      if(newData){
         const data ={
            email:newData.email
         }
         axios.post(URL+'getavatar',data).then(res=>{
            this.setState({data:res.data.data})
         }).catch(err=>{
            console.log(err);
         })
      }
   }
   Logout(){
      Auth.logout()
      this.setState({redirect:getCookie('authenticated')})
  }
   componentDidMount(){
      this.getAvatar();
      if(getCookie('tokendecoded') =='undefined'){
         this.checkTokenLife();
      }
      if(this.state.newData.message === "jwt expired"){
          Auth.logout();
          this.setState({redirect:getCookie('authenticated')});
      }
   }
   render(){
      return (
         <>
         <div className="user_profile">
             <div className="main-profile">
               <div className="left-img">
                  {[this.state.data.avatar].length >0?(
                     <>
                           <img src={`http://localhost:3001/avatar/`+this.state.data.avatar} alt="user_profile" />
                           <Link className="btn btn-primary" to="/addnewAvatar">Change Avatar</Link>
                     </>
                  ):(<></>)
               }
               </div>
               <div className="right-info">
                   Name:{this.state.data.name}
                   <br />
                   Phone Number:{this.state.data.phone}
                   <br />
                   Email:{this.state.data.email}
                   <br />
                   Role:{this.state.data.role}
               </div>
            </div>
         </div>
         {
             this.state.redirect ==="true"?(
               <button className="btn btn-primary float-right" onClick={()=>this.Logout()}>Logout</button>
             ):(<></>)
         }
           {/* {
            this.state.redirect ==="false"?(
               <Navigate to="/login"/>
            ):(<></>)
            } */}
                  <RouteClass/>
         </>
      );
   }
}
export default App;
