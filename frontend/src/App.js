import { useEffect, useState } from "react"
import jwt_decode from 'jwt-decode'
import "./App.css"

const App = () => {
  const[user, setUser]=useState({})

  useEffect(()=>{
    /* global google */
    google.accounts.id.initialize({
      client_id:"286684180535-7ean49spm1p6kvo97j5vb3u0na3l0csb.apps.googleusercontent.com",
      callback: handleCallBackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large"}
      )
    google.accounts.id.prompt()
  }, [])

  function handleCallBackResponse(response){
    let userObj = jwt_decode(response.credential)
    console.log(userObj)
    //check if user exists in database
    setUser(userObj)
    document.getElementById('googleSignInDiv').hidden=true
  }

  function handleSignOut(event){
    setUser({})
    document.getElementById("googleSignInDiv").hidden=false
  }

  const userData=()=>{
    return(
      <div>
         <h4>You are logged in as: {user.name}</h4>
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
      <h4>Flight logger</h4>
    </header>
    <div id="googleSignInDiv"></div>
    <div id="userData">
      { Object.keys(user).length!==0 && userData() }
    </div>
  </div>
)
}

export default App

