import { Button, IconButton } from '@material-ui/core'
import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import '../styles/addcode.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



function AddCode() {

    const [code,setCode] = React.useState('');
    // function to handle class code input
    const handleCode = (event)=>{
        event.preventDefault();
        setCode(event.target.value);
    }
    return (
        <div className="code__nav">
            <nav className="nav_code">
                    <div className="nav__code__left">
                        <IconButton><AddIcon/></IconButton>
                        <h3>Join a Class</h3>
                    </div>
                    <div className="nav__code__right">
                        <Button variant="contained" disabled={code.length>6?false:true} color="primary">Done</Button>
                    </div>
            </nav>


        
        <div className="container__join">
            {/* <div className="profile">
                <div className="profile__left">
                    <h4>You are currently logged in as </h4>
                    <div className="profile__user__info">
                        <img src="https://lh3.googleusercontent.com/a-/AOh14GgEkwybriVOI2zMYGEeSXe2qdVcAu7LQCHIf-13l5I=s40-c" alt=""/>
                        <div className="user__info__text">
                            <strong>Sumit Bighaniya</strong>
                            <span>sb78639@gmail.com</span>
                        </div>
                    </div>
                </div>
                <div className="profile__right">
                    <Button variant="outlined" color="primary">Logout</Button>
                </div>
            </div> */}

            <div className="container__join__add">
                <h3>Class code</h3>
                <p>Ask your teacher for the class code, then enter it here.</p>
                <TextField id="outlined-basic" label="Class Code" variant="outlined" defaultValue={code} onChange={handleCode} />
            </div>
        </div>
        </div>
    )
}

export default AddCode
