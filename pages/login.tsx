import React from 'react';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Don't have an account? <Link href="/signup"><a>Sign up here</a></Link>.
      </p>
    </div>
  );
}
