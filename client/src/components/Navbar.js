import React,{useContext,useRef, useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App';
import M from 'materialize-css';

function Navbar() {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()    
    const renderList = () =>{
        if(state){
            return [
               <li><form onSubmit={(e)=>{
                e.preventDefault()
                makeSearch(e.target[0].value)
                    }}>
              <input type="text" placeholder="name, title or genres" />  
                   </form></li>, 
              <li><button className="btn waves-effect waves-light #c62828 red darken-3"
              onClick={() =>{
              localStorage.clear();
              dispatch({type:"CLEAR"});
              history.push('/signin')
            }}
            >LOGOUT</button></li> 
            ]
        }else{
            return [
                <li><Link to="/signin">SignIn</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
              ]
        }
    }

    const makeSearch = (query) =>{
        history.push(`/searched/${query}`);
    }
    return (
        <nav className="nav-pos">
           <div className="nav-wrapper white">
           <Link to={state ? '/' : '/signin'} className="brand-logo left">AnimeLove</Link>
           <ul id="nav-mobile" className="right">
              {renderList()}
           </ul>
           </div>
        </nav>
    )
}

export default Navbar
