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
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Darker backdrop
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
          background: '#202225', // A darker shade for contrast
          color: '#FFFFFF', // White text color
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start', // Align text to the start
          position: 'relative',
          transition: 'transform 200ms ease-in-out, opacity 200ms ease-in-out',
          transform: isOpen ? 'scale(1)' : 'scale(0.95)',
          opacity: isOpen ? 1 : 0,
          maxWidth: '600px', // Max width for the modal
          width: '90%', // Responsive width
        }}
        onClick={(e) => e.stopPropagation()} // Prevent onClick from triggering on the backdrop
      >
        <div style={{ marginBottom: '20px', lineHeight: '1.6' }}>
          {children}
        </div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 15,
            right: 15,
            background: 'gold', // A blue shade for the button
            border: 'none',
            borderRadius: '50%', // Circular button
            padding: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#FFFFFF', // White color for the close button text
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
