import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { BiLogIn } from "react-icons/bi";
import { CgUserAdd } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { GiPirateCaptain } from "react-icons/gi";
import { GiPirateCannon } from "react-icons/gi";

const Navbar = () => {
  const { isLoggedIn, logOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);


  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 border-gold border-b-2 px-4 py-2 flex justify-between items-center z-50">
      <Link href="/" passHref>
        <img src="/home_button.png" alt="Home" className="h-14 w-14 w-14 rounded-lg object-cover" style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </Link>
      <Link href="/blog" passHref>
        <img src="/Screenshot_11.png" alt="Blog" className="h-14 w-14 w-14 rounded-lg object-cover" style={{ objectFit: 'cover', objectPosition: 'center' }} />
      </Link>
      <Link href="/aboutauthor" passHref>
        <button onClick={logOut} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', fontSize: '16px', cursor: 'pointer' }} className="text-silver hover:text-gold color-silver"> About the Author <GiPirateCaptain style={{ marginLeft: '8px', fontSize: '35px' }}/></button>
      </Link>
      <Link href="/media" passHref>
        <button onClick={logOut} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', fontSize: '16px', cursor: 'pointer' }} className="text-silver hover:text-gold color-silver"> Seven Minutes of Piracy Media <GiPirateCannon style={{ marginLeft: '8px', fontSize: '35px' }}/></button>
      </Link>
      {!isLoggedIn ? (
        <>
        <button onClick={() => setShowLoginModal(true)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', fontSize: '16px', cursor: 'pointer' }} className="text-silver hover:text-gold">
            Login <BiLogIn style={{ marginLeft: '8px', fontSize: '35px' }} />
        </button>
        <button onClick={() => setShowSignupModal(true)} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', fontSize: '16px', cursor: 'pointer' }} className="text-silver hover:text-gold mr-4">
            Sign Up <CgUserAdd style={{ marginLeft: '8px', fontSize: '35px' }} />
        </button>
        </>
      ) : (
        <button onClick={logOut} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '8px 12px', fontSize: '16px', cursor: 'pointer' }} className="text-silver hover:text-gold"><BiLogOut /> Sign Out </button>
      )}

      {/* {isLoggedIn && <a href="#subscribe" className="text-lg hover:text-gold">Subscribe</a>} */}

      {/* Login Modal */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm onClose={() => setShowLoginModal(false)} />
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)}>
        <SignupForm onClose={() => setShowSignupModal(false)} />
      </Modal>
    </nav>
  );
};

export default Navbar;
