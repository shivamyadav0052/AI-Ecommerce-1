import React from 'react'
import logo from "../assets/logo.png"
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { IoMdArrowRoundUp } from 'react-icons/io'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='w-[100%] relative mb-[77px] md:mb-[0px]'>
      {/* Main Footer */}
      <div className='w-[100%] bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white pt-16 pb-8'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>

            {/* Company Info */}
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                <img src={logo} alt="" className='w-10 h-10 rounded-lg shadow-lg' />
                <h2 className='text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>OneCart</h2>
              </div>
              <p className='text-gray-300 leading-relaxed'>
                Your premium online shopping destination. Discover quality products, exclusive deals, and exceptional service that makes shopping a delightful experience.
              </p>
              <div className='flex space-x-4'>
                <a href="https://www.facebook.com/shivam.pathak.388277" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className='w-6 h-6 text-gray-400 hover:text-blue-500 cursor-pointer transition-all duration-300 hover:scale-110' />
                </a>
                <a href="https://x.com/ShivamPath93725" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className='w-6 h-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-all duration-300 hover:scale-110' />
                </a>
                <a href="https://www.instagram.com/shivampathak8106/" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className='w-6 h-6 text-gray-400 hover:text-pink-500 cursor-pointer transition-all duration-300 hover:scale-110' />
                </a>
                <a href="https://www.linkedin.com/in/shivam9076/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className='w-6 h-6 text-gray-400 hover:text-blue-600 cursor-pointer transition-all duration-300 hover:scale-110' />
                </a>
                <a href="https://youtube.com/@onecart" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className='w-6 h-6 text-gray-400 hover:text-red-500 cursor-pointer transition-all duration-300 hover:scale-110' />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className='space-y-6'>
              <h3 className='text-xl font-semibold text-cyan-400'>Quick Links</h3>
              <ul className='space-y-3'>
                <li><a href="/" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Home</a></li>
                <li><a href="/collection" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Collections</a></li>
                <li><a href="/about" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>About Us</a></li>
                <li><a href="/contact" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Contact</a></li>
                <li><a href="#" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>FAQ</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className='space-y-6'>
              <h3 className='text-xl font-semibold text-cyan-400'>Customer Service</h3>
              <ul className='space-y-3'>
                <li><a href="#" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Track Order</a></li>
                <li><a href="#" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Return Policy</a></li>
                <li><a href="#" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Shipping Info</a></li>
                <li><a href="#" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Privacy Policy</a></li>
                <li><a href="#" className='text-gray-300 hover:text-white hover:pl-2 transition-all duration-300 cursor-pointer'>Terms of Service</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className='space-y-6'>
              <h3 className='text-xl font-semibold text-cyan-400'>Get In Touch</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <MdPhone className='w-5 h-5 text-cyan-400' />
                  <a href="tel:+91-9076985876" className='text-gray-300 hover:text-white transition-colors'>+91-9076985876</a>
                </div>
                <div className='flex items-center gap-3'>
                  <MdEmail className='w-5 h-5 text-cyan-400' />
                  <a href="mailto:shivampathak99771@gmail.com" className='text-gray-300 hover:text-white transition-colors'>altafmohd8663@gmail.com</a>
                </div>
                <div className='flex items-center gap-3'>
                  <FaWhatsapp className='w-5 h-5 text-cyan-400' />
                  <a href="https://wa.me/9076985876" target="_blank" rel="noopener noreferrer" className='text-gray-300 hover:text-green-400 transition-colors'>WhatsApp Us</a>
                </div>
                <div className='flex items-center gap-3'>
                  <MdLocationOn className='w-5 h-5 text-cyan-400' />
                  <span className='text-gray-300'>New Delhi, India</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className='mt-6'>
                <h4 className='text-lg font-medium mb-3'>Subscribe Newsletter</h4>
                <div className='flex'>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className='flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-cyan-400 transition-colors'
                  />
                  <button className='px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-r-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300'>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='bg-black text-gray-400 py-6'>
        <div className='max-w-7xl mx-auto px-6 md:px-12'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm'>© 2025 Shivam Pathak. All rights reserved.</p>
            <div className='flex items-center gap-6 text-sm'>
              <span>Made with ❤️ in India</span>
              <div className='flex gap-4'>
                <a href="#" className='hover:text-white transition-colors'>Terms</a>
                <a href="#" className='hover:text-white transition-colors'>Privacy</a>
                <a href="#" className='hover:text-white transition-colors'>Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className='fixed bottom-20 md:bottom-8 right-6 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50'
      >
        <IoMdArrowRoundUp className='w-6 h-6 mx-auto' />
      </button>
    </div>
  )
}

export default Footer
