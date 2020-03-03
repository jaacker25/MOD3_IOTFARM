const {model, Schema} = require('mongoose')

const admSensorsSchema = new Schema({
    AdmSensors:[
        {
            type: Number,
            default:[1006090,
                     1006098,
                     1006099,
                     1006100]
        }
   
      ]
  
},{
timestamps: true,
versionKey: false
})

module.exports = model('AdmSensors', admSensorsSchema)
