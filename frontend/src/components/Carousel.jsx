/* eslint-disable react/prop-types */
// import { useState } from 'react';

// const Carousel = ({ slides }) => {
//   const [currIndex, setCurrIndex] = useState(0);

//   const handleNext = () => {
//     setCurrIndex((prevIndex) => {
//       prevIndex + 1 === slides.length ? 0 : prevIndex + 1;
//     });
//   };

//   const handlePrevious = () => {
//     setCurrIndex((prevIndex) => {
//       prevIndex - 1 < 0 ? slides.length - 1 : prevIndex - 1;
//     });
//   };

//   const handleDotClick = (index) => {
//     setCurrIndex(index);
//   };

//   return (
//     <div className="carousel">
//       <img src={slides[currIndex]} key={currIndex} />
//       <div className="slide_direction">
//         <div className="left" onClick={handlePrevious}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="20"
//             viewBox="0 96 960 960"
//             width="20"
//           >
//             <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
//           </svg>
//         </div>
//         <div className="right" onClick={handleNext}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             height="20"
//             viewBox="0 96 960 960"
//             width="20"
//           >
//             <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
//           </svg>
//         </div>
//         <div className="indicator">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`dot ${currentIndex === index ? "active" : ""}`}
//             onClick={() => handleDotClick(index)}
//           ></div>
//         ))}
//       </div>
//       </div>
//     </div>
//   );
// };
// export default Carousel;

import { useState } from 'react';

const SlidingImage = ({ images }) => {
  console.log('images : ' + images);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="overflow-hidden relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full transition-transform duration-500 ease-in-out ${
              index === currentIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <img
              src={`http://localhost:4000/file/${image}`}
              alt={`Slide ${index}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
      >
        Prev
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
      >
        Next
      </button>
    </div>
  );
};

export default SlidingImage;
