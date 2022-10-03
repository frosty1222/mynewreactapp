import getCookie from '../cookies/getCookie';
import setCookie from '../cookies/setCookie';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
const URL = 'http://localhost:3001/cart/';
const CountCart =()=>{
    const [caterTotalPrice,setCaterTotalPrice] = useState("");
    const [dishTotalPrice,setDishTotalPrice] = useState("");
    const [beverageTotalPrice,setBeverageTotalPrice] = useState("");
    const [code,setCode] = useState("");
    const [couponResult,setCouponResult] = useState("");
    const [couponPercentage,setCouponPercentage] = useState("");
    const [message,setMessage] = useState("");
    const dispatch = useDispatch();
    function onChangeCouponCode(e){
         setCode(e.target.value);
         console.log(code)
    }
    function getCartItem(){
        const getuserfromcookie = getCookie("user");
        if(getuserfromcookie){
          const user = JSON.parse(getuserfromcookie);
            const data ={
                user_name: user.name,
                role: user.role,
            }
             axios.post(URL+'getcartitem',data).then(res=>{
                setCookie('cartLength',res.data.data.length)
               setDishTotalPrice(res.data.data.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2));
               
             })
             .catch(err=>{
                console.log(err)
             });
        }else{
            alert('you have to login first')
        }
       }
       getCartItem();
    function getMealCart(){
        var  totalPrice =0;
        const getuserfromcookie = getCookie("user");
        if(getuserfromcookie){
          const user = JSON.parse(getuserfromcookie);
            const data ={
                user_name: user.name,
                role: user.role,
            }
             axios.post(URL+'getmealcart',data).then(res=>{
                setCookie('cartCater',res.data.data.length)
                setCaterTotalPrice(res.data.data.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2))
                res.data.data.map((c)=>{
                    for(let i =0;i<c.drink.length;i++){
                        totalPrice +=parseInt(c.drink[i].beverage_quantity) * parseInt(c.drink[i].beverage_price);
                        setBeverageTotalPrice(totalPrice)
                    }
                    
                })
             })
             .catch(err=>{
                console.log(err)
             });
        }else{
            alert('you have to login first')
        }
       }
       getMealCart();
    function checkCouponCode(){
        const id= code;
        axios.post(URL+'checkcoupon/'+id).then(res=>{
          if(res.data.data){
            setCouponResult(res.data.data)
            setCouponPercentage(res.data.data.coupon_percentage)
          }
           if(res.data.message !==""){
              setMessage(res.data.message)
           }
        }).catch(err=>{
          console.log(err)
        })
     }
    return (
     <div className="cart-length-drink" id="cart-length-drink">
        <span className="shopping-cart-beverage"><i className="text-center text-bold cart-down">Click to see Cart Info</i></span>
          <div className="sub-cart-table-drink">
          <table class="table table-hover table-bordered">
            <thead>
            <tr>
                <th>Dish TT Price</th>
                <th>Meal TT Price</th>
                <th>Drink TT Price</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${dishTotalPrice}</td>
                <td>${caterTotalPrice}</td>
                <td>${beverageTotalPrice}</td>
            </tr>
        </tbody>
       </table>
       <span className="text-primary"><b>Whole Cart Price:${parseInt(dishTotalPrice) + parseInt(caterTotalPrice) + parseInt(beverageTotalPrice)}</b></span>
        <h4 className="text-center">Check Coupon</h4>
        <input type="text" className="form-control coupon-input" placeholder="Double click input or below button" name="coupon_code"  onChange={onChangeCouponCode} onClick={()=>checkCouponCode()}/>
        <button className="btn btn-primary" onClick={()=>checkCouponCode()}>Check</button>
        <br/>
        Price After Applied Code:<b>${(parseInt(dishTotalPrice) + parseInt(caterTotalPrice) + parseInt(beverageTotalPrice))-(couponPercentage * (parseInt(dishTotalPrice) + parseInt(caterTotalPrice) + parseInt(beverageTotalPrice)))/100}</b>
          </div>
     </div>
    )
}
export default CountCart;