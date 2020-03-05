import axios from 'axios';
//const baseURL = 'https://theultimateiotsmartfarming.herokuapp.com'//aqui va el d heroku
const baseURL = 'http://localhost:3000'

const service = axios.create({ withCredentials: true, baseURL });

const _myProject = {
  newProj: async (data) => {
    return await service.post("/project/newProject",data)
  },
  updateProj: async (data) => {
    return await service.post("/project/updateProject",data)
  },
  updateIconProj: async (data,x) => {
    return await service.post(`/project/updateIconProj/${x}`,data)
  },
  myProject: async (projectId)=>{
    return await service.post("/project/myProject",projectId)
  },
  deleteProj: async (projectId)=>{
    return await service.post("/project/deleteProject",projectId)
  },
       
   getAllSensors: async()=>{
     return await service.get('project/getAllSensors')
   }, 

   updateSensorProj:async(x,data)=>{
     return await service.post(`/project/updateSensor/${x}`,data)
   }

};

export default _myProject;