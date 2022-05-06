import React, { useState } from "react";
//import * as sessionActions from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

function LoginForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    //const [credential, setCredential] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
        history.push("/Home")   
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    // //demo user onclick function
    // const demo = () => {
    //     setEmail("demo@aa.io")
    //     setPassword("password")
    //     return;
    // }
  
    if (sessionUser) return ( <Redirect to="/Home" /> );
    return (
        <div className="formContainer">
            <form className="form" onSubmit={onLogin}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                    {/* <button type='demo' onClick={demo}>Demo User</button> */}
                    <button id="loginButton" type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;
