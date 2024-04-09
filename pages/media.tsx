import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { AiOutlineArrowRight } from "react-icons/ai";



const Media = () => {
  const videos = [
    { id: 'Lvf-qsTzW-o', title: 'Maiden Voyage' },
    { id: 'UDkqYBrBUcY', title: 'Write A Book' },
    { id: 'TDw3ylgkk3A', title: 'Pirate Margaret' },
    { id: 'Oc2aYCn0m_I', title: 'Beach RV Trip' },
    { id: 'y1k_Awdsm1o', title: 'FEMALE PIRATES' },
    { id: '_hq08ZuhbOk', title: 'GET INSPIRED' },
  ];

  return (
    <>
      <Navbar />
      <div className="pt-28 bg-gray-900 min-h-screen text-white">
        <h1 className="text-5xl font-bold text-center mb-10">Media Page</h1>
        <div>
            <h2 className='flex items-center justify-center gap-2 text-3xl font-bold text-gold mb-4'>Find all of my media links here <AiOutlineArrowRight className='mt-1'/> <Link href="https://linktr.ee/sevenminutesofpiracy" className="hover:text-gold-500 hover:underline" passHref>Seven Minutes of Piracy Link Tree </Link></h2>
        </div>
        <h2 className='flex items-center justify-center text-2xl text-silver font-bold mb-4'>YouTube Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {videos.map((video) => (
            <div key={video.id} className="min-h-[470px] flex flex-col items-center">
              <div className="w-full mb-4">
                <h2 className="text-xl font-semibold text-center truncate text-gold">{video.title}</h2>
              </div>
              <div className="aspect-w-16 aspect-h-9 w-full h-128">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </>
  );
};
export default Media;
