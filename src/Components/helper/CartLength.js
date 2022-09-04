import getCookie from '../cookies/getCookie';
import setCookie from '../cookies/setCookie';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useState} from 'react';
const URL = 'http://localhost:3001/cart/';
const CartLength = ()=>{
    const cartLength = getCookie('cartLength');
    // const {data} =props;
    const [data,setData] = useState("");
    function Delete(id){
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
                setData(res.data.data)
             })
             .catch(err=>{
                console.log(err)
             });
        }else{
            alert('you have to login first')
        }
       }
       getCartItem();
    return(
        <div className="cart-length" id="cart-length">
        <span className="shopping-cart-icon"><i className="fa fa-shopping-cart"> {cartLength}</i></span>
         <div className="sub-cart-table">
         <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length >0?(
                            data.map((d,k)=>(
                                <tr key={d._id}>
                                    <td>{k+1}</td>
                                    <td>{d.name}</td>
                                    <td><img src={`http://localhost:3001/`+d.image} alt="img cart" with="50px" height="35px"/></td>
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={()=>Delete(d._id)}>Delete</button>
                                    </td>
                               </tr>
                            ))
                        ):(<></>)
                    }
                </tbody>
            </table>
            <Link to="/cart" className="btn btn-primary">Go to cart view in detail</Link>
           </div>
         </div>
        </div>
    )
}
export default CartLength;