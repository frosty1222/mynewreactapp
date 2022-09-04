import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
class AddComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
        name:'',
        description:'',
        image:'',
        price:'',
        sale_price:'',
        quantity:'',
        message:''
     }
     this.onChangeName = this.onChangeName.bind(this);
     this.onChangeDescription = this.onChangeDescription.bind(this);
     this.onChangeImage = this.onChangeImage.bind(this);
     this.onChangePrice = this.onChangePrice.bind(this);
     this.onChangeSalePrice = this.onChangeSalePrice.bind(this);
     this.onChangeQuantity = this.onChangeQuantity.bind(this);
     this.onSubmitProduct = this.onSubmitProduct.bind(this);
   }
   onChangeName = (e)=>{
     this.setState({name: e.target.value})
   }
   onChangeDescription = (e)=>{
    this.setState({description: e.target.value})
   }
   onChangeImage = (e)=>{
    this.setState({image: e.target.files[0]})
   }
   onChangePrice =(e)=>{
    this.setState({price: e.target.value})
   }
   onChangeSalePrice = (e)=>{
    this.setState({sale_price: e.target.value})
   }
   onChangeQuantity=(e)=>{
    this.setState({quantity: e.target.value})
   }
   onSubmitProduct=(e)=>{
    e.preventDefault();
    const data = new FormData()
    data.append('name',this.state.name);
    data.append('description',this.state.description);
    data.append('image',this.state.image);
    data.append('price',this.state.price);
    data.append('sale_price',this.state.sale_price);
    data.append('quantity',this.state.quantity);
    axios.post('http://localhost:3001/product/addnewpro',data).then(
      res=>{
        //  console.log(res.data.message);
         Swal.fire({
          icon: 'success',
          text:res.data.message,
          showCancelButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#e3342f',
      })
      }
    )
    .catch(err=>{
      console.log(err);
    });
   }
   componentDidMount(){
   }
   render(){
    return (
        
        <div className="container">
             
             <div className="row">
                  <div className="col-md-12">
                       <div className="grap-content">
                            <Link to="/" className="btn btn-primary right-button">Return Index</Link>
                            <form action="#" onSubmit={this.onSubmitProduct} encType="multipart/form-data" method="post" role="form">
                              <legend>Form Add New</legend>
                            
                              <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name"  onChange={this.onChangeName} placeholder="Input field" />
                              </div>

                              <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" name="description" onChange={this.onChangeDescription} placeholder="Input field" />
                              </div>

                              <div className="form-group">
                                <label htmlFor="upload">Image</label>
                                <input type="file" className="form-control" name="image" onChange={this.onChangeImage} placeholder="Input field" />
                              </div>

                              <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input type="text" className="form-control" name="price" onChange={this.onChangePrice} placeholder="Input field" />
                              </div>

                              <div className="form-group">
                                <label htmlFor="sale_price">Sale Price</label>
                                <input type="text" className="form-control" name="sale_price" onChange={this.onChangeSalePrice} placeholder="Input field" />
                              </div>

                              <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input type="text" className="form-control" name="quantity" onChange={this.onChangeQuantity}placeholder="Input field" />
                              </div>

                              <button type="submit" onClick={this.onFileUpload} className="btn btn-primary">Submit</button>
                            </form>
                            
                       </div>
                  </div>
             </div>
             
        </div>
        
    )
   }
}
export default AddComponent;