require('dotenv').config()
const express = require('express')
const cors=require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const Movie=require('./models/movie')

app.get('/api/movies', (request, response) => {
    Movie.find({}).then(movies=>{
        response.json(movies)
    })
})

app.get('/api/movies/:id', (request, response) => {
    Movie.findById(request.params.id).then(movie=>{
        response.json(movie)
    })
})

app.post('/api/movies', (request, response)=>{
    const body=request.body
    if(body.name===undefined){
        return response.status(400).json({error:'no content given'})
    }

    const movie = new Movie({
        name: body.name,
        rating: body.rating,
        seen: body.seen || false,
      })
      
      movie.save().then(savedMovie => {
        response.json(savedMovie)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})