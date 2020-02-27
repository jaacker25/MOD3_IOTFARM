import React, { Component, useState } from 'react'
import './index.css'
import myService from "../../services"
import {Link} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PopFormAlert from '../../components/SignupAlert/index.js'
  

export default class Signup extends Component {
    state={
        username:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        alert:false,
        alertmsg:''
        
    }
     
    validateEmail=(email)=>{
      let chr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return chr.test(email);
    }
    
    validatePassword=(psw)=>{
      let chr=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,15}$/;
      return psw.match(chr); 
    }

    handleChange=({target:{name,value}})=>{
        this.setState({[name]:value})
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

    handleSubmit= async()=>{
     
      if(this.state.username===''||this.state.firstName===''||this.state.lastName===''||this.state.email===''||this.state.password===''){
        this.handleAlertTime('Please complete all fields!');
         }else{
          if(!this.validateEmail(this.state.email)){
            this.handleAlertTime('Invalid Email!');
             }else{
              if(!this.validatePassword(this.state.password)){
                this.handleAlertTime('Invalid Password!');
                 }else{
                  const res=await myService.signup(this.state).catch(err=>this.handleAlertTime('User account already exists!'))
                  if( res && res.data ) return this.props.history.push("/login")
                 }
             }  
         }
    }

    render() {

        return (
            <div className="Signup">
            
            <img className="SignupIMG" alt="backgroundSignup" src="https://res.cloudinary.com/jaacker25/image/upload/v1582689337/IOTFARM/signup_lmkqlj.jpg"></img>
            <section className="SignupForm">
            <div className="SignupFormInt">
            <Avatar style={{backgroundColor:'#4a9e15'}}>
            <PersonAddIcon />
            </Avatar>
            <h1  style={{margin:'10px 0 20px 0'}}>Sign Up</h1>
            
            <form style={{width:'100%'}} noValidate>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={this.state.firstName} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={this.state.lastName} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={this.state.username} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={this.state.email} 
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password} 
                onChange={this.handleChange}
              />
              <p 
              style={{color:'gray',fontSize:'0.75rem',margin:'0'}}
              >Password must be 3 to 15 characters, at least one numeric digit and a special character.</p>
              <p 
              style={{color:'gray',fontSize:'0.75rem', margin:'0'}}
              >Allow ! @ # $ % ^ & *</p>


            </Grid>
            
          </Grid>

          <h4 type="submit" onClick={this.handleSubmit} className="btnSumbitSignUp">
            Sign Up
          </h4>

          <div style={{display:'flex',justifyContent:'flex-end'}}>
              <Link to="/Login">
                Already have an account? Login
              </Link>
          </div>
          {this.state.alert?<PopFormAlert
            msg={this.state.alertmsg}
          />:null}
        </form>
        
        </div>

        
            </section> 
            </div>
        )
    }
}
