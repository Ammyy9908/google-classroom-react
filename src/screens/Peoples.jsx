import React,{useState,useEffect} from 'react'
import brand from '../brand.svg'
import {Link} from 'react-router-dom'
import { Avatar, Button, Container, Divider, Fab, IconButton } from '@material-ui/core'
import { useStateValue } from '../StateProvider';
import {db} from '../firebase';
import Typography from '@material-ui/core/Typography';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../styles/peoples.css'


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    typography: {
        padding: theme.spacing(2),
      },
      dividerColor: {
        backgroundColor: '#2979ff',
        height:2
      }
  }));

function Peoples({id}) {
    const classes = useStyles();
    const [teacher,setTeacher] = useState('');
    const [{user,create,assignment},dispatch] = useStateValue();
    const [classData,setClass] = useState();
    useEffect(()=>{
        db.collection('classes').doc(id).get().then((doc)=>{
            setClass(doc.data());
            setTeacher(doc.data().teacher);
            document.title = doc.data().class_name+ ' Peoples';
            
        })
    },[])

    return (
        <div className="peoples">
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
                <li><Link to={`/work/${id}`}>Classwork</Link></li>
                <li><Link to={`/peoples/${id}`} className="link__active">Peoples</Link></li>
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

    <Container>
   <div className="peoples__list">
   <div className="list1">
   <Typography variant="h4" component="h2" gutterBottom>
        Teachers
      </Typography>
      <Divider classes={{root: classes.dividerColor}} />
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <Avatar src={classData && classData.teacherAvatar}/>
          </ListItemIcon>
          <ListItemText primary={classData && classData.teacher} />
        </ListItem>
       
      </List>
   </div>
   <div className="list2">
   <Typography variant="h4" component="h2" gutterBottom>
        Students {classData && classData.students.length}
      </Typography>
      <Divider classes={{root: classes.dividerColor}} />
      {classData && classData.students.map((student)=>{
          return <List component="nav">
          <ListItem button>
            <ListItemIcon>
             <Avatar >{student.substring(0,2)}</Avatar>
            </ListItemIcon>
            <ListItemText primary={student} />
          </ListItem>
         
        </List>
      })}
   </div>
   </div>
    </Container>
        </div>
    )
}

export default Peoples
