import {Route, Switch} from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Profile from './components/Profile'
import context from './context/context'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css';

const App = () => {

  const {userData} = useContext(context)

  useEffect(() => {
    const data = localStorage.getItem(userData)

    if(data === null){
      localStorage.setItem('userData', JSON.stringify(userData))
    }

  }, [userData])

  return (
    <Switch>
      <Route exact path='/login' component = {Login} />
      <Route exact path='/register' component={SignUp} />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path="/profile" component={Profile} />
    </Switch>
  );
}

export default App;
