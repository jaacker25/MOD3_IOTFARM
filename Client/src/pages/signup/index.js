import React, { Component } from 'react'
import './index.css'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';



export default class Signup extends Component {
    render() {




        return (
            <div className="Signup">
            
            <img className="SignupIMG" alt="backgroundSignup" src="https://res.cloudinary.com/jaacker25/image/upload/v1582689337/IOTFARM/signup_lmkqlj.jpg"></img>
            <section className="SignupForm">
            <div className="SignupFormInt">
            <Avatar style={{backgroundColor:'#1a76d2'}}>
            <LockOutlinedIcon />
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
              />
            </Grid>
            
          </Grid>

          <h4 type="submit" className="btnSumbitSignUp">
            Sign Up
          </h4>

          <div style={{display:'flex',justifyContent:'flex-end'}}>
              <Link href="/Login">
                Already have an account? Login
              </Link>
          </div>
        </form>
        </div>

            </section> 
            </div>
        )
    }
}
