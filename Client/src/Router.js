import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Nav from './components/navbar'
import Home from './pages/home'
import Profile from './pages/profile'
import About from './pages/about'
import Signup from './pages/signup'
import Login from './pages/login'
import NotFound from './pages/404'

const Router=()=>{
    return(
<BrowserRouter>
    <Nav/>
    <Switch> 
    <Route exact path="/" component={Home}/>
    <Route exact path="/Home" component={Home}/>
    <Route exact path="/Profile" component={Profile}/>
    <Route exact path="/About" component={About}/>
    <Route exact path="/Signup" component={Signup}/>
    <Route exact path="/Login" component={Login}/>
    <Route component={NotFound}/>
    </Switch>
</BrowserRouter>
    )
}

export default Router