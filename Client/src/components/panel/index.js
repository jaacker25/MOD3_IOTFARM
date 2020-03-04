import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyChart from '../chart/index'
import mySensor from "../../services/Sensor.js"


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 450,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const giveMeData=(parameter)=>{
    
    const newArr=[]
    const myArrSens=props.theSensors;

    if(myArrSens){
      myArrSens.forEach(async(val,ind)=>{
      
    await mySensor.myDataSensor(val.sensorID,val.sensorAPI,parameter)
    .then(d=>{
      newArr.push(d.data.feeds)
      
    })     
    })
   console.log('yo')
    return newArr
    }
    

  }

  return (
    
    <div className={classes.root} style={{marginBottom:'150px',marginTop:'50px'}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Ambient Light" {...a11yProps(0)} />
        <Tab label="Ambient Temperature" {...a11yProps(1)} />
        <Tab label="Ambient Moisture" {...a11yProps(2)} />
        <Tab label="Soil Moisture" {...a11yProps(3)} />
        <Tab label="Soil PH" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        
        <div style={{width:'70vw', height:'80vh',backgroundColor:'#e6e4e0',borderRadius:'50px'}}>
      {props.theSensors&&<MyChart dataSensors={props.theSensors} parameter={1} />}
         {/*giveMeData(1)&&<MyChart dataSensors={giveMeData(1)}/>*/}  
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
        <div style={{width:'70vw', height:'60vh',backgroundColor:'#e6e4e0',borderRadius:'50px'}}>
      
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        
        <div style={{width:'70vw', height:'60vh',backgroundColor:'#e6e4e0',borderRadius:'50px'}}>
       
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        
        <div style={{width:'70vw', height:'60vh',backgroundColor:'#e6e4e0',borderRadius:'50px'}}>
        
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div style={{width:'70vw', height:'60vh',backgroundColor:'#e6e4e0',borderRadius:'50px'}}>
        
        </div>
      </TabPanel>
    </div>
  );
}