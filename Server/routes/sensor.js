const router = require('express').Router()
const Project = require('../models/Project')
const AdmSensor = require('../models/AdmSensors')

router.get("/getAll",async(req,res,next)=>{
    console.log('yyaaaaamete')
  await AdmSensor.find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(500).json({ err }));
  })


module.exports = router