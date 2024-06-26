import React, { FormEvent, useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Modal from '../components/Modal';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';

interface Book {
  id: number;
  cover: string;
  title: string;
  description: string;
  amazonLink: string;
}

interface ImageData {
  id: number;
  src: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedBookDescription, setSelectedBookDescription] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const rotatingImages: ImageData[] = [
    { id: 1, src: '/tester_1.gif' },
    { id: 2, src: '/tester_2.gif' },
    { id: 3, src: '/youtube-video-gif.gif' },
  ];

  const { isLoggedIn, logOut } = useAuth();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${backendUrl}/api/books`)
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("There was an error fetching the books:", error));
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % rotatingImages.length);
    }, 10000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [rotatingImages.length]);

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
        <h1 className="text-6xl font-bold mb-4 text-gold">Welcome to Seven Minutes of Piracy</h1>

        {/* Rotating Image */}
        <img src={rotatingImages[currentImageIndex].src} alt="Rotating Image" className="mb-8 rounded-lg shadow-lg rotating-image" />

        <p className="text-lg mb-8 text-gold">Discover me latest treasures below, explore the blog above, and subscribe for updates, ye landlubber!</p>

        {/* Featured Books Section */}
        <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center my-8 text-gold">Published Book Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              cover={book.cover}
              title={book.title}
              description={book.description}
              amazonLink={book.amazonLink}
              setShowDescriptionModal={setShowDescriptionModal}
              setSelectedBookDescription={setSelectedBookDescription}
            />
          ))}
        </div>

      </section>
      <section className='mt-10'>
        <h2 className='font-bold text-gold'>Home port for the Sharp Tales series, Captain Gerard the Sharp, authored by Robert Liebertz</h2>
      </section>
        {/* <form onSubmit={handleSubmit} className="flex flex-col items-center" id="subscribe">
        </form> */}
      </div>
      <Modal isOpen={showSignup} onClose={toggleSignup}>
        <SignupForm onClose={toggleSignup}/>
      </Modal>
      <Modal isOpen={showLogin} onClose={toggleLogin}>
        <LoginForm onClose={toggleLogin} />
      </Modal>
      <Modal isOpen={showDescriptionModal} onClose={() => setShowDescriptionModal(false)}>
      <p style={{
        fontFamily: '"Merriweather", serif',
        fontSize: '22px',
        lineHeight: '1.75',
        textAlign: 'left',
        padding: '20px',
        overflowY: 'auto',
        maxHeight: '70vh',
      }}>
        {selectedBookDescription.split('\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            {paragraph}

          </React.Fragment>
        ))}
      </p>
      </Modal>
      <Footer />
    </>
  );
}
