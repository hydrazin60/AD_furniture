// Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import truckImage from '../images/truck.svg';
import bagImage from '../images/bag.svg';
import supportImage from '../images/support.svg';
import returnImage from '../images/return.svg';
import whyImage from '../images/why-choose-us-img.jpg';
import '../stylecss/carousel.css';

const Home = () => {

  
  const items = [
    {
      images: '/images/don5.png',
      author: 'AD Furniture',
      title: 'Furniture 1',
      topic: 'AD DESIGN',
      description: 'Lorem ipsum dolor sit amet...',
    },
    {
      images: '/images/don1.jpg',
      author: 'AD Furniture',
      title: 'Furniture 2',
      topic: 'AD DESIGN',
      description: 'Ut sequi, rem magnam nesciunt...',
    },
    {
      images: '/images/don2.png',
      author: 'AD Furniture',
      title: 'Furniture 3',
      topic: 'AD DESIGN',
      description: 'Itaque eum neque officiis unde...',
    },
    {
      images: '/images/don4.jpeg',
      author: 'AD Furniture',
      title: 'Furniture 4',
      topic: 'AD DESIGN',
      description: 'Eaque optio ratione aliquid...',
    },
  ];

  const thumbnails = [
    { images: '/images/don5.png', title: 'Slider 1', description: 'Description 1' },
    { images: '/images/don1.jpg', title: 'Slider 2', description: 'Description 2' },
    { images: '/images/don2.png', title: 'Slider 3', description: 'Description 3' },
    { images: '/images/don3.jpeg', title: 'Slider 4', description: 'Description 4' },
  ];

  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);

  const nextSlide = () => showSlider('next');
  const prevSlide = () => showSlider('prev');

  const showSlider = (type) => {
    const sliderItems = sliderRef.current.querySelectorAll('.item');
    const thumbnailItems = thumbnailRef.current.querySelectorAll('.item');

    if (type === 'next') {
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      carouselRef.current.classList.add('next');
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      carouselRef.current.classList.add('prev');
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselRef.current.classList.remove('next');
      carouselRef.current.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(nextSlide, timeAutoNext);
  };

  let runTimeOut;
  let runNextAuto;
  const timeRunning = 3000;
  const timeAutoNext = 7000;

  useEffect(() => {
    runNextAuto = setTimeout(nextSlide, timeAutoNext);
    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  const Feature = ({ icon, title, description }) => (
    <div className="lg:w-1/2 px-4 mb-6 lg:mb-0">
      <div className="flex items-center mb-3">
        <img src={icon} alt={title} className="w-8 h-8 mr-3" />
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const testimonials = [
    {
      name: 'John Doe',
      photo: '/images/customer1.jpg',
      rating: 5,
      review: 'Amazing products! High quality and great service.',
    },
    {
      name: 'Jane Smith',
      photo: '/images/customer2.jpg',
      rating: 4,
      review: 'Fast delivery and excellent customer support.',
    },
    {
      name: 'Michael Johnson',
      photo: '/images/customer3.jpg',
      rating: 5,
      review: 'Beautiful designs, I love my new furniture!',
    },
    {
      name: 'John Doe',
      photo: '/images/customer1.jpg',
      rating: 5,
      review: 'Amazing products! High quality and great service.',
    },
    {
      name: 'Jane Smith',
      photo: '/images/customer2.jpg',
      rating: 4,
      review: 'Fast delivery and excellent customer support.',
    },
    {
      name: 'Michael Johnson',
      photo: '/images/customer3.jpg',
      rating: 5,
      review: 'Beautiful designs, I love my new furniture!',
    },
  ];

  const socialLinks = [
    { icon: '📘', link: 'https://facebook.com' },
    { icon: '🐦', link: 'https://twitter.com' },
    { icon: '📸', link: 'https://instagram.com' },
  ];

  const faqs = [
    {
      question: 'Do you offer custom furniture designs?',
      answer: 'Yes, we provide personalized designs to suit your requirements.',
    },
    {
      question: 'What are the delivery charges?',
      answer: 'Delivery is free for orders above (NEP) रु50,000. Otherwise, standard charges apply.',
    },
    {
      question: 'How can I track my order?',
      answer: 'You can track your order through the tracking link sent to your email.',
    },
  ];

  const products = [
    {
      image: '/images/don1.jpg',
      name: 'Elegant Sofa',
    },
    {
      image: '/images/don2.png',
      name: 'Wooden Dining Table',
    },
    {
      image: '/images/don3.jpeg',
      name: 'Modern Chair',
    },
  ];


  const blogs = [
    {
      image: '/images/sofa.png',
      title: 'Top Furniture Trends in 2025',
      excerpt: 'Discover the latest trends that are shaping the furniture industry this year...',
    },
    {
      image: '/images/team.jpg',
      title: 'How to Choose the Perfect Sofa',
      excerpt: 'Learn how to select a sofa that complements your living space...',
    },
    {
      image: '/images/team.jpg',
      title: 'How to Choose the Perfect Sofa',
      excerpt: 'Learn how to select a sofa that complements your living space...',
    },
 
  ];


  const services = [
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Get your furniture delivered fast and safely.',
    },
    {
      icon: '🔨',
      title: 'Custom Designs',
      description: 'Personalized designs to match your style.',
    },
    {
      icon: '🔧',
      title: 'Easy Installation',
      description: 'Hassle-free installation services.',
    },
  ];

  const teamMembers = [
    {
      photo: '/images/team.jpg',
      name: 'Bishnu Kumar Dahal',
      role: 'Founder & CEO',
    },
    {
      photo: '/images/team.jpg',
      name: 'Laxman Adhikari',
      role: 'Lead Designer',
    },
    {
      photo: '/images/team.jpg',
      name: 'Arjun Sharma',
      role: 'Marketing Head',
    },
  ];

  return (
    <div>
     

      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={sliderRef}>
          {items.map((item, index) => (
            <div key={index} className="item">
              <img src={item.images} alt={item.title} />
              <div className="content">
                <div className="author">{item.author}</div>
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.description}</div>
                <div className="buttons">
                  <button>SEE MORE</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail" ref={thumbnailRef}>
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className="item">
              <img src={thumbnail.images} alt={thumbnail.title} />
              <div className="content">
                <div className="title">{thumbnail.title}</div>
                <div className="description">{thumbnail.description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev" onClick={prevSlide}>&lt;</button>
          <button id="next" onClick={nextSlide}>&gt;</button>
        </div>



 {/* Why Choose Us Section */}
 <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/2 lg:pr-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 mb-6">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>

              <div className="flex flex-wrap">
                <Feature
                  icon={truckImage}
                  title="Fast &amp; Free Shipping"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
                <Feature
                  icon={bagImage}
                  title="Easy to Shop"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
                <Feature
                  icon={supportImage}
                  title="24/7 Support"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
                <Feature
                  icon={returnImage}
                  title="Hassle Free Returns"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="img-wrap">
                <img src={whyImage} alt="Why Choose Us" className="max-w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="time"></div>

        
      </div>


      {/* Featured Products Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="flex flex-wrap justify-center">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-2xl shadow-lg p-4 m-4 w-full sm:w-64"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="font-semibold mt-4">{product.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Why Choose Us Section */}
       <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/2 lg:pr-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-gray-600 mb-6">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet
                velit. Aliquam vulputate velit imperdiet dolor tempor tristique.
              </p>

              <div className="flex flex-wrap">
                <Feature
                  icon={truckImage}
                  title="Fast &amp; Free Shipping"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
                <Feature
                  icon={bagImage}
                  title="Easy to Shop"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
                <Feature
                  icon={supportImage}
                  title="24/7 Support"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
                <Feature
                  icon={returnImage}
                  title="Hassle Free Returns"
                  description="Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate."
                />
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="img-wrap">
                <img src={whyImage} alt="Why Choose Us" className="max-w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Our Services Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="flex flex-wrap justify-center">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 m-4 w-full sm:w-64 text-center"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h4 className="font-semibold">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Team Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-2xl shadow-lg p-6 m-4 w-full sm:w-64 text-center"
              >
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Blog Section */}
<div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
          <div className="flex flex-wrap justify-center">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-4 m-4 w-full sm:w-80"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h4 className="font-semibold mt-4">{blog.title}</h4>
                <p className="text-gray-600">{blog.excerpt}</p>
                <button className="mt-4 text-blue-600 hover:underline">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

{/* Customer Testimonials Section */}
<div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h2>
          <div className="flex flex-wrap justify-center">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 m-4 w-full sm:w-80"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <div className="text-yellow-500">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

        {/* FAQ Section */}
        <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <h4 className="font-semibold">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
        <p className="mb-6">Subscribe to our newsletter for the latest updates and offers.</p>
        <form className="flex justify-center">
          <input 
            type="email"
            placeholder="Enter your email "
            className="p-3 rounded-l-lg  bg-white text-gray-800"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-4 rounded-r-lg">
            Subscribe
          </button>
        </form>
      </div>


      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-white-400">
              AD Furniture - Crafting Quality Furniture with elegance and style.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold" >Quick Links</h3>
            <ul>
              <li>
                <a href="/about" className="text-white-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="/contract" className="text-white-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#privacy" className="text-white-400 hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-white-500 mt-4">
          © {new Date().getFullYear()} AD Furniture. All rights reserved.
        </div>
      </footer>

    

    </div>
    
  );
};

export default Home;