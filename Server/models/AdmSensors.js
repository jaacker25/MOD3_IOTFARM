const {model, Schema} = require('mongoose')

const admSensorsSchema = new Schema({
    AdmSensors:[
        {
            sensorID:String,
            sensorAPI:String
        }
   
      ]
  
},{
timestamps: true,
versionKey: false
})

module.exports = model('AdmSensors', admSensorsSchema)
