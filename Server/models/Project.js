const {model, Schema} = require('mongoose')

const projectSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  pName:String,
  location:String,
  description:String,
  author:String,
  date:String,
  img:{
    type:String,
    default:"https://res.cloudinary.com/jaacker25/image/upload/v1582932490/IOTFARM/avatar_npiak7.jpg"
  }
},{
timestamps: true,
versionKey: false
})

module.exports = model('Project', projectSchema)
