import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStateValue } from '../StateProvider';

export default function LinkDialog() {
  const [{link,fileURL},dispatch] = useStateValue();
  const [url,setURL] = React.useState('');
  


  const handleClose = () => {
    dispatch({
        type:'SET_LINK_DIALOG',
        link:false
    })
  };

  const handleSave = ()=>{
    dispatch({
        type:'SET_LINK',
        fileURL:url,
    })
    handleClose();
  }
  const handleURL = (event)=>{
     setURL(event.target.value);
  }
  return (
    <div>
      <Dialog open={link} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={url}
            fullWidth
            onChange={handleURL}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}