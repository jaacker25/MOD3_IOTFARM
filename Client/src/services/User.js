import axios from 'axios';
//const baseURL = 'https://theultimateiotsmartfarming.herokuapp.com'//aqui va el d heroku
const baseURL = 'http://localhost:3000'

const service = axios.create({ withCredentials: true, baseURL });
const myService = {
  test: async () => {
    return await service.get('/');
  },
  signup: async (user) => {
    return await service.post('/Signup', user);
  },
  login: async (user) => {
    return await service.post('/Login', user);
  },
  logout: async () => {
    return await service.get('/Logout');
  },
  logged: async () => {
    return await service.get("/Logged");
  },
  edit: async (user) => {
    return await service.post("/Edit", user);
  },
  upload: async (user) => {
    return await service.post("/Upload", user);
  }
};

export default myService;