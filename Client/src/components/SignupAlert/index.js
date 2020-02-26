import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function CustomizedSnackbars() {

  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (

      <Snackbar style={{marginRight:'9%'}} open={true} autoHideDuration={4000} onClose={handleClose} key={'bottom,right'} anchorOrigin={{horizontal:'right',vertical:'bottom'}}>
        <Alert onClose={handleClose} severity="error">
        Please complete all fields!
        </Alert>
      </Snackbar>

  );
}