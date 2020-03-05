const router = require('express').Router()
const Project = require('../models/Project')
const User = require('../models/User');
const uploadConfig = require("../config/cloudinary");
const AdmSensor = require('../models/AdmSensors')

router.post('/newProject', async(req,res,next)=>{
 const {pName,location,author,description}=req.body
 const newProj={user_id:req.user._id,pName,location,author,description}
 await Project.create(newProj)
 .then(async(proj) =>{ 
                    const id=proj._id
                      let date=proj.createdAt;
                      date=date.toLocaleDateString();
                      const up = await Project.findByIdAndUpdate(id,{date:date})
                      let user = await User.findById(req.user._id)
                      await user.projects.push(id)
                      await user.save()
                 res.status(200).json({ proj })  
                })
 .catch((err) => res.status(500).json({ err }));
})

router.post('/updateSensor/:id',async(req,res,next)=>{
  const {id}=req.params
  let pro = await Project.findById(id)
             await pro.sensors.push(req.body)
             await pro.save()
           
  res.status(200).json({ pro })
})

router.post('/updateProject',(req,res,next)=>{
  const {pName,location,author,description,_id} = req.body
  Project.findByIdAndUpdate({_id: _id},{pName:pName,location:location,author:author,description:description})
  .then( proj => res.status(200).json({proj}))
  .catch( err => res.status(500).json({err}))
})

router.post('/updateIconProj/:id',uploadConfig.single("photoURL"),(req,res,next)=>{
  const {id}=req.params
  const { secure_url } = req.file
  Project.findByIdAndUpdate({_id: id},{img:secure_url},{new:true})
  .then( proj => res.status(200).json({proj}))
  .catch( err => res.status(500).json({err}))
})

router.post("/myProject",(req,res,next)=>{
  const {projectId}=req.body
  Project.findById(projectId)
 .then((p) => res.status(200).json({ p }))
 .catch((err) => res.status(500).json({ err }));
})

router.post("/deleteProject",(req,res,next)=>{
  const {_id}=req.body
  Project.findByIdAndDelete(_id)
 .then((p) => res.status(200).json({ p }))
 .catch((err) => res.status(500).json({ err }));
})

router.get("/getAllSensors",(req,res,next)=>{
AdmSensor.find()
  .then((dataS) => res.status(200).json({ dataS }))
  .catch((err) => res.status(500).json({ err }));
})

router.post("/upload",uploadConfig.single("photoURL"),(req,res,next)=>{
  const { secure_url } = req.file
  User.findByIdAndUpdate(req.user._id,{ image: secure_url },{ new: true })
  .then((user) => res.status(200).json({ user }))
  .catch((err) => res.status(500).json({ err }));
})

module.exports = router