import React, { Component, useState } from 'react'
import './index.css'
import myService from "../../services"
import {Link} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CustomizedSnackbars from '../../components/SignupAlert/index.js'
  

export default class Signup extends Component {
    state={
        username:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        alert:false
        
    }
     

    handleChange=({target:{name,value}})=>{
        this.setState({[name]:value})
    }
    
    handleAlertTime=()=>{
        setTimeout(
            function() {
                this.setState({alarm:false})
            }
            .bind(this),
            5000
        );
        this.setState({alarm:true})
    }

    handleSubmit= async()=>{
     if(this.state.username===''||this.state.firstName===''||this.state.lastName===''||this.state.email===''||this.state.password===''){
    this.handleAlertTime();
     }else{
     const res=await myService.signup(this.state).catch(err=>console.log(err))
     if( res && res.data ) return this.props.history.push("/login")
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
          {this.state.alarm?<CustomizedSnackbars/>:null}
        </form>
        
        </div>

        
            </section> 
            </div>
        )
    }
}
