import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { Typography, Grid, Paper,Button ,Container, TextField} from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import moment from "moment";
import {useNavigate } from 'react-router-dom';

const UserPosts = (props : any) => {
  var token : string = (localStorage.getItem("access_token"))!;
  var decoded : any = jwt_decode(token);
  const user = decoded.user;
  const [userPosts, setUserPosts] = useState([]);
  const user_id : number = user.id
  const [comment, setComment] = useState({});
  const [postComments, setpostComments] = useState([]);
  const navigate = useNavigate();


  const handleChangeComment = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleAddComment = async (e: React.SyntheticEvent<EventTarget>, post_id: number ) => {
    e.preventDefault();
    try {
        await axios.post(
        'http://localhost:8000/blogs/comment/'+post_id,{headers: {
      Authorization: 'Bearer ' + token 
    }} ,comment)
    } catch (err) {
      alert(err);
    }
  };

  const handleDelete = async (e: React.SyntheticEvent<EventTarget>, post_id: number ) => {
    e.preventDefault();

    try {
        await axios.delete(
        'http://localhost:8000/blogs/post/'+post_id,{headers: {
      Authorization: 'Bearer ' + token 
    }});
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate = async (e: React.SyntheticEvent<EventTarget>, post: any ) => {
    e.preventDefault(); 
    navigate('/update-post',{state:{post:post}})
  };

  useEffect(() => {
     (async () => {
    await axios.get(
      'http://localhost:8000/blogs/post/find-by-user/' + user_id, {headers: {
        Authorization: 'Bearer ' + token 
      }}).then((res) => {
        setUserPosts(res.data);
      });
    })(); 
    
    (async () => { await axios.get(
      'http://localhost:8000/blogs/comment/', {headers: {
        Authorization: 'Bearer ' + token 
      }}).then((res)=>{
        setpostComments(res.data)
      });
    })(); 
    }, [ userPosts]);
    return userPosts.length > 0 ?(
        <Container component="main" style={{ marginTop: "8%" }}>
        
          <Typography variant="h4" style={{ fontWeight: 600, color: "#666", marginBottom:"6%" }}>
            My Posts
          </Typography>
          
          {userPosts.map((post : any, i) => (
              <div key={post.id}>
        
                <Paper elevation={4} style={{ margin: "3% 0% 7%" }}>
                <Button
                  type="submit"
                  style={{ width: 120 , height:30, marginLeft:"85%",marginTop: "2%", fontSize: 12}}
                  variant="contained"
                  color="primary"
                  onClick={(e) => {handleDelete(e, post.id)}}
                  >
                    Delete
                  </Button>
                  <Button
                  type="submit"
                  style={{ width: 120 , height:30, marginLeft:"85%",marginTop: "1%",fontSize: 12}}
                  variant="contained"
                  color="primary"
                  onClick={(e) => {handleUpdate(e, post)}}
                  >
                    Update
                  </Button>
                <Grid
                  container
                  alignItems="center"
                  spacing={3}
                  style={{ margin: "0% 4%" }}
                >
                  <Grid item md={1}>
                  <AccountCircle style={{fontSize: 55, marginLeft: "5%" }}/>
                  </Grid>
                  <Grid item md={7} style={{ paddingLeft: "0%", marginTop: "1%"  }}>
                  
                  <Typography variant="h5" style={{ marginBottom: "2%" }}>
                  
                      {post.user.firstName}
                    </Typography>
                  </Grid>
                  <Grid item md={3}>
                  <Typography variant="body2" style={{ margin: "0% 25% 0%" }}>
                      {moment(post.createdAt).format("DD/MM/YYYY hh:mm")}
                    </Typography>
                  </Grid>
                </Grid>
                    
                    <Typography variant="h5" style={{ marginLeft:"6%",marginBottom: "2%",marginTop: "2%", fontWeight:"700" }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body1" style={{ marginLeft:"8%", marginBottom: "2%", marginRight:"2%" }}>
                      {post.body}
                    </Typography>
    
                    <Typography variant="body2" style={{  marginLeft:"84%",marginBottom: "0%",marginTop: "2%", fontWeight:"400", fontSize:14}}>
                      Comments
                    </Typography>
                    
                    {postComments.map((comment : any ) => (
                       comment.post.id == post.id?(
                      <>
                      <hr style={{width: "90%"}}/>
                      <div key={comment.id}>
    
                      <Grid
                  container
                  alignItems="center"
                  spacing={3}
                  style={{ margin: "0% 4%" }}
                >
                  <Grid item md={1} style={{
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "right",
                     justifyContent: "right",
                  }}>
                  <AccountCircle style={{fontSize: 30, marginRight: "5%" }}/>
                  </Grid>
                  <Grid item md={7} style={{ paddingLeft: "0%", marginTop: "1.5%"  }}>
                  <Typography style={{ marginBottom: "2%",fontSize: 16 }}>Static
                  </Typography>
                  </Grid>
                  <Grid item md={3}>
                  <Typography variant="body2" style={{ margin: "0% 27% 0%" }}>
                      {moment(comment.createdAt).format("DD/MM/YYYY hh:mm")}
                    </Typography>
                  </Grid>
                  </Grid>
                  
                    <Typography variant="body1" style={{ marginLeft:"15%",marginBottom: "2%",marginTop: "1%" }}>
                      {comment.body}
                    </Typography>
                      </div>
                      
                      </>
                    ):(
                      <> </>
                    )))}
                    <TextField
                    label="Add Comment"
                    name="body"
                    style={{ width: 800,  marginLeft:"5%",marginBottom: "2%" }}
                    onChange={handleChangeComment}
                    >
                   </TextField>
                   <Button
                  type="submit"
                  style={{ width: 200 , height:40, marginLeft:"4%",marginTop: "0.5%"}}
                  variant="contained"
                  color="primary"
                  onClick={(e) => {handleAddComment(e, post.id)}}
                  >
                    Add
                  </Button>
                    
                </Paper>
                
              </div>
          ))}
        </Container>
      ):(
        <div>No Posts</div>
      );
    }

export default UserPosts