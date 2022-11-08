const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Movie = require('../models/movie')
const api = supertest(app)


const initialMovies=[
    {
        name: 'Bambi',
        rating: '7',
        seen: true
    },
    {
        name: 'Jackass',
        rating: '1',
        seen: false
    },
    {
        name: 'Titanic',
        rating: '5',
        seen: true
    }
]

beforeEach(async () => {
    await Movie.deleteMany({})
    let movieObj=new Movie(initialMovies[0])
    await movieObj.save()
    movieObj=new Movie(initialMovies[1])
    await movieObj.save()
    movieObj=new Movie(initialMovies[2])
    await movieObj.save()
})

test('notes returned as json', async () => {
  await api
    .get('/api/movies')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are three movies', async () => {
    const response = await api.get('/api/movies')
    expect(response.body).toHaveLength(initialMovies.length)
})

test('first movie is named Bambi', async () => {
    const response = await api.get('/api/movies')
    expect(response.body[0].name).toBe('Bambi')
})

test('specific movie is amongst movies', async () => {
    const response = await api.get('/api/movies')
    const names=response.body.map(movie=> movie.name)
    expect(names).toContain('Titanic')
})

test('movie with valid body can be added', async () => {
    const newMovie = {
        name: 'Sharks',
        rating: '8',
        seen: false
    }
    await api
      .post('/api/movies')
      .send(newMovie)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/movies')
    const names = response.body.map(movie => movie.name)
    expect(response.body).toHaveLength(initialMovies.length + 1)
    expect(names).toContain('Sharks')
  })
  
test('movie without name is not added', async () => {
    const newMovie = {
        rating: '5',
        seen: true
    }
    await api
      .post('/api/movies')
      .send(newMovie)
      .expect(400)
    const response = await api.get('/api/movies')
    expect(response.body).toHaveLength(initialMovies.length)
})
test('movie without rating is not added', async () => {
    const newMovie = {
        name: 'no rating movie',
        seen: true
    }
    await api
      .post('/api/movies')
      .send(newMovie)
      .expect(400)
    const response = await api.get('/api/movies')
    expect(response.body).toHaveLength(initialMovies.length)
})

afterAll(() => {
  mongoose.connection.close()
})