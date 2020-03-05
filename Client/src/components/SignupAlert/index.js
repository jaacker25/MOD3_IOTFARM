import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function PopFormAlert(props) {

  const [, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (

      <Snackbar open={true} autoHideDuration={4000} onClose={handleClose} key={'top,right'} anchorOrigin={{horizontal:'right',vertical:'top'}}>
        <Alert onClose={handleClose} severity="error">
        {props.msg}
        </Alert>
      </Snackbar>

  );
}