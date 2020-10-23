import React,{useState} from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import '../styles/create.css'
import Button from '@material-ui/core/Button';
import { useStateValue } from '../StateProvider';
import {db} from '../firebase'

function CreateForm() {
    const [{user,create},dispatch] = useStateValue();
    const [name,setClass] = useState('');
    const [subject,setSubject] = useState('');
    const [section,setSection] = useState('');
    const [room,setRoom]  = useState('');

    const handleCreateClass = ()=>{
        db.collection('classes').doc().set({
            code:'C' + Math.random().toString(36).substr(2, 6),
            class_name:name,
            section:section,
            subject:subject,
            room:room,
            teacher:user.displayName,
            students:[],
            students_comments:[],
            assignments:[],
            teacherAvatar:user.photoURL,
            cover:''
        }).then(()=>{
            dispatch({
                type:"SET_CREATE",
                create:false
            })
        }).catch((error)=>{
            alert("Error in Creating a Class!");
        })
    }


    const handleCreateModal = ()=>{
        dispatch({
            type:"SET_CREATE",
            create:false
        })
    }
    return (
        <div className="create_form">
            <div className="form">
            <form>
            <TextField
          required
          id="filled-required"
          label="Class Name (required)"
          variant="filled"
          value = {name}
          onChange={(event)=>setClass(event.target.value)}
        />
        <TextField
          id="filled-required"
          label="Section"
          variant="filled"
          value = {section}
          onChange={(event)=>setSection(event.target.value)}
        />

        <TextField
          id="filled-required"
          label="Subject"
          variant="filled"
          value = {subject}
          onChange={(event)=>setSubject(event.target.value)}
        />
        <TextField
          id="filled-required"
          label="Room"
          variant="filled"
          value = {room}
          onChange={(event)=>setRoom(event.target.value)}
        />
        <div className="buttons">
        <Button color="primary" onClick={handleCreateModal}>Cancel</Button>
        <Button color="primary" disabled={name.length>2 && section && subject && room?false:true} onClick={handleCreateClass}>Create</Button>
        </div>
            </form>
            </div>
        </div>
    )
}

export default CreateForm
