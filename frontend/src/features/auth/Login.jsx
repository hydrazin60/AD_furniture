import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here (e.g., API call)
    console.log('Email submitted:', email);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md"> {/* Adjust max-w as needed */}
        <div className="text-center mb-8">
          <img 
            src="/images/Ad.png" // Replace with your logo URL
            alt="AD Logo" 
            className="mx-auto h-10"  // Adjust height as needed
          />
        </div>
        <div className="border border-gray-300 rounded-lg p-8">
          <h2 className="text-2xl font-medium mb-4">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email or mobile phone number
              </label>
              <input
                type="text"
                id="email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" // Yellow focus ring
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or mobile phone number"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200" // Yellow button
            >
              Continue
            </button>
            <div className="mt-4 text-sm text-gray-600">
              By continuing, you agree to Amazon's <a href="#" className="text-blue-500">Conditions of Use</a> and <a href="#" className="text-blue-500">Privacy Notice</a>.
            </div>
            <div className="mt-6 text-gray-600">
              <span className="text-gray-400 mr-1">•</span> <a href="#" className="text-blue-500">Need help?</a>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-600">
            Buying for work? <a href="#" className="text-blue-500">Shop on Amazon Business</a>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-600">
          New to Amazon? <a href="#" className="text-blue-500 font-medium">Create your Amazon account</a>
        </div>
      </div>

      {/* Footer */}
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
      
    </div>
  );
};

export default Login;