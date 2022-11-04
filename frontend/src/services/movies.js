import axios from "axios";

const key=process.env.REACT_APP_API_KEY
let flightIATA=`AY1`
const baseUrl=`https://app.goflightlabs.com/flights?access_key=${key}&flight_iata=${flightIATA}`


//208fb697
const getById=(params)=>{
    let movieId=params
    const request=axios.get(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`)
    return request.then(response=>response.data)
}

export default {
    getById
}
