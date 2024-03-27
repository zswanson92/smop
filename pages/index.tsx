import React, { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import { BsFacebook } from "react-icons/bs";
import { ImYoutube2 } from "react-icons/im";

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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
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
      setShowDescriptionModal(true);
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
      <Navbar />
      <div className="pt-24 bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4 text-gold">Ahoy! Welcome to Me Book Market</h1>
        <p className="text-lg mb-8 text-gold">Discover me latest treasures and subscribe for updates, ye landlubber!</p>

        {/* Featured Books Section */}
        <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center my-8 text-gold">Featured Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
            <BookCard
              key={book.id} // Add the unique key here using the book's id
              id={book.id}
              cover={book.cover}
              title={book.title}
              description={book.description}
              setShowDescriptionModal={setShowDescriptionModal}
              setSelectedBookDescription={setSelectedBookDescription}
            />
          ))}
        </div>
      </section>
        <form onSubmit={handleSubmit} className="flex flex-col items-center" id="subscribe">
          {/* Existing Subscription Form */}
        </form>
      </div>
      <Modal isOpen={showSignup} onClose={toggleSignup}>
        <SignupForm onClose={toggleSignup}/>
      </Modal>
      <Modal isOpen={showLogin} onClose={toggleLogin}>
        <LoginForm onClose={toggleLogin} />
      </Modal>
      <Modal isOpen={showDescriptionModal} onClose={() => setShowDescriptionModal(false)}>
        <p>{selectedBookDescription}</p>
      </Modal>
      <footer className="bg-gray-900 text-white text-center p-4">
      <div className='flex justify-between items-center'>
        <p style={{ marginTop: '40px' }}>&copy; {new Date().getFullYear()} Me Book Market. All rights reserved. Work by Zack Swanson. </p>
        <div className='flex items-center'>
          <Link href="https://www.facebook.com/sevenminutesofpiracy/?show_switched_toast=0&show_invite_to_follow=0&show_switched_tooltip=0&show_podcast_settings=0&show_community_review_changes=0&show_community_rollback=0&show_follower_visibility_disclosure=0" passHref>
            <button className='flex items-center justify-center mr-4'> <BsFacebook style={{ fontSize: '50px' }}/> </button>
          </Link>
          <Link href="https://www.youtube.com/channel/UCgjqZVLRr8Xa-7nJwK6DtQw" passHref>
            <button className='flex items-center justify-center'> <ImYoutube2 style={{ fontSize: '70px' }}/> </button>
          </Link>
        </div>
      </div>
      </footer>
    </>
  );
}
