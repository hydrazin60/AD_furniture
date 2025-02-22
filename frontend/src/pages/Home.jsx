// Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import truckImage from '../images/truck.svg';
import bagImage from '../images/bag.svg';
import supportImage from '../images/support.svg';
import returnImage from '../images/return.svg';
import whyImage from '../images/why-choose-us-img.jpg';
import '../stylecss/carousel.css';





const Feature = ({ icon, title, description }) => (
  <div className="lg:w-1/2 px-4 mb-6 lg:mb-0">
    <div className="flex items-center mb-3">
      <img src={icon} alt={title} className="w-8 h-8 mr-3" />
      <h3 className="font-medium text-lg">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  const items = [
    {
      image: '../images/don1.jpg',
      author: 'AD Furniture',
      title: 'Furniture 1',
      topic: 'AD DESIGN',
      description: 'Lorem ipsum dolor sit amet...',
    },
    {
      image: '../images/don2.png',
      author: 'AD Furniture',
      title: 'Furniture 2',
      topic: 'AD DESIGN',
      description: 'Ut sequi, rem magnam nesciunt...',
    },
    {
      image: '../images/don3.jpeg',
      author: 'AD Furniture',
      title: 'Furniture 3',
      topic: 'AD DESIGN',
      description: 'Itaque eum neque officiis unde...',
    },
    {
      image: '../images/don4.jpeg',
      author: 'AD Furniture',
      title: 'Furniture 4',
      topic: 'AD DESIGN',
      description: 'Eaque optio ratione aliquid...',
    },
  ];

  const thumbnails = [
    { image: '../images/don5.png', title: 'Slider 1', description: 'Description 1' },
    { image: '../images/don1.jpg', title: 'Slider 2', description: 'Description 2' },
    { image: '../images/don2.png', title: 'Slider 3', description: 'Description 3' },
    { image: '../images/don3.jpeg', title: 'Slider 4', description: 'Description 4' },
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

  return (
    <div>
     

      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={sliderRef}>
          {items.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.title} />
              <div className="content">
                <div className="author">{item.author}</div>
                <div className="title">{item.title}</div>
                <div className="topic">{item.topic}</div>
                <div className="des">{item.description}</div>
                <div className="buttons">
               
                  <button src="/about">SEE MORE</button>
                
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail" ref={thumbnailRef}>
          {thumbnails.map((thumbnail, index) => (
            <div key={index} className="item">
              <img src={thumbnail.image} alt={thumbnail.title} />
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

        <div className="time"></div>
      </div>
      
      
{/* Why Choose Us Section */}
<div className="py-12 bg-white text-black">
        <div className="container mx-auto px-4 text-red">
          <div className="flex flex-col lg:flex-row justify-between text-red">
            <div className="lg:w-1/2 lg:pr-16 text-red">
              <h2 className="text-3xl font-bold mb-4 text-red">Why Choose Us</h2>
              <p className="text-black-600 mb-6">
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

      {/* fooer */}
      <footer className="bg-gray-100 py-8 text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around">

          {/* Get to Know Us */}
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6 md:mb-0">
            <h4 className="font-semibold text-lg mb-4">Get to Know Us</h4>
            <ul className="text-gray-600">
              <li className="mb-2"><a href="#" className="hover:underline">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">About AD FURNITURE</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Investor Relations</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">AD FURNITURE Devices</a></li>
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
              <li className="mb-2"><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">Self-Publish with Us</a></li>
              <li className="mb-2"><a href="#" className="hover:underline">See all</a></li> {/* Added "See all" */}
            </ul>
          </div>

          {/* Amazon Payment Products */}
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
              <li className="mb-2"><a href="#" className="hover:underline">Your Account</a></li>
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
      <div className="mt-4 text-black">
          © 1996-2024, AD.com, Inc. or its affiliates
        </div>
    </footer>

    </div>
  );
};

export default Home;