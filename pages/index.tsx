import React, { FormEvent, useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

interface Book {
  id: number;
  cover: string;
  title: string;
  description: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedBookDescription, setSelectedBookDescription] = useState('');

  const { isLoggedIn, logOut } = useAuth();


  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("There was an error fetching the books:", error));
  }, []);

  const toggleSignup = () => setShowSignup(!showSignup);
  const toggleLogin = () => setShowLogin(!showLogin);

  const handleReadMore = (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setShowDescriptionModal(true); // You'll need to manage this state
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');

    if (typeof email === 'string') {
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Subscription successful');
        } else {
          throw new Error(data.error || 'Failed to subscribe');
        }
      } catch (error) {
        console.error('Subscription error:', error);
        alert((error as Error).message);
      }
    }
  };

  return (
    <>
      <nav className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
        <div>
          <a href="/" className="text-3xl font-bold">Book Market</a>
        </div>
        <div>
          {!isLoggedIn ? (
            <>
              <button onClick={toggleSignup} className="text-lg hover:underline mr-4">Sign Up</button>
              <button onClick={toggleLogin} className="text-lg hover:underline">Login</button>
            </>
          ) : (
            <button onClick={logOut} className="text-lg hover:underline">Sign Out</button>
          )}
        </div>
        <div>
          <a href="#subscribe" className="text-lg hover:underline">Subscribe</a>
        </div>
      </nav>

      <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white">
        {/* Existing Hero Section */}
        <h1 className="text-4xl font-bold mb-4">Ahoy! Welcome to Me Book Market</h1>
        <p className="text-lg mb-8">Discover me latest treasures and subscribe for updates, ye landlubber!</p>

        {/* Featured Books Section */}
        <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center my-8">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              cover={book.cover}
              title={book.title}
              description={book.description}
              setShowDescriptionModal={setShowDescriptionModal}
              setSelectedBookDescription={setSelectedBookDescription}
            />
          ))}
        </div>
      </section>

        {/* Subscribe Section (moved to the bottom) */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center" id="subscribe">
          {/* Existing Subscription Form */}
        </form>
      </div>
      <Modal isOpen={showSignup} onClose={toggleSignup}>
        <SignupForm />
      </Modal>
      <Modal isOpen={showLogin} onClose={toggleLogin}>
        <LoginForm onClose={toggleLogin} />
      </Modal>
      {/* Description Modal */}
      <Modal isOpen={showDescriptionModal} onClose={() => setShowDescriptionModal(false)}>
        <p>{selectedBookDescription}</p>
      </Modal>
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Me Book Market. All rights reserved.</p>
      </footer>
    </>
  );
}
