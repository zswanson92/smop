// components/BookCard.tsx
import React, { useState } from 'react';

interface BookCardProps {
  id: number;
  cover: string;
  title: string;
  description: string;
  setShowDescriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBookDescription: React.Dispatch<React.SetStateAction<string>>;
}

const BookCard: React.FC<BookCardProps> = ({
  cover,
  title,
  description,
  setShowDescriptionModal,
  setSelectedBookDescription
}) => {
  const truncateText = (text: string, length: number): string => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-gray-800">
      <img className="w-full" src={cover} alt={`Cover of ${title}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{truncateText(description, 100)}</p>
        <button
          className="text-blue-500 hover:text-blue-800 text-sm"
          onClick={() => {
            setSelectedBookDescription(description);
            setShowDescriptionModal(true);
          }}
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default BookCard;
