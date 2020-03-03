import './index.css'
import myService from "../../services/User.js"
import React, { Component } from 'react'

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Box from '@material-ui/core/Box';
import PopFormAlert from '../../components/SignupAlert/index.js'
import ProjectCard from '../../components/ProjectCard/index.js'
import VoidCard from '../../components/VoidProjectCard/index.js'
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import CopyrightIcon from '@material-ui/icons/Copyright';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';



const CustomSwitch = withStyles({
  switchBase: {
    color: '#3f51b5',
    '&$checked': {
      color: '#3f51b5',
    },
    '&$checked + $track': {
      backgroundColor: '#313f8c',
    },
  },
  checked: {},
  track: {},
})(Switch);


export default class Profile extends Component {
    state={
        username:"",
        firstName:"",
        lastName:"",
        email:"",
        image:'',
        alert:false,
        alertmsg:'',
        checked:false,
        loggedUser:{}
        
    }

    componentDidMount = async ()=>{
        const res = await myService.logged().catch( ()=> this.props.history.push("/Login"))
        
        
        if( res && res.data){
          const {data}=res;
          const {user}=data;
          const loggedUser=user;
          
          
          const {username, firstName, lastName, email, image}=loggedUser;
          this.setState({loggedUser,username, firstName, lastName, email, image}) 

          // scroll so that the element is at the top of the view
       //   const tagP = document.getElementById('tagP')
       //   const top = tagP.getBoundingClientRect().top + window.pageYOffset
       //   window.scrollTo({
       //     top, 
       //     behavior: 'auto'
       //   })
          
        }
    }

    handleAlertTime=(text)=>{
        setTimeout(
            function() {
                this.setState({alert:false})
            }
            .bind(this),
            5000
        );
        this.setState({alert:true,alertmsg:text})
    }

    handleEdit=()=>{
        document.getElementById('getFile').click()
    }

    handleFile = e => {
        const formData = new FormData();
        formData.append("photoURL", e.target.files[0]);
        myService.upload(formData)
          .then(({ data }) => {
            const {user: {username, firstName, lastName, email, image}} = data
            this.setState({username, firstName, lastName, email, image})
          })
          .catch(err => {
            this.handleAlertTime('Unsupported file type!');
          });
      }; 

      validateEmail=(email)=>{
        //let chr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; warning
        let chr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return chr.test(email);
      }
      
    handleChangeBTN = () => {
        if(this.state.checked){
        this.setState({checked:false})
        }else{
        this.setState({checked:true})
        }
      };

      handleChange=({target:{name,value}})=>{
        this.setState({[name]:value})
    }

    handleEditUser=async()=>{
        if(this.state.username===''||this.state.firstName===''||this.state.lastName===''||this.state.email===''){
            this.handleAlertTime('Please complete all fields!');
             }else{
              if(!this.validateEmail(this.state.email)){
                this.handleAlertTime('Invalid Email!');
                 }else{
                      const res=await myService.edit(this.state).catch(err=>this.handleAlertTime('Some of the fields are incorrect!'))
                      if( res && res.data ){
                        const {data: {user: {username, firstName, lastName, email, image}} } = res
                        this.setState({username, firstName, lastName, email, image}) 
                        this.setState({checked:false})
                      } 
                 }  
             }
        }

        


        handleLogout=async()=>{
        await myService.logout()
        this.props.history.push("/")
        }

    render() {
        return (
            <div className="Profile" id="tagP">
                <img className="topProfileIMG" alt="topProfileIMG" src="https://res.cloudinary.com/jaacker25/image/upload/v1582745626/IOTFARM/profile_xwzc1c.png"></img>
               <div className="faceContainer">
                <img className="face"  src={this.state.image} alt="face"></img>
                <input type='file' name="photoURL" id="getFile" style={{display:'none'}} onChange={this.handleFile} />
                <Fab size="medium" color="primary" aria-label="edit" onClick={this.handleEdit} style={{zIndex:'2'}}>
                <EditOutlinedIcon />
                </Fab>
                </div>
                <br></br>
                <h1 style={{fontSize:'4vw'}}>Welcome {this.state.username}</h1>
                <section className="ilustrationsProfile">
                <div>
                <img alt='createProj' src='https://res.cloudinary.com/jaacker25/image/upload/v1582951813/IOTFARM/undraw_add_content_d1tf_qkiaz3.png'/>
                <h3>Create Your Owns Projects</h3>
                </div>
                <div>
                <img alt='dashProj' src='https://res.cloudinary.com/jaacker25/image/upload/v1582951813/IOTFARM/undraw_data_xmfy_1_pydpm0.png'/>
                <h3>Then Visualize The Data In The Dashboard</h3>
                </div>
                </section>
<div style={{border:'1px solid #3f51b5', borderRadius:'20px',padding:'2px 18px'}} >

                <FormControlLabel 
                  label="Edit Profile"
                  control={<CustomSwitch checked={this.state.checked} onChange={this.handleChangeBTN} color="primary"/>}
                  style={{marginTop:'0px',color:'gray'}} 
                   />

</div>
                   <br/>
            
                   <article className="articleInfoProfile">
                   <Fade in={this.state.checked}>
                       <article className="articleEditProfile" id="testing">
                       
                       <div className="containerFormEditProfile">
                       <Grid container spacing={1}>
                       <Grid item xs={12} sm={6}>
                       <TextField 
                       id="firstName"
                       label="First Name" 
                       fullWidth
                       name="firstName"
                       margin="normal"    
                       value={this.state.firstName} 
                       onChange={this.handleChange}
                       />
                       </Grid>
                       <Grid item xs={12} sm={6}>
                       <TextField 
                       id="lastName" 
                       label="Last Name" 
                       fullWidth
                       name="lastName"
                       margin="normal"
                       value={this.state.lastName} 
                       onChange={this.handleChange}
                       />
                       </Grid>
                       <Grid item xs={12}>
                       <TextField 
                       id="username" 
                       label="Username" 
                       fullWidth
                       name="username"
                       margin="normal"
                       value={this.state.username} 
                       onChange={this.handleChange}
                       />
                       </Grid>
                       <Grid item xs={12}>
                       <TextField 
                       id="email" 
                       label="Email" 
                       fullWidth
                       disabled
                       name="email"
                       margin="normal"
                       autoComplete="email"
                       value={this.state.email} 
                       onChange={this.handleChange}
                       />
                       </Grid>
                       </Grid>
                       </div>
                       <div className="submitFormProfile" >
                       

                       <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={this.handleEditUser}
          
        >
          <CheckOutlinedIcon />
          Submit
        </Fab>
                       </div>
                       
                       </article>
                   </Fade>
                   </article>
                   
                   <br/><br/>
                    <section className="sectionProjectCards">
                   
                    {this.state.loggedUser.projects && this.state.loggedUser.projects.map((proj,index) => 
                      <ProjectCard key={index} img={proj.img} pName={proj.pName} location={proj.location} description={proj.description} author={proj.author} date={proj.date} _id={proj._id}/>
                     )}
                    <VoidCard/>
                    </section>
<section>
<h4 type="submit" onClick={this.handleLogout} className="btnSumbitLogout">
            Logout <ExitToAppIcon style={{paddingLeft:'10px'}}/>
          </h4>
</section>
<footer className="footerProfile">

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
