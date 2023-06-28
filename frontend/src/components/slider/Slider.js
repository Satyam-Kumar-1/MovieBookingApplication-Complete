import React, { useState, useEffect } from 'react';
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
import img4 from './images/img4.jpg';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Slider(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const img = [img1, img2, img3, img4];

  function goToPreviousSlide(){
    const lastIndex = img.length - 1;
    const index = (currentImageIndex===0) ? lastIndex : currentImageIndex - 1;
    setCurrentImageIndex(index);
  };

  function goToNextSlide(){
    const lastIndex = img.length - 1;
    const index = (currentImageIndex===lastIndex) ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
  };

  // Set interval to switch to next slide every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [currentImageIndex]);

  return (
    <div id="slider">
      <img
        className="slider-img"
        src={img[currentImageIndex]}
        alt={`imag${currentImageIndex}`}
      />
      <button className="slider-button left-slider" onClick={goToPreviousSlide}>
        <FontAwesomeIcon icon={faChevronLeft} fade size="2xl" style={{color: "#2268e2",}} />
      </button>
      <button className="slider-button right-slider" onClick={goToNextSlide}>
        <FontAwesomeIcon icon={faChevronRight} fade size="2xl" style={{color: "#2268e2",}} />
      </button>
      <div className="slider-dots">
        {img.map((_, index) => (
          <FontAwesomeIcon
            icon={faCircle}
            className={index === currentImageIndex ? 'dot-slider active' : 'dot-slider'}
            style={index === currentImageIndex ? {color: "#305491"} : {color: "#94afdb"}}
            key={index}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
