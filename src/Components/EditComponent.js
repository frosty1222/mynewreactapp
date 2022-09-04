import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
class EditComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
       name:"",
       description:"",
       image:"",
       price:"",
       sale_price:"",
       quantity:"",
       data:""
     };
     this.onChangeName = this.onChangeName.bind(this);
     this.onChangeDescription = this.onChangeDescription.bind(this);
     this.onChangeImage = this.onChangeImage.bind(this);
     this.onChangePrice = this.onChangePrice.bind(this);
     this.onChangeSalePrice = this.onChangeSalePrice.bind(this);
     this.onChangeQuantity = this.onChangeQuantity.bind(this);
     this.onSubmitEditProduct = this.onSubmitEditProduct.bind(this);
   }
   onChangeName=(e)=>{
     this.setState({
      name: e.target.value,
     });
   }
   onChangeDescription=(e)=>{
    this.setState({
     description: e.target.value,
    });
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
   onSubmitEditProduct=(e)=>{
    e.preventDefault();
    const url = window.location.pathname
    const strs = url.split('/');
    const id = strs.at(-1);
    const data = new FormData()
    data.append('name',this.state.name);
    data.append('description',this.state.description);
    data.append('image',this.state.image);
    data.append('price',this.state.price);
    data.append('sale_price',this.state.sale_price);
    data.append('quantity',this.state.quantity);
    axios.post('http://localhost:3001/product/editproduct/'+id,data).then(
      res=>{
        //  console.log(res.data.message);
         Swal.fire({
          icon: 'success',
          text:res.data.message,
          showCancelButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#e3342f',
      })
      console.log(res.data.id);
      }
    )
    .catch(err=>{
      console.log(err);
    });
   }
   getValueId(){
        const url = window.location.pathname
        const strs = url.split('/');
        const id = strs.at(-1);
         axios.post('http://localhost:3001/product/geteditvalue/'+id).then(
        res=>{
           this.setState({data:res.data.data})
          //  console.log(res.data.data);
           this.state.data.map((d)=>{
              this.setState(
                {
                  name:d.name,
                  description:d.description,
                  price:d.price,
                  sale_price:d.sale_price,
                  quantity:d.quantity,
                }
                )
           })
        }
      )
      .catch(err=>{
        console.log(err)
      });
   }
   componentDidMount(){
    this.getValueId();
   }
   render(){
    return (
        
        <div className="container">
             
             <div className="row">
                  <div className="col-md-12">
                       <div className="grap-content">
                            <Link className="btn btn-primary float-right" to="/">Return Index</Link>
                            <form action="#" onSubmit={this.onSubmitEditProduct} role="form">
                              <legend>Form Edit Product</legend>
                            
                              <div className="form-group">
                                <label htmlFor="">Name</label>
                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChangeName} placeholder="Input field" />
                              </div>
                             
                              <div className="form-group">
                                <label htmlFor="">Description</label>
                                <input type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChangeDescription} placeholder="Input field" />
                              </div>
                              
                              <div className="form-group">
                                <label htmlFor="">Image</label>
                                <input type="file" className="form-control" name="image" placeholder="Input field" onChange={this.onChangeImage} />
                              </div>

                              <div className="form-group">
                                <label htmlFor="">Price</label>
                                <input type="text" className="form-control" name="price" value={this.state.price} placeholder="Input field" onChange={this.onChangePrice}/>
                              </div>

                              <div className="form-group">
                                <label htmlFor="">Sale Price</label>
                                <input type="text" className="form-control" name="sale_price" value={this.state.sale_price} placeholder="Input field" onChange={this.onChangeSalePrice}/>
                              </div>

                              <div className="form-group">
                                <label htmlFor="">Quantity</label>
                                <input type="text" className="form-control" name="quantity" value={this.state.quantity} placeholder="Input field" onChange={this.onChangeQuantity} />
                              </div>

                              <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            
                       </div>
                  </div>
             </div>
             
        </div>
        
    )
   }
}
export default EditComponent;