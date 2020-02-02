import React from 'react'
import './DisplayGrid.css'

const displayGrid = (props) => {
    let displayImage = (
        <div className="card">
            <figure className="images">
                <img alt={props.data.title} src={"http://image.tmdb.org/t/p/w370_and_h556_bestv2" + props.data.poster_path} />
            </figure>
            <p className="movieTitle">{props.data.title}</p>
        </div>
    );
    return (
       props.data.poster_path !== null ?displayImage:null
    );
}

export default displayGrid;