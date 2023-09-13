import { useEffect, useState } from 'react'
import { fetchPosts, postMessage } from '../api/ajaxHelper'
import { useNavigate, useParams } from 'react-router-dom'

export default function SendMessageForm({ token }) {
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let messageObj = {
                content: title
            }

            let sentMessage = await postMessage(token, messageObj, id);
            console.log("sentMessage", sentMessage);
            navigate(`/posts/${id}`);
        } catch (error) {
            setError(error);
        }
      }
    
    function renderSendMessageForm() {
      return (
        <div className='send-message-form'>
          <h2>Send Message</h2>
          <form onSubmit={handleSubmit}>
            <label>
                Title: 
                    <input 
                        type='text' 
                        required={true} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} />
            </label>
            <button>SEND</button>
          </form>
        </div>
      )
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
        </div>
      )
    }
    
      useEffect(() => {
        async function getPostHandler() {
          const result = await fetchPosts();
          console.log("results: ", result);
          const postResult = result.find((post) => post._id === id);
          setPost(postResult);
        }
        getPostHandler();
      }, [])

    return (
    <> 
      <div className='post-container'>
        {renderPost()}
      </div>
      <div className='message-form-container'>
        {renderSendMessageForm()}
      </div>
    </>
    )
}