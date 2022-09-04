import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class EditComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
      data:"",
     };
   }
   getData = ()=>{
      const url = window.location.pathname
      const strs = url.split('/');
      const id = strs.at(-1);
      axios.post('http://localhost:3001/product/showproduct/'+id,)
      .then(res=>{
         this.setState({data:res.data.showValue})
         console.log(res.data.showValue);
      })
      .catch(err=>{
         console.log(err)
      });
   }
   componentDidMount(){
      this.getData();
   }
   render(){
    return (
      <div className="container">
        
      <div className="row">
            <div className="col-md-12">
                 
                <div className="main-show-content"> 
                <Link className="btn btn-primary linkElement" to="/">Return Index</Link>
                <div className="grap-content-show">
                      <div className="left-image">
                         <img src={`http://localhost:3001/`+this.state.data.image} className="img-responsive" alt="Image" />
                      </div>
                      <div className="right-info">
                          <span className="left-text">ID:{this.state.data._id}</span>
                          <span className="left-text">Name:{this.state.data.name}</span>
                          <span className="left-text">Description:{this.state.data.description}</span>
                          <span className="left-text">Price:${this.state.data.price}</span>
                          <span className="left-text">Sale Price:${this.state.data.sale_price}</span>
                          <span className="left-text">Quantity:{this.state.data.quantity}</span>
                      </div>
                 </div>
                </div>
            </div>
      </div>
      
     </div>
    )
   }
}
export default EditComponent;