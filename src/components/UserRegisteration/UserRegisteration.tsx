import React, { useState } from "react";
import { Container, TextField , Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserRegisteration : React.FC = () => {

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(false);

  const handleCreate = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const user = {
      user: userDetails,
    };

    type CreateUserResponse = {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
      password: string;
    };
    
    try {
        await axios.post<CreateUserResponse>(
        'http://localhost:8000/blogs/user/', user.user).then((res) => navigate("/"))
        .catch(() => setError(() => true));
    } catch (err) {
      alert(err);
    }
    
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const styles = {
    container: {
      marginTop: '100px',
      display: "flex",
      flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
    },
  } as const;

  return (
    <Container component="main" style={styles.container}>
    <h1> Register </h1>
    
    <form onSubmit={handleCreate}>
      <br />
      <TextField
        label="First Name"
        name="firstName"
        onChange={handleChange}
        style={{ width: 245, marginRight: '10px'}}
        variant="outlined"
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        style={{ width: 245 }}
        variant="outlined"
        required
      />
      <br />
      <br />
      <br />
      <TextField
        label="User Name"
        name="userName"
        error={error}
        onChange={handleChange}
        style={{ width: 500 }}
        variant="outlined"
        required
      />
      <br />
      <br />
      <br />
      <TextField
        label="Email"
        name="email"
        error={error}
        helperText={error ? "Username or email already exists" : ""}
        onChange={handleChange}
        style={{ width: 500 }}
        variant="outlined"
        required
      />
      <br />
      <br />
      <br />

      <TextField
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
        Sign Up
      </Button>
    </form>
  </Container>
  )
}

export default UserRegisteration