import axios from 'axios';
const baseURL = 'https://api.thingspeak.com/channels/1006090/feeds.json?api_key=XF3MTAYRZFJ9JULP'

const sensor = axios.create({baseURL});

const mySensor = {
    test: async () => {
        return await sensor.get();
    }
};

export default mySensor;