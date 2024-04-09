import React from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';


interface Book {
  id: number;
  cover: string;
  title: string;
  description: string;
  amazonLink: string;
}

interface BookCardProps extends Book {
  setShowDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBookDescription: React.Dispatch<React.SetStateAction<string>>;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  cover,
  title,
  description,
  setShowDescriptionModal,
  setSelectedBookDescription,
  amazonLink,
}) => {
  const { addToCart } = useCart();

  const truncateText = (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const handleAddToCart = () => {
    const bookItem = { id, cover, title, description };
    addToCart(bookItem);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-gray-800">
      <Link href={amazonLink} target="_blank" rel="noopener noreferrer">
        <img className="w-full" src={cover} alt={`Cover of ${title}`} />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{truncateText(description, 100)}</p>
        <button
          className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
          onClick={() => {
            setSelectedBookDescription(description);
            setShowDescriptionModal(true);
          }}
        >
          Read More
        </button>
        <button
          className="mt-4 ml-24 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-2 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;
