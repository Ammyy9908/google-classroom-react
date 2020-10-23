import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useStateValue } from '../StateProvider';
import { Container, ListItemIcon } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import '../styles/assigment.css'
import Select from '@material-ui/core/Select';
import Popover from '@material-ui/core/Popover';
import LinkDialog from './LinkDialog';
import {db} from '../firebase'
import firebase from 'firebase';
import LinkIcon from '@material-ui/icons/Link';
import AttachmentIcon from '@material-ui/icons/Attachment';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({id}) {
    const classes = useStyles();
    const [{assignment,link,fileURL},dispatch] = useStateValue();
    const [title,setTitle] = React.useState('');
    const [desc,setDescription] = React.useState('');
    const [date,setDate] = React.useState('');
    const [time,setTime] = React.useState('');
    const [points,setPoint] = React.useState('10');


    
    
    
   
      const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const ids = open ? 'simple-popover' : undefined;
  
   
  
    const handleClose = () => {
      dispatch({
          type:'SET_ASSIGNMENT_DIALOG',
          assignment:false
      })
    };


    // Modal to add a File Link
    const setLinkModal = ()=>{
        dispatch({
            type:'SET_LINK_DIALOG',
            link:true
        })
    }

    //Handle assignment upload
    const handleAssign =()=>{

        db.collection('classes').doc(id).update({
            'assignments':firebase.firestore.FieldValue.arrayUnion({
                title,title,
                description:desc,
                due:date+' '+time,
                points:points,
                file:fileURL,
                dueTimeStamp:new Date(date).getTime(),
                timeStamp:new Date().getTime(),

            })
        }).then(()=>{
            dispatch({
                type:'SET_LINK',
                fileURL:'',
            })
            handleClose();

        })

    }
    
  
    return (
      <div>
        <Dialog fullScreen open={assignment && assignment} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar} color="transparent">
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Assignment
              </Typography>
              <Button autoFocus color="inherit" onClick={handleAssign}>
                Assign
              </Button>
            </Toolbar>
          </AppBar>
         {/**Body comes here */}
         <Container style={{"marginTop":"25px"}}>
           <div className="assigment_add">
           <div className="assignment__left">
            <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="title">Title</InputLabel>
          <OutlinedInput
            id="title"
            labelWidth={60}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="content">Content</InputLabel>
          <OutlinedInput
            id="content"
            labelWidth={60}
            value={desc}
            onChange={(e)=>setDescription(e.target.value)}
          />
        </FormControl>
        <div className="buttons">
        <Button
        variant="outlined" color="primary"
        className={classes.button}
        startIcon={<AttachFileIcon />}
        onClick={handleClick}
      >
        Add
      </Button>
      <Popover
        id={ids}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose1}
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
        
        <ListItem button>
        <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary="File URL" onClick={setLinkModal}/>
        </ListItem>
        <ListItem button>
        <ListItemIcon>
            <AttachFileIcon />
          </ListItemIcon>
          <ListItemText primary="Upload File" />
        </ListItem>
      </List>
      </Popover>
        </div>
            </div>
            <div className="assignment__right">
                <p>Points</p>
            <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="points">{points}</InputLabel>
        <Select
          native
          value={points}
            onChange={(event)=>setPoint(event.target.value)}
          inputProps={{
            name: 'points',
            id: 'points',
            defaultValue:'10'
          }}
        >
          <option aria-label="None" value="" />
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </FormControl>

      <p>Due</p>
      <TextField
        id="date"
        label="Due Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={date}
        onChange={(e)=>setDate(e.target.value)}
      />
      <p>Time</p>
       <TextField
    id="time"
    label="Alarm clock"
    type="time"
    defaultValue="11:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}

    value={time}
    onChange={(e)=>setTime(e.target.value)}
  />
      
      
            </div>
           </div>
         </Container>

         <LinkDialog/>
        </Dialog>
      </div>
    );
  }
  
