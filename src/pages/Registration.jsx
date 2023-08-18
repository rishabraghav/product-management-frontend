import { useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup} from '@mui/material';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../features/authSlice';
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async(event) => {
    event.preventDefault();
    console.log(name, email, password, role);

    try { 
      await dispatch(registerAsync({ name, email, password, confirmPassword, role }));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("");
  }
  const handleChange = (event, newRole) => {
    setRole(newRole);
    console.log(role);
  }
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="flex flex-col">
        <input placeholder="name" value={name} type='text' onChange={(e) => setName(e.target.value)} />
        <input placeholder="email" value={email} type='email' onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="confirm password" value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <ToggleButtonGroup onChange={handleChange} value={role} color="primary" exclusive aria-label="Platform">
          <ToggleButton value="user">User</ToggleButton>
          <ToggleButton value="admin">Admin</ToggleButton>
        </ToggleButtonGroup>
        <Button type='submit' variant="outlined">Register</Button>
      </form>
    </div>
  );
}

export default Registration;