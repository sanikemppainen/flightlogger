const config=require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
const { request } = require('express')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const moviesRouter=require('./controllers/movies')
const usersRouter = require('./controllers/users')

logger.info('connecting to', config.MONGODB_URI)
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)
    .then(logger.info('connected to mongodb'))
    .catch((error)=>{
        logger.error('error connecting to mongodb: ', error.message)
    })

//we use this router if request starts like /api/movies
app.use(middleware.requestLogger)
app.use('/api/movies', moviesRouter)
app.use('/api/users', usersRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
/*
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
*/
module.exports= app