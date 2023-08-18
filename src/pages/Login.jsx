import { useState } from "react";
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../features/authSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, loading} = useSelector(state => state.auth);


    const handleLogin = async(event) => {
        event.preventDefault();
        console.log(email, password);
        try{    
           await dispatch(loginAsync({ email, password }));
           navigate('/');
        } catch(error) {
            console.log(error)
        }
        
        setEmail("");
        setPassword("");
        
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
        {error && <p>{error}</p>}
            <form onSubmit={handleLogin} className="flex flex-col">
                <input placeholder="email" value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' variant="outlined">{loading? "Loading..." : "Login"}</Button>
            </form>
        </div>
    );
}

export default Login;