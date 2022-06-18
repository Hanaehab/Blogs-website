import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { Typography, Grid, Paper,Button ,Container, TextField} from "@mui/material";
import axios from 'axios';
import moment from "moment";
import jwt_decode from "jwt-decode";
import AccountCircle from '@mui/icons-material/AccountCircle';

const Feed = () => {
  const [feedPosts, setfeedPosts] = useState([]);
  const [postComments, setpostComments] = useState([]);


  const navigate = useNavigate();
  const [comment, setComment] = useState({});
  var token : string = (localStorage.getItem("access_token"))!;
  var decoded : any = jwt_decode(token);


  useEffect(() => {
  const token = localStorage.getItem("access_token");

    if (token != null) {
    (async () => {
    await axios.get(
    'http://localhost:8000/blogs/post/', {headers: {
      Authorization: 'Bearer ' + token 
    }}).then((res) => {
        setfeedPosts(res.data);
        });
      await axios.get(
          'http://localhost:8000/blogs/comment/', {headers: {
            Authorization: 'Bearer ' + token 
          }}).then((res)=>{
            setpostComments(res.data)
          })
  })();  }
  else{
    navigate("/");
  } 
  }, [ feedPosts]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  
  const handleAdd = async (e: React.SyntheticEvent<EventTarget>, post_id: number ) => {
    e.preventDefault();
  
    const user = decoded.user;
    try {
        await axios.post(
        'http://localhost:8000/blogs/comment/'+post_id , comment ,{headers: {
      Authorization: 'Bearer ' + token ,
      user: user
    }})
    } catch (err) {
      alert(err);
    }
  };
  const handleAddPost = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    navigate('/add-post');
  };


  

  return feedPosts.length > 0 ?(
    <Container component="main" style={{ marginTop: "8%" }}>

        <Grid
              container
              alignItems="center"
              spacing={3}
              style={{ margin: "0% 4%" }}
            >
              <Grid item md={6}>
              <Typography variant="h4" style={{ fontWeight: 600, color: "#666", marginBottom:"6%" }}>
               Posts Feed
               </Typography>
              </Grid>
              <Grid item md={6} style={{
                 display: "flex",
                 flexDirection: "row",
                 alignItems: "right",
                 justifyContent: "right",
              }}>
              <Button
              type="submit"
              style={{ width: 150 , height:40, marginRight:"15%"}}
              variant="contained"
              color="primary"
              onClick={handleAddPost}
              >
                Add Post
              </Button>
              </Grid>

        </Grid>
  
      

      
      {feedPosts.map((post : any, i) => (
          <div key={post.id}>
            <Paper elevation={4} style={{ margin: "3% 0% 7%" }}>
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
              
                  {post.user.firstName} {post.user.lastName}
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
                <Typography variant="body1" style={{ marginLeft:"8%",marginRight:"2%", marginBottom: "2%" }}>
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
              <Grid item md={7} style={{ paddingLeft: "0%", marginTop: "1,5%"  }}>
              <Typography style={{ marginBottom: "0%",fontSize: 16 }}>
                {comment.user.firstName}  {comment.user.lastName}
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
                      <>  </>
                )))}
                <TextField
                label="Add Comment"
                name="body"
                style={{ width: 800,  marginLeft:"5%",marginBottom: "2%" }}
                onChange={handleChange}
                >
               </TextField>
               <Button
              type="submit"
              style={{ width: 200 , height:40, marginLeft:"4%",marginTop: "0.5%"}}
              variant="contained"
              color="primary"
              onClick={(e) => {handleAdd(e, post.id)}}
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

export default Feed