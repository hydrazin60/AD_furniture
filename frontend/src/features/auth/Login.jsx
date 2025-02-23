import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here (e.g., API call)
    console.log('Email submitted:', email);
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here (e.g., using Firebase, Auth0, etc.)
    console.log('Google login initiated');
    // Example: window.location.href = '/auth/google'; // Replace with your Google login endpoint
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <img
              src="/images/Ad.png" // Replace with your logo URL
              alt="AD Logo"
              className="mx-auto h-10"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign in</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email or mobile phone number
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or mobile phone number"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-200"
              >
                Continue
              </button>
              <div className="mt-4 text-xs text-gray-600">
                By continuing, you agree to Amazon's{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Conditions of Use
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Privacy Notice
                </a>
                .
              </div>
              <div className="mt-4 text-xs text-gray-600">
                <span className="text-gray-400 mr-1">•</span>{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Need help?
                </a>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-600">
              Buying for work?{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Shop on Amazon Business
              </a>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="mt-4 w-full border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center space-x-2"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg" // Replace with your Google logo URL
                alt="Google Logo"
                className="h-5 w-5"
              />
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600 text-sm">
            New to Amazon?{' '}
            <a href="#" className="text-blue-500 font-medium hover:underline">
              Create your Amazon account
            </a>
          </div>
        </div>
      </div>

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

export default Login;