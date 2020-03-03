import './index.css'
import myService from "../../services/User.js"
import mySensor from "../../services/Sensor.js"
import React, { Component } from 'react'

import Map from '../../components/mapbox/index.js'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PopFormAlert from '../../components/SignupAlert/index.js'
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import TextField from '@material-ui/core/TextField';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SettingsInputAntennaOutlinedIcon from '@material-ui/icons/SettingsInputAntennaOutlined';


export default class Farm extends Component {
    state={
    loggedUser:{},
    myProject:{},
    alert:false,
    alertmsg:'',
    sensorCode:''
    }


   
    
    


    componentDidMount = async ()=>{
        const res = await myService.logged().catch( ()=> this.props.history.push("/Login"))
        if( res && res.data){
          const {data}=res;
          const {user}=data;
          const alert=false;
          const alertmsg='';
          const loggedUser=user;            
          const projectId=this.props.match.params.projectId;
          await myService.myProject({projectId})
          .then((p)=>{
            const myProject= p.data.p
          
                     
            this.setState({loggedUser,myProject,alert,alertmsg})   
            
          })
            

          await mySensor.test(1006090)
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

    handleAlertTime=(text)=>{
      setTimeout(
          ()=> {
            this.setState({alert:false})
          },
          5000
      );
      this.setState({alert:true})
      this.setState({alertmsg:text})
      
    }


    handleEdit=()=>{
     // document.getElementById('passValue').value=this.state.myProject.pName;
      document.getElementById('getFileIconFarm').click()
    
    }

    handleFile = e => {
      const formData = new FormData();
      formData.append("photoURL", e.target.files[0]);
      const x= this.state.myProject._id;
      myService.updateIconProj(formData,x)
        .then(( {data:{proj}} ) => {
          
         const {img}=proj;
         // const {user}=data;
       this.setState({myProject:proj})

        })
        .catch(err => {
          this.handleAlertTime('Unsupported file type!');
        });
    }; 


handleReturn=()=>{
    this.props.history.push("/Profile")
  }



  handleChange=({target:{name,value}})=>{
    this.setState({[name]:value})
}

handleSubmitBarcode=async()=>{

if(this.state.sensorCode===''){
  this.handleAlertTime('Please complete all fields!');
   }else{
    await myService.getAllSensors()
    .then(async(d)=>{
      const arrAvailable=d.data.dataS["0"].AdmSensors;
      const indexS=arrAvailable.indexOf(parseInt(this.state.sensorCode));
 
      if(indexS<0){
        this.handleAlertTime('Please input a valid Code');
      }else{
     const projID=this.state.myProject._id
     const sensorID=this.state.sensorCode
     this.setState({sensorCode:'Searching...'})
        await myService.updateSensorProj(projID,sensorID)
        .then((pro)=>{
          this.setState({sensorCode:'The process is done!'})
          const proj = pro.data.pro
          this.setState({myProject:proj})
        })
        .catch((err)=>{
          console.log(err)
        })
      }
      
    })
    .catch((err)=>{
      console.log(err)
    })  
   }

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
<h1 style={{textAlign:'center', color:'rgb(80, 80, 80)'}}><b>Project Details:</b></h1>
<h1><FolderOpenOutlinedIcon/>&nbsp;&nbsp;{this.state.myProject.pName}</h1>
<h1><AssignmentIndOutlinedIcon/>&nbsp;&nbsp;{this.state.myProject.author}</h1>
<h1><LocationOnOutlinedIcon/>&nbsp;&nbsp;{this.state.myProject.location}</h1>
<h1><TodayOutlinedIcon/>&nbsp;&nbsp;{this.state.myProject.date}</h1>
<h1><AssignmentOutlinedIcon/>&nbsp;&nbsp;{this.state.myProject.description}</h1>
<h1><SettingsInputAntennaOutlinedIcon/>&nbsp;&nbsp;Sensors Connected:&nbsp;{this.state.myProject.sensors&&this.state.myProject.sensors.length}</h1>

</div>

</article>
<article style={{display:'flex',justifyContent:'flex-end',alignItems:'flex-end'}}>
<input  type='file' name="photoURL" id="getFileIconFarm" style={{display:'none'}} onChange={this.handleFile} />
<Fab size="medium" color="primary" aria-label="edit" onClick={this.handleEdit} style={{zIndex:'2',position:'absolute'}}>
                <EditOutlinedIcon />
                </Fab>
<img className="projectInfoImage" alt="projectImage" src={this.state.myProject.img}></img>

</article>

<article style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',width:'90%'}}>
<h1>Scan a valid BarCode to Add a New Sensor</h1>
<img alt="barcode" src="https://res.cloudinary.com/jaacker25/image/upload/v1583214922/IOTFARM/barcode_ksdvub.gif"></img>
<TextField
          id="standard-multiline-flexible"
          label="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sensor Code"
          multiline
          rowsMax="4"
          name="sensorCode"
          margin="normal"
          value={this.state.sensorCode} 
          onChange={this.handleChange}
          
        /><AddCircleOutlineRoundedIcon className="FarmAddSensor" onClick={this.handleSubmitBarcode}/>






</article>

</div>

<div style={{width:'90vw',height:'50vh',margin: '50px 0'}}>
<Map/ >
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
         {this.state.alert?<PopFormAlert msg={this.state.alertmsg}/>:null}
         </div>
        )
    }
}
