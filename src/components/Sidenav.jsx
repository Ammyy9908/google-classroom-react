import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import Option from './Option';
import '../styles/sidenav.css'
import { useStateValue } from '../StateProvider';

function Sidenav({}) {
    const [{user,create,classes},dispatch] = useStateValue();
    return (
        <div className="sidenav">
            <div className="sidenav__header">
            <Option Icon={HomeIcon} text="Classes"/>
            </div>
            
            
            {classes.map((item)=>{
                return <Option text={item.data.class_name} key={item.id}/>
            })}
        </div>
    )
}

export default Sidenav
