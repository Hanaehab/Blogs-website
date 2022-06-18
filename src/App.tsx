import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import UserRegisteration from './components/UserRegisteration/UserRegisteration';
import Login from './components/Login/Login';
import Feed from './components/Feed/Feed';
import Navbar from './components/Navbar/Navbar';
import UserPosts from './components/UserPosts/UserPosts';
import UpdatePost from './components/UpdatePost/UpdatePost';
import AddPost from './components/AddPost/AddPost';




const App : React.FC = () => {

  return (
    <>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register-user" element={<UserRegisteration />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/my-posts" element={<UserPosts />} />
        <Route path="/update-post" element={<UpdatePost />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
