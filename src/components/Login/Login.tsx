import React, { useState } from "react";
import { Container, TextField , Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);

  const styles = {
    container: {
      marginTop: '100px',
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
    },
  } as const;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    setError(() => false);
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.SyntheticEvent<EventTarget> ) => {
        navigate("/register-user")
  }


  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    const user = {
      user: userDetails,
    };
    type CreateUserResponse = {
      access_token: string;
    };
    try {
      await axios.post<CreateUserResponse>(
      'http://localhost:8000/blogs/user/login', user.user).then((res) => {
    
      localStorage.setItem(
        "access_token",res.data.access_token);
      navigate("/feed");
       }).catch(() => setError(() => true));
       
       
  } catch (err) {
    alert(err);
  }
  }
    
  

  return (
    <Container component="main" style={styles.container}>
    <h1> Login </h1>
    
    <form onSubmit={handleLogin}>
      <br />
      <TextField
      error={error}
        label="Email"
        name="email"
        helperText={error ? "Wrong Credentials" : ""}
        onChange={handleChange}
        style={{ width: 500 }}
        variant="outlined"
        required
      />
      <br />
      <br />
      <br />

      <TextField
      error={error}
        label="Password"
        name="password"
        type="password"
        onChange={handleChange}
        style={{ width: 500 }}
        variant="outlined"
        required
      ></TextField>
      <br />
      <br />
      <br />
      <Button
        type="submit"
        style={{ width: 500 }}
        variant="contained"
        color="primary"
      >
        Login
      </Button>
      <br />
      <br />
      <Button
        type="submit"
        style={{ width: 500 }}
        variant="contained"
        color="primary"
        onClick={handleRegister}
      >
        Create Account
      </Button>
    </form>
  </Container>
  )
  }

export default Login