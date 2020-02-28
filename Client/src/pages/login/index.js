import './index.css'
import React, { Component } from 'react'
import myService from "../../services"
import {Link} from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PopFormAlert from '../../components/SignupAlert/index.js'



export default class Login extends Component {
    state={
        email:"",
        password:"",
        alert:false,
        alertmsg:''
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
        if(this.state.email===''||this.state.password===''){
         this.handleAlertTime('Please complete all fields!');
        }else{
        const res=await myService.login(this.state).catch(err=>this.handleAlertTime('The email or password is incorrect'))
       // console.log('imprimiendo res')
       // console.log(res)
        if( res && res.data ) return this.props.history.push("/Profile")
        } 
       }

       

    render() {
        return (
            <div className="Login">
                <img className="LoginIMG" alt="backgroundLogin" src="https://res.cloudinary.com/jaacker25/image/upload/v1582689357/IOTFARM/login_kv4ig5.jpg"></img>
                <section className="LoginForm">
                <div className="LoginFormInt">
    <Avatar style={{backgroundColor:'#1a76d2'}}>
      <LockOutlinedIcon />
    </Avatar>
    <h1  style={{margin:'10px 0 20px 0'}}>Login</h1>
    <form style={{width:'100%'}} noValidate>
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={this.state.email} 
        onChange={this.handleChange}
      />
      </Grid>
      <Grid item xs={12}>
      <TextField
        variant="outlined"
        margin="normal"
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
      <br/><br/><br/><br/><br/>
      <h4 type="submit" onClick={this.handleSubmit} className="btnSumbitLogin">
            Login
          </h4>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
              <Link to="/Signup">
              Don't have an account? Sign Up
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




