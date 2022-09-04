import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
class CaterTable extends Component {
     constructor(props) {
        super(props);
        this.state = {
            caData:""
        }
        this.Delete = this.Delete.bind(this);
     }
     getCaterData(){
        axios.get('http://localhost:3001/cater/caterindex').then(res=>{
            this.setState({caData:res.data.data})
        }).catch(err=>{
            console.log(err)
        });
     }
     Delete(id){
        if(window.confirm('do you want to delete the item?')){
            axios.get('http://localhost:3001/cater/deletecater/'+id).then(res=>{
                Swal.fire({
                    icon: 'danger',
                    text:res.data.message,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'red',
                })
                this.getCaterData();
            }).catch(err=>{
                console.log(err)
            })
        }
     }
     componentDidMount() {
        this.getCaterData();
     }
     render(){
        return(
            
            <div className="container">
                  
                  <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="grap-content">
                            <Link className="btn btn-primary" to="/">Go to Dish view</Link>
                             <legend>Cater Table View</legend>
                             <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Cater Type</th>
                                            <th>Cater Main Image</th>
                                            <th>Cater Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.caData.length > 0 ?(
                                                this.state.caData.map((ca,k)=>(
                                                    <tr key={ca._id}>
                                                    <td>{k+1}</td>
                                                    <td>{ca.cater_type}</td>
                                                    <td><img src={`http://localhost:3001/caterImage/`+ca.sub_dish_one_image} width="70px" height="50px"/></td>
                                                    <td>${ca.cater_price}</td>
                                                    <td>
                                                        <Link className="btn btn-danger" to="#" onClick={()=>this.Delete(ca._id)}>Delete</Link>
                                                        <Link className="btn btn-primary" to={`/editcater/`+ca._id}>Edit</Link>
                                                        <Link className="btn btn-success" to={`/showcater/`+ca._id}>Show</Link>
                                                    </td>
                                                </tr>
                                                ))
                                            ):(
                                                <span className="btn btn-warning">empty</span>
                                            )
                                        }
                                    </tbody>
                                </table>
                             </div>
                             
                        </div>
                    </div>
                  </div>
                  
            </div>
            
        )
     }
}
export default CaterTable;