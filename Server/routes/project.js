const router = require('express').Router()
const Project = require('../models/Project')
const User = require('../models/User');

router.post('/newProject', async(req,res,next)=>{
 const {pName,location,author,description}=req.body
 const newProj={user_id:req.user._id,pName,location,author,description}
 await Project.create(newProj)
 .then(async(proj) =>{ 
                    const id=proj._id
                      let date=proj.createdAt;
                      date=date.toLocaleDateString();
                      console.log(date)
                      const up = await Project.findByIdAndUpdate(id,{date:date})
                      let user = await User.findById(req.user._id)
                      await user.projects.push(id)
                      await user.save()
                 res.status(200).json({ proj })  
                })
 .catch((err) => res.status(500).json({ err }));
 

})

//router.post('/edit/:id', editBookPost) 

//router.get('/delete/:id', isAuthenticated, deleteBook) 


module.exports = router


