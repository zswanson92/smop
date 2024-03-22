import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logIn } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(username + ':' + password),
      },
    });

    const data = await response.json();
    if(response.ok) {
      logIn();      // Update the auth state to logged in
      onClose();    // Close the modal
    } else {
      const data = await response.json();
      alert(`Login failed: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
      <label htmlFor="username" style={{ marginBottom: '0.5rem' }}>Username:</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <label htmlFor="password" style={{ marginBottom: '0.5rem' }}>Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button type="submit" style={{ padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'gray' }}>
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
