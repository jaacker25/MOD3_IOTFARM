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
  date:String
},{
timestamps: true,
versionKey: false
})

module.exports = model('Project', projectSchema)
