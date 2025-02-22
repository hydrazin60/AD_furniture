import React from 'react';

const Contact = () => {
  return (
    <section className="bg-[#e6f2] py-20"> {/* Light blue background */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between"> {/* Align items to start */}

          {/* Left Side: Contact Information */}
          <div className="md:w-5/12 text-left md:pr-10">
            <h2 className="text-3xl font-bold mb-4 text-[#2b343a]">Contact Us</h2> {/* Darker heading color */}
            <p className="text-gray-600 mb-6 leading-relaxed"> {/* Improved text styling */}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At fugiat 
              dicta iusto reprehenderit eum nihil similique.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-blue-500"></i>
                <span className="text-gray-600">+(123) 456 7890</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope mr-3 text-blue-500"></i>
                <span className="text-gray-600">contact@xyzwebsite.com</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3 text-blue-500"></i>
                <span className="text-gray-600">11, Street 342. Abcd Fgh</span>
              </div>
            </div>

            {/* Optional Social Icons - if needed */}
            {/* <div className="mt-8 flex space-x-4">
              {/* Add social icons here if required */}
            {/* </div> */}
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:w-5/12 bg-white rounded-lg shadow-md p-8">
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label> {/* font-medium */}
                <input type="text" id="name" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Your Name" /> {/* Lighter ring color */}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input type="email" id="email" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Email Address" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Type your message here" rows="4"></textarea>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"> {/* Darker hover */}
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around">

          {/* Get to Know Us */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Get to Know Us</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">About AD</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Investor Relations</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD Devices</a></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Make Money with Us</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Sell on AD</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sell Your Services on AD</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sell on AD Business</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sell Your Apps on AD</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD Your Products</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Self-Publish with Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">See all</a></li> {/* Added "See all" */}
            </ul>
          </div>

          {/* AD Payment Products */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">AD Payment Products</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">AD Rewards Visa Signature Cards</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD.com Store Card</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD.com Corporate Credit Line</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Shop with Points</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Credit Card Marketplace</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Reload Your Balance</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD Currency Converter</a></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Let Us Help You</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Your AD</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Your Orders</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD Prime</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Returns & Replacements</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Manage Your Content and Devices</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD Assistant</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section (Language, Currency, Logo) - No changes needed here */}
        <div className="border-t border-gray-300 pt-6 mt-8 text-center">
          <div className="flex justify-center items-center">
            {/* ... (Language and Currency buttons) ... */}
          </div>
          <div className="mt-4">
            {/* ... (AD Logo) ... */}
          </div>
        </div>

      </div>
      <div className="mt-4">
          © 1996-2024, AD.com, Inc. or its affiliates
        </div>
    </footer>
    </section>
  );
};

export default Contact;