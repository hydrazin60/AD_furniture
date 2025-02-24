import React from 'react';
import { SocialIcon } from 'react-social-icons';

const socialLinks = [
  { url: 'https://facebook.com/ADFurniture', label: 'Facebook' },
  { url: 'https://twitter.com/ADFurniture', label: 'Twitter' },
  { url: 'https://instagram.com/ADFurniture', label: 'Instagram' },
  { url: 'https://linkedin.com/ADFurniture', label: 'LinkedIn' },
  { url: 'https://pinterest.com/ADFurniture', label: 'Pinterest' },
  // Add more social links as needed
];

const teamMembers = [
  {
    name: 'John Doe',
    position: 'Founder & CEO',
    image: '/images/john_doe.jpg',
    bio: 'John has over 20 years of experience in the furniture industry and founded AD Furniture with a vision to create elegant and sustainable pieces.',
  },
  {
    name: 'Jane Smith',
    position: 'Chief Designer',
    image: '/images/jane_smith.jpg',
    bio: 'Jane leads our design team, bringing innovative and stylish designs to our product line.',
  },
    {
    name: 'David Lee',
    position: 'Marketing Director',
    image: '/images/david_lee.jpg',
    bio: 'David manages marketing efforts, promoting AD Furniture\'s products and brand.',
  },
  // Add more team members as needed
];

const testimonials = [
  {
    customer: 'Emily R.',
    feedback: 'The quality and craftsmanship of AD Furniture are outstanding. My living room has never looked better!',
  },
  {
    customer: 'Michael B.',
    feedback: 'Exceptional service and beautiful designs. Highly recommend AD Furniture!',
  },
    {
        customer: 'Sarah L.',
        feedback: 'The furniture is both beautiful and functional. AD Furniture has truly transformed my home.',
    }
  // Add more testimonials as needed
];

const About = () => {
  return (
    <section className="text-white bg-gradient-to-br from-gray-950 to-black py-24 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-white-900 mb-6">Welcome to AD Furniture</h1>
          <p className="text-xl text-white-700 max-w-3xl mx-auto">
            Discover the perfect blend of elegance, sustainability, and craftsmanship. At AD Furniture, we create pieces that transform your living spaces into havens of comfort and style.
          </p>
        </div>

        {/* Company Overview */}
        <div className="mb-20">
          <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-8 text-center md:text-left">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded in 2012, AD Furniture began as a small workshop driven by a passion for creating exceptional furniture. Over the years, we've grown into a leading manufacturer known for our commitment to quality, sustainability, and innovative design. We believe in crafting pieces that not only enhance your home but also reflect our dedication to environmental responsibility.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
                Our team of skilled artisans and designers work tirelessly to ensure every piece meets our high standards. We source sustainable materials and employ eco-friendly practices throughout our production process, ensuring our furniture is as good for the planet as it is for your home.
            </p>
          </div>
        </div>

        {/* Mission and Values */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To create sustainable and stylish furniture solutions that enrich lives and spaces, while upholding the highest standards of quality and craftsmanship.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-12 md:p-16">
              <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Values</h2>
              <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed">
                <li>Sustainability: Commitment to eco-friendly materials and practices.</li>
                <li>Quality: Uncompromising standards in craftsmanship and materials.</li>
                <li>Innovation: Continual pursuit of creative and functional designs.</li>
                <li>Customer Satisfaction: Ensuring every customer has an exceptional experience.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-20">
          <h2 className="text-4xl font-semibold text-white-900 text-center md:text-left mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-36 h-36 mx-auto rounded-full object-cover mb-6"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{member.name}</h3>
                <p className="text-gray-600 mb-3">{member.position}</p>
                <p className="text-sm text-gray-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mb-20">
          <h2 className="text-4xl font-semibold text-white-900 text-center md:text-left mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-xl p-10 hover:shadow-2xl transition-shadow duration-300">
                <p className="text-lg text-gray-700 italic leading-relaxed">"{testimonial.feedback}"</p>
                <p className="text-gray-900 font-semibold mt-6">- {testimonial.customer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-white-900 mb-6">Ready to Transform Your Home?</h2>
          <p className="text-lg text-white-700 mb-8">
            Explore our collections and find the perfect pieces to create your dream living space.
          </p>
          <a href="/collections" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
            View Our Collections
          </a>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 flex flex-wrap justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-400">
              AD Furniture - Crafting quality furniture with elegance and style.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  url={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-4">
          © {new Date().getFullYear()} AD Furniture. All rights reserved.
        </div>
      </footer>
    </section>
  );
};

export default About;
