import { useNavigate } from 'react-router-dom'


export default function Logout({ setToken }) {
  const navigate = useNavigate();
  
  function renderLogout() {
    return (
    <div>
      <h4>Are you sure you want you log out?</h4>
      <button onClick={() => navigate(`/`)}>CANCLE</button> 
      <button onClick={() => logoutHandler()}>LOGOUT</button>
    </div>
    )
  }

  function logoutHandler() {
    setToken("");
    window.sessionStorage.removeItem("token");
    navigate(`/`);
  }

  return (
    <>
      {renderLogout()}
    </>
  )
}