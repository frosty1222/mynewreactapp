import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const URL = 'http://localhost:3001/coupon/';
class CouponComponent extends Component{
    constructor(props){
        super(props);
      this.state ={
        coupon_name:"",
        coupon_code:"",
        coupon_expired_date:"",
        coupon_percentage:"",
        message:"",
      }
      this.onSubmitCoupon = this.onSubmitCoupon.bind(this);
      this.onChangeCouponName = this.onChangeCouponName.bind(this);
      this.onChangeCouponExpiredDate = this.onChangeCouponExpiredDate.bind(this);
      this.onChangeCouponPercentage = this.onChangeCouponPercentage.bind(this);
    }
    onChangeCouponName =(e)=>{
      this.setState({coupon_name:e.target.value});
    }
    onChangeCouponCode =(e)=>{
        this.setState({coupon_code:e.target.value});
      }
    onChangeCouponExpiredDate =(e)=>{
    this.setState({coupon_expired_date:e.target.value});
    }
    onChangeCouponPercentage =(e)=>{
        this.setState({coupon_percentage:e.target.value});
    }
    onSubmitCoupon=(e)=>{
     e.preventDefault();
     const data = {
        coupon_name:this.state.coupon_name,
        coupon_code:this.state.coupon_code,
        coupon_expired_date:this.state.coupon_expired_date,
        coupon_percentage:this.state.coupon_percentage
     }
     axios.post(URL+'addcoupon',data).then(res=>{
        Swal.fire({
            icon: 'success',
            text:res.data.message,
            showCancelButton: true,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#e3342f',
        })
     })
     .catch(err=>{
        console.log(err)
     })
    }
  componentDidMount(){

  }
  render(){ 
    return (
        
        <div className="container">
              
              <div className="row">
                    <legend className="text-center text-primary">Making Coupon</legend>
                    <div className="grap-content">
                        
                        <form action="#" onSubmit={this.onSubmitCoupon} method="POST">
                            <legend>Make Coupon Form</legend>
                            
                            <div className="form-group">
                                <label htmlFor="">Coupon Name</label>
                                <input type="text" className="form-control" name="coupon_name" onChange={this.onChangeCouponName} placeholder="Enter coupon code..." />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Coupon Code</label>
                                <input type="text" className="form-control" name="coupon_code" onChange={this.onChangeCouponCode} placeholder="Enter coupon code..." />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="">Coupon Expired Date</label>
                                <input type="date" className="form-control" name="coupon_expired_date" onChange={this.onChangeCouponExpiredDate} />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="">Coupon Percentage</label>
                                <input type="number" className="form-control" name="coupon_percentage" onChange={this.onChangeCouponPercentage} placeholder="Enter Coupon Percentage..." />
                            </div>

                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                        
                    </div>
              </div>
              
        </div>
        
    )
  }
}
export default CouponComponent;