import { useState, useEffect } from 'react'
import { myData } from '../api/ajaxHelper';
import { useNavigate } from 'react-router-dom'


export default function Home({ token }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  function renderWelcome(){
    return (
    <div>
      <h1>Welcome to Stranger's Things</h1>
      <h4>Logged in as {user.username}</h4>
      <button onClick={() => navigate('/profile')}>VIEW PROFILE</button> 
    </div>
    )
  }

  useEffect(() => {
    async function getUserHandler() {
      if (token) {
        const result = await myData(token);
        console.log("user data: ", result);
        setUser(result);
      }
    }
    getUserHandler();
  }, [])

  return (
    <>
      {renderWelcome()}
    </>
  )
}