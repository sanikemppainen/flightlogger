const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
  }) => {
    return (
      <div>
        <h2>Login</h2>
  
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              value={username}
              onChange={handleUsernameChange}
              id='username'
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
            />
          </div>
          <button id="loginButton" type="submit">login</button>
        </form>
      </div>
    )
  }

  export default LoginForm
