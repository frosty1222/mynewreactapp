import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from '../../Auth';
import setHeader from '../../setHeader';
import getCookie from '../cookies/getCookie';
const URL = 'http://localhost:3001/cart/';
class PayMentComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
     };
   }
   componentDidMount(){
    if(getCookie('accessToken') !==""){
        setHeader(getCookie('accessToken'));
       }
   }
   render(){
    return (
      <div className="container">
        
      <div className="row">
            <div className="col-md-12">
            </div>
      </div>
      
     </div>
    )
   }
}
export default PayMentComponent;