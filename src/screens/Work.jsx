import React,{useState,useEffect} from 'react'
import brand from '../brand.svg'
import {Link} from 'react-router-dom'
import { useStateValue } from '../StateProvider';
import { Avatar, Button, Fab, IconButton } from '@material-ui/core'
import {db} from '../firebase'
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import '../styles/work.css'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpIcon from '@material-ui/icons/Help';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AssignmentDialog from '../components/AssignmentDialog';
import VisibilityIcon from '@material-ui/icons/Visibility';

import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';

import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    typography: {
        padding: theme.spacing(2),
      }
  }));

function Work({id}) {
    const classes = useStyles();
    const [teacher,setTeacher] = useState('');
    const [{user,create,assignment},dispatch] = useStateValue();
    const [classData,setClass] = useState();
    const [accordtion,setAccordtion] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? 'simple-popover' : undefined;



    useEffect(()=>{
        db.collection('classes').doc(id).get().then((doc)=>{
            setClass(doc.data());
            setTeacher(doc.data().teacher);
            document.title = doc.data().class_name+ ' Classwork';
            
        })
    },[])

   const handleAssignment = ()=>{
    dispatch({
        type:'SET_ASSIGNMENT_DIALOG',
        assignment:true
    })
    handleClose();
   }

   // Handle accordtion
   const openAccordtion = (e)=>{
       console.log(e.target.classList);
       if(e.target.classList.value==='assignment__tile'){
           e.target.parentElement.children[1].style.display = 'flex';
       }
   }

   const closeAccordtion = (e)=>{
    console.log(e.target.classList);
    if(e.target.classList.value==='assignment__tile'){
        e.target.parentElement.children[1].style.display = 'flex';
    }
}


    return (
        <div>{assignment ?<AssignmentDialog id={id}/>:<div className="classwork">
            <nav className="nav">
        <div className="nav__left">
    <Link to="/" style={{"textDecoration":"none"}}><div className="nav__left__brand">
                <img src={brand} alt=""/>
                <span>Classroom</span>
            </div>
            </Link>
        </div>
        <div className="nav__middle">
            <ul>
                <li><Link to={`/c/${id}`}>Stream</Link></li>
                <li><Link to={`/work/${id}`} className="link__active">Classwork</Link></li>
                <li><Link to={`/peoples/${id}`}>Peoples</Link></li>
                {teacher && teacher === user.displayName ? <li><a href="#/">Grades</a></li>:null}
            </ul>
        </div>
        <div className="nav__right">
            <div className="nav__right__right">
            
            {classData &&<div className="nav__left__brand">
            <Avatar>{classData.class_name.substring(0,2)}</Avatar>
            </div>}
            </div>
        </div>
    </nav>

    <div className="container__work">
    <div className="create_section">
    {teacher && teacher === user.displayName && <Fab color="primary" aria-label="add" onClick={handleClick}>
  <AddIcon />
    </Fab>}
    <Popover
        id={ids}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={(event)=>handleAssignment()}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Assignment" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Question" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SpeakerNotesIcon />
          </ListItemIcon>
          <ListItemText primary="Material" />
        </ListItem>
      </List>
      </Popover>
      <div className="assignments">
          {classData && classData.assignments.map((assignment,index)=>{
              return <div className="assignment_list" onClick={openAccordtion}> 
                  <div className={`assignment__tile`} style={{"cursor":"pointer"}}>
              <AssignmentIcon/>
              <h5>{assignment.title}</h5>
              <span>
                  {assignment.due}
              </span>
              <IconButton>
                  <VisibilityIcon/>
              </IconButton>
          </div>
          <div className="assignment__detail" id={index} style={{"display":"none"}}>
              <span className="assignment__detail__top">
                  <p style={{"color":"#999"}}>Posted on {new Date(assignment.timeStamp).getDate()} {new Date(assignment.timeStamp).toLocaleString('default', { month: 'long' })} {new Date(assignment.timeStamp).getFullYear()}</p>
                  <strong style={{"color":"teal"}}>Graded</strong>
                  
              </span>
              <div className="assignment__detail__bottom">
              <a href={assignment.file} target="_blank" style={{"textDecoration":"none"}}>Click to Download Attachment</a>
              </div>
          </div>
              </div>
          })}
      </div>
    </div>

    </div>
        </div>}
        </div>
    )
}

export default Work
