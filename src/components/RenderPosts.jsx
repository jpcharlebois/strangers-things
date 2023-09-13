import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchPosts, myData } from '../api/ajaxHelper';


export default function RenderPosts({ token }) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  function postMatches(post, text) {
    // return true if any of the fields you want to check against include the text
    // strings have an .includes() method
    if (post.title.includes(text)) {
      return true;
    } else if (post.description.includes(text)) {
      return true;
    }
    return false;
  }
  
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  const handleChange = async (e) => {
    setSearchTerm( e.target.value )
  }

  function renderPosts() {
    console.log("posts: ", postsToDisplay);
    return postsToDisplay.map((post) => {
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
        { (token) ?
        <Link to={`/posts/addNewPost`}>ADD POST</Link> :
        <p></p>
        }
      </div>
      <div className='searchbar'>
        <form>
          <label>Search
            <input onChange={handleChange} value={searchTerm} type="search"/>
          </label>
        </form>
      </div>
      <div>
        {renderPosts()}
      </div>
    </div>
  )
}