import React,{useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from "materialize-css"
const SignUp = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const uploadFields = () =>{
        console.log('uploadFields')
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!email.match(regexEmail)){
           return M.toast({html: "Invalid email", classes: '#c62828 red darken-3'})
        }
        fetch("/signup",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
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
                    M.toast({html: data.message, classes: '#4caf50 green'});
                    history.push("/signin");
                }
        })
        .catch((error) => {console.log(error);})

    }

    return (
        <div className="mycard">
          <div className="card auth-card input-field">
            <h2 style={{color: 'blue'}}>AnimeLove</h2>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>uploadFields()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
        </div>
      </div>
    )
}

export default SignUp;
