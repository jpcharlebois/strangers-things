import { useEffect, useState } from 'react'
import { fetchPosts, updatePost } from '../api/ajaxHelper'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPostForm({ token }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let updatedPostObj = {
                _id: id,
                title: title,
                description: description,
                price: price,
                location: location,
                willDeliver: willDeliver
            }

            let updatedPost = await updatePost(token, updatedPostObj);
            navigate('/posts');
        } catch (error) {
            setError(error);
        }
      }
    
      useEffect(() => {
        async function getPostHandler() {
          const result = await fetchPosts();
          console.log("results: ", result);
          const postResult = result.find((rPost) => rPost._id === id);
          setTitle(postResult.title);
          setDescription(postResult.description);
          setPrice(postResult.price);
          setLocation(postResult.location);
          setWillDeliver(postResult.willDeliver);
        }
        getPostHandler();
        // async function getUserHandler() {
        //     if (token) {
        //       const result = await myData(token);
        //       console.log("user data: ", result);
        //       setUser(result);
        //     }
        //   }
        //   getUserHandler();
      }, [])

    return (
    <> 
      <div className='edit-post-form'>
        <h2>Edit Post</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Title: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={8} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Description: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={8} 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} />
            </label>
            <label>
                Price: 
                    <input 
                        type='text' 
                        required={true} 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} />
            </label>
            <label>
                Location: 
                    <input 
                        type='text' 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label>
                Will Deliver 
                    <input 
                        type='checkbox' 
                        value={willDeliver} 
                        checked={willDeliver}
                        onChange={(e) => setWillDeliver(!e.target.value)} />
            </label>
            <button>UPDATE</button>
        </form>
      </div>
    </>
    )
}