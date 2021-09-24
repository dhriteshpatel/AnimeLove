import React,{useReducer, createContext, useEffect, useContext} from 'react'
import Navbar  from "./components/Navbar";
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import './App.css';
import Home from "./components/screens/Home";
import SignUp from "./components/screens/SignUp";
import SignIn from "./components/screens/SignIn";
import { userReducer } from './reducers/userReducer';
import { initialState } from './reducers/userReducer';
import MyAnime from './components/screens/MyAnime';
import SearchResult from './components/screens/SearchResult';

export const UserContext = createContext();

function Routing(){ 
  const history = useHistory();
  const {state, dispatch } = useContext(UserContext);
  useEffect(() => { 
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        dispatch({type: 'USER', payload: user});
    }
    else{
           history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path="/">
      <Home />
      </Route>
      <Route exact path="/signup">
      <SignUp />
      </Route>
      <Route exact path="/signin">
      <SignIn />
      </Route>
      <Route exact path="/myanime/:userid">
      <MyAnime />
      </Route>
      <Route exact path="/searched/:query">
      <SearchResult />
      </Route>
  </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  );
}


export default App;
