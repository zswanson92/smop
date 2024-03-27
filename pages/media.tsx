// Media.tsx
import React from 'react';
import Navbar from '../components/NavBar';

const Media = () => {
  const videos = [
    { id: 'Lvf-qsTzW-o', title: 'Maiden voyage, seven minutes of piracy.' },
    { id: 'UDkqYBrBUcY', title: 'How did you write a book? What was your inspiration? How long did it take?' },
    { id: 'TDw3ylgkk3A', title: 'Pirate Margaret, Julius Caesar,  A Cover Girl, Captain Bogg and Salty, and a rats ass' },
    { id: 'Oc2aYCn0m_I', title: 'Beach RV trip, rum tasting with friends.' },
    { id: 'y1k_Awdsm1o', title: 'FEMALE PIRATES' },
    { id: '_hq08ZuhbOk', title: 'GET INSPIRED' },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-28 bg-gray-900 min-h-screen text-white">
        <h1 className="text-4xl font-bold text-center mb-10">Media Page</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {videos.map((video) => (
            <div key={video.id} className="min-h-[470px] flex flex-col items-center">
              <div className="w-full mb-4">
                <h2 className="text-2xl font-semibold text-center truncate">{video.title}</h2>
              </div>
              <div className="aspect-w-16 aspect-h-9 w-full h-128">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Media;
