/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

// eslint-disable-next-line no-undef
const key=process.env.REACT_APP_API_KEY
const baseUrl='http://localhost:3001/api/movies'
let token=null

const setToken=newToken=>{
    token=`bearer ${newToken}`
}

const getAll=() => {
    const request=axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById=(params) => {
    let movieId=params
    const request=axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`)
    return request.then(response => response.data)
}
const find=(params)=>{
    let title=params
    const request=axios.get(`http://www.omdbapi.com/?apikey=${key}&s=${title}`)
    return request.then(response => response.data)
}

const create=async newObj=>{
    const config={
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObj, config)
    return response.data
}

const update = (id, newObj) => {
    const request = axios.put(`${baseUrl}/${id}`, newObj)
    return request.then(response => response.data)
  }

export default {
    getAll,
    getById,
    setToken,
    create,
    update,
    find
}
