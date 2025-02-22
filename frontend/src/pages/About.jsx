import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* About Us Section */}
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900">About Us</h2>
          <p className="text-gray-600 mt-4 max-w-2xl">
            HubSpot’s company and culture are a lot like our product. They’re crafted, not cobbled, for a delightful experience.
          </p>
        </div>

        {/* Image Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <img
            src="/images/team.jpg"
            alt="Team"
            className="w-full md:w-5/12 rounded-lg shadow-lg"
          />
        </div>

        {/* Mission Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center md:items-start md:justify-between">
          <img
            src="/images/office.jpg"
            alt="Office"
            className="w-full md:w-5/12 rounded-lg shadow-lg"
          />
          <div className="md:w-6/12 md:pl-12 mt-8 md:mt-0">
            <h2 className="text-3xl font-bold text-gray-900">
              Our Mission: Helping Millions of Organizations Grow Better
            </h2>
            <p className="text-gray-600 mt-4">
              We believe not just in growing bigger, but in growing better. And growing better means aligning the success of your own business with the success of your customers. Win-win!
            </p>
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

export default About;