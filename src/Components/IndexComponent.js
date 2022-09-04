import React,{Component} from 'react';
import axios from 'axios';
import { Link,Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import $ from 'jquery';
import getCookie from './cookies/getCookie';
import setCookie from './cookies/setCookie';
import Auth from '../Auth';
import setHeader from '../setHeader';
import CartLength from '../Components/helper/CartLength';
class IndexComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:"",
            page:"",
            sortNum:"",
            Redirect:"",
            loginWarning:"",
        };
     this.Delete = this.Delete.bind(this);
     this.prevPage = this.prevPage.bind(this);
     this.nextPage = this.nextPage.bind(this);
     this.onchangeSortNum = this.onchangeSortNum.bind(this);
     this.sortFunction = this.sortFunction.bind(this);
     this.Logout = this.Logout.bind(this);
    }
    onchangeSortNum=(e)=>{
        this.setState({sortNum:e.target.value})
    }
    getData(){
            axios.get('http://localhost:3001/product/index').then(
            res=>{
                this.setState({
                    data:res.data.data,
                    page:res.data.page,
                    getRange:res.data.outrange,
                })
                // console.log(res.data.val)
            }
        )
        .catch(err=>{
            console.log(err.err)
        });
    }
    valueChange(){
        axios.get('http://localhost:3001/product/index').then(
            res=>{
                this.setState({
                    data:res.data.data,
                })
            }
        )
    }
    Delete(id){
        if(window.confirm('do you want to delete the item?')){
            axios.post('http://localhost:3001/product/deleteproduct/'+id).then(
                res=>{
                    Swal.fire({
                        icon: 'success',
                        text:res.data.message,
                        showCancelButton: true,
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#e3342f',
                    })
                    this.getData();
                }
               )
               .catch(err=>{
                console.log(err)
               })
        }
    }
    prevPage = (page)=>{
        if(page <= 0){
            $.ajax({
                method: "POST",
                url: "http://localhost:3001/product/getchangepage/"+this.state.page,
            })
            this.valueChange();
             return 0;
        }else{
            $.ajax({
                method: "POST",
                url: "http://localhost:3001/product/getchangepage/"+this.state.page,
            })
            this.valueChange();
           return this.setState({page:page-1}) 
        }
    }
    nextPage = (page)=>{
        var a = this.setState({page:page+1})
            axios.post('http://localhost:3001/product/getchangepage/'+this.state.page,)
            .then(res=>{
                // console.log(res.data.value);
                this.valueChange();
            }).catch(err=>{
                console.log(err)
            });
            // console.log(this.state.page)
            return a;
    }
    sortFunction(){
         axios.post('http://localhost:3001/product/getsort/'+this.state.sortNum,).then(
            res=>{
                console.log(res.data.val)
                this.valueChange();
            }
        )
        .catch(
            err=>{
                console.log(err)
            }
        );
    }
    getIdValue(id){
        const newData = JSON.parse(getCookie("user"));
        const data = {
            customer_name:newData.name,
            customer_phone:newData.phone,
            customer_email:newData.email,
            name:"",
            image:"",
            price:"",
            quantity:1,
            status:1
        }
        // console.log(data);
        if(window.confirm('do you wanna add cart this item')){
            axios.post('http://localhost:3001/cart/addcart/'+id,data).then(res=>{
                Swal.fire({
                    icon: 'success',
                    text:res.data.message,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#e3342f',
                })
                setCookie('cartLength',res.data.data.length)
             })
             .catch(err=>{
                console.log(err)
             });
        }
       }
    Logout(){
        Auth.logout()
        this.setState({Redirect:getCookie('authenticated')})
    }
    componentDidMount(){
        this.getData();
       if(getCookie('accessToken') !==""){
        setHeader(getCookie('accessToken'));
       }
       if(getCookie('accessToken') ==="" || getCookie('refreshToken') ===""){
          this.setState({loginWarning:"sorry for disturbing you ! your login was went wrong please logout and login again"})
       }
    }
   render(){
    return (
        <>
        {
            this.state.loginWarning !==""?(
                <legend className="text-primary text-center">{this.state.loginWarning}</legend>
            ):(<></>)
        }
         <div className="container">
            <div className="row">
            <CartLength/>
                <div className="col-md-12">
                
                    <div className="grap-content">
                   
                        <Link to="/addnew" className="btn btn-primary">Add New</Link>
                        <Link to="/indexcater" className="btn btn-warning">Return To Cater Booking</Link>
                        <button className="btn btn-primary" onClick={()=>this.Logout()}>Logout</button>
                        {this.state.Redirect === "false"?(
                              <Navigate to="/login" />
                            ):(<></>)
                          }
                        <div className="form-group right">
                               <h4>Select number of rows || now ({this.state.sortNum}) items per page</h4>
                              <select name="sortNum" onChange={this.onchangeSortNum} className="form-control" onClick={()=>this.sortFunction()}>
                                <option value="30">show all</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                              </select>
                              
                        </div>
                        <table id="mytable" className="table table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Sale Price</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        this.state.data.length>0?(
                                            this.state.data.map((d,k)=>(
                                            <tr key={d._id}>
                                                <td>{k+1}</td>
                                                <td>{d.name}</td>
                                                <td><img src={`http://localhost:3001/`+d.image} width="70px"/></td>
                                                <td>${d.price}</td>
                                                <td>${d.sale_price}</td>
                                                <td>{d.quantity}</td>
                                                <td>
                                                    
                                                    <button onClick={()=>this.Delete(d._id)} type="button" className="btn btn-danger">Delete</button>
                                                    
                                                    <Link type="button" className="btn btn-success" to={`/editItem/`+d._id}>Edit</Link>
                                                    <Link type="button" className="btn btn-secondary" to={`/showItem/`+d._id}>Show</Link>
                                                    <Link type="button" className="btn btn-primary" to="#" onClick={()=>this.getIdValue(d._id)}>Add Cart</Link>
                                                </td>
                                           
                                                </tr>
                                            
                                            ))
                                        ):(
                                         <></>
                                     )
                                    }
                               
                            </tbody>
                        </table>
                        <nav aria-label="...">
                        <ul className="pagination">
                            <li className="page-item">
                            <Link className="page-link" to={"/?page="+this.state.page} onClick={()=>this.prevPage(this.state.page)}>Previous</Link>
                            </li>
                            <li className="page-item">
                            <Link className="page-link" to={"/?page="+this.state.page} onClick={()=>this.nextPage(this.state.page)}>Next</Link>
                            </li>
                        </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        </>
       
    )
   }
}
export default IndexComponent;