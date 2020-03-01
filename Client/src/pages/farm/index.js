import './index.css'
import myService from "../../services/User.js"
import mySensor from "../../services/Sensor.js"
import React, { Component } from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Box from '@material-ui/core/Box';


export default class Farm extends Component {
    state={
    loggedUser:{},
    myProject:{}
    }


   
    
    


    componentDidMount = async ()=>{
        const res = await myService.logged().catch( ()=> this.props.history.push("/Login"))
        if( res && res.data){
          const {data}=res;
          const {user}=data;
          const loggedUser=user;            
          const projectId=this.props.match.params.projectId;
          await myService.myProject({projectId})
          .then((p)=>{
            const myProject= p.data.p             
            this.setState({loggedUser,myProject})   
          })
            

          await mySensor.test()
          .then((data)=>{
            console.log(data)
          })
          .catch((err)=>{
            console.log(err)
          })  

           // scroll so that the element is at the top of the view
          const element = document.getElementById('element')
          const top = element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top, 
            behavior: 'auto'
          })
        }
    }


handleReturn=()=>{
    this.props.history.push("/Profile")
}

    render() {
        return (
            <div className="Farm" id="element">
            <img className="topFarmIMG" alt="topProfileIMG" src="https://res.cloudinary.com/jaacker25/image/upload/v1582955688/IOTFARM/Screenshot_from_2020-02-28_13-55-09_trboda.png"></img>
            <section className="FarmBody">

<h1 style={{margin:'50px',textAlign:'center'}}>Smart farming sensor node data acquisition</h1>

<div className="FarmInfoDiv">
<article style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
<div style={{width:'80%',height:'90%'}}>
<h1>{this.state.myProject.pName}</h1>
<h1>{this.state.myProject.author}</h1>
<h1>{this.state.myProject.location}</h1>
<h1>{this.state.myProject.date}</h1>
<h1>{this.state.myProject.description}</h1>
<h1>Number of Sensors connected: 5</h1>

</div>

</article>
<article>
<img className="projectInfoImage" alt="projectImage" src={this.state.myProject.img}></img>

</article>

</div>

            </section>

            <div>
             <h4 type="submit" onClick={this.handleReturn} className="btnSumbitBack">
             <ArrowBackIosIcon style={{paddingRight:'10px'}}/>Return
          </h4>
          </div>
          <footer className="footerFarm">

        <Box color={'#888888'} display={'flex'} alignItems={'center'} mb={1} marginBottom={5}>
          <CopyrightIcon style={{marginRight: 4, fontSize: 18}} />
          <span>2020 The Ultimate IoT Smart Farming</span>
        </Box>

         </footer>
         </div>
        )
    }
}
