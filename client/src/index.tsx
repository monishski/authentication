// import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import { createSlice, combineReducers, configureStore } from '@reduxjs/toolkit'
// import { Provider } from 'react-redux'
// import authReducer from './store/reducers/auth'

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null
//   },
//   reducers: {
//     auth: (state, action) => {
//       state.token = action.payload.token
//     }
//   }
// })

// STORING JWT TOKENS ON THE CLIENT: https://mannharleen.github.io/2020-03-19-handling-jwt-securely-part-1/
// 4 Options: localStorage, sessionStorage, cookies, in-memory
// - localStorage: prone to XSS attacks since localStorage is available to JS running on the same domain
// - sessionStorage: prone to XSS, data erased when tab is closed (would have to login and everytime you close a tab)
// - cookies: prone to XSS (but can issue a httpOnly cookie), 
//      CSRF where cookies are sent to the attacker (CORS policy, X-CSRF-TOKEN, SameSite Cookie (not supported in old browsers & /login /api must be on same doamin))
// - in-memory: most secure (memory is not shared between tabs) but hampers the ability to implement SSO (Single singon)? and UX hampered because the user is forced to login on every tab/window (BUT YOU CAN USE REFRESH TOKEN)
//      For SSO, we could store the list of tokens on the authorization server (but JWT is supposed to be STATELESS)
//      For UX, <- use in-memory storage?



import App from './App';
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
// import auth from './store/reducers/auth';

// const store = configureStore({
//   reducer: {
//     auth: authReducer
//   }
// })

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
      <Switch>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
        
        <Route path="/signin">
          <SignIn></SignIn>
        </Route>
        <Route path="/">
          <App></App>
        </Route>
      </Switch>
    </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

