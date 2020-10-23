import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import Option from './Option';
import '../styles/sidenav.css'
import { useStateValue } from '../StateProvider';

function Sidenav({}) {
    const [{user,create,classes},dispatch] = useStateValue();
    
    return (
        <div className="sidenav">
           
            
            
            {classes.map((item)=>{
                return <Option text={item.data.class_name} key={item.id} teacher={item.data.teacher} id={item.id}/>
            })}
           
        </div>
    )
}

export default Sidenav
