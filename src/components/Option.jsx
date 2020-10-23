import React from 'react'
import '../styles/option.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { useStateValue } from '../StateProvider';
import {useHistory} from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));


function Option({Icon,text,teacher,id}) {

  const history = useHistory();

  const [{user,create},dispatch] = useStateValue();
    const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (index) => {
    history.push(`/c/${index}`);
  };
    return (
        <div>
             <ListItem
          button
          onClick={(event) => handleListItemClick(id)}
           >
          <ListItemIcon>
    <Avatar className={classes.orange}>{text.substring(0,2)}</Avatar>
          </ListItemIcon>
          {user.displayName === teacher? <ListItemText secondary={`${text} Teaches`} />:<ListItemText primary={text} />}
        </ListItem>
             <Divider />
        </div>
       
    )
}

export default Option
