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
  },
  newProj: async (data) => {
    return await service.post("/project/newProject",data)
  },
  updateProj: async (data) => {
    return await service.post("/project/updateProject",data)
  },
  updateIconProj: async (data,x) => {
    console.log('es mi ide')
    console.log(x)
    return await service.post(`/project/updateIconProj/${x}`,data)
  },
  myProject: async (projectId)=>{
    return await service.post("/project/myProject",projectId)
  }
};

export default myService;