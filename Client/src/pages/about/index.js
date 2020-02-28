import React, { useState } from 'react';

const useForceUpdate = () => useState()[1];



const App = () => {
  
  const forceUpdate = useForceUpdate();

  console.log('rendering');
  return <button onClick={forceUpdate}>Click To Render</button>;
};

export default App;


/*
import './index.css'

import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
               <h1 style={{color:'white'}}>Esto es ABOUT</h1> 
               <img src='https://gfycat.com/ifr/FatherlyRespectfulIslandwhistler' alt="algo"></img>
               
            </div>
        )
    }
}


*/