import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';
function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  let [showProfile, setShowProfile] = useState(false)
  let navigate = useNavigate()


  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      await getCurrentUser()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {/* Premium Full Width Navbar */}
      <div className='w-full h-[70px] bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border-b border-purple-500/30 z-50 fixed top-0 left-0 flex items-center justify-between px-10 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300'>

        {/* Premium Logo Section */}
        <div className='flex items-center gap-4 group cursor-pointer' onClick={() => navigate("/")}>
          <div className='relative'>
            <img src={logo} alt="OneCart" className='w-[45px] h-[45px] rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg' />
            <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500'></div>
            <div className='absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500'></div>
          </div>
          <h1 className='text-[28px] font-black bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 tracking-tight'>OneCart</h1>
        </div>

        {/* Premium Navigation Menu */}
        <div className='hidden lg:flex'>
          <ul className='flex items-center gap-1 bg-slate-800/30 rounded-2xl p-1 backdrop-blur-sm border border-purple-500/10'>
            <li className='relative group'>
              <button className='text-[16px] font-semibold text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden' onClick={() => navigate("/")}>
                <span className='relative z-10'>Home</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </li>
            <li className='relative group'>
              <button className='text-[16px] font-semibold text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden' onClick={() => navigate("/collection")}>
                <span className='relative z-10'>Collections</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </li>
            <li className='relative group'>
              <button className='text-[16px] font-semibold text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden' onClick={() => navigate("/about")}>
                <span className='relative z-10'>About</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </li>
            <li className='relative group'>
              <button className='text-[16px] font-semibold text-gray-300 hover:text-white px-6 py-3 rounded-xl transition-all duration-300 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 relative overflow-hidden' onClick={() => navigate("/contact")}>
                <span className='relative z-10'>Contact</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            </li>
          </ul>
        </div>

        {/* Premium Action Icons */}
        <div className='flex items-center gap-3'>
          {!showSearch &&
            <button className='p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/25 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }}>
              <IoSearchCircleOutline className='w-[22px] h-[22px] group-hover:rotate-12 transition-transform duration-300' />
            </button>
          }
          {showSearch &&
            <button className='p-3 rounded-2xl bg-purple-500/25 border border-purple-500/50 text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105' onClick={() => setShowSearch(prev => !prev)}>
              <IoSearchCircleSharp className='w-[22px] h-[22px]' />
            </button>
          }

          {!userData &&
            <button className='p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/25 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group' onClick={() => setShowProfile(prev => !prev)}>
              <FaCircleUser className='w-[20px] h-[20px] group-hover:scale-110 transition-transform duration-300' />
            </button>
          }

          {userData &&
            <button className='w-[44px] h-[44px] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 font-bold text-[16px] border border-purple-400/30 hover:border-purple-400/50' onClick={() => setShowProfile(prev => !prev)}>
              {userData?.name.slice(0, 1).toUpperCase()}
            </button>
          }

          <div className='relative'>
            <button className='p-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/25 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 group hidden md:block' onClick={() => navigate("/cart")}>
              <MdOutlineShoppingCart className='w-[22px] h-[22px] group-hover:scale-110 transition-transform duration-300' />
            </button>
            <span className='absolute -top-2 -right-2 w-[22px] h-[22px] hidden md:flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-[11px] font-bold shadow-lg animate-pulse border-2 border-white/20'>
              {getCartCount()}
            </span>
          </div>
        </div>
      </div>
      {/* Premium Search Bar */}
      {showSearch &&
        <div className='w-full px-10 absolute top-[70px] left-0 z-40 animate-in slide-in-from-top-2 duration-300'>
          <div className='bg-gradient-to-r from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-500/20'>
            <div className='relative'>
              <input
                type="text"
                className='w-full h-[60px] bg-slate-800/60 border-2 border-purple-500/40 rounded-2xl px-6 pl-14 placeholder:text-purple-300/70 text-white text-[18px] focus:outline-none focus:border-purple-400 focus:bg-slate-800/80 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 font-medium'
                placeholder='Search for amazing products, brands, categories...'
                onChange={(e) => { setSearch(e.target.value) }}
                value={search}
                autoFocus
              />
              <IoSearchCircleOutline className='absolute left-4 top-1/2 transform -translate-y-1/2 w-[24px] h-[24px] text-purple-400' />
            </div>
          </div>
        </div>
      }

      {/* Premium Profile Dropdown */}
      {showProfile &&
        <div className='absolute w-[280px] top-[75px] right-10 z-30 animate-in slide-in-from-top-2 duration-300'>
          <div className='bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/20 overflow-hidden'>
            <div className='p-5 border-b border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-pink-500/10'>
              <h3 className='text-white font-bold text-lg'>Account Menu</h3>
              <p className='text-purple-300 text-sm mt-1'>Manage your profile & settings</p>
            </div>
            <ul className='py-3'>
              {!userData &&
                <li className='group mx-2'>
                  <button className='w-full text-left px-4 py-4 text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-500/10' onClick={() => { navigate("/login"); setShowProfile(false) }}>
                    <div className='w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300'>
                      <span className='text-purple-400 group-hover:text-white text-lg'>🔐</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Login to Account</p>
                      <p className='text-xs text-purple-300'>Access your dashboard</p>
                    </div>
                  </button>
                </li>
              }
              {!userData &&
                <li className='group mx-2'>
                  <button className='w-full text-left px-4 py-4 text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-500/10' onClick={() => { navigate("/signup"); setShowProfile(false) }}>
                    <div className='w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300'>
                      <span className='text-purple-400 group-hover:text-white text-lg'>📝</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Create Account</p>
                      <p className='text-xs text-purple-300'>Register new user</p>
                    </div>
                  </button>
                </li>
              }
              {userData &&
                <li className='group mx-2'>
                  <button className='w-full text-left px-4 py-4 text-gray-300 hover:text-red-400 hover:bg-red-500/15 transition-all duration-300 flex items-center gap-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-red-500/10' onClick={() => { handleLogout(); setShowProfile(false) }}>
                    <div className='w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300'>
                      <span className='text-red-400 group-hover:text-red-300 text-lg'>🚪</span>
                    </div>
                    <div>
                      <p className='font-semibold'>Sign Out</p>
                      <p className='text-xs text-red-300'>Logout from account</p>
                    </div>
                  </button>
                </li>
              }
              <li className='group mx-2'>
                <button className='w-full text-left px-4 py-4 text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-500/10' onClick={() => { navigate("/order"); setShowProfile(false) }}>
                  <div className='w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300'>
                    <span className='text-purple-400 group-hover:text-white text-lg'>📦</span>
                  </div>
                  <div>
                    <p className='font-semibold'>My Orders</p>
                    <p className='text-xs text-purple-300'>Track your purchases</p>
                  </div>
                </button>
              </li>
              <li className='group mx-2'>
                <button className='w-full text-left px-4 py-4 text-gray-300 hover:text-white hover:bg-purple-500/20 transition-all duration-300 flex items-center gap-4 rounded-2xl group-hover:shadow-lg group-hover:shadow-purple-500/10' onClick={() => { navigate("/about"); setShowProfile(false) }}>
                  <div className='w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300'>
                    <span className='text-purple-400 group-hover:text-white text-lg'>ℹ️</span>
                  </div>
                  <div>
                    <p className='font-semibold'>About Us</p>
                    <p className='text-xs text-purple-300'>Learn more about OneCart</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      }
      {/* Premium Mobile Bottom Navigation */}
      <div className='w-full h-[75px] flex items-center justify-between px-4 text-[10px] fixed bottom-0 left-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl border-t border-purple-500/30 shadow-2xl shadow-purple-500/20 z-[9999] lg:hidden'>
        <button
          className='text-purple-300 hover:text-white flex items-center justify-center flex-col gap-1 p-2 rounded-xl hover:bg-purple-500/25 transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation min-w-[60px]'
          onClick={() => { console.log('Home clicked'); navigate("/") }}
          type="button"
        >
          <IoMdHome className='w-[24px] h-[24px] pointer-events-none' />
          <span className='font-medium text-[9px] pointer-events-none'>Home</span>
        </button>
        <button
          className='text-purple-300 hover:text-white flex items-center justify-center flex-col gap-1 p-2 rounded-xl hover:bg-purple-500/25 transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation min-w-[60px]'
          onClick={() => { console.log('Collection clicked'); navigate("/collection") }}
          type="button"
        >
          <HiOutlineCollection className='w-[24px] h-[24px] pointer-events-none' />
          <span className='font-medium text-[9px] pointer-events-none'>Shop</span>
        </button>
        <button
          className='text-purple-300 hover:text-white flex items-center justify-center flex-col gap-1 p-2 rounded-xl hover:bg-purple-500/25 transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation min-w-[60px]'
          onClick={() => { console.log('Contact clicked'); navigate("/contact") }}
          type="button"
        >
          <MdContacts className='w-[24px] h-[24px] pointer-events-none' />
          <span className='font-medium text-[9px] pointer-events-none'>Contact</span>
        </button>
        <div className='relative'>
          <button
            className='text-purple-300 hover:text-white flex items-center justify-center flex-col gap-1 p-2 rounded-xl hover:bg-purple-500/25 transition-all duration-300 active:scale-95 cursor-pointer touch-manipulation min-w-[60px]'
            onClick={() => { console.log('Cart clicked'); navigate("/cart") }}
            type="button"
          >
            <MdOutlineShoppingCart className='w-[24px] h-[24px] pointer-events-none' />
            <span className='font-medium text-[9px] pointer-events-none'>Cart</span>
          </button>
          <span className='absolute -top-1 -right-1 w-[18px] h-[18px] flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full text-[8px] font-bold border border-white/30 shadow-md pointer-events-none'>
            {getCartCount()}
          </span>
        </div>
      </div>
    </>
  )
}

export default Nav
