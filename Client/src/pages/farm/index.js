import './index.css'
import myService from "../../services/User.js"
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
const TOKEN='pk.eyJ1IjoiamFhY2tlcjI1IiwiYSI6ImNrN2F0dTJhMDAzczYzZXFoYjZ1b254czIifQ.BKaLkPb4rQN6hiy3kTXvmQ'

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


   
    
    


    componentDidMount = async ()=>{
        const res = await myService.logged().catch( ()=> this.props.history.push("/Login"))
        if( res && res.data){
          const {data}=res;
          const {user}=data;
          const alert=false;
          const alertmsg='';
          const loggedUser=user;            
          const projectId=this.props.match.params.projectId;
          const myArrSensors=[];
          await myService.myProject({projectId})
          .then((p)=>{
            const myProject= p.data.p
            this.setState({loggedUser,myProject,alert,alertmsg})          
          })
            
       //   console.log("busco myproj")
       //   console.log(this.state.myProject.sensors)
          const mySensorList=this.state.myProject.sensors

          const arrDataPos=[]

          mySensorList.forEach( async (value)=>{
           await mySensor.myPos(value.sensorID,value.sensorAPI)
           .then((d)=>{
        //     console.log('esto regresa mypos')
        //     console.log(d.data.feeds[9])
             arrDataPos.push(d.data.feeds[9])
             
           }) 

          })
          this.setState({arrDataPos})
          await mySensor.test(1006090)
         
           // scroll so that the element is at the top of the view
         // const element = document.getElementById('element')
       //   const top = element.getBoundingClientRect().top + window.pageYOffset
       //   window.scrollTo({
        //    top, 
        //    behavior: 'auto'
        //  })
        }
    }


//MAP
_updateViewport = viewport => {
  this.setState({viewport});
 };

 _onClickMarker=params=> e=>{
  //   console.log('hola')
  //   console.log(params)
     const {longitude,latitude,num}=params
   this.setState({popupInfo: {longitude,latitude,num}});
 };

 _renderPopup() {
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
//MAP


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
 // await myService.getAllSensors()
//  .then((pro)=>{

//const arrAvailable=pro.data.dataS["0"].AdmSensors;
//console.log(arrAvailable)
//  }
//  )
   }else{
    await myService.getAllSensors()
    .then(async(d)=>{
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
 // console.log('este es el id del proj')
 // console.log(projID)
 // console.log('esta es la info obj del sensor to add')
 // console.log(sensorToAdd)    
     

        await myService.updateSensorProj(projID,sensorToAdd)
        .then((pro)=>{
          this.setState({sensorCode:'The process is done!'})
          const proj = pro.data.pro
          this.setState({myProject:proj})
        })
        .catch((err)=>{
       //   console.log(err)
        })
      
     
      
      }
      
    })
    .catch((err)=>{
   //   console.log(err)
    })  
   }

  }




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

<MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/outdoors-v11" onViewportChange={this._updateViewport}>
      <div style={{position:'absolute',top:'0',left:'0',padding:'10px'}}>
      </div>

{this.state.arrDataPos&&this.state.arrDataPos.map((sens,index)=>

      <Marker key={index}  longitude={parseFloat(sens.field7)} latitude={parseFloat(sens.field6)}> 
      <SettingsInputAntennaIcon className="farmSensorIcon"  onClick={this._onClickMarker({longitude:parseFloat(sens.field7),latitude:parseFloat(sens.field6),num:index})}/>
      </Marker>

      
)}
{this._renderPopup()}
      </MapGL>




</div>

<div>
<VerticalTabs theSensors={this.state.myProject.sensors}/>
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
