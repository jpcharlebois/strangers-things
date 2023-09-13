import { useState } from 'react'
import { registerUser } from '../api/ajaxHelper'
import { useNavigate } from 'react-router-dom'

export default function RegistrationForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");
        if (password !== confirmPassword) {
            setError({message: "Passwords dont match"});
        }

        try {
            let token = await registerUser(username, password);
            setToken(token);
        } catch (error) {
            setError(error);
        }
        navigate('/');
      }

    return (
    <> 
      <div className='sign-up'>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username: 
                    <input 
                        type='text' 
                        required={true} 
                        minLength={8} 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password: 
                    <input 
                        type='password' 
                        required={true} 
                        minLength={8} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Confirm Password: 
                    <input 
                        type='password' 
                        required={true} 
                        minLength={8} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button>Submit</button>
        </form>
      </div>
    </>
    )
}