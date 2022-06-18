import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { Container, TextField , Button } from '@mui/material';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const AddPost = () => {
    const navigate = useNavigate();
    const [post, setPost] = useState({});
    var token : string = (localStorage.getItem("access_token"))!;
    var decoded : any = jwt_decode(token);
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
        setPost({ ...post, [e.target.name]: e.target.value });
      };

    const handleAdd = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        e.preventDefault();
  
    const user = decoded.user;
    try {
        await axios.post(
        'http://localhost:8000/blogs/post/' , post ,{headers: {
      Authorization: 'Bearer ' + token ,
      user: user
    }}).then((res)=>
    navigate("/feed"))
    } catch (err) {
      alert(err);
    }
 }
    
  return (
    <Container component="main" style={styles.container}>
    <h1> Add Post </h1>
    
    <form onSubmit={handleAdd}>
      <br />
      <TextField
        label="Title"
        name="title"
        onChange={handleChange}
        style={{ width: 500 }}
        variant="outlined"
        required
      />
      <br />
      <br />
      <br />
      <TextField
        label="Body"
        name="body"
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
        onClick={handleAdd}
      >
        Add Post
      </Button>
    </form>
  </Container>
  )
}

export default AddPost