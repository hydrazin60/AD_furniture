// Home.jsx
import React, { useState, useEffect, useRef } from 'react';
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

        <div className="time"></div>
      </div>
    </div>
  );
};

export default Home;