import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth(); // This now expects logIn to handle both token and isAdmin

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // No need to manually set items in localStorage here; let the context handle it
        logIn(data.access_token, data.is_admin); // Pass both the access token and admin status to logIn
        onClose(); // Close the modal
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed: An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', width: '520px', backgroundImage: 'url(/login_form_pic.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px'}}>
      <label htmlFor="username" className='flex justify-center' style={{ marginBottom: '0.5rem', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>Username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '10px', color: 'black', backgroundColor: 'gold' }}
      />
      <label htmlFor="password" className='flex justify-center' style={{ marginBottom: '0.5rem', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '10px', color: 'black', backgroundColor: 'gold' }}
      />
      <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'gold', color: 'white', fontSize: '20px', borderRadius: '10px' }}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
