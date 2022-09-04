import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import getCookie from '../cookies/getCookie';
import setHeader from '../../setHeader';
class BEditComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
        beverage_name:"",
        beverage_image:"",
        beverage_price:"",
        beverage_sale_price:"",
        beverage_quantity:"",
        message:"",
        data:""
     }
     this.onSubmit = this.onSubmit.bind(this);
     this.onChangeBeverageName = this.onChangeBeverageName.bind(this);
     this.onChangeBeverageImage = this.onChangeBeverageImage.bind(this);
     this.onChangeBeveragePrice = this.onChangeBeveragePrice.bind(this);
     this.onChangeBeverageSalePrice = this.onChangeBeverageSalePrice.bind(this);
     this.onChangeBeverageQuantity = this.onChangeBeverageQuantity.bind(this);
  }
  onChangeBeverageName = (e)=>{
    this.setState({beverage_name: e.target.value});
  }
  onChangeBeverageImage = (e)=>{
    this.setState({beverage_image: e.target.files[0]});
  }
  onChangeBeveragePrice = (e)=>{
    this.setState({beverage_price: e.target.value});
  }
  onChangeBeverageSalePrice = (e)=>{
    this.setState({beverage_sale_price: e.target.value});
  }
  onChangeBeverageQuantity = (e)=>{
    this.setState({beverage_quantity: e.target.value});
  }
  onSubmit = (e)=>{
    const url = window.location.pathname
    const strs = url.split('/');
    const id = strs.at(-1);
   e.preventDefault();
   const data = new FormData();
    data.append('beverage_name',this.state.beverage_name);
    data.append('beverage_image',this.state.beverage_image);
    data.append('beverage_price',this.state.beverage_price);
    data.append('beverage_sale_price',this.state.beverage_sale_price);
    data.append('beverage_quantity',this.state.beverage_quantity);
    axios.post('http://localhost:3001/beverage/editbe/'+id,data).then(res=>{
        Swal.fire({
            icon: 'success',
            text:res.data.message,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#e3342f',
        })
    })
    .catch(err=>{
        console.log(err);
    });
  }
  getValue(){
    const url = window.location.pathname
    const strs = url.split('/');
    const id = strs.at(-1);
    axios.post('http://localhost:3001/beverage/getvalue/'+id).then(
        res=>{
           this.setState({data:res.data.value});
           this.setState({
            beverage_name:this.state.data.beverage_name,
            beverage_price:this.state.data.beverage_price,
            beverage_sale_price:this.state.data.beverage_sale_price,
            beverage_quantity:this.state.data.beverage_quantity,
           });
        }
    )
    .catch(err=>{
        console.log(err)
    });
  }
  componentDidMount(){
    this.getValue();
    if(getCookie('accessToken') !==""){
      setHeader(getCookie('accessToken'));
  }
  }
  render(){
    return(
         
         <div className="container">
               
               <div className="row">
                  <div className="grap-content">
                     <form action="#" method="POST" onSubmit={this.onSubmit}>
                        <legend>Form Edit Beverage</legend>
                     
                        <div className="form-group">
                            <label htmlFor="">Beverage Name</label>
                            <input type="text" className="form-control" value={this.state.beverage_name} name="beverage_name" onChange={this.onChangeBeverageName} placeholder="Input field" />
                        </div>
                     
                        <div className="form-group">
                            <label htmlFor="">Beverage Image</label>
                            <input type="file" className="form-control" name="beverage_image" onChange={this.onChangeBeverageImage} placeholder="Input field" />
                        </div>
                     
                        <div className="form-group">
                            <label htmlFor="">Beverage Price</label>
                            <input type="number" className="form-control" name="beverage_price" value={this.state.beverage_price} placeholder="Input field" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Beverage Sale Price</label>
                            <input type="number" className="form-control" name="beverage_sale_price" value={this.state.beverage_sale_price} placeholder="Input field" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                     </form>
                  </div>
               </div>
               
         </div>
         
        )
    }
  }
export default BEditComponent;