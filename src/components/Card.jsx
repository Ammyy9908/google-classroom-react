import React from 'react'
import '../styles/Card.css'
import ShareIcon from '@material-ui/icons/Share';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from '../StateProvider';
function Card({name,teacher,teacherAvatar,id,cover}) {

    const [{user,create},dispatch] = useStateValue();

    const styles=cover && cover ?{
        backgroundImage: "url(" + cover + ")",
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
        <div className="card">
            <div className="card__header" style={styles}>
                <div className="header__top">
                 <Link to={`/c/${id}`} style={{"textDecoration": "none"}}><h1 style={{"fontSize":"20px"}}>{name}</h1></Link>
    <Tooltip title={teacher === user.displayName ?`Share Code`:`Enroll course`}><IconButton>{teacher === user.displayName ?<ShareIcon style={{fill: "white"}}/>:<CloseIcon style={{fill: "white"}}/>}</IconButton></Tooltip>
                </div>
                <div className="header__bottom">
                    <p>{teacher}</p>
                    <div className="card__user">
                        <img src={teacherAvatar} alt=""/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Card
