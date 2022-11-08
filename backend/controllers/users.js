const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users= await User
        .find({})
        .populate('movies', { name: 1})
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user= await User.findById(request.params.id)
    if(user){
        response.json(user.toJSON())
    }else{
        response.status(404).end()
    }
})

usersRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const rounds = 10
  const passwordHash = await bcrypt.hash(password, rounds)

  const user = new User({
    username,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response)=>{
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter