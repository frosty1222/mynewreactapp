import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Imgs from '../images/404.jpg';
class PageNotFound extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render(){
        return (
         <div class="container">
         
         <div class="jumbotron text-center">
             <div class="container">
                 <h1>The page not found</h1>
                 <img id="pagenotfoundimg" src={require('../images/404.jpg')} alt="" width="600px" height="200px"/>
                 <h3>You can turn to index page by click this button</h3>
                 <p>
                     <Link class="btn btn-primary btn-lg" to="/">return index</Link>
                 </p>
             </div>
         </div>
                 
         </div>
        )
     }
}
export default PageNotFound;