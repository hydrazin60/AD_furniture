import React from 'react';

const Services = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 bg-cover bg-center" style={{ backgroundImage: 'url("/hero-furniture.jpg")' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Elevate Your Space with Global Elegance</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">Discover curated furniture collections from around the world, delivered seamlessly to your doorstep.</p>
          <a href="#services" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">Explore Our Services</a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">Our Specialized Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col">
            <div className="flex-shrink-0 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-blue-600 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v12m-9 5.25v-12M3 7.5l9 5.25M3 12.75l9-5.25M21 12.75v-3.75L12 15 3 9v3.75m18 0v2.25H3V12.75M21 15l-9 5.25m9-5.25v-2.25H3V15" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Global Sourcing & Selection</h3>
            <p className="text-gray-700 mb-6 text-center">We meticulously select furniture from renowned international artisans, ensuring unparalleled quality and design.</p>
            <a href="#" className="mt-auto bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded-full self-center transition-colors duration-300">Learn More</a>
          </div>
          {/* Service Card 2 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col">
            <div className="flex-shrink-0 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-green-600 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c-4.95 0-9-3.63-9-8.18a9 9 0 0118 0c0 4.55-4.05 8.18-9 8.18M12 22.5c6.627 0 12-3.827 12-8.5C24 6.373 18.627 2.5 12 2.5S0 6.373 0 14 5.373 22.5 12 22.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Seamless Logistics & Customs</h3>
            <p className="text-gray-700 mb-6 text-center">Our expert team handles every step from shipping to customs, ensuring a smooth and efficient delivery process.</p>
            <a href="#" className="mt-auto bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-2 px-4 rounded-full self-center transition-colors duration-300">Explore Logistics</a>
          </div>
          {/* Service Card 3 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col">
            <div className="flex-shrink-0 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 text-indigo-600 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.l-1.426 2.472a1.5 1.5 0 00.968 2.383l1.51 1.007a1.5 1.5 0 01.675 2.25l-.957 1.515a1.5 1.5 0 002.382 1.427l2.472-1.426a1.5 1.5 0 012.25.675l1.007 1.51a1.5 1.5 0 002.383.968l1.426-2.472a1.5 1.5 0 012.25-.675l1.51-1.007a1.5 1.5 0 00-.968-2.383l-1.51-1.007a1.5 1.5 0 01-2.25-.675l1.426-2.472a1.5 1.5 0 00-2.382-1.427l-2.472 1.426a1.5 1.5 0 01-2.25.675l-1.51 1.007a1.5 1.5 0 00-2.383-.968L9.303 16.376z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Personalized Consultation</h3>
            <p className="text-gray-700 mb-6 text-center">Receive tailored guidance and support from our design experts to find the perfect pieces for your space.</p>
            <a href="#" className="mt-auto bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-2 px-4 rounded-full self-center transition-colors duration-300">Book Consultation</a>
          </div>
        </div>
      </section>

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
                <li className="mb-2"><a href="#" className="hover:underline">Facebook</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">Instagram</a></li>
                <li className="mb-2"><a href="#" className="hover:underline">LinkedIn</a></li>
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

export default Services;