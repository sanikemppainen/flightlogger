const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://movieapp:${password}@cluster0.bbfzwni.mongodb.net/movieApp?retryWrites=true&w=majority`

mongoose.connect(url)

const movieSchema = new mongoose.Schema({
  name: String,
  rating: String,
  seen: Boolean,
})

const Movie = mongoose.model('Movie', movieSchema)

const movie = new Movie({
  name: 'Lake Tahoe',
  rating: '8',
  seen: true,
})

movie.save().then(result => {
  console.log('movie saved!')
  mongoose.connection.close()
})