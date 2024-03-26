import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark-wood border-gold border-b-2 px-4 py-2 flex justify-between items-center z-50">  <Link href="/" passHref>
    <button className="text-4xl font-pirate text-gold hover:text-sand">Book Market</button>
  </Link>
  {!isLoggedIn ? (
    <>
      <Link href="/signup" passHref><button className="text-lg hover:text-gold mr-4">Sign Up</button></Link>
      <Link href="/login" passHref><button className="text-lg hover:text-gold">Login</button></Link>
    </>
  ) : (
    <button onClick={logOut} className="text-lg hover:text-gold">Sign Out</button>
  )}
  <Link href="/blog" passHref>
    <button className="text-lg hover:text-gold ml-4">Blog</button>
  </Link>
  <a href="#subscribe" className="text-lg hover:text-gold">Subscribe</a>
</nav>
  );
};

export default Navbar;
