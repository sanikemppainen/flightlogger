const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  seen: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

movieSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('Movie', movieSchema)
