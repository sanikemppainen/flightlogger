const moviesRouter=require('express').Router()
const Movie=require('../models/movie')
const User = require('../models/user')
const config=require('../utils/config')
const jwt = require('jsonwebtoken')

const getToken=request=>{
    const auth=request.get('authorization')
    if(auth && auth.toLowerCase().startsWith('bearer')){
        return auth.substring(7)
    }
    return null
}

moviesRouter.get('/', async (request, response) => {
    const movies= await Movie
        .find({})
        .populate('user', { username: 1})
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
    const token=getToken(request)
    const decodedToken=jwt.verify(token, config.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({ error: 'token is missing or wrong'})
    }
    const body=request.body
    const user= await User.findById(decodedToken.id)
    const movie = new Movie({
        name: body.name,
        rating: body.rating,
        seen: body.seen || false,
        user: user._id
      })
      
    const savedMovie= await movie.save()
    user.movies= user.movies.concat(savedMovie._id)
    await user.save()

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