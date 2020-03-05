import './index.css'
import React from 'react';
import _myProject from "../../services/Project.js"
import { useHistory } from "react-router-dom"; //re rendering test 2

import cx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LaunchIcon from '@material-ui/icons/Launch';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom'
import Fab from '@material-ui/core/Fab';

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
  rateValue: {
    fontWeight: 'bold',
    marginTop: 2,
  },
  content: {
    position: 'relative',
    padding: 24,
    margin: '-24% 16px 0',
    backgroundColor: '#fff',
    borderRadius: 8,
    opacity:1,
  },
  favorite: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
}));

const ProjectCard = (props) => {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const shadowStyles = useFadedShadowStyles();
  const gutterStyles = usePushingGutterStyles({ firstExcluded: true });
  const [open, setOpen] = React.useState(false);
  const [pName, setPName] = React.useState(props.pName);
  const [location, setLocation] = React.useState(props.location);
  const [description, setDescription] = React.useState(props.description);
  const [author, setAuthor] = React.useState(props.author);
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
     const p={pName,location,author,description,_id:props._id}
     _myProject.updateProj(p)
      .then((project) => {
      setOpen(false);
      history.push('/R');
     })
    }
   }

   const handleDeleteProjectForm=()=>{
    const p={_id:props._id}
    _myProject.deleteProj(p)
     .then((status)=>{
      setOpen(false);
      history.push('/R');
     })
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

 const handleEdit=()=>{
  document.getElementById('passValue').value=props._id;
  document.getElementById('getFileIcon').click()
}

const handleFile = e => {
    const formData = new FormData();
    formData.append("photoURL", e.target.files[0]);
    const x= document.getElementById('passValue').value
    _myProject.updateIconProj(formData,x)
      .then(( {data:{proj}} ) => {
        history.push('/R');
      })
      .catch(err => {
        handleAlertTime('Unsupported file type!');
      });
  }; 


  return (
    <>
    <div style={{
                                                        margin:'35px 25px',
                                                        borderRadius:'25px',
                                                        backgroundColor:'#c2c2c2',
                                                        border:'1px solid #abee91'
                                                        }}>
    <Card elevation={0} className={styles.root} style={{
                                                        width:'350px', 
                                                        height:'428px',
                                                        borderRadius:'25px',
                                                        boxShadow:' 0px 0px 18px 1px rgba(0,0,0,0.44)' }}
                                                        >
      <CardMedia
        classes={mediaStyles}
        image={
          'https://res.cloudinary.com/jaacker25/image/upload/v1582783684/IOTFARM/agtech_wghb2m.jpg'
        }
        style={{borderRadius:'25px',filter:'blur(1px)'}}
      />
      <CardContent className={cx(shadowStyles.root, styles.content)}>

        
        
        <div style={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
        <h3 className={styles.title}>{props.pName}</h3>
        <Fab style={{textAlign:'center',padding:'0'}}
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleClickOpen} 
          >
          <EditOutlinedIcon style={{color:'white',padding:'0'}} />
        </Fab>
        </div>
        

        <br/>
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          <LocationOn className={styles.locationIcon} />
          <span>{props.location}</span>
        </Box>
        <Box color={'grey.500'} display={'flex'} alignItems={'center'} mb={1}>
          <TodayIcon className={styles.locationIcon} />
          <span>Created: {props.date}</span>
        </Box>
       
        <Typography color={'textSecondary'} variant={'body2'}>
        {props.description}
        </Typography>
        <Box
          mt={2}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            className={gutterStyles.parent}
          >
            <p id="passValue" style={{display:'none'}}></p>
            <input type='file' name="photoURL" id="getFileIcon" style={{display:'none'}} onChange={handleFile} />
           <Avatar src={props.img} className={styles.avatar} id="Avatar" onClick={handleEdit}/> 
      <Box>
      <h3 className={styles.heading} style={{margin:'0'}}>{props.author}</h3>
      <Typography color={'textSecondary'} variant={'body2'}>
        Responsible
        </Typography>
       </Box>
          </Box>


          <Fab style={{textAlign:'center',padding:'0'}}
          variant="extended"
          size="small"
          color="secondary"
          aria-label="add"
          >
          <Link to={`/Farm/${props._id}`} style={{display:'flex',justifyContent:'center'}}>
          <LaunchIcon style={{color:'white',padding:'0'}} />
          </Link>
        </Fab>

        </Box>
      </CardContent>
    </Card>
    </div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Edit Current Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Please fill in your details below to edit this project. All fields are required.
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
                label="Responsible Person"
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
        <DialogActions style={{justifyContent:'space-between',marginRight:'18px',marginBottom:'18px'}}>
       
           
          <DeleteOutlineIcon className="profileDeleteIcon" color="secondary"  style={{ fontSize: 18 }} onClick={handleDeleteProjectForm} />
          
   
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleSubmitProjectForm}
          
        >
          <CheckOutlinedIcon />
          Submit
        </Fab>
        </DialogActions>
      </Dialog>
      {alert?<PopFormAlert msg={alertmsg}/>:null}
      </>
  );
};


export default ProjectCard;