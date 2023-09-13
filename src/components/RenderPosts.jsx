import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchPosts, myData } from '../api/ajaxHelper';


export default function RenderPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function renderPosts() {
    console.log("posts: ", posts);
    return posts.map((post) => {
      return (
        <div key={post._id} className="post" >
          <h2>{post.title}</h2>
          <h4>{post.description}</h4>
          <h4>{post.price}</h4>
          <h4>{post.location}</h4>
          <p>{post.author.username}</p>
          {(token && post.author._id !== user._id) ?
<button onClick={() => navigate(`/posts/${post._id}/message`)}>Send Message</button> :
<button onClick={() => navigate(`/posts/${post._id}`)}>VIEW</button> 
}
        </div>
      )
    })
  }
  
  useEffect(() => {
    async function getPostsHandler() {
      const result = await fetchPosts(token);
      console.log("results: ", result);
      setPosts(result);
    }
    getPostsHandler();
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
    <div>
      <div>
        <h2>Posts</h2>
        <Link to={`/posts/addNewPost`}>ADD POST</Link>
      </div>
      <div>
        {renderPosts()}
      </div>
    </div>
  )
}