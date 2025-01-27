import React, { useRef, useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';

import { IoIosSearch } from 'react-icons/io';
import { HiOutlineUser } from 'react-icons/hi';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { DropDown } from './DropDown';
import { useSelector } from 'react-redux';
import { useAuth } from '@/context/AuthContex';
import logoImage from '@/assets/footer-logo.png';
import { useSearchContex } from '@/context/NavSearch';
import { setLogLevel } from 'firebase/app';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [theme,setTheme]=useState('text-gray-300');
  const {itemSearched,setItemSearched}=useSearchContex();
  const navigate=useNavigate();

  const handleHeartClick = () => {
    // Toggle heart color between blue and gray
    if(theme==='text-gray-300'){
        setTheme('text-pink-400');
    }
    else{
        setTheme('text-gray-300');
    }
    
  };

  const handleSearchClick=()=>{
    navigate('/search' ,{replace:true})
    
  }
  const handleInputChange=(event)=>{
    setItemSearched(event.target.value.trim());
  }

  const { currentUser } = useAuth();

  return (
    <header className="max-w-screen-xl mx-auto px-4 py-6 font-primary">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to={'/'}>
            <img src={logoImage} className="size-14" alt="Logo" />
          </Link>
          {/* Search input */}
          <div className="relative sm:w-72 w-40 space-x-2" onClick={handleSearchClick}>
            <IoIosSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search Here"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="relative items-center flex md:space-x-3 space-x-2">
          <div className="flex items-center">
            {currentUser ? (
              <DropDown />
            ) : (
              <Link to={'/login'}>
                <HiOutlineUser className="size-7" />
              </Link>
            )}
          </div>
          <button
            className="hidden sm:block"
            onClick={handleHeartClick}
          >
            <FaHeart
              className={`size-7 ${theme}`}
              // Pass ref to the icon
            />
          </button>
          <Link
            to={'/cart'}
            className="bg-yellowBg p-1 sm:px-6 px-2 flex items-center rounded-md"
          >
            <HiOutlineShoppingCart className="size-6" />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
