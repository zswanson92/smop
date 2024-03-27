// AboutAuthor.tsx
import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import { FaArrowDownLong } from "react-icons/fa6";

const AboutAuthor = () => {
    return (
        <>
          <Navbar />
          <div className="pt-24 bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold mb-4">About the Author</h1>
            <h2 className='flex justify-center items-center text-gold font-bold mb-4'><FaArrowDownLong /> (Me)</h2>
            <img className="rounded-lg shadow-lg mb-8" src="/about-robert-pic-207x300.jpg" alt="Author Robert Liebertz" />
            <div className="flex flex-row justify-center  gap-10 max-w-6xl mx-auto">

              <div className="flex flex-col items-center w-full lg:flex-1"> {/* This will ensure the content is flexible but takes up at least as much space as it needs */}
                <section className="bg-gray-800 rounded-lg shadow-md p-4">
                  <h2 className="text-3xl font-semibold mb-3 text-center">Robert Liebertz</h2>
                <p className="text-lg mb-4 text-center leading-relaxed">
                  Robert Liebertz grew up in Gresham Oregon. He worked a variety of jobs from building fences to selling vacuums door to door. He found his calling working as a dispatcher at a 911 center. Robert worked for the City of Portland for 31 years and retired in March of 2021.
                </p>
                <p className="text-center text-lg mb-4 leading-relaxed">
                  Robert has been married to his wife Margaret since 1992. They have two children, Lucas, and Emma. They also have two Siberian Huskies, Nova and Ella.
                </p>
                <p className="text-justify text-lg mb-4 leading-relaxed">
                  The family has been attending pirate festivals for years. At one such event, a friend encouraged Robert to invent a backstory for his pirate character. That backstory became the genesis for his first book. He started writing in October 2020 and finished the book in January of 2021. He spent months looking for a publisher during the peak of the covid shutdown. Frustrated with the process, he decided to self-publish.
                </p>
                <h3 className="text-2xl font-semibold mb-2 text-center">Published Works</h3>
                <ul>
                  <li className="mb-2 text-center">GERARD’S FORTUNE, published on 7/28/2021.</li>
                  <li className="mb-2 text-center">GERARD’S HOMECOMING, published 11/23/2021.</li>
                  <li className="mb-2 text-center">GERARD’S JEOPARDY, published on 6/19/2022.</li>
                  <li className="mb-2 text-center">GERARD’S TRIALS, published on 12/7/2022.</li>
                  <li className="mb-2 text-center">GERARD’S MAP, published on 9/9/2023.</li>
                </ul>
                <p className="text-center text-lg ">
                  The sixth and final book in the “Sharp-Tales” series is expected to be published in the fall of 2024.
                </p>
                </section>
              </div>
              <div className="w-full lg:w-1/2"> {/* Adjust the width for large screens */}
                {/* Map and contact information will go here */}

                <section className="bg-gray-800 rounded-lg shadow-md p-4">
                  <h3 className="text-2xl font-semibold mb-3">Contact Information:</h3>
                  {/* Add contact details */}
                  <p className="mb-3 text-xl">Email: sevenminutesofpiracy@gmail.com</p>
                  <p className="mb-3 text-xl">Phone: (123) 456-7890</p>
                  <p className="mb-3 text-xl">Home Port: Gresham, Or</p>
                </section>
                <img className="rounded-lg shadow-lg mb-8" src="/gresham_or.png" alt="Map" />
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
};


export default AboutAuthor;
