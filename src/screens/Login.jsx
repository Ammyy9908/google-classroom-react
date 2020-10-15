import React from 'react'
import '../styles/login.css'
import brand from '../brand.svg'
import { Button, IconButton } from '@material-ui/core'
import {auth,gp} from '../firebase'

function Login() {

    const handleLogin = () =>{
        auth.signInWithPopup(gp).then((cred)=>{
            console.log(cred.user);
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <div className="login">
            <div className="brand"><img src={brand} alt=""/>
            <span>Classroom</span></div>
            <Button variant="contained" color="secondary" href="#contained-buttons" onClick={handleLogin} size="large">
                Sign In With Google
                </Button>
        </div>
    )
}

export default Login
