import React, { Component } from 'react'
import DisplayGrid from '../displayGrid/DisplayGrid'
import './Filter.css'

class Filter extends Component {
    constructor(props) {
        super(props);
        //use useState
        this.state = {
            genreName: this.props.genName,
            genreId: this.props.genId,
            genereList:[]
        }
        this.switchGenreHandler = this.switchGenreHandler.bind(this);
    }

    switchGenreHandler(value) {
        let selectedFilter = value;
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=abd7b50d67c6a1ce3f12a661b015effa"
        ).then(response => {
            return Promise.resolve(response);
        }).then(response => response.json()
        ).then(data => {
            if (data !== '' && selectedFilter.toLowerCase() !== "all") {
                data.genres.map(genre => {
                    if (genre["name"].toLowerCase() === selectedFilter.toLowerCase()) {
                        this.setState({
                            genreId: genre["id"],
                            genreName: genre["name"]
                        })
                    }
                    return genre;
                });
            } else {
                this.setState({
                    genreId: '',
                    genreName: 'All'
                });
            }
        })
    }
    render() {
        console.log(this.state.genereList);
        let moviesFilteredList = [];
        if (this.props.searchFlag) {
            if (this.props.moviesData.length > 0) {
                this.props.moviesData.map(movieData => {
                    let idgen = this.state.genreId;
                    let flag = false;
                    movieData.genre_ids.map(genre_id => {
                        if (genre_id === idgen) {
                            flag = true;
                        }
                        return genre_id;
                    });
                    if (flag) {
                        moviesFilteredList.push(movieData);
                    }
                    return moviesFilteredList;
                }
                )
            } else {
                console.log("NO DATA FOUND");
            }
        }

        let displayMovies = '';
        if (this.state.genreName.toLowerCase() !== "all") {
            displayMovies = (
                <section className="moviesList">
                    {moviesFilteredList.map((movieFilteredList, index) => {
                        return (<DisplayGrid key={index}
                            data={movieFilteredList} />)
                    })
                    }
                </section>
            )
        } else {
            displayMovies = (
                this.props.moviesData.length > 0 ?
                    <section className="moviesList">
                        {
                            this.props.moviesData.map((movieData, index) => {
                                return (<DisplayGrid key={index}
                                    data={movieData} />)
                            })
                        }
                    </section>
                    : null
            )
        }
        return (
            <div>
                <section className="filter">
                    <select className="dropdown" onChange={(e) => this.switchGenreHandler(e.target.value)}>
                        <option value="All" defaultValue="All">All</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Science Fiction">Science Fiction</option>
                    </select>
                </section>
                {displayMovies}
            </div>

        );
    }
}

export default Filter;