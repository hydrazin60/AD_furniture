import React from 'react';

const Services = () => {
  return (
    <section className="bg-gray-100 py-12"> {/* Example background color and padding */}
      <div className="container mx-auto text-center"> {/* Center the content */}
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Responsive grid */}

          <div className="bg-white p-6 rounded-lg shadow-md"> {/* Card styling */}
            <h3 className="text-xl font-semibold mb-4">Mobile Development</h3>
            <p className="text-gray-700">Sample text. Click to select the text box. Click again or double click to start editing the text. Excepteur sint occaecat cupidatat non proident.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              MORE
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md"> {/* Card styling */}
            <h3 className="text-xl font-semibold mb-4">Mobility Services</h3>
            <p className="text-gray-700">Sample text. Click to select the text box. Click again or double click to start editing the text. Excepteur sint occaecat cupidatat non proident.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              MORE
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md"> {/* Card styling */}
            <h3 className="text-xl font-semibold mb-4">Software Consulting</h3>
            <p className="text-gray-700">Sample text. Click to select the text box. Click again or double click to start editing the text. Excepteur sint occaecat cupidatat non proident.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              MORE
            </button>
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
              <li className="mb-2"><a href="#" className="hover:underline">About Amazon</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Investor Relations</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Amazon Devices</a></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Make Money with Us</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Sell on Amazon</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sell Your Services on Amazon</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sell on Amazon Business</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Sell Your Apps on Amazon</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Become an Affiliate</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Self-Publish with Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">See all</a></li> {/* Added "See all" */}
            </ul>
          </div>

          {/* Amazon Payment Products */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Amazon Payment Products</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Amazon Rewards Visa Signature Cards</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Amazon.com Store Card</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Amazon.com Corporate Credit Line</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Shop with Points</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Credit Card Marketplace</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Reload Your Balance</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Amazon Currency Converter</a></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Let Us Help You</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Your Account</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Your Orders</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Shipping Rates & Policies</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Amazon Prime</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Returns & Replacements</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Manage Your Content and Devices</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Amazon Assistant</a></li>
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
            {/* ... (Amazon Logo) ... */}
          </div>
        </div>

      </div>
    </footer>
      <div className="mt-12 w-full max-w-md text-center text-sm text-gray-600">
        <hr className="my-4 border-gray-300" /> {/* Added horizontal line */}
        <div className="flex justify-center space-x-6"> {/* Use space-x-6 for spacing */}
          <a href="#" className="text-gray-600">Conditions of Use</a>
          <a href="#" className="text-gray-600">Privacy Notice</a>
          <a href="#" className="text-gray-600">Help</a>
        </div>
        <div className="mt-4">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </div>
       
      </div>
    </section>
  );
};

export default Services;