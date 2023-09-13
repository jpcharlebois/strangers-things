import { Link } from "react-router-dom";

export default function Navbar({ token }) {

    return (
      <div id="navbar">
        <div id="navbar-header">
            Stranger's Things
        </div>
        <Link to={"/"}>HOME</Link>
        <Link to={"/posts"}>POSTS</Link>
        <Link to={"/profile"}>PROFILE</Link>
        { token ?
          <Link to={"/account/logout"}>LOGOUT</Link> :
          <Link to={"/account/login"}>LOGIN</Link>
        }
      </div>
    );
  }