import axios from 'axios';
import React,{Component} from 'react';
import {Link,Navigate} from 'react-router-dom'; 
import Swal from 'sweetalert2';
class EditCaterComponent extends Component {
    constructor(props){
        super(props)
        this.state ={
            cater_type:"",
            sub_dish_one:"",
            sub_dish_one_image:"",
            sub_dish_two:"",
            sub_dish_two_image:"",
            sub_dish_three:"",
            sub_dish_three_image:"",
            sub_dish_four:"",
            sub_dish_four_image:"",
            sub_dish_five:"",
            sub_dish_five_image:"",
            sub_dish_six:"",
            sub_dish_six_image:"",
            cater_price:"",
            message:"",
            getIdData:""
        }
        this.onChangeCaterType = this.onChangeCaterType.bind(this);
        this.onChangeSubDishOne = this.onChangeSubDishOne.bind(this);
        this.onChangeSubDishTwo = this.onChangeSubDishTwo.bind(this);
        this.onChangeSubDishThree = this.onChangeSubDishThree.bind(this);
        this.onChangeSubDishFour = this.onChangeSubDishFour.bind(this);
        this.onChangeSubDishFive = this.onChangeSubDishFive.bind(this);
        this.onChangeSubDishSix = this.onChangeSubDishSix.bind(this);
        this.onChangeSubDishOneImage = this.onChangeSubDishOneImage.bind(this);
        this.onChangeSubDishTwoImage = this.onChangeSubDishTwoImage.bind(this);
        this.onChangeSubDishThreeImage = this.onChangeSubDishThreeImage.bind(this);
        this.onChangeSubDishFourImage = this.onChangeSubDishFourImage.bind(this);
        this.onChangeSubDishFiveImage = this.onChangeSubDishFiveImage.bind(this);
        this.onChangeSubDishSixImage = this.onChangeSubDishSixImage.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
    }
    onChangeCaterType = (e)=>{
      this.setState({cater_type:e.target.value});
    }
    onChangeSubDishOne = (e)=>{
        this.setState({sub_dish_one:e.target.value});
    }
    onChangeSubDishOneImage = (e)=>{
        this.setState({sub_dish_one_image:e.target.files[0]});
    }
    onChangeSubDishTwo =(e)=>{
        this.setState({sub_dish_two:e.target.value});
    }
    onChangeSubDishTwoImage = (e)=>{
        this.setState({sub_dish_two_image:e.target.files[0]});
    }
    onChangeSubDishThree =(e)=>{
        this.setState({sub_dish_three:e.target.value});
    }
    onChangeSubDishThreeImage = (e)=>{
        this.setState({sub_dish_three_image:e.target.files[0]});
    }
    onChangeSubDishFour =(e)=>{
        this.setState({sub_dish_four:e.target.value});
    }
    onChangeSubDishFourImage = (e)=>{
        this.setState({sub_dish_four_image:e.target.files[0]});
    }
    onChangeSubDishFive=(e)=>{
        this.setState({sub_dish_five:e.target.value});
    }
    onChangeSubDishFiveImage = (e)=>{
        this.setState({sub_dish_five_image:e.target.files[0]});
    }
    onChangeSubDishSix =(e)=>{
        this.setState({sub_dish_six:e.target.value});
    }
    onChangeSubDishSixImage = (e)=>{
        this.setState({sub_dish_six_image:e.target.files[0]});
    }
    onChangePrice = (e)=>{
        this.setState({cater_price:e.target.value});
    }
    getIdValue(){
        const url = window.location.pathname
        const strs = url.split('/');
        const id = strs.at(-1);
        axios.post('http://localhost:3001/cater/getidvalue/'+id).then(
            res=>{
                this.setState({getIdData:res.data.data})
                this.state.getIdData.map((i)=>{
                    this.setState({
                        cater_type:i.cater_type,
                        sub_dish_one:i.sub_dish_one,
                        sub_dish_two:i.sub_dish_two,
                        sub_dish_three:i.sub_dish_three,
                        sub_dish_four:i.sub_dish_four,
                        sub_dish_five:i.sub_dish_five,
                        sub_dish_six:i.sub_dish_six,
                        cater_price:i.cater_price,
                    })
                })
            }
           
        )
        .catch();
    }
    onSubmit = (e)=>{
        e.preventDefault();
        const url = window.location.pathname
        const strs = url.split('/');
        const id = strs.at(-1);
        const data = new FormData();
        data.append('cater_type',this.state.cater_type);
        data.append('sub_dish_one',this.state.sub_dish_one);
        data.append('sub_dish_one_image',this.state.sub_dish_one_image);
        data.append('sub_dish_two',this.state.sub_dish_two);
        data.append('sub_dish_two_image',this.state.sub_dish_two_image);
        data.append('sub_dish_three',this.state.sub_dish_three);
        data.append('sub_dish_three_image',this.state.sub_dish_three_image);
        data.append('sub_dish_four',this.state.sub_dish_four);
        data.append('sub_dish_four_image',this.state.sub_dish_four_image);
        data.append('sub_dish_five',this.state.sub_dish_five);
        data.append('sub_dish_five_image',this.state.sub_dish_five_image);
        data.append('sub_dish_six',this.state.sub_dish_six);
        data.append('sub_dish_six_image',this.state.sub_dish_six_image);
        data.append('cater_price',this.state.cater_price);
        // console.log(this.state.sub_dish_one_image);
        axios.post('http://localhost:3001/cater/editCaterBackend/'+id,data).then(res=>{
            Swal.fire({
                icon: 'success',
                text:res.data.message,
                showCancelButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#e3342f',
            })
            console.log(res.data.alert);
        }).catch(err=>{
            console.log(err);
        });
    }
   componentDidMount(){
    this.getIdValue();
   }
   render(){
      return(
        <div className="container">
             
             <div className="row">
                    
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="grap-content">
                        <Link className="btn btn-success" to="/catertable">Go to Cater Table</Link>
                            <form action="#" onSubmit={this.onSubmit} method="POST" role="form" encType="multipart/form-data">
                            <legend>Form Edit Cater</legend>
                                <div className="form-group">
                                    <label htmlFor="">Cater Type</label>
                                    <input type="text" className="form-control" value={this.state.cater_type} name="cater_type" onChange={this.onChangeCaterType} placeholder="Input field" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish One</label>
                                    <input type="text" className="form-control" value={this.state.sub_dish_one} name="sub_dish_one" onChange={this.onChangeSubDishOne} placeholder="Input field" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish One Image</label>
                                    <input type="file" className="form-control" name="sub_dish_one_image" placeholder="Input field" onChange={this.onChangeSubDishOneImage} />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="">sub dish Two</label>
                                    <input type="text" className="form-control" value={this.state.sub_dish_two} name="sub_dish_two" onChange={this.onChangeSubDishTwo} placeholder="Input field" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish One Image</label>
                                    <input type="file" className="form-control" name="sub_dish_two_image" placeholder="Input field" onChange={this.onChangeSubDishTwoImage} />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="">sub dish Three</label>
                                    <input type="text" className="form-control" value={this.state.sub_dish_three} name="sub_dish_three" onChange={this.onChangeSubDishThree} placeholder="Input field" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish Three Image</label>
                                    <input type="file" className="form-control" name="sub_dish_three_image" placeholder="Input field" onChange={this.onChangeSubDishThreeImage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">sub dish Four</label>
                                    <input type="text" className="form-control" value={this.state.sub_dish_four} name="sub_dish_four" onChange={this.onChangeSubDishFour} placeholder="Input field" />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish Four Image</label>
                                    <input type="file" className="form-control" name="sub_dish_four_image" placeholder="Input field" onChange={this.onChangeSubDishFourImage} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">sub dish Five</label>
                                    <input type="text" className="form-control" value={this.state.sub_dish_five} name="sub_dish_five" placeholder="Input field" onChange={this.onChangeSubDishFive} />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish Five Image</label>
                                    <input type="file" className="form-control" name="sub_dish_five_image" placeholder="Input field" onChange={this.onChangeSubDishFiveImage}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">sub dish six</label>
                                    <input type="text" className="form-control" value={this.state.sub_dish_six} name="sub_dish_six" placeholder="Input field" onChange={this.onChangeSubDishSix} />
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor="">sub dish six Image</label>
                                    <input type="file" className="form-control" name="sub_dish_six_image" placeholder="Input field" onChange={this.onChangeSubDishSixImage}/>
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="">Cater Price</label>
                                    <input type="text" className="form-control" value={this.state.cater_price} name="cater_price" placeholder="Input field" onChange={this.onChangePrice} />
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
export default EditCaterComponent;