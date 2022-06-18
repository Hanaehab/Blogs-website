import React, { useState } from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import { Container, TextField , Button } from '@mui/material';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const UpdatePost = (props : any) => {

const navigate = useNavigate();
const Location : any = useLocation();
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
  const [post, setPost] = useState(
    Location.state.post
  );

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const postDetailes = {
        title : post.title,
        body : post.body
    }
    try {
        await axios.put(
        'http://localhost:8000/blogs/post/'+post.id, postDetailes ,{headers: {
      Authorization: 'Bearer ' + token 
    }}).then((res) => {
        navigate("/my-posts");
      });
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Container component="main" style={styles.container}>
    <h1> Update Post </h1>
    
    <form onSubmit={handleUpdate}>
      <br />
      <TextField
        label="Title"
        name="title"
        value={post.title}
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
        value={post.body}
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
        onClick={handleUpdate}
      >
        Update
      </Button>
    </form>
  </Container>
  )
}

export default UpdatePost