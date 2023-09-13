import { useState } from 'react'
import { login } from '../api/ajaxHelper';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let token = await login(username, password);
            setToken(token);
            window.sessionStorage.setItem("token", token);
            navigate(`/`);
        } catch (error) {
            setError(error);
        }
      }

    return (
    <> 
      <div className='sign-in'>
        <h2>Sign In!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
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
            <button>LOG IN</button>
        </form>
        <p onClick={() => navigate(`/account/register`)}>Don't have an account? Sign Up</p>
      </div>
    </>
    )
}