import React, { useEffect, useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setDisplay(true);
    } else {
      setTimeout(() => setDisplay(false), 200);
    }
  }, [isOpen]);

  if (!display) return null;

  return (
    <div
      className={`fixed inset-0 z-40 flex justify-center items-center ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.4)', transition: 'opacity 200ms ease-in-out' }}
      onClick={onClose}
    >
      <div
        className="relative w-auto my-6 mx-auto max-w-3xl z-50"
        style={{ transition: 'transform 200ms ease-in-out, opacity 200ms ease-in-out', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
          <h3 className="text-3xl font-semibold">
            {mode === 'signup' ? 'Sign Up' : 'Welcome Back!'}
          </h3>

        </div>
        <div className="relative p-6 flex-auto">
          {mode === 'signup' ? <SignupForm onClose={onClose} /> : <LoginForm onClose={onClose} />}
        </div>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
            className="bg-red-500 hover:bg-red-600 rounded-md text-white font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onClose}
            >
            Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
