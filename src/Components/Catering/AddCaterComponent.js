import axios from 'axios';
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
class AddCaterComponent extends Component {
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
    onSubmit = (e)=>{
        e.preventDefault();
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
        axios.post('http://localhost:3001/cater/addNewCater',data).then(res=>{
            Swal.fire({
                icon: 'success',
                text:res.data.message,
                showCancelButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#e3342f',
            })
        }).catch(err=>{
            console.log(err);
        });
    }
   componentDidMount(){}
   render(){
      return(
        
        <div className="container">
                
            <div className="row">
                
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="grap-content">
                        <Link className="btn btn-primary" to="/indexcater">Return index</Link>
                        <form action="#" method="POST" onSubmit={this.onSubmit} encType="multipart/form-data" role="form"> 
                        <legend>Form Add Cater</legend>
                        
                            <div className="form-group">
                                <label htmlFor="cater_type">Cater Type</label>
                                <input type="text" className="form-control" name="cater_type" onChange={this.onChangeCaterType} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_one">sub dish One</label>
                                <input type="text" className="form-control" name="sub_dish_one" onChange={this.onChangeSubDishOne} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_one_image">sub dish One Image</label>
                                <input type="file" className="form-control" name="sub_dish_one_image" onChange={this.onChangeSubDishOneImage} placeholder="Input field" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="sub_dish_two">sub dish Two</label>
                                <input type="text" className="form-control" name="sub_dish_two" onChange={this.onChangeSubDishTwo} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_two_image">sub dish One Image</label>
                                <input type="file" className="form-control" name="sub_dish_two_image" onChange={this.onChangeSubDishTwoImage} placeholder="Input field" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="sub_dish_three">sub dish Three</label>
                                <input type="text" className="form-control" name="sub_dish_three" onChange={this.onChangeSubDishThree} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_three_image">sub dish Three Image</label>
                                <input type="file" className="form-control" name="sub_dish_three_image" onChange={this.onChangeSubDishThreeImage} placeholder="Input field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sub_dish_four">sub dish Four</label>
                                <input type="text" className="form-control" name="sub_dish_four" onChange={this.onChangeSubDishFour} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_four_image">sub dish Four Image</label>
                                <input type="file" className="form-control" name="sub_dish_four_image" onChange={this.onChangeSubDishFourImage} placeholder="Input field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sub_dish_five">sub dish Five</label>
                                <input type="text" className="form-control" name="sub_dish_five" onChange={this.onChangeSubDishFive} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_five_image">sub dish Five Image</label>
                                <input type="file" className="form-control" name="sub_dish_five_image" onChange={this.onChangeSubDishFiveImage} placeholder="Input field" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="sub_dish_six">sub dish six</label>
                                <input type="text" className="form-control" name="sub_dish_six" onChange={this.onChangeSubDishSix} placeholder="Input field" />
                            </div>
                        
                            <div className="form-group">
                                <label htmlFor="sub_dish_six_image">sub dish six Image</label>
                                <input type="file" className="form-control" name="sub_dish_six_image" onChange={this.onChangeSubDishSixImage} placeholder="Input field" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cater_price">Price</label>
                                <input type="number" className="form-control" name="cater_price" onChange={this.onChangePrice} placeholder="Input field" />
                            </div>
                            <button type="submit"  onClick={this.onFileUpload} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                        
                </div>
                
            </div>
            
    </div>
        
      )
   }
}
export default AddCaterComponent;