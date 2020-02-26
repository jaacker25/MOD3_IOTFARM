import './index.css'
import myService from "../../services"
import React, { Component } from 'react'

export default class Profile extends Component {

    componentDidMount = async ()=>{
        const res = await myService.logged().catch( ()=> this.props.history.push("/Login"))
        if( res && res.data){
         //   const {data: {user: {username, campus, course, image}} } = res
         //   this.setState({username, course, campus, image})        
        }
    }


    render() {
        return (
            <div>
                <h1 className="glow" style={{color:'white',textAlign:'center'}}>Esto es Profile</h1> 
                <p className="glow">_________________________</p>
            </div>
        )
    }
}
