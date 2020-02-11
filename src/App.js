import React, { Component } from 'react';
import Header from './header/Header'
// import Footer from './footer/Footer'
import Filter from './component/filter/Filter'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: '',
      searchMovieName: '',
      showError: false,
      errorMessage: '',
      defaultGenreName: 'All',
      searchResults: false,
      defaultGenreId: ''
    }
    this.handleMovieName = this.handleMovieName.bind(this);
    this.fetchMoviesInfo = this.fetchMoviesInfo.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }

  handleMovieName(e) {
    this.setState({
      searchMovieName: e.target.value
    })
  }

  keyPressed(e){
    if(e.key === "Enter"){
      this.fetchMoviesInfo();
    }
  }

  getGenres(){

  }

  fetchMoviesInfo(e) {
    //useEffect
    if (this.state.searchMovieName !== '') {
      fetch("http://api.themoviedb.org/3/search/movie?api_key=abd7b50d67c6a1ce3f12a661b015effa&query=" + this.state.searchMovieName
      ).then(response => {
        return Promise.resolve(response);
      }).then(response => response.json()
      ).then(data => {
        if (data !== "") {
          this.setState({
            showError: false,
            moviesData: data.results,
            searchResults: true
          });
        }
      }).catch(err => {
        this.setState({
          showError: true,
          errorMessage: 'Unexpected Error'
        });
      });
    } else {
      this.setState({
        showError: true,
        errorMessage: 'Please enter the movie name'
      });
    }

  }

  render() {
    return (
      <div>
        <Header />
        <section className="search">
          <input id="searchBar" className="searchBar" type="search" placeholder="Enter the movie name..." onKeyPress={(e) =>this.keyPressed(e)} onChange={this.handleMovieName} />
          <button id="searchButton" className="seachButton" onClick={this.fetchMoviesInfo}>Search</button>
          {this.state.showError ? <p className="errorMessage">{this.state.errorMessage}</p> : null}
        </section>
        {this.state.searchResults ? this.state.moviesData.length > 0 ? <h3 className="searchResultsHeading">Search Results</h3> : <h3 className="searchResultsHeading">No Results Found</h3> : null}
        <Filter searchFlag={this.state.searchResults} moviesData={this.state.moviesData} genId={this.state.defaultGenreId} genName={this.state.defaultGenreName} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
