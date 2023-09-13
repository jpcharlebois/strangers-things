import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchPosts, myData, deletePost } from '../api/ajaxHelper';


export default function Profile({ token }) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  function renderMessagesToMe() {
      const messagesToMe = messages.filter((message) => message.fromUser._id !== user._id);
      console.log("messages to me: ", messagesToMe);

    return messagesToMe.map((message) => {
      return (
        <div key={message._id} className="message" >
          <h2>From: {message.fromUser.username}</h2>
          <h2>{message.content}</h2>
          <Link to={`/posts/${message.post._id}`}>VIEW MY POST: {message.post.title}</Link>
        </div>
      )
    })
  }

  function renderMessagesFromMe() {
    const messagesFromMe = messages.filter((message) => message.fromUser._id === user._id);
    console.log("messages from me: ", messagesFromMe);

  return messagesFromMe.map((message) => {
    return (
      <div key={message._id} className="message" >
        <h2>(Sent By Me)</h2>
        <h2>{message.content}</h2>
        <Link to={`/posts/${message.post._id}/message`}><h3>MESSAGE AGAIN: {message.post.title}</h3></Link>
      </div>
    )
  })
}

  useEffect(() => {
    async function getUserHandler() {
        if (token) {
          const result = await myData(token);
          console.log("user data: ", result);
          setUser(result);
          setMessages(result.messages);
        }
      }
      getUserHandler();
  }, [])

  return (
    <div>
        <h1>Welcome {`${user.name}`}</h1>
      <div className='messages-to-me-container'>
        <h4>Messages to Me:</h4>
        {renderMessagesToMe()}
      </div>
      <div className='messages-from-me-container'>
        <h4>Messages from Me:</h4>
        {renderMessagesFromMe()}
      </div>
    </div>
  )
}