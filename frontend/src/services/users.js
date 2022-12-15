import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'
let token=null

const setToken=newToken=>{
    token=`bearer ${newToken}`
}

const getAll=()=>{
    const request= axios.get(baseUrl)
    return request.then(response=>response.data)
}
const createUser=userObject=>{
    const config={
        headers: { Authorization: token },
    }
    const request=axios.post(baseUrl, userObject, config)
    return request.then(response=>response.data)
}

const getUser= (params) =>{
    getAll().map(i=>{
        console.log(i)
    })
    return 
}

export default {
    getUser,
    getAll,
    createUser,
    setToken
}