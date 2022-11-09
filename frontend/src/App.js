import { useEffect, useState } from "react"
import jwt_decode from 'jwt-decode'
import "./App.css"
import movieService from './services/movies'
import loginService from './services/login'
import LoginForm from "./components/LoginForm"
import NewMovie from "./components/NewMovie"
import movies from "./services/movies"
import Movie from "./components/Movie"

const App = () => {
  const[user, setUser]=useState({})
  const[movie, setMovie]=useState({})
  const[title, setTitle]=useState('')
  const[poster, setPoster]=useState('')
  const[imdbID, setImdbID]=useState('')
  const[allMovies, setAllMovies]=useState([])
  const[username, setUsername]= useState('')
  const[password, setPassword]=useState('')
  const[foundMovies, setFoundMovies]=useState([])
  const[searchTerm, setSearchTerm]=useState('')
  let list=[{}]
  const[lista, setLista]=useState({ Title:'', imdbID:''})

  useEffect(()=>{
    movieService.getAll().then(data=>{
      console.log(data)
      setAllMovies(data)
    })
    /* global google */
    google.accounts.id.initialize({
      //tämä enviin?
      client_id:"286684180535-7ean49spm1p6kvo97j5vb3u0na3l0csb.apps.googleusercontent.com",
      //after login in this:
      callback: handleCallBackResponse
    })
    //tekee sig in buttonin
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large"}
      )
    //popup prompt about logins
   // google.accounts.id.prompt()
    console.log("id",google.accounts.id.client_id )
  }, [])
  
  function handleCallBackResponse(response){
    //jwt palautetaa, sitten decodaa se
    console.log('JWT: ', response.credential)
    const jwt=response.credential
    let userObj = jwt_decode(response.credential)
    console.log(userObj)
    //check if user exists in database
    //setUser(userObj)
    console.log('user: ', userObj.name)
    const username=userObj.name
    console.log('jwt: ', jwt)
    //setUsername(user.name)
    document.getElementById('googleSignInDiv').hidden=true
    const user=  loginService.login({
      username, jwt
    })

    setUser(user)
    console.log('setting user: ', user)
  }


  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user= JSON.parse(loggedUserJSON)
      setUser(user)
      movieService.setToken(user)
    }
  
  },[])

  const handleLogin= async (event)=>{
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      movieService.setToken(user.token)
      setUser(user)
      console.log('user', user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error in login credentials')
    }
  }

  const handleSearch=async(event)=>{
    if(searchTerm===undefined){
      console.log('undefined search term')
    }
    event.preventDefault()
    try{
      movieService.find(searchTerm).then(movieResults=>{
        setFoundMovies(movieResults.Search)
      })
    }catch{
      console.log('error searching')
    }
    setSearchTerm('')
  }

   
    function handleSignOut(event){
      setUser({})
      window.localStorage.removeItem('loggedUser')
      //document.getElementById("googleSignInDiv").hidden=false
    }

    const userData=()=>{
      return(
        <div> 
          <h4>You are logged in as: {user.username}</h4>
            <p>Using email: {user.email}</p>
            <img src={user.picture} alt="profile"></img>
            <div id="signOut">
              <button onClick={(e)=> handleSignOut(e)}>sign out</button>
            </div>
          
        </div>
      )
    }

  return(
      <div id="app">
        <header id="header">
          <h4>Movie logger</h4>
        </header>
        <div id="googleSignInDiv"></div>
        <div >
          { Object.keys(user).length!==0 ?
            <div className="signedInView">
              <div className="userData">
                { userData() }
              </div>
                <NewMovie 
                  handleSearch={handleSearch}
                  searchTerm={searchTerm}
                  handleChangingSearchTerm={({ target }) => setSearchTerm(target.value)} 
                  />
                  {foundMovies !==null ?
                  <div className="searchResults">
                    {foundMovies.map(movie=>
                      <p key={movie.imdbID}> {movie.Title} <button>Show more</button></p>
                    )}
                </div>:
                <></>
              }
              </div> 
             
              :
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin} />
           
           }
        </div>
        <div className="list movies">
          All movies added by users:
           {allMovies.map(movie=>
            <Movie 
              key={movie.id}
              movie={movie}
            />
           )}
        </div>
   </div>
  )}

export default App


//      {Object.keys(user).length!==0  ? loginForm() : <div> signed in as: {user.name} </div>}

    /* global google */
    /*
    google.accounts.id.initialize({
      //tämä enviin?
      client_id:"286684180535-7ean49spm1p6kvo97j5vb3u0na3l0csb.apps.googleusercontent.com",
      //after login in this:
      callback: handleCallBackResponse
    })
    //tekee sig in buttonin
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large"}
      )
    //popup prompt about logins
    google.accounts.id.prompt()
    console.log("id",google.accounts.id.client_id )
  }, [])
  */

  /*
  function handleCallBackResponse(response){
    //jwt palautetaa, sitten decodaa se
    console.log('JWT: ', response.credential)
    const jwt=response.credential
    let userObj = jwt_decode(response.credential)
    console.log(userObj)
    //check if user exists in database
    //setUser(userObj)
    console.log('user: ', userObj.name)
    const username=userObj.name
    console.log('jwt: ', jwt)
    //setUsername(user.name)
    document.getElementById('googleSignInDiv').hidden=true
    const user=  loginService.login({
      username, jwt
    })

    setUser(user)
    console.log('setting user: ', user)
  }*/


  //for testing purposes: avatar id tt1630029

  /*
  movieService.getById('tt1630029').then(data=>{
      console.log(data)
      setMovie(data)
      console.log(movie)
    })
  */
      //console.log('apista leffan tiedot: ',movie, movie.Title, movie.Year, movie.imbdRating, movie.Plot, movie.Poster)
/**
 * 
 * const handleSearch=async(event)=>{
    event.preventDefault()
    try{
      list= (await movieService.find(searchTerm)).Search
      console.log("lista:",list)
      list.map(m=>(
        setMovie(m),
        //console.log(m),
        setFoundMovies(foundMovies.concat(m)),
        console.log(foundMovies)
        ))
    }catch{
      console.log('couldnt find movie')
    }

    
    setSearchTerm('')
    //setFoundMovies([])
  }

  /** const movieObj={
      name: movie.name,
      rating: movie.rating,
      seen: movie.seen
    }
    movieService
      .create(movieObj)
      .then(returnedMovie=>{
        setAllMovies(movies.concat(returnedMovie))
        setMovie('')
      }) 
      
      
       console.log("kaikki",searchResults, searchResults[3], searchResults[3].Title)
      for(let i=0; i<10 ; i++ ){
        setTitle(searchResults[i].Title)
        setImdbID(searchResults[i].imdbID)
        setPoster(searchResults[i].Poster)

        let movieObject={
          Title: title,
          Poster: poster,
          imdbID: imdbID
        }
        console.log('object', movieObject)
        const updatedSearch=[...foundMovies, {movieObject}]
        setFoundMovies(updatedSearch)
        console.log('found movies:', foundMovies)
      }/**
       *const movieObject={
        Title: searchResults[0].Title,
        Poster: searchResults[0].Poster,
        imdbID: searchResults[0].imdbID 
      }
      console.log('movie object', movieObject)
      setFoundMovies(searchResults[0])
      console.log('foind movies', foundMovies)
       
      
    }catch{
      console.log('error in handling search')
    }
    setSearchTerm('')
    setTitle('')
    setImdbID('')
    setPoster('')
      
      */


 