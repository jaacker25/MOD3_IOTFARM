import { useHistory } from "react-router-dom";
import React from 'react'

const R = () => {
    let history = useHistory(); 
    return (<>{history.push("/Profile")}</>)
}
export default R;
