import React from 'react';
import { useHistory } from "react-router-dom"; //re rendering test 2
import _myProject from "../../services/Project.js"
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

import PopFormAlert from '../../components/SignupAlert/index.js'



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
  const [pName, setPName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [alertmsg,setAlertmsg] = React.useState('');
  let history = useHistory(); //re rendering test 2


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitProjectForm=()=>{
   if(pName===''||location===''||author===''||description===''){
    handleAlertTime('Please complete all fields!');
   }else{
    const p={pName,location,author,description}
    _myProject.newProj(p)
    .then((project) => {
     const {data} = project
     const {proj}=data
     const {pName, location, description, author} = proj
     
     setPName(pName)
     setLocation(location)
     setAuthor(author)
     setDescription(description)
     //history.push(`/Farm/${_id}`);//re rendering test 2
     setOpen(false);
     history.push('/R');

     
    })    
   }
  }

 const handlePName=({target:{_,value}})=>{
  setPName(value)
}
const handleLocation=({target:{_,value}})=>{
  setLocation(value)
}
const handleAuthor=({target:{_,value}})=>{
  setAuthor(value)
}
const handleDescription=({target:{_,value}})=>{
  setDescription(value)
}


const handleAlertTime=(text)=>{
  setTimeout(
      function() {
        setAlert(false);
      },
      5000
  );
  setAlert(true);
  setAlertmsg(text);
}
  return (
    <>
    <Card elevation={0} className={styles.root} style={{margin:'25px',width:'350px', height:'428px',borderRadius:'25px',boxShadow:' 0px 0px 18px 1px rgba(0,0,0,0.44)'}}>
      <CardMedia
        classes={mediaStyles}
        image={'https://res.cloudinary.com/jaacker25/image/upload/e_blur:180/v1582833634/IOTFARM/card_c9zfov.jpg'}
        style={{borderRadius:'25px'}}
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
                value={pName} 
                onChange={handlePName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="location"
                label="Location"
                name="location"
                margin="dense"
                value={location} 
                onChange={handleLocation}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="author"
                label="Project Manager "
                name="author"
                margin="dense"
                value={author} 
                onChange={handleAuthor}
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
                value={description} 
                onChange={handleDescription}
              />
              <p 
              style={{color:'gray',fontSize:'0.75rem',margin:'0'}}
              >Description recomended be 115 characters max.</p>

            </Grid>
            
          </Grid>
        </DialogContent>
        <DialogActions style={{justifyContent:'center'}}>
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
      {alert?<PopFormAlert msg={alertmsg}/>:null}
      </>
  );
};

export default VoidCard;


