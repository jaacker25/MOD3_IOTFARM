const { Schema, model } = require('mongoose');
const PLM = require('passport-local-mongoose');

const userSchema = new Schema(
  {
    username:String,
    firstName:String,
    lastName:String,
    email: String,
    image:{
     type:String,
     default:"https://res.cloudinary.com/jaacker25/image/upload/v1582697191/IOTFARM/userDefault_t6xafm.png"
    },
    projects:[ {
      type: Schema.Types.ObjectId,
      ref:'Project'
  }
  ]},
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.plugin(PLM, { usernameField: 'email' });

module.exports = model('User', userSchema);
