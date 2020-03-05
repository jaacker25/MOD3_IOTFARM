
import './index.css'
import CopyrightIcon from '@material-ui/icons/Copyright';
import Box from '@material-ui/core/Box';

import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <>
            <div className="About">
            <img className="topAboutIMG" alt="topAboutIMG" src="https://res.cloudinary.com/jaacker25/image/upload/v1583403191/IOTFARM/banne2-1030x687_eia8gt.jpg"></img>
            <section className="AboutBody" >
                   
               <h1 style={{margin:'100px auto 50px auto',textAlign:'center'}} >What is the Internet of Things in Agriculture and the Smart Farming?</h1> 
             
               <iframe style={{borderRadius:'50px',boxShadow:' 0px 0px 18px 0px rgba(0,0,0,0.75)'}}  width="720" height="480" src="https://www.youtube.com/embed/7rzufxlGH4o" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
              
<div style={{width:'100%',height:'500px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>


<h1>TEAM</h1>

<h3 style={{textAlign:'center'}} >Do not hesitate to contact us for any enquiry, order or comment you may have</h3>
<img className="myPhotoLogo" alt="photoID" src="https://res.cloudinary.com/jaacker25/image/upload/v1583404742/IOTFARM/0_n5kuxa.jpg"></img>
<p>Jorge Aguilar</p>
<p style={{margin:'0'}}>President and CEO of the Company</p>
</div>

               </section>

               
            </div>
            <footer className="footerAbout">
<img style={{width:'50px',opacity:'0.5'}}  className="myLogoFoot" alt="logo" src="https://res.cloudinary.com/jaacker25/image/upload/v1583402902/IOTFARM/logojaac_pobhoc.png"></img>
        <Box color={'#888888'} display={'flex'} alignItems={'center'} mb={1} marginBottom={5}>
          <CopyrightIcon style={{marginRight: 4, fontSize: 18}} />
          <span>2020 The Ultimate IoT Smart Farming</span>
        </Box>

         </footer>
         </>
        )
    }
}


