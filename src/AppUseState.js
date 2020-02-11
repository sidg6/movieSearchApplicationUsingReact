import React, { useState, useEffect } from 'react';
import Header from './header/Header'
import Footer from './footer/Footer'
import FilterUsingFunction from './component/filter/FilterUsingFunction'
import './App.css';
import Carousel from './component/ carousel/Carousel';

function AppUseState() {

  const [moviesDataState, setMoviesDataState] = useState({
    moviesData: '',
    searchMovieName: '',
    showError: false,
    errorMessage: '',
    defaultGenreName: 'All',
    searchResults: false,
    defaultGenreId: '',
  });

  const [moviesDataGenreObject, setMoviesDataGenreObject] = useState({
    genreObject: []
  });

  const [themeClass, setThemeClass] = useState({
    theme: '',
    darkTheme: false
  })

  const [trendingMovieData, setTrendingMovieData] = useState({
    trendingMoviesObject:''
  })

  useEffect(() => {
    async function fetchTrendingMovies(){
      try{
        const response = await fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=abd7b50d67c6a1ce3f12a661b015effa");
        const jsonResponse = await response.json();
        if(response.ok){
          setTrendingMovieData({
            trendingMoviesObject:jsonResponse.results
          })
        }else{
          console.log("NO RESPONSE FOUND");
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchTrendingMovies();
  },[]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=abd7b50d67c6a1ce3f12a661b015effa"
    ).then(response => {
      return Promise.resolve(response);
    }).then(response => response.json()
    ).then(data => {
      setMoviesDataGenreObject({
        genreObject: data.genres
      })
    })
  }, []);

  const handleMovieName = (e) => {
    setMoviesDataState({
      searchMovieName: e.target.value
    })
  }

  const keyPressed = (e) => {
    if (e.key === "Enter") {
      fetchMoviesInfo();
    }
  }

  const fetchMoviesInfo = async(e) => {
    try {
      if (moviesDataState.searchMovieName !== '') {
      const response = await fetch("http://api.themoviedb.org/3/search/movie?api_key=abd7b50d67c6a1ce3f12a661b015effa&query=" + moviesDataState.searchMovieName);
      const json = await response.json();
      if(response.ok){
        setMoviesDataState({
          showError: false,
          moviesData: json.results,
          searchResults: true
        });
      }else{
        console.log("NO RESPONSE FOUND");
      }
    }else {
      setMoviesDataState({
        showError: true,
        errorMessage: 'Please enter the movie name'
      });
    }
    }catch(err){
      console.log(err);
    }
  }

  //   if (moviesDataState.searchMovieName !== '') {
  //     fetch("http://api.themoviedb.org/3/search/movie?api_key=abd7b50d67c6a1ce3f12a661b015effa&query=" + moviesDataState.searchMovieName
  //     ).then(response => {
  //       return Promise.resolve(response);
  //     }).then(response => response.json()
  //     ).then(data => {
  //       if (data !== "") {
  //         setMoviesDataState({
  //           showError: false,
  //           moviesData: data.results,
  //           searchResults: true
  //         });
  //       }
  //     }).catch(err => {
  //       setMoviesDataState({
  //         showError: true,
  //         errorMessage: 'Unexpected Error'
  //       });
  //     });
  //   } else {
  //     setMoviesDataState({
  //       showError: true,
  //       errorMessage: 'Please enter the movie name'
  //     });
  //   }
  // }

  const changeThemehandler = () => {
    let darkThemeActive = themeClass.darkTheme;
    if(!darkThemeActive){
      document.body.classList.add("dark");
      setThemeClass({
        theme:'dark',
        darkTheme: !darkThemeActive
      })
    }else{
      document.body.classList.remove("dark");
      setThemeClass({
        theme:'',
      })
    }
  }

  return (
    <div>
      <Header/>
      <section className={"search " + themeClass.theme}>
        <input id="searchBar" className={"searchBar " + themeClass.theme} type="search" placeholder="Enter the movie name..." onKeyPress={(e) => keyPressed(e)} onChange={handleMovieName} />
        <button id="searchButton" className={"seachButton " + themeClass.theme} onClick={fetchMoviesInfo}>Search</button>
        {moviesDataState.showError ? <p className={"errorMessage " + themeClass.theme}>{moviesDataState.errorMessage}</p> : null}
      </section>
      <Carousel trendingMoviesData = {trendingMovieData.trendingMoviesObject}/>
      {
        moviesDataState.searchResults ?
          moviesDataState.moviesData.length > 0 ?
            <h3 tabIndex={0} className={"searchResultsHeading " + themeClass.theme}>Search Results</h3> :
            <h3 tabIndex={0} className={"searchResultsHeading " + themeClass.theme}>No Results Found</h3> :
          null
      }
      <FilterUsingFunction genreObject={moviesDataGenreObject.genreObject}
        searchFlag={moviesDataState.searchResults}
        moviesData={moviesDataState.moviesData}
        genId={moviesDataState.defaultGenreId}
        genName={moviesDataState.defaultGenreName}
        darkThemeClass={themeClass.theme} />
      <Footer click={changeThemehandler} darkThemeClass={themeClass.theme} />
    </div>
  );
}

export default AppUseState;
