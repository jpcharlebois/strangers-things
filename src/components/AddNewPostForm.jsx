import { useState } from 'react'
import { makePost, registerUser } from '../api/ajaxHelper'
import { useNavigate } from 'react-router-dom'

export default function AddNewPostForm({ token }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let newPostObj = {
                title: title,
                description: description,
                price: price,
                location: location,
                willDeliver: willDeliver
            }

            let newPost = await makePost(token, newPostObj);
            navigate('/posts');
        } catch (error) {
            setError(error);
        }
      }

    return (
    <> 
      <div className='new-post-form'>
        <h2>Add New Post</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Title: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={3} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Description: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={3} 
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
                        onChange={(e) => setWillDeliver(e.target.value)} />
            </label>
            <button>CREATE</button>
        </form>
      </div>
    </>
    )
}