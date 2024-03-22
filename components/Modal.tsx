import React, { ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [display, setDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) setDisplay(true);
    else setTimeout(() => setDisplay(false), 200); // Corresponds to animation duration
  }, [isOpen]);

  if (!display) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 200ms ease-in-out',
      }}
      onClick={onClose}
    >
      <div
        style={{
          padding: '20px',
          background: '#FFF',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          transition: 'transform 200ms ease-in-out, opacity 200ms ease-in-out',
          transform: isOpen ? 'scale(1)' : 'scale(0.9)',
          opacity: isOpen ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()} // Prevent onClick from triggering on the backdrop
      >
        {children}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: '#F3F4F6',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
