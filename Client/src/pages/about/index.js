import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(() => ({
  root: {
    overflow: 'initial',
    maxWidth: 350,
  },
  title: {
    marginBottom: 0,
  },
}));

const VoidCard = () => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitProjectForm=()=>{
  setOpen(false);
  }

  return (
    <>
    <Card elevation={0} className={styles.root} style={{margin:'25px',width:'350px', height:'428px'}}>
      <CardMedia
        classes={mediaStyles}
        image={'https://res.cloudinary.com/jaacker25/image/upload/e_blur:180/v1582833634/IOTFARM/card_c9zfov.jpg'}
      />
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'20px 0'}}>
      <h3 className={styles.title}>Add New Project</h3>
      </div>
<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',padding:'10px 0'}}>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
      <AddIcon />
      </Fab>
</div>      
    </Card>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Create a new Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please fill in your details below to create a new project. All fields are required.
          </DialogContentText>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="pName"
                fullWidth
                id="pName"
                label="Project Name"
                autoFocus
                margin="dense"
                type="text"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="location"
                label="Location"
                name="location"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="author"
                label="Author"
                name="author"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                type="description"
                id="description"
                margin="dense"
              />
              <p 
              style={{color:'gray',fontSize:'0.75rem',margin:'0'}}
              >Description must be 115 characters max.</p>

            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions>
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleSubmitProjectForm}
        >
          <AddIcon />
          Create
        </Fab>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default VoidCard;


/*
import './index.css'

import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <div>
               <h1 style={{color:'white'}}>Esto es ABOUT</h1> 
               <img src='https://gfycat.com/ifr/FatherlyRespectfulIslandwhistler' alt="algo"></img>
               
            </div>
        )
    }
}


*/