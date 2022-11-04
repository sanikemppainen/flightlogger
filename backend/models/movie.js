const mongoose = require('mongoose')

const url =process.env.MONGODB_URI

mongoose.connect(url).then(console.log('connected to mongodb')).catch((error)=>{console.log('error connecting to mongodb: ', error.message)})

const movieSchema = new mongoose.Schema({
  name: String,
  rating: String,
  seen: Boolean,
})

const Movie = mongoose.model('Movie', movieSchema)

movieSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports=mongoose.model('Movie', movieSchema)
