import React,{useState,useEffect} from 'react'
import Card from '../components/Card'
import '../styles/Home.css'
import '../styles/Navbar.css'
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';
import '../styles/addcode.css'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, IconButton } from '@material-ui/core'
import brand from '../brand.svg'
import AddIcon from '@material-ui/icons/Add';
import { useStateValue } from '../StateProvider';
import {db,auth} from '../firebase'
import CreateForm from '../components/CreateForm'
import Sidenav from '../components/Sidenav';


function Home() {
    const [{user,create},dispatch] = useStateValue();
    const [cls,setClasses] = useState([]);
      const [openp,setOpenP] = React.useState(false);
      const [openprofile,setOpenProfile] = React.useState(false);
      const [error,setError] = React.useState(false);
      const [codeActive,setCodeActive] = React.useState(false);
      const [sidenav,setSidenav] = React.useState(false);

      const [code,setCode] = React.useState('');
      // function to handle class code input
      const handleCode = (event)=>{
          event.preventDefault();
          setCode(event.target.value);
      }

      //fetch all classes
      useEffect(()=>{
        db.collection("classes").where('teacher','==',user.displayName)
        .onSnapshot(function(snapshot) {
            let tempClass = [];
        snapshot.docs.forEach((cls)=>{tempClass.push({data:cls.data(),id:cls.id})})
        setClasses(tempClass)
        dispatch({
            type:'SET_CLASSES',
            classes:tempClass,
        })
        console.log(cls);
        });
      },[])



      //popover
      
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleClickPop = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenP(true);
      };
    
      const handleClosePop = () => {
        setAnchorEl(null);
        setCodeActive(false);
        setCode('');
        setOpenP(false);
      };

     

      const handleProfilePopupOpen = (event)=>{
        setAnchorEl(event.currentTarget);
        setOpenProfile(true);
      }

      const habdleCloseProfile = (event)=>{
        setOpenProfile(false);
        setAnchorEl(null);
      }
      const id = openp ? 'simple-popover' : undefined;
      const id2 = openprofile ? 'simple-popover' : undefined;


      function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
      }

      //function for logout the user

      const handleLogout = ()=>{
          auth.signOut();
      }


      const setCreateModal = ()=>{
          dispatch({
              type: "SET_CREATE",
              create: true
          })
      }

      
    
    return (
        <div className="home">
            {codeActive?<div className="code__nav">
            <nav className="nav_code">
                    <div className="nav__code__left">
                        <IconButton><AddIcon/></IconButton>
                        <h3>Join a Class</h3>
                    </div>
                    <div className="nav__code__right">
                        <Button variant="contained" disabled={code.length>6?false:true} color="primary" onClick={handleClosePop}>Done</Button>
                    </div>
            </nav>
        <div className="container__join">
            <div className="container__join__add">
                <h3>Class code</h3>
                <p>Ask your teacher for the class code, then enter it here.</p>
                <TextField id="outlined-basic" label="Class Code" variant="outlined" defaultValue={code} onChange={handleCode} />
            </div>
        </div>
        </div>:<div>{ create && <CreateForm/>}
            <nav className="nav">
        <div className="nav__left">
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={(event)=>sidenav?setSidenav(false):setSidenav(true)}>
      {sidenav?<CloseIcon/>:<MenuIcon />}
    </IconButton>
            <div className="nav__left__brand">
                <img src={brand} alt=""/>
                <span>Classroom</span>
            </div>
        </div>
        <div className="nav__right">
            <div className="nav__right__left">
           <IconButton onClick={handleClickPop}><AddIcon/></IconButton>
            </div>
            <div className="nav__right__right">
                <img src={user.photoURL} alt="user" onClick={handleProfilePopupOpen}/>
            </div>
        </div>
    </nav>
    
    
    {sidenav && <Sidenav />}
    <h1>Your Classes</h1>
    {!create && <div className="container">
    
            {cls.map((item)=><Card name={item.data.class_name} teacher={item.data.teacher} key={item.id} id={item.id} teacherAvatar={item.data.teacherAvatar}/>)}

      </div>}

      {/*Popover */}
      <Popover
        id={id}
        open={openp}
        anchorEl={anchorEl}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        // Function to handle class code input

        
      >


          
       <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Join a Class" onClick={(event)=>setCodeActive(true)}/>
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Create a Class" onClick={setCreateModal}/>
        </ListItemLink>
      </List>
      </Popover>


      <Popover
        id={id2}
        open={openprofile}
        anchorEl={anchorEl}
        onClose={habdleCloseProfile}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}

        // Function to handle class code input

        
      >


          
       <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Logout" onClick={handleLogout}/>
        </ListItem>
      </List>
      </Popover></div>}
     
        </div>
    )
}

export default Home
