import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
//import { onLogin } from "./LoginForm";
import {useHistory} from "react-router-dom"

function DemoButton(){
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("")

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
     
    history.push("/Home")
  };

  return (
    <form onSubmit={onLogin}>
    <div>
        <button onClick={e => {
        setEmail("demo@aa.io")
        setPassword("password")
        }} type="demo">Demo User</button>
    </div>
    </form>
  );
}

export default DemoButton;
