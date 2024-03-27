import React from 'react';
import Link from 'next/link';
import { BsFacebook } from "react-icons/bs";
import { ImYoutube2 } from "react-icons/im";

const Footer = () => {
  return (
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
  );
}

export default Footer;
