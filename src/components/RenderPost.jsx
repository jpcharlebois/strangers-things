import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchPosts, myData, deletePost } from '../api/ajaxHelper';


export default function RenderPost({ token }) {
  const [post, setPost] = useState({});
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  function deleteHandler() {
    deletePost(token, id);
    navigate(`/posts`);
  }

  function renderPost() {
    console.log("post: ", post);

    return (
      <div key={post._id} className="post" >
        <h2>{post.title}</h2>
        <h4>{post.description}</h4>
        <h4>{post.price}</h4>
        <h4>{post.location}</h4>
        {(post.author) ?
            <p>{post.author.username}</p>
            : <p></p>
        }
        {(post.author && user._id === post.author._id) ? 
            <>
              <button onClick={() => navigate(`/posts/editPost/${id}`)}>EDIT</button>
              <button onClick={() => deleteHandler()}>DELETE</button>
            </>
            : <div></div>}
      </div>
    )
  }

  function renderMessages() {
    console.log("messages: ", messages);

    return messages.map((message) => {
      return (
        <div key={message._id} className="message" >
          <h2>{message.content}</h2>
        </div>
      )
    })
  }

  
  useEffect(() => {
    async function getPostHandler() {
      const result = await fetchPosts();
      console.log("results: ", result);
      const postResult = result.find((rPost) => rPost._id === id);
      setPost(postResult);
      setMessages(postResult.messages);
    }
    getPostHandler();
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
      <div className='post-container'>
          {renderPost()}
      </div>
      <div className='messages-container'>
        {renderMessages()}
      </div>
    </div>
  )
}