import axios from 'axios';
let baseURL = 'http://localhost:3000';

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
  logOut: async () => {
    return await service.get('/Logout');
  },
  logged: async () => {
    return await service.get("/Logged");
  }
};

export default myService;