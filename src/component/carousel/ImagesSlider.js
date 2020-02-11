import React from 'react';
import './ImagesSlider.css';

const imagesSlider = (props) => {
    return(
        <figure className="imagesSlider">
            <img tabIndex={0} alt={props.title} src= {"http://image.tmdb.org/t/p/w370_and_h556_bestv2/" + props.images} />
        </figure>
    );
}

export default imagesSlider;