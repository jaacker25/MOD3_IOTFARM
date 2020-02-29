const router = require('express').Router()
const Project = require('../models/Project')
const User = require('../models/User');
const uploadConfig = require("../config/cloudinary");

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

router.post('/updateProject',async(req,res,next)=>{
  const {pName,location,author,description,_id} = req.body
  Project.findByIdAndUpdate({_id: _id},{pName:pName,location:location,author:author,description:description})
  .then( proj => res.status(200).json({proj}))
  .catch( err => res.status(500).json({err}))
})

router.post('/updateIconProj/:id',uploadConfig.single("photoURL"),async(req,res,next)=>{
  const {id}=req.params
  const { secure_url } = req.file
  const proj = await Project.findByIdAndUpdate({_id: id},{img:secure_url},{new:true})
  res.status(200).json({ proj })
})

router.post("/myProject", async (req,res,next)=>{
  const {projectId}=req.body
  await Project.findById(projectId)
 .then((p) => res.status(200).json({ p }))
 .catch((err) => res.status(500).json({ err }));
})

//router.get('/delete/:id', isAuthenticated, deleteBook) 


module.exports = router

router.post("/upload",uploadConfig.single("photoURL"),async(req,res,next)=>{
  const { secure_url } = req.file
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { image: secure_url },
    { new: true }
  )
  res.status(200).json({ user })
})