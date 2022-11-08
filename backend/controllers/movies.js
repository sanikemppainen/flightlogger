const moviesRouter=require('express').Router()
const Movie=require('../models/movie')

moviesRouter.get('/', async (request, response) => {
    const movies= await Movie.find({})
    response.json(movies)
})

moviesRouter.get('/:id', async (request, response) => {
    const movies= await Movie.findById(request.params.id)
    if(movie){
        response.json(movie.toJSON())
    }else{
        response.status(404).end()
    }
})

moviesRouter.post('/', async(request, response)=>{
    const body=request.body
    const movie = new Movie({
        name: body.name,
        rating: body.rating,
        seen: body.seen || false,
      })
      
    const savedMovie= await movie.save()
    response.status(201).json(savedMovie)
})

moviesRouter.delete('/:id', async (request, response)=>{
    await Movie.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

moviesRouter.post('/:id', async (request, response, next)=>{
    const body=request.body
    const movie = {
        name: body.name,
        rating: body.rating,
        seen: body.seen || false,
    }
    const updatedMovie = await Movie.findByIdAndUpdate(request.params.id, movie, {new:true, runValidators: true, context: 'query'})
        .then(updatedMovie=>{
            response.json(updatedMovie)
        })
        .catch(error=>next(error))
    response.status(updatedMovie)
})

module.exports = moviesRouter