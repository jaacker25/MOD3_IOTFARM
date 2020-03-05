import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MyChart from '../chart/index'

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
        <Tab label="Ambient Light in lux" {...a11yProps(0)} />
        <Tab label="Ambient Temperature in °C" {...a11yProps(1)} />
        <Tab label="Ambient Moisture in %RH" {...a11yProps(2)} />
        <Tab label="Soil Moisture in %RH" {...a11yProps(3)} />
        <Tab label="Soil PH in units" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        
        <div style={{width:'70vw', height:'auto',backgroundColor:'#e6e4e0',borderRadius:'50px',border: '2px solid #abee91'}}>
      {props.theSensors&&<MyChart dataSensors={props.theSensors} parameter={1} />}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{width:'70vw', height:'auto',backgroundColor:'#e6e4e0',borderRadius:'50px',border: '2px solid #abee91'}}>
        {props.theSensors&&<MyChart dataSensors={props.theSensors} parameter={2} />}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div style={{width:'70vw', height:'auto',backgroundColor:'#e6e4e0',borderRadius:'50px',border: '2px solid #abee91'}}>
        {props.theSensors&&<MyChart dataSensors={props.theSensors} parameter={3} />}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div style={{width:'70vw', height:'auto',backgroundColor:'#e6e4e0',borderRadius:'50px',border: '2px solid #abee91'}}>
        {props.theSensors&&<MyChart dataSensors={props.theSensors} parameter={4} />}
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <div style={{width:'70vw', height:'auto',backgroundColor:'#e6e4e0',borderRadius:'50px',border: '2px solid #abee91'}}>
        {props.theSensors&&<MyChart dataSensors={props.theSensors} parameter={5} />}
        </div>
      </TabPanel>
    </div>
  );
}