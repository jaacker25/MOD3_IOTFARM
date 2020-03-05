import './index.css'
import myService from "../../services/User.js"
import _myProject from "../../services/Project.js"
import mySensor from "../../services/Sensor.js"
import React, { Component } from 'react'

import VerticalTabs from '../../components/panel/index.js'
import MapGL,{Marker, Popup} from 'react-map-gl'
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';

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
const TOKEN=process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

export default class Farm extends Component {
    state={
    loggedUser:{},
    myProject:{},
    alert:false,
    alertmsg:'',
    sensorCode:'',
    viewport: {
      width: "90vw",
      height: "50vh",
      latitude: 19.42,
      longitude: -99.18,
      minZoom: 8,
      maxZoom: 18,
      zoom:14,
      position:"relative"
        },
        popupInfo: null,
    arrDataPos:[]
    }


    componentDidMount=async()=>{
      try{
        var res = await myService.logged()
      }catch(err){this.props.history.push("/Login")}
        if( res && res.data){
          const {data}=res;
          const {user}=data;
          const alert=false;
          const alertmsg='';
          const loggedUser=user;            
          const projectId=this.props.match.params.projectId;
        
          const p=await _myProject.myProject({projectId})
          const myProject= p.data.p
          this.setState({loggedUser,myProject,alert,alertmsg})  

          const mySensorList=this.state.myProject.sensors
          const arrDataPos=[]
          mySensorList.forEach( async (value)=>{
          const d= await mySensor.myPos(value.sensorID,value.sensorAPI)
          arrDataPos.push(d.data.feeds[9]) 
           })
          this.setState({arrDataPos})
        
         // scroll to top of the view
         const element = document.getElementById('element')
         const top = element.getBoundingClientRect().top + window.pageYOffset
         window.scrollTo({
         top, 
         behavior: 'auto'
         })
        }
        this.interval=setInterval(this.RefreshData,2000);
    }

    componentWillUnmount=()=>{
      clearInterval(this.interval);
    }


//----------------------------------------------------------------------------------MAP
_updateViewport = viewport => {
  this.setState({viewport});
 };

 _onClickMarker=params=> e=>{
   const {longitude,latitude,num}=params
   this.setState({popupInfo: {longitude,latitude,num}});
 };

 _renderPopup=()=>{
   const {popupInfo} = this.state;
   return (
     popupInfo && (
       <Popup className="PopupMap" tipSize={10} anchor="top" longitude={popupInfo.longitude}
         latitude={popupInfo.latitude} closeOnClick={true} onClose={() => this.setState({popupInfo: null})}>
       <p><b>Sensor</b> #{popupInfo.num+1}</p>
       <p><b>Longitude=</b> {popupInfo.longitude}</p>
       <p><b>Latitude=</b> {popupInfo.latitude}</p>
       </Popup>
     )
   );
 }

//----------------------------------------------------------------------------Function just refresh the page
    RefreshData=()=>{
      if(this.state.alertmsg==='nothing to do, just to refresh the page'||!this.state.alertmsg){
       this.setState({alertmsg:'nothing to do, just to refresh the page'})
      }
    }

 //------------------------------------------------------------------------------Bar Code
handleSubmitBarcode=async()=>{
  if(this.state.sensorCode===''){
    this.handleAlertTime('Please complete all fields!');
     }else{
      try{
        const d= await _myProject.getAllSensors()
        const arrAvailable=d.data.dataS["0"].AdmSensors;
        const newArr=[];
        arrAvailable.forEach(value=>{
          newArr.push(value.sensorID)
        })
        let indexS=-1;
        newArr.forEach((value,index)=>{
          if(value===this.state.sensorCode){
            indexS=index;
          }
        })
        if(indexS<0){
          this.handleAlertTime('Please Input a Valid Code');
        }else{
       const projID=this.state.myProject._id
       const sensorToAdd=arrAvailable[indexS]
       this.setState({sensorCode:'Searching...'})
       try{
            const pro = await _myProject.updateSensorProj(projID,sensorToAdd)
            this.setState({sensorCode:'The process is done!'})
            const proj = pro.data.pro
            this.setState({myProject:proj})
          }
          catch(err){
            this.handleAlertTime('An unexpected error occurred. Please try again later');
          }
        }
      }
      catch(err){
        this.handleAlertTime('An unexpected error occurred. Please try again later');
      } 
     }
    }
  
//-----------------------------------------------------------------------------Upload Photo

handleEdit=()=>{
   document.getElementById('getFileIconFarm').click()
 }

 handleFile = async(e) => {
   const formData = new FormData();
   formData.append("photoURL", e.target.files[0]);
   const x= this.state.myProject._id;
   try{
    const res=await _myProject.updateIconProj(formData,x)
    const {data:{proj}}=res
    this.setState({myProject:proj})
     }
     catch(err){
       this.handleAlertTime('Unsupported file type!');
     }
 }

//-------------------------------------------------------------------------Alert Box
    handleAlertTime=(text)=>{
      setTimeout(()=> {
            this.setState({alert:false})
            this.setState({alertmsg:null})
            },5000);
      this.setState({alert:true})
      this.setState({alertmsg:text})
    }
//------------------------------------------------------------------------Back button
handleReturn=()=>{
    this.props.history.push("/Profile")
  }
//------------------------------------------------------------------------Input variables  
handleChange=({target:{name,value}})=>{
    this.setState({[name]:value})
    }

//-------------------------------------------------------------------------RENDER
    render() {
      const {viewport} = this.state;
      return (
      <div className="Farm" id="element">
      <img className="topFarmIMG" alt="topProfileIMG" src="https://res.cloudinary.com/jaacker25/image/upload/v1582955688/IOTFARM/Screenshot_from_2020-02-28_13-55-09_trboda.png"></img>
      <section className="FarmBody">

<h1 style={{margin:'50px',textAlign:'center'}}>Smart farming sensor node data acquisition</h1>
<div className="FarmInfoDiv">

<article style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
<div style={{width:'80%',height:'90%'}}>
<h1 style={{textAlign:'left', color:'rgb(80, 80, 80)'}}><b>Project Details:</b></h1>
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
</div>


<div style={{width:'85vw',height:'auto',margin: '50px 0',display:'flex',justifyContent:'center'}}>

<MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/outdoors-v11" onViewportChange={this._updateViewport}>
     

{this.state.arrDataPos&&this.state.arrDataPos.map((sens,index)=>

      <Marker key={index}  longitude={parseFloat(sens.field7)} latitude={parseFloat(sens.field6)}> 
      <SettingsInputAntennaIcon className="farmSensorIcon"  onClick={this._onClickMarker({longitude:parseFloat(sens.field7),latitude:parseFloat(sens.field6),num:index})}/>
      </Marker>)}
      {this._renderPopup()}
      </MapGL>
</div>


<div style={{width:'85vw',height:'auto',margin: '50px 25px',display:'flex',justifyContent:'center'}}>
<VerticalTabs theSensors={this.state.myProject.sensors}/>
</div>


<div className="FarmInfoDiv">
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
            </section>


            <div>
             <h4 type="submit" onClick={this.handleReturn} className="btnSumbitBack">
             <ArrowBackIosIcon style={{paddingRight:'10px'}}/>Return
          </h4>
          </div>





          <footer className="footerFarm">
          <img style={{width:'50px',opacity:'0.5'}}  className="myLogoFoot" alt="logo" src="https://res.cloudinary.com/jaacker25/image/upload/v1583402902/IOTFARM/logojaac_pobhoc.png"></img>
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
