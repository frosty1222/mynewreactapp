import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import getCookie from '../cookies/getCookie';
import setCookie from '../cookies/setCookie';
import setHeader from '../../setHeader';
import CartLength from '../helper/CartLength';
const CartURL = 'http://localhost:3001/cart/';
let drinks = []
class IndexCaterComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
        beData:"",
        caData:"",
        newArr:[]
     }
     this.addCart = this.addCart.bind(this);
     this.addDrink = this.addDrink.bind(this);
     this.reChoose = this.reChoose.bind(this);
  }
  getBeData(){
    axios.get('http://localhost:3001/beverage/beindex').then(
       res=>{
           this.setState({beData:res.data.data})
       }
    )
    .catch(
       err=>{
           console.log(err)
       }
    );
 }
 getCaterData(){
    axios.get('http://localhost:3001/cater/caterindex').then(res=>{
        this.setState({caData:res.data.data})
    }).catch(err=>{
        console.log(err)
    });
 }
beverageChoose(b){
    var n= b;
    const drink ={
        beverage_name:n.beverage_name,
        beverage_image:n.beverage_image,
        beverage_price:n.beverage_price,
        beverage_quantity:1
    }
    //  const data = JSON.stringify(drink)
     return drink;
}
addDrink(b){
   const drink = this.beverageChoose(b);
    // // this.state.drink.push(drink);
    // this.setState({newArr:drinks.push(drink)})
    drinks.push(drink);
}
addCart(id,name,image,price){
    const newData = JSON.parse(getCookie("user"));
    // console.log(drinks)
    const data = {
        customer_name:newData.name,
        customer_phone:newData.phone,
        customer_email:newData.email,
        name:name,
        image:image,
        price:price,
        quantity:1,
        status:1,
        drink:drinks
    }
    console.log(data);
    if(window.confirm('do you wanna pick some drinks if you want to just pick some drinks first?')){
        axios.post(CartURL+'addmealcart/'+id,data).then(res=>{
            console.log("test"+res.data.test)
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
reChoose(){
    Swal.fire({
        icon: 'success',
        text:"you have empty your cart",
        showCancelButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#e3342f',
    })
    return drinks =[];
}
  componentDidMount(){
    this.getBeData();
    this.getCaterData();
    if(getCookie('accessToken') !==""){
        setHeader(getCookie('accessToken'));
    }
  }
  render(){
    return(
        <div className="container">
             <div className="row">
             <CartLength/>
               <div className="col-md-12 mt-4">

               <Link className="btn btn-primary" to="/bindex">Go to beverage view</Link>
               <Link className="btn btn-success" to="/">Go to dish view</Link>
               <Link className="btn btn-success" to="/addcater">Add new</Link>
               <Link className="btn btn-success" to="/catertable">Go to Cater Table</Link>
               <legend className="text-center">Catering Menu</legend>
                <div className="main-card">
                {
                    this.state.caData.length >0?(
                        this.state.caData.map((ca)=>(
                            <div className="card" key={ca._id}>
                            <img className="card-img-top" src={`http://localhost:3001/caterImage/`+ca.sub_dish_one_image} alt="Card image cap" height="150px" />
                            <div className="card-body">
                                <h5 className="card-title">{ca.sub_dish_one}</h5>
                                <span className="card-text">$<b>{ca.cater_price}</b></span>
                                <br/>
                                <button type="button" className="btn btn-primary" onClick={()=>this.addCart(ca._id,ca.sub_dish_one,ca.sub_dish_one_image,ca.cater_price)}>Add Cart</button>
                            </div>
                            </div>
                        ))
                    ):(
                       <></>
                    )
                }
                    {/* card2 */}
                </div>
                   {/* beverages */}
                   <legend className="text-center">Beverages Menu</legend>
                   <button className="btn btn-primary float-right" onClick={()=>this.reChoose()}>Re-choose all</button>
                   <div className="card-beverage">
                        {/* section 2 */}
                    {
                        this.state.beData.length > 0?(
                            this.state.beData.map((b)=>(
                                <div className="card" key={b._id}>
                                <img className="card-img-top" src={`http://localhost:3001/beverage/`+b.beverage_image} alt="Card image cap" height="180px" />
                                <div className="card-body">
                                    <h5 className="card-title">{b.beverage_name}</h5>
                                    <span className="card-text">$<b>{b.beverage_sale_price}</b> <del>${b.beverage_price}</del></span>
                                    <br/>
                                    <button type="button" className="btn btn-primary" onClick={()=>this.addDrink(b)}>Pick Drink</button>
                                </div>
                                </div>
                            ))
                        ):(<></>)
                    }

                   </div>
                  </div>
             </div>
        </div>
    )
  }
}
export default IndexCaterComponent;