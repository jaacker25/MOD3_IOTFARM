import axios from 'axios';
const mySensor = {
    test: async (SensorID,SensorAPI) => {
        return await axios.get(`https://api.thingspeak.com/channels/${SensorID}/feeds.json?api_key=${SensorAPI}&results=10`);
    },
    myPos: async (SensorID,SensorAPI) => {
        return await axios.get(`https://api.thingspeak.com/channels/${SensorID}/feeds.json?api_key=${SensorAPI}&results=10`)
    },
    myDataSensor: async (SensorID,SensorAPI,Pam)=>{
        return await axios.get(`https://api.thingspeak.com/channels/${SensorID}/fields/${Pam}.json?api_key=${SensorAPI}&results=10`)
    }
};

export default mySensor;