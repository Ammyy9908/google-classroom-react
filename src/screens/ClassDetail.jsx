import React,{useEffect,useState} from 'react'
import brand from '../brand.svg'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Avatar, Button, Fab, IconButton } from '@material-ui/core'
import { useStateValue } from '../StateProvider';
import '../styles/detail.css'
import {db,storage} from '../firebase'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextField from '@material-ui/core/TextField';
import {useHistory} from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase'
import Sidenav from '../components/Sidenav';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom'
function ClassDetail({id}) {
    const [{user,create},dispatch] = useStateValue();
    const [classData,setClass] = useState();

    const [sidenav,setSidenav] = React.useState(false);
    const history = useHistory();
    const [progress,setProgress] = useState();
    const [teacher,setTeacher] = useState('');


    useEffect(()=>{
        
        db.collection('classes').doc(id).get().then((doc)=>{
            setClass(doc.data());
            setTeacher(doc.data().teacher);
            document.title = doc.data().class_name;
            

        })
       
    },[progress])

    const uploadCover  = (e)=>{
        let allowed_ext = ["image/jpeg","image/jpg","image/png"];
        e.preventDefault();
        var file = e.target.files[0];
        if(allowed_ext.includes(file.type)){
            var storageRef=storage.ref(`${classData.class_name}+${classData.teacher}/${file.name}`);
            var task=storageRef.put(file);
             //update the progress

             task.on('state_changed',function progress(snapshot){
                
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setProgress(percentage);
            },
            function error(err){
                    console.log(err);
            },function complete(){
                task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                    let image_data = {"url":downloadURL}
                    db.collection("classes").doc(id).update({
                        "cover":image_data,
                    })
                    .then(function() {
                        setProgress('');
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                })
            }
            )
        }
        else{
            console.log('Only Images allowed!');
        }
    }
   
      const styles=classData && classData.cover.url ?{
            backgroundImage: "url(" + classData.cover.url + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            color:"#fff"
          }:
          {
            backgroundImage: "url(" + 'https://oxygenna.com/wp-content/uploads/2015/07/blog-1.jpg' + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            color:"#fff"
          }
    

   
   

    


    return (
        <div className="class-detail">
            {/*Navbar */}
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
                <li><a href="#/" className="link__active">Stream</a></li>
                <li><Link to={`/work/${id}`}>Classwork</Link></li>
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
    {sidenav && <Sidenav data={["Home","Stream","Classword","People","Grades"]} />}
    {progress&& <LinearProgress variant="determinate" value={progress} />}
    <div className="class__container">
   
    {classData && <div className="class__header" style={classData && styles}>
        <h1>{classData.class_name}</h1>
    <p>{classData.section}</p>
        <span>Class Code {classData.code}</span><br/>
        <br/>
        <br/>
       { teacher && teacher === user.displayName && <form>
        <label htmlFor="upload-photo">
  <input
    style={{ display: 'none' }}
    id="upload-photo"
    name="upload-photo"
    type="file"
    onChange={uploadCover}
  />

  <Fab color="secondary" size="small" component="span" aria-label="add">
    <CameraAltIcon/>
  </Fab>
</label>
        </form>}<br/>
       
    </div>}

    <div className="dashboard">
        <div className="dashboard__left">
                <div className="upcoming">
                    <h4>Upcoming</h4>
                    {classData && classData.assignments.length>0 && <span>{new Date(classData.assignments[0].dueTimeStamp).toLocaleString("default", { weekday: "long" })}</span>}
       {classData && classData.assignments.length>0 ?<p>{classData.assignments[0].title}</p>:<p>Woohoo, no work due soon!</p>}
                    <Link to={`/work/${id}`}>View All</Link>
                </div>
        </div>
        <div className="dashboard__right">
            <div className="teacher__post">
                <div className="post__start">
                    <Avatar src={user && user.photoURL}></Avatar>
                    <p>Share something with your class...</p>
                </div>
            </div>
            <div className="assignment__list">
                <h3>View class updates and connect with your class here</h3>
                <div className="asl_bottom"><AssignmentIcon/><p>See when new assignments are posted</p></div>
            </div>
        </div>
    </div>
    </div>
        </div>
    )
}

export default ClassDetail
