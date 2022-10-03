import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from '../../Auth';
import setHeader from '../../setHeader';
import getCookie from '../cookies/getCookie';
import Swal from 'sweetalert2';
import $ from 'jquery';
const URL = 'http://localhost:3001/history/';
var beverageTotalPrice;
var dishTotalPrice;
class HistoryComponent extends Component {
   constructor(props){
    super(props);
     this.state = {
      data:"",
      from_month:"",
      from_day:"",
      to_month:"",
      to_day:"",
      single_day:"",
      single_month:"",
      option:"",
      months:['0'+1,'0'+2,'0'+3,'0'+4,'0'+5,'0'+6,'0'+7,'0'+8,'0'+9,10,11,12],
      days:['0'+1,'0'+2,'0'+3,'0'+4,'0'+5,'0'+6,'0'+7,'0'+8,'0'+9,10,11,12,13,14,15,15,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      page:"",
     }
     this.Delete = this.Delete.bind(this);
     this.getSort = this.getSort.bind(this);
     this.onChangeFromDay = this.onChangeFromDay.bind(this);
     this.onChangeFromMonth = this.onChangeFromMonth.bind(this);
     this.onChangeToDay = this.onChangeToDay.bind(this);
     this.onChangeToMonth = this.onChangeToMonth.bind(this);
     this.onChangeOption = this.onChangeOption.bind(this);
     this.onChangeSingleMonth = this.onChangeSingleMonth.bind(this);
     this.onChangeSingleDay = this.onChangeSingleDay.bind(this);
     this.prevPage = this.prevPage.bind(this);
     this.nextPage = this.nextPage.bind(this);
   }
   onChangeFromDay =(e)=>{
       this.setState({from_day:e.target.value})
   }
   onChangeFromMonth =(e)=>{
    this.setState({from_month:e.target.value})
   }
   onChangeToDay =(e)=>{
    this.setState({to_day:e.target.value})
}
  onChangeToMonth =(e)=>{
  this.setState({to_month:e.target.value})
  }
   onChangeOption =(e)=>{
    this.setState({option:e.target.value})
   }
   onChangeSingleMonth =(e)=>{
    this.setState({single_month:e.target.value})
   } 
   onChangeSingleDay =(e)=>{
    this.setState({single_day:e.target.value})
   }
   getHistory(){
    var bTotalPrice =0;
    var dTotalPrice =0;
    axios.get(URL+'historyIndex').then(res=>{
       this.setState({data:res.data.data});
       const data = this.state.data;
       this.setState({page:res.data.page});
           for(let i=0;i<data.length;i++){
              bTotalPrice += data[i].drink_price;
              dTotalPrice += data[i].price * data[i].quantity;
              beverageTotalPrice =bTotalPrice;
              dishTotalPrice = dTotalPrice;
           }
    }).catch(err=>{
      console.log(err);
    })
  }
  Delete(id){
    if(window.confirm('Are you sure wanna do this action?')){
      axios.post(URL+'historyDelete/'+id).then(res=>{
        Swal.fire({ title: 'Auto close alert!',
                    text: res.data.message + 'this will close in 2 seconds.',
                    timer: 2000
          })
         this.getHistory(); 
      }).catch(err=>{
       console.log(err)
      })
    }
  }
  getSort(){
    const d = new Date();
    var years = d.getFullYear();
    if(this.state.single_month !==""){
      const source = {
        time:years + '/' +this.state.single_month + '/' +this.state.single_day,
        from_time:years + '/' +this.state.from_month + '/' +this.state.from_day,
        to_time:years + '/' +this.state.to_month + '/' +this.state.to_day,
      }
      axios.post(URL+'getsort',source).then(res=>{
        console.log(res.data.val)
        console.log(res.data.time)
      }).catch(err=>{
        console.log(err)
      })
      this.getHistory();
    }else{
      const source = {
        from_time:years + '/' +this.state.from_month + '/' +this.state.from_day,
        to_time:years + '/' +this.state.to_month + '/' +this.state.to_day,
      }
      axios.post(URL+'getsort',source).then(res=>{
        console.log(res.data.val)
        console.log(res.data.time)
      }).catch(err=>{
        console.log(err)
      })
      this.getHistory();
    }
  }
  prevPage = (page)=>{
    if(page <= 0){
        $.ajax({
            method: "POST",
            url: "http://localhost:3001/history/getchangepage/"+this.state.page,
        })
        this.getValueChange();
        return 0;
    }else{
        $.ajax({
            method: "POST",
            url: "http://localhost:3001/history/getchangepage/"+this.state.page,
        })
        this.getValueChange();
       return this.setState({page:page-1}); 
    }
}
nextPage=(page)=>{
      $.ajax({
        method: "POST",
        url: "http://localhost:3001/history/getchangepage/"+this.state.page,
       })
       this.getValueChange();
      return this.setState({page:page+1}); 
}
getValueChange(){
  axios.get(URL+'historyIndex').then(res=>{
    this.setState({data:res.data.data});
 }).catch(err=>{
   console.log(err);
 })
}
   componentDidMount(){
    this.getHistory();
    if(getCookie('accessToken') !==""){
        setHeader(getCookie('accessToken'));
       }
   }
   render(){
    return (
      <div className="container">
        
      <div className="row">
            <div className="col-md-12">
                <div className="history-container">
                    <Link to="/" className='btn btn-success'>Turn To Order Food</Link>
                    <div className="table-responsive">
                      <h4>Please pick time to sort Results</h4>
                      <h4>You don't need to pick year because we get this curent year</h4>
                      <h4>Searching options</h4>
                      <select name="option" id="input" class="" required="required" onChange={this.onChangeOption}>
                        <option value="">all</option>
                        <option value="search_by_month">search by month</option>
                        <option value="single_searching">single searching</option>
                      </select>
                      {
                        this.state.option ==='single_searching' ?(
                          <div className="form-group selected">
                          <h4>Month:</h4>
                          <select name="single_month" id="input" className="form-control select" required="required"  onChange={this.onChangeSingleMonth}>
                              <option value="">pick month</option>
                              {
                                this.state.months.length>0?(
                                  this.state.months.map((m)=>(
                                    <option value={m}>{m}</option>
                                  ))
                                ):(<></>)
                              }
                          </select>
                          <h4>Day:</h4>
                          <select name="single_day" id="input" className="form-control select" required="required" onChange={this.onChangeSingleDay}>
                              <option value="">pick day</option>
                              {
                                this.state.days.length>0?(
                                  this.state.days.map((d)=>(
                                    <option value={d}>{d}</option>
                                  ))
                                ):(<></>)
                              }
                          </select>
                          <button type="button" className="btn btn-success" onClick={()=>this.getSort()}>Sort now</button>
                          </div>
                        ):(<></>)
                      }
                      {
                        this.state.option ==='search_by_month' ?(
                          <div className="form-group selected">
                          <h4> From Month:</h4>
                          <select name="from_month" id="input" className="form-control select" required="required"  onChange={this.onChangeFromMonth}>
                              <option value="">pick month</option>
                              {
                                this.state.months.length>0?(
                                  this.state.months.map((m)=>(
                                    <option value={m}>{m}</option>
                                  ))
                                ):(<></>)
                              }
                          </select>
                          <h4>From Day:</h4>
                          <select name="from_day" id="input" className="form-control select" required="required" onChange={this.onChangeFromDay}>
                              <option value="">pick day</option>
                              {
                                this.state.days.length>0?(
                                  this.state.days.map((d)=>(
                                    <option value={d}>{d}</option>
                                  ))
                                ):(<></>)
                              }
                          </select>
                          <div className="form-group selected">
                          <h4>To Month:</h4>
                          <select name="to_month" id="input" className="form-control select" required="required"  onChange={this.onChangeToMonth}>
                              <option value="">pick month</option>
                              {
                                this.state.months.length>0?(
                                  this.state.months.map((m)=>(
                                    <option value={m}>{m}</option>
                                  ))
                                ):(<></>)
                              }
                          </select>
                          <h4>To Day:</h4>
                          <select name="to_day" id="input" className="form-control select" required="required" onChange={this.onChangeToDay}>
                              <option value="">pick day</option>
                              {
                                this.state.days.length>0?(
                                  this.state.days.map((d)=>(
                                    <option value={d}>{d}</option>
                                  ))
                                ):(<></>)
                              }
                          </select>
                          <button type="button" className="btn btn-success" onClick={()=>this.getSort()}>Sort now</button>
                          </div>
                          {/* <button type="button" className="btn btn-success" onClick={()=>this.getSort()}>Sort now</button> */}
                          </div>
                        ):(<></>)
                      }
                      <table className="table table-hover table-responsive table-striped">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Purchase Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.data.length >0?(
                              this.state.data.map((item,k)=>(
                                <tr key={item._id}>
                                <td>{k+1}</td>
                                <td>{item.name}</td> 
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.paytime}</td>
                                <td>
                                  <Link to="#" className='btn btn-danger' onClick={()=>this.Delete(item._id)}>Delete</Link>
                                </td>
                              </tr>
                              ))
                            ):(<span className="btn btn-danger">empty</span>)
                          }
                        </tbody>
                      </table>
                      <legend className='text-center'>Statistics</legend>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Beverage Total Price</th>
                            <th>Food Total Price</th>
                            <th>Whole Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><b>$<big>{beverageTotalPrice}</big></b></td>
                            <td><b>$<big>{dishTotalPrice}</big></b></td>
                            <td><b>$<big>{beverageTotalPrice + dishTotalPrice}</big></b></td>
                          </tr>
                        </tbody>
                      </table>
                      
                    </div>
                    <nav aria-label="Page navigation example text-center">
                        <ul className="pagination ">
                            <li className="page-item"><Link className="page-link" to={"/history?page="+this.state.page} onClick={()=>this.prevPage(this.state.page)}>Previous</Link></li>
                            <li className="page-item"><Link className="page-link" to={"/history?page="+this.state.page} onClick={()=>this.nextPage(this.state.page)}>Next</Link></li>
                        </ul>
                        </nav>
                </div>
            </div>
      </div>
      
     </div>
    )
   }
}
export default HistoryComponent;