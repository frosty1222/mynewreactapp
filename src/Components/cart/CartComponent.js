import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import getCookie from '../cookies/getCookie';
import CartLength from '../helper/CartLength';
import CountCart from '../helper/CountCart';
import Swal from 'sweetalert2';
import setCookie from '../cookies/setCookie';
import $ from 'jquery';
const URL = 'http://localhost:3001/cart/';
const proDuctURLImage =`http://localhost:3001/`;
const caterUrlImage = `http://localhost:3001/caterImage`;
const paymentURL = `http://localhost:3001/payment/`;
class CartComponent extends Component {
   constructor(props){
    super(props);
    this.state = {
        data:"",
        cartLength:"",
        originalPrice:"",
        newData:"",
        coupon_code:"",
        coupon_result:"",
        percentage:"",
        couponMessage:"",
        caterCart:"",
        drinkItem:[],
        warning:"empty",
        drinkPrice:""
    }
    this.Delete = this.Delete.bind(this);
    this.DeleteCaterMeal = this.DeleteCaterMeal.bind(this); 
    this.onChangeCouponCode = this.onChangeCouponCode.bind(this);
    this.checkCouponCode = this.checkCouponCode.bind(this);
    this.deleteBeverageItem = this.deleteBeverageItem.bind(this);
    this.updateCartStatus = this.updateCartStatus.bind(this);
    this.MoveToHistory = this.MoveToHistory.bind(this);
   }
   getCartItem(){
    const getuserfromcookie = getCookie("user");
    if(getuserfromcookie){
      const user = JSON.parse(getuserfromcookie);
        const data ={
            user_name: user.name,
            role: user.role,
        }
         axios.post(URL+'getcartitem',data).then(res=>{
            this.setState({data:res.data.data})
            setCookie('cartLength',res.data.data.length)
         })
         .catch(err=>{
            console.log(err)
         });
    }else{
        alert('you have to login first')
    }
   }
   onChangeCouponCode=(e)=>{
      this.setState({coupon_code:e.target.value})
   }
   Delete(id){
    if(window.confirm('do you want to delete the item?')){
        axios.post(URL+'/removecartitem/'+id).then(res=>{
            Swal.fire({
               icon: 'warning',
               text:res.data.message,
               showCancelButton: true,
               confirmButtonText: 'Ok',
               confirmButtonColor: 'red',
            })
            this.getCartItem();
       }).catch(err=>{
           console.log(err)
       });
    }
   }
   DeleteCaterMeal(id){
    if(window.confirm('do you want to delete the item?')){
        axios.post(URL+'/removemealcart/'+id).then(res=>{
            Swal.fire({
               icon: 'warning',
               text:res.data.message,
               showCancelButton: true,
               confirmButtonText: 'Ok',
               confirmButtonColor: 'red',
            })
            this.getMealCart();
       }).catch(err=>{
           console.log(err)
       });
    }
   }
   checkCouponCode(){
      const id= this.state.coupon_code;
      axios.post(URL+'checkcoupon/'+id).then(res=>{
        if(res.data.data){
            this.setState({coupon_result:res.data.data})
            this.setState({percentage:this.state.coupon_result.coupon_percentage})
            this.setState({originalPrice:this.state.newData.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)})
        }
         if(res.data.message !==""){
            this.setState({couponMessage:res.data.message})
         }
      }).catch(err=>{
        console.log(err)
      })
   }
   getMealCart(){
    var totalPrice =0;
    const getuserfromcookie = getCookie("user");
    if(getuserfromcookie){
      const user = JSON.parse(getuserfromcookie);
        const data ={
            user_name: user.name,
            role: user.role,
        }
         axios.post(URL+'getmealcart',data).then(res=>{
            this.setState({caterCart:res.data.data})
            setCookie('cartCater',res.data.data.length)
         })
         .catch(err=>{
            console.log(err)
         });
    }else{
        alert('you have to login first')
    }
   }
   deleteBeverageItem(id,name,image,price,quantity){
    const data = {
        beverage_name:name,
        beverage_image:image,
        beverage_price:price,
        beverage_quantity:quantity,
        cater_name:id
    }
       if(window.confirm('Are you sure you want to delete this item?')){
        axios.post(URL +'removebeverageitem',data).then(res=>{
            Swal.fire({
                icon: 'warning',
                text:res.data.message,
                showCancelButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'red',
             })
        this.getMealCart();
        }).catch(err=>{
            console.log(err)
        })
       }
   }
   updateCartStatus(name){
     const data ={
        status:2,
        name:name
     }
     if(window.confirm('are you sure?')){
        axios.post(paymentURL+'changeCartStatus',data).then(
            res=>{
                Swal.fire({
                    icon: 'success',
                    text:res.data.message,
                    showCancelButton: true,
                    confirmButtonText: 'Ok',
                    confirmButtonColor: 'green',
                 })
                 this.getMealCart();
                 this.getCartItem();
            }
           )
           .catch(err=>{
              console.log(err);
        });
     }
   }
   MoveToHistory(id,name,price,image,quantity,paytime){
    const user = JSON.parse(getCookie("user"));
       
       const data = {
            id:id,
            name:name,
            image:image,
            price:price,
            quantity:quantity,
            paytime:paytime,
            customer_name:user.name,
            customer_phone:user.phone,
            customer_email:user.email,
            drink_price:this.state.drinkPrice
       }
       axios.post(paymentURL+'movetohistory',data).then(
        res=>{
            Swal.fire({
                icon: 'success',
                text:res.data.message,
                showCancelButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: 'green',
             })
             this.getMealCart();
             this.getCartItem();
        }
       )
       .catch(err=>{
        console.log(err)
       });
   }
   componentDidMount(){
        this.getCartItem();
        this.getMealCart();
       $('#cart-length-drink').on('mouseover',function(){
        $('.table-responsive').css('opacity',0);
       })
        $('#cart-length-drink').on('mouseleave',function(){
            $('.table-responsive').css('opacity',1);
        })
        $('#cart-length').on('mouseover',function(){
            $('#table-hover').css('opacity',0);
            $('#cart-length-drink').css('opacity',0)
        })
        $('#cart-length').on('mouseleave',function(){
            $('#table-hover').css('opacity',1);
            $('#cart-length-drink').css('opacity',1)
        })
   }
   render(){
     return (
        <div className="container">
              <div className="row">
                         <CartLength/>
                         <CountCart/>
                         <Link className="btn btn-primary" to="/">Back to Shop</Link>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mt-4">
                       <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                       <legend className="text-center">Dish Cart</legend>
                             <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Product Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.data.length >0?(
                                                this.state.data.map((ca,k)=>(
                                                    <tr key={ca._id}>
                                                        <td>{k+1}</td>
                                                        <td>{ca.name}</td>
                                                        <td><img src={proDuctURLImage+ca.image} alt="img ca" with="50px" height="50px"/></td>
                                                        <td>${ca.price}</td>
                                                        <td>{ca.quantity}</td>
                                                        <td>{ca.quantity * ca.price}</td>
                                                        {ca.status === 1?(
                                                            <td>
                                                                <button type="button" className="btn btn-primary" onClick={()=>this.updateCartStatus(ca.name)}>Served</button>
                                                            </td>
                                                        ):(<></>)
                                                        }{
                                                            ca.status === 2?(
                                                                <td>completed</td>
                                                            ):(<></>)
                                                        }
                                                        <td>
                                                            {
                                                                getCookie('role') ==='admin' && ca.status === 2?(
                                                                    <Link className="btn btn-danger" to="#" onClick={()=>this.MoveToHistory(ca._id,ca.name,ca.price,ca.image,ca.quantity,ca.paytime)}>Move to history</Link>
                                                                ):(
                                                                    <Link className="btn btn-danger" to="#" onClick={()=>this.Delete(ca._id)}>Delete Item</Link>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            ):(<></>)
                                        }
                                    </tbody>
                                </table>
                             </div>
                             
                       </div>
              
                       <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                       <legend className="text-center">Meal Cart</legend>
                             <div className="table-responsive" id="table-hover">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Product Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.caterCart.length >0?(
                                                this.state.caterCart.map((ca,k)=>(
                                                    <tr key={ca._id}>
                                                        <td>{k+1}</td>
                                                        <td>{ca.name}</td>
                                                        <td><img src={proDuctURLImage+'caterImage/'+ca.image} alt="img ca" with="50px" height="50px"/></td>
                                                        <td>${ca.price}</td>
                                                        <td>{ca.quantity}</td>
                                                        <td>${ca.quantity * ca.price}</td>
                                                        {ca.status === 1?(
                                                            <td>
                                                                <button type="button" className="btn btn-primary" onClick={()=>this.updateCartStatus(ca.name)}>Served</button>
                                                            </td>
                                                        ):(<></>)
                                                        }{
                                                            ca.status === 2?(
                                                                <td>completed</td>
                                                            ):(<></>)
                                                        }
                                                        <td>
                                                        {
                                                                getCookie('role') ==='admin'?(
                                                                    <Link className="btn btn-danger" to="#"  onClick={()=>this.MoveToHistory(ca._id,ca.name,ca.price,ca.image,ca.quantity,ca.paytime)}>Move to history</Link>
                                                                ):(
                                                                    <Link className="btn btn-danger" to="#"  onClick={()=>this.DeleteCaterMeal(ca._id)}>Delete Item</Link>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            ):(<></>)
                                        }
                                    </tbody>
                                </table>
                             </div>
                             
                       </div>
                       <div className="clearFix"></div>
                       <legend className="text-center">Drink cart</legend>
                        <div className="drink-container" id="table-hover">
                             
                             <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Beverage Name</th>
                                        <th>Beverage Image</th>
                                        <th>Beverage Price</th>
                                        <th>Beverage Quantity</th>
                                        <th>Total Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      this.state.caterCart.length >0?(
                                        this.state.caterCart.map((d)=>(
                                            d.drink.map((t,k)=>(
                                            <tr key={d.index}>
                                                <td>{k+1}</td>
                                                <td>{t.beverage_name}</td>
                                                <td><img src={proDuctURLImage+'beverage/'+t.beverage_image} width="50px" height="50px"/></td>
                                                <td>${t.beverage_price}</td>
                                                <td>{t.beverage_quantity}</td>
                                                <td>${t.beverage_price * t.beverage_quantity}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger" onClick={()=>this.deleteBeverageItem(d.name,t.beverage_name,t.beverage_image,t.beverage_price,t.beverage_quantity)}>Delete</button>
                                                </td>
                                             </tr>
                                            ))
                                        ))
                                    ):(<></>)
                                    }
                                </tbody>
                             </table>
                             <Link className="btn btn-primary" to="/payment">Served All</Link>
                        </div>
                        <nav aria-label="Page navigation example text-center">
                        <ul class="pagination ">
                            <li class="page-item"><Link class="page-link" to="/cart?page=1">Previous</Link></li>
                            <li class="page-item"><Link class="page-link" to="/cart?page=1">Next</Link></li>
                        </ul>
                        </nav>
                    </div>
              </div>
        </div>
        
     )
   }
}
export default CartComponent;