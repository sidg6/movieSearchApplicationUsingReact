import React, { useState } from 'react';
import ImagesSlider from './ImagesSlider'
import './Carousel.css'


const carousel = (props) => {

  const [translateXCoordinate, setTranslateXCoordinate] = useState({
    index: 0,
  })

  const [previousButtonState, setPreviousButtonState] = useState({
    previousButtonDisabeld: true,
  });

  const [nextButtonState, setNextButtonState] = useState({
    nextButtonDisabled: false,
  })

  const previousSlide = () => {
    let initialIndex = translateXCoordinate.index;
    setTranslateXCoordinate({
      index: initialIndex - 1
    })
    if (translateXCoordinate.index === 1) {
      setPreviousButtonState({
        previousButtonDisabeld: true
      });
    }
    if (translateXCoordinate.index <= (props.trendingMoviesData.length - 4)) {
      setNextButtonState({
        nextButtonDisabled: false
      });
    }

  }

  const nextSlide = () => {
    let initialIndex = translateXCoordinate.index;
    setTranslateXCoordinate({
      index: initialIndex + 1
    });
    if (translateXCoordinate.index === 0) {
      setPreviousButtonState({
        previousButtonDisabeld: false
      });
    }
    if (translateXCoordinate.index === (props.trendingMoviesData.length - 5)) {
      setNextButtonState({
        nextButtonDisabled: true
      });
    }
  }

  const keyPressed = (e,arrowName) => {
    if (e.key === "Enter") {
      if(arrowName==="previous"){
        previousSlide();
      }
      else if(arrowName==="next"){
        nextSlide();
      }
    }
  }

  return (
    <section className="arrow">
      <div>
        {
          previousButtonState.previousButtonDisabeld ? null :
            <div className="sliderArrowLeft">
              <i tabIndex={0} title="Left Arrow" className="fa fa-chevron-circle-left" onClick={previousSlide} onKeyPress={(e) => keyPressed(e,"previous")}></i>
            </div>
        }
        {
          nextButtonState.nextButtonDisabled ? null :
            <div className="sliderArrowRight">
              <i tabIndex={0} title="Right Arrow" className="fa fa-chevron-circle-right" onClick={nextSlide} onKeyPress={(e) => keyPressed(e,"next")}></i>
            </div>
        }
      </div>
        {
          props.trendingMoviesData !== '' ?
          <div className="carousel">
            <section className="carouselImagesWrapper" style={{ 'transform': `translateX(-${translateXCoordinate.index * 25}%)` }}>
              {
                props.trendingMoviesData.map((trendingMovieData, index) => {
                  return <ImagesSlider key={index} images={trendingMovieData.poster_path} title={trendingMovieData.title} />
                })
              }
            </section>
            </div>
            : null
        }
    </section>
  );
}

export default carousel;
