import axios from 'axios'

// eslint-disable-next-line no-undef
const key=process.env.REACT_APP_API_KEY
const baseUrl='http://localhost:3001/api/movies'

const getById=(params) => {
    let movieId=params
    const request=axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`)
    return request.then(response => response.data)
}
const getAll=() => {
    const request=axios.get(baseUrl)
    return request.then(response => response.data)
}

export default {
    getById, getAll
}
