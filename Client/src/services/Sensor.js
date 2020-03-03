import axios from 'axios';
let baseURL = 'http://localhost:3000';

const sensor =  axios.create({ withCredentials: true, baseURL });

const mySensor = {
    test: async (SensorID) => {
        return await axios.create({baseURL:`https://api.thingspeak.com/channels/${SensorID}/feeds.json?api_key=XF3MTAYRZFJ9JULP`}).get();
    },

};

export default mySensor;