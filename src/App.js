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
    }
   }
   checkTokenLife(){
      axios.post(URL+'checktokenlife').then(res=>{
         this.setState({tokenDecoded:res.data.tokendecoded})
         this.setState({newData:JSON.parse(this.state.tokenDecoded)})
         console.log(JSON.parse(this.state.tokenDecoded))
      }).catch(err=>{
        console.log(err);
      })
   }
   Logout(){
      Auth.logout()
      this.setState({redirect:getCookie('authenticated')})
  }
   componentDidMount() {
      this.checkTokenLife();
      if(this.state.newData.message === "jwt expired"){
          Auth.logout();
          this.setState({redirect:getCookie('authenticated')});
      }
   }
   render(){
      return (
         <>
         {
             this.state.redirect ==="true"?(
               <button className="btn btn-primary float-right" onClick={()=>this.Logout()}>Logout</button>
             ):(<></>)
         }
         {
            //   this.state.redirect ==="true"?(
               
            //  ):(<></>)
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
