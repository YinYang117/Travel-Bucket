import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
        } else setErrors(["Password did not match. Please try again."]);
    };

    if (user) return <Redirect to="/Home" />;

    return (
        <div className="formContainer2">
            <form onSubmit={onSignUp}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label>User Name</label>
                    <input
                        type='text'
                        name='username'
                        placeholder='username'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    ></input>
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type='text'
                        name='email'
                        placeholder='email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    ></input>
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    ></input>
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input
                        type='password'
                        name='repeat_password'
                        placeholder='repeat password'
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        required={true}
                    ></input>
                </div>
                {/* <DemoButton /> */}
                <button id="loginButton" type='submit'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;
