import React, { useState, useEffect } from 'react'
import DisplayGrid from '../displayGrid/DisplayGrid'
import './Filter.css'
import '../../footer/Footer.css'


const filterUsingFunction = props => {
    let displayMovies = '';

    const [movieGenre, setMovieGenre] = useState({
        genreName: props.genName,
        genreId: props.genId
    });

    const [searchButton, setSearchbutton] = useState({
        search: true
    })

    const [movieList, setMoviesList] = useState({
        myMovies: ''
    })

    useEffect(() => {
        let filteredResult = [];
        if (props.moviesData.length > 0) {
            if (props.genName !== "All") {
                props.moviesData.map(movieData => {
                    let idgen = movieGenre.genreId;
                    let flag = false;
                    movieData.genre_ids.map(genre_id => {
                        if (genre_id === idgen) {
                            flag = true;
                        }
                        return genre_id;
                    });
                    if (flag) {
                        filteredResult.push(movieData)
                    }
                    return filteredResult;
                }
                )
            } else {
                console.log("NO DATA FOUND");
            }
        }
        displayMovies = (
            filteredResult.length > 0 ?
                <section className="moviesList">
                    {
                        filteredResult.map((movieData, index) => {
                            return (<DisplayGrid key={index}
                                data={movieData} theme={props.darkThemeClass}/>)
                        })
                    }
                </section>
                : null
        )
        setMoviesList({
            myMovies: displayMovies
        })
    }, [movieGenre.genreName]);

    const switchGenreHandler = (value) => {
        if (value !== "All") {
            props.genreObject.map(genre => {
                if (genre["name"] === value) {
                    setMovieGenre({
                        genreName: genre["name"],
                        genreId: genre["id"]
                    })
                }
                return genre["name"];
            });
        } else {
            setMovieGenre({
                genreName: "All",
                genreId: ''
            })
        }
    }

    if (props.searchFlag && searchButton.search) {
        displayMovies = (
            props.moviesData.length > 0 ?
                <section className="moviesList">
                    {
                        props.moviesData.map((movieData, index) => {
                            return (<DisplayGrid key={index}
                                data={movieData} theme={props.darkThemeClass}/>)
                        })
                    }
                </section>
                : null
        )
        setMoviesList({
            myMovies: displayMovies
        })
        setSearchbutton({
            search:false
        })
    }
    return (
        <div>
            <section className="filter">
                <select tabIndex={0} title="Genre List Dropdown" className="dropdown" onChange={(e) => switchGenreHandler(e.target.value)}>
                    <option value="All" defaultValue="All">All</option>
                    {
                        props.genreObject.map((genreObjectEach) => {
                            return (<option key={genreObjectEach["id"]}
                                value={genreObjectEach["name"]}>
                                {genreObjectEach["name"]}
                            </option>);
                        })
                    }
                </select>
            </section>
            {movieList.myMovies}
        </div>
    );
}

export default filterUsingFunction;
