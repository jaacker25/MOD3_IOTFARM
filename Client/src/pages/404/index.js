import { useHistory } from "react-router-dom";
import React from 'react'

const NotFound = () => {
    let history = useHistory(); 
    return (<>{history.push("/")}</>)
}
export default NotFound;