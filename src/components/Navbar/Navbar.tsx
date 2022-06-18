import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  var logged = false;
  var token  = localStorage.getItem("access_token");
  if(token != null){
      logged = true;
  }
  else{
    logged = false;
  }
  const handleLogin = async (e: React.SyntheticEvent<EventTarget> ) => {
      navigate('/')
  }

  const handleRegister = async (e: React.SyntheticEvent<EventTarget> ) => {
    navigate('/register-user')
}

const handleMyPosts = async (e: React.SyntheticEvent<EventTarget> ) => {
  navigate('/my-posts')
}
const handleAllPosts = async (e: React.SyntheticEvent<EventTarget> ) => {
  navigate('/feed')
}
const handleLogout = async (e: React.SyntheticEvent<EventTarget> ) => {
  localStorage.clear();
  navigate('/')
}
  return logged? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blogs
          </Typography>
          <Button onClick={handleAllPosts} color="inherit">Posts Feed</Button>

          <Button onClick={handleMyPosts} color="inherit">My Posts</Button>

          <Button color="inherit" type="submit"
              onClick={handleLogout}
              >Logout</Button>
         
        </Toolbar>
      </AppBar>
    </Box>
  ):(<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blogs
        </Typography>
        <Button color="inherit" type="submit"
            onClick={handleLogin}
            >Login</Button>
        <Button onClick={handleRegister} color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  </Box>);
}