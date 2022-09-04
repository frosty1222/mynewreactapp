import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class ShowCaterComponent extends Component {
  constructor(props){
     super(props);
     this.state = {
      show:""
     }
  }
  getData(){
    const url = window.location.pathname
    const strs = url.split('/');
    const id = strs.at(-1);
    axios.post('http://localhost:3001/cater/showcater/'+id)
    .then(res=>{
       this.setState({show:res.data.showValue})
       console.log(res.data.showValue)
    })
    .catch(err=>{
       console.log(err)
    });
 }
  componentDidMount(){
    this.getData();
  }
  render(){
    return(
        <div className="container">
            
            <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="grap-content">
                    <Link className="btn btn-primary" to="/indexcater">Return Cater</Link>
                    <legend>Cater Table View</legend>
                       <div className="show-content">
                              <div className="left-img">
                                    <img src={`http://localhost:3001/caterImage/`+this.state.show.sub_dish_one_image} alt="main_image"/>
                                    <br/>
                                    <span className="text-primary">Cater price:$<b>{this.state.show.cater_price}</b></span>
                                    <br/>
                                    <span className="text-primary">Cater type:<b>{this.state.show.cater_type}</b></span>
                              </div>
                              <div className="right-sub-img">
                                   <ul>
                                       <li>Name:{this.state.show.sub_dish_two}</li>
                                       <li><img src={`http://localhost:3001/caterImage/`+this.state.show.sub_dish_two_image} alt="sub_img"/></li>
                                       <li>Name:{this.state.show.sub_dish_three}</li>
                                       <li><img src={`http://localhost:3001/caterImage/`+this.state.show.sub_dish_three_image} alt="sub_img"/></li>
                                       <li>Name:{this.state.show.sub_dish_four}</li>
                                       <li><img src={`http://localhost:3001/caterImage/`+this.state.show.sub_dish_four_image} alt="sub_img"/></li>
                                       <li>Name:{this.state.show.sub_dish_five}</li>
                                       <li><img src={`http://localhost:3001/caterImage/`+this.state.show.sub_dish_five_image} alt="sub_img"/></li>
                                       <li>Name:{this.state.show.sub_dish_six}</li>
                                       <li><img src={`http://localhost:3001/caterImage/`+this.state.show.sub_dish_six_image} alt="sub_img"/></li>
                                   </ul>
                              </div>
                       </div>
                 </div>
                </div>
            </div>
            
        </div>
        
    )
  }
}
export default ShowCaterComponent;