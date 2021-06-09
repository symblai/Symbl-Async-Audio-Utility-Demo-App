import React,{useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Prefrences/Preferences';
import Login from "./components/Login/Login";
import useToken from "./hooks/useToken";
import logo from "./symbl.png";
/*
function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}
*/





function App() {
    const { token, setToken } = useToken();
    if(!token) {
        return <Login setToken={setToken} />
    }
  return (
      <div className="wrapper" style={{width:"auto"}}>
          <img src={logo} style={{height:45,width:120}}/>
          <div style = {{display: 'flex',  justifyContent:'center',alignItems:'center'}}>
              <h1 style = {{alignItems:'center'}}>Symbl Async Aggregation Tool</h1>
          </div>
        <BrowserRouter>
          <Switch >
            <Route path="/">

                    <Dashboard />

            </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;