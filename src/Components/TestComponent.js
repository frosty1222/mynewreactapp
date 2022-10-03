import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Counter from '../app/features/counter/Counter';
import Auth from '../Auth';
import setHeader from '../setHeader';
import getCookie from './cookies/getCookie';
import setCookie from './cookies/setCookie';
const URL = 'http://localhost:3001/user/';
class TestComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
      data:"",
      tokenDecoded:"",
      newData:""
     };
     this.checkTokenLife = this.checkTokenLife.bind(this);
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
   componentDidMount(){
    // this.checkTokenLife();
    if(getCookie('accessToken') !==""){
        setHeader(getCookie('accessToken'));
       }
   }
   render(){
    return (
      <div className="container">
        
      <div className="row">
            <div className="col-md-12">
                 
                <div className="main-show-content"> 
                <Link className="btn btn-primary linkElement" to="/">Return Index</Link>
                    <h1>test content go here</h1>
                    <br/>
                    <button className="btn btn-primary" onClick={()=>this.checkTokenLife()}>test</button>
                    <br/>
                    <h4>{this.state.data}</h4>
                    <h4>{this.state.newData.name}</h4>
                    <br/>
                    {/* <h4>{this.state.tokenDecoded}</h4>.slice(39,-41) */}
                    <h4>Counter Section</h4>
                    <Counter />
                </div>
            </div>
      </div>
      
     </div>
    )
   }
}
export default TestComponent;