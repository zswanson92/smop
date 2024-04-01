import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface SignupFormProps {
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const data = await response.json(); // Assuming this includes the access_token
        logIn(data.access_token, false); // Assuming new sign-ups are not admins, hence false
        onClose(); // Close the form/modal
        alert('Signup successful');
    } else {
        // Handle signup failure
        const data = await response.json();
        alert(`Signup failed: ${data.message}`);
    }
    } catch (error) {
      console.error('Error:', error);
      alert('Signup failed: An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding:'20px', display: 'flex', flexDirection: 'column', width: '520px',  backgroundImage: 'url(/signup_form_pic.png)', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '10px'}}>
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
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
