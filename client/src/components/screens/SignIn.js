import React,{useState, useContext, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css";
import { UserContext } from '../../App';

const SignIn = () => {
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const postData = () =>{
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(regexEmail)){
           return M.toast({html: "Invalid email", classes: '#c62828 red darken-3'})
        }
        fetch("/signin",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(data.error) {
                    M.toast({html: data.error, classes: '#c62828 red darken-3'})
                }
                else{
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({type: "USER", payload: data.user})
                    M.toast({html: "Logged In", classes: '#4caf50 green'});
                    history.push("/");
                }
        })
        .catch((error) => {console.log(error);})

    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2 style={{color: 'blue'}}>AnimeLove</h2>
                <input 
                type="email" 
                placeholder="email" 
                value={email} 
                onChange={(e) =>setEmail(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={(e) =>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-2"
                onClick={() =>postData()}
                >
                    SignIn
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn;
