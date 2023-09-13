import { useEffect, useState } from 'react'
import Login from './components/Login'
import Logout from './components/Logout'
import RegistrationForm from './components/RegistrationForm';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import RenderPosts from './components/RenderPosts';
import RenderPost from './components/RenderPost';
import AddNewPostForm from './components/AddNewPostForm';
import EditPostForm from './components/EditPostForm';
import SendMessageForm from './components/sendMessageForm';
import Profile from './components/profile';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function userSessionHandler() {
      const result = window.sessionStorage.getItem("token");
      if (result) {
        setToken(result);
      }
    }
    userSessionHandler();

  }, [])

  return (
    <>
      <div>
        <div id="container">
          <Navbar token={token} />
          <div id="main-section">
            <Routes>
              <Route path='/' element={<Home token={token} setToken={setToken} />} />
              <Route path='/profile' element={<Profile token={token} setToken={setToken} />} />
              <Route path='/account/login' element={<Login token={token} setToken={setToken} />} />
              <Route path='/account/logout' element={<Logout token={token} setToken={setToken} />} />
              <Route path='/account/register' element={<RegistrationForm token={token} setToken={setToken} />} />
              <Route path='/posts' element={<RenderPosts token={token} setToken={setToken} />} />
              <Route path='/posts/:id' element={<RenderPost token={token} setToken={setToken} />} />
              <Route path='/posts/:id/message' element={<SendMessageForm token={token} setToken={setToken} />} />
              <Route path='/posts/addNewPost' element={<AddNewPostForm token={token} setToken={setToken} /> } />
              <Route path='/posts/editPost/:id' element={<EditPostForm token={token} setToken={setToken}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
