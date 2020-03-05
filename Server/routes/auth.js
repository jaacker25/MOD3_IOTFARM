const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('../config/passport');
const uploadConfig = require("../config/cloudinary");

router.post('/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});


router.post('/login',passport.authenticate('local'), (req, res, next) => {
    const { _id } = req.user
    User.findById(_id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
  }
)

router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: 'Logged out' });
});

router.get('/profile', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

router.get("/logged",isAuth,(req,res,next)=>{
  User.findById(req.user._id).populate('projects')
  .then((user) => res.status(200).json({ user }))
  .catch((err) => res.status(500).json({ err }));
})

router.post("/upload",uploadConfig.single("photoURL"), (req,res,next)=>{
  const { secure_url } = req.file
  User.findByIdAndUpdate(req.user._id,{ image: secure_url },{ new: true })
  .then((user) => res.status(200).json({ user }))
  .catch((err) => res.status(500).json({ err }));
})

router.post("/edit",(req,res,next)=>{
  const {username,firstName,lastName,image} = req.body
  const id=req.user._id
  const editUser = {username,firstName,lastName,image}
  User.findByIdAndUpdate({_id: id}, editUser, {new: true})
  .then( user => res.status(200).json({user}))
  .catch( err => res.status(500).json({err}))
})






function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
