// components/BookCard.tsx
import React from 'react';

interface BookCardProps {
  cover: string;
  title: string;
  description: string;
}

const BookCard: React.FC<BookCardProps> = ({ cover, title, description }) => (
  // Use responsive classes to adjust the size and padding of the cards on different screens
  <div className="max-w-sm w-full lg:max-w-full lg:flex">
    <img className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
         src={cover}
         alt={`Cover of ${title}`}
         style={{ backgroundImage: `url('${cover}')` }}
    />
    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="flex items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Purchase
        </button>
      </div>
    </div>
  </div>
);

export default BookCard;
