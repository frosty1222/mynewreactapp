import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import setHeader from '../../setHeader';
import getCookie from '../cookies/getCookie';
import setCookie from '../cookies/setCookie';
import Swal from 'sweetalert2';
const URL = 'http://localhost:3001/user/';
class AddNewAvatar extends Component {
   constructor(props){
    super(props);
     this.state = {
        avatar:"",
     }
     this.onSubmit = this.onSubmit.bind(this);
     this.onChangeAvatar = this.onChangeAvatar.bind(this);
   }
   onChangeAvatar =(e)=>{
     this.setState({avatar:e.target.files[0]})
   }
   onSubmit =(e)=>{
       e.preventDefault();
       const newData = JSON.parse(getCookie("user"));

       const data =new FormData();
       data.append('avatar',this.state.avatar)
       data.append('id',newData._id)
       axios.post(URL+'addnewavatar',data).then(res=>{
          Swal.fire({
            title: 'success',
            text:res.data.message,
            timer: 2000,
            color:'green'
          })
       }).catch(err=>{
        console.log(err)
       })
   }
   componentDidMount(){
   }
   render(){
    return (
      <div className="container">
        
      <div className="row">
            <div className="col-md-12">
                 
                <div className="main-show-content"> 
                <Link className="btn btn-primary linkElement" to="/">Return Index</Link>
                    
                    <form action="#" method="POST" role="form" onSubmit={this.onSubmit}>
                        <legend>Form title</legend>
                    
                        <div class="form-group">
                            <label for="avatar">Avatar</label>
                            <input type="file" class="form-control" name="avatar" onChange={this.onChangeAvatar} placeholder="Choose file..." />
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
      </div>
      
     </div>
    )
   }
}
export default AddNewAvatar;