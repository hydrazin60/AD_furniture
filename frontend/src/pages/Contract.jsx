import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import icons

const Contract = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen"> {/* Gradient background and min-height */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Side: Contact Information */}
            <div className="text-left">
              <h2 className="text-4xl font-extrabold mb-8 text-gray-800 leading-tight">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                We're here to answer your questions and help you bring your vision to life. Reach out to us today!
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-4 text-blue-600 text-lg" />
                  <span className="text-gray-700 font-medium text-lg">+(123) 456 7890</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-4 text-blue-600 text-lg" />
                  <span className="text-gray-700 font-medium text-lg">contact@xyzwebsite.com</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-4 text-blue-600 text-lg" />
                  <span className="text-gray-700 font-medium text-lg">11, Street 342, Abcd Fgh</span>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-12">
              <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center">Send Us a Message</h3>
              <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-300" placeholder="Your Name" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input type="email" id="email" className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-300" placeholder="Email Address" />
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea id="message" className="w-full border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-300" placeholder="Type your message here" rows="5"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-300">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* New Footer */}
      <footer className="bg-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Company</h4>
              <ul className="text-gray-600">
                <li className="mb-2"><a href="#" className="hover:underline">About Us</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Our Mission</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>

            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Services</h4>
              <ul className="text-gray-600">
                <li className="mb-2"><a href="#" className="hover:underline">Global Sourcing</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Logistics & Customs</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Consultation</a></li>
              </ul>
            </div>

            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Support</h4>
              <ul className="text-gray-600">
                <li className="mb-2"><a href="#" className="hover:underline">FAQ</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Shipping & Delivery</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Returns</a></li>
              </ul>
            </div>

            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Connect</h4>
              <ul className="text-gray-600">
                <li className="mb-2"><a href="#" className="hover:underline flex items-center"><FaFacebook className="mr-2"/>Facebook</a></li>
                <li className="mb-2"><a href="#" className="hover:underline flex items-center"><FaInstagram className="mr-2"/>Instagram</a></li>
                <li className="mb-2"><a href="#" className="hover:underline flex items-center"><FaLinkedin className="mr-2"/>LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 mt-12 text-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} AD Furniture Import. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contract;