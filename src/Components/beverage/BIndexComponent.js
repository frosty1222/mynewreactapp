import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import getCookie from '../cookies/getCookie';
import setHeader from '../../setHeader';
class BIndexComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
        data:""
     }
     this.Delete = this.Delete.bind(this);
  }
  getData(){
     axios.get('http://localhost:3001/beverage/beindex').then(
        res=>{
            this.setState({data:res.data.data})
        }
     )
     .catch(
        err=>{
            console.log(err)
        }
     );
  }
  Delete(id){
    axios.post('http://localhost:3001/beverage/deletebe/'+id).then(res=>{
        Swal.fire({
            icon: 'danger',
            text:res.data.message,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: 'red',
        })
    })
    .catch(err=>{
        console.log(err)
    });
  }
  componentDidMount(){
    this.getData();
    if(getCookie('accessToken') !==""){
        setHeader(getCookie('accessToken'));
    }
  }
  render(){
    return(
         
         <div className="container">
               
               <div className="row">
               <div className="grap-content">
                   <Link className="btn btn-primary" to="/">Go to Dish Index</Link>
                   <Link className="btn btn-success" to="/indexcater">Go to Cater</Link>
                   <Link className="btn btn-secondary" to="/badd">Add New Beverage</Link>
                     <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Beverage Name</th>
                                    <th>Beverage Image</th>
                                    <th>Beverage Price</th>
                                    <th>Beverage Sale Price</th>
                                    <th>Beverage quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.data.length >0?(
                                        this.state.data.map((b,k)=>(
                                            <tr key={b._id}>
                                            <td>{k+1}</td>
                                            <td>{b.beverage_name}</td>
                                            <td><img src={`http://localhost:3001/beverage/`+b.beverage_image} width="70px" /></td>
                                            <td>{b.beverage_price}</td>
                                            <td>{b.beverage_sale_price}</td>
                                            <td>{b.beverage_quantity}</td>
                                            <td>
                                                <Link className="btn btn-danger" to="#" onClick={()=>this.Delete(b._id)} return="confirm('do you wanna delete this?')">Delete</Link>
                                                <Link className="btn btn-primary" to={'/bedit/'+b._id}>Edit</Link>
                                            </td>
                                        </tr>
                                        ))
                                    ):(
                                        <span className="btn btn-danger">empty</span>
                                    )
                                }
                            </tbody>
                        </table>
                     </div>
                     </div>
               </div>
               
         </div>
         
        )
    }
  }
export default BIndexComponent;