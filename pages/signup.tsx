// pages/signup.js
import SignupForm from '../components/SignupForm';
import Link from 'next/link';
import React from 'react';

export default function SignupPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm />
      <p>
        Already have an account? <Link href="/login"><a>Login here</a></Link>.
      </p>
    </div>
  );
}
