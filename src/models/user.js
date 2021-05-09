const mongoose = require ('mongoose')
const {Schema}= mongoose
const bcrypt= require('bcrypt')




const userSchema = new Schema({
    email: String,
    password: String
});
/* */
userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hash(password, salt)
  return hash;
}

userSchema.methods.matchPassword = async function (password){
return await bcrypt.compare(password, this.password)
}

module.exports=mongoose.model('User', userSchema) 