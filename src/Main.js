import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import './Main.css';
import ExploreForm from './ExploreForm';
import CityInfo from './CityInfo';
import WeatherForecast from './WeatherForecast';
import MovieListings from './MovieListings';
// import Forecast from './Forecast';

// const SERVER = process.env.REACT_APP_SERVER

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      displayCityData: false,
      cityData: {},
      currentLat: 0,
      currentLon: 0,
      currentCity: "",
      renderError: false,
      errorMessage: '',
      searchQuery: '',
      showMap: false,
      weatherData: [],
      renderWeather: false,
      weatherError: false,
      weatherErrorAlert: "",
      movieData: [],
      renderMovie: false,
      movieError: false,
      movieErrorAlert: "",
    }
  }

  
  
  handleInput = e => {
    e.preventDefault();
    this.setState({searchQuery: e.target.value, });
    this.setState({city: e.target.value, });
  };
  
  
  
  getCityInfo = async (e) => {
    // console.log(this.state.searchQuery);
    e.preventDefault();
    
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;
    
    
    // let cityResults = {};
    try {
      let cityResults = await axios.get(url);
      this.setState({ currentLat: cityResults.data[0].lat });
      this.setState({ currentLon: cityResults.data[0].lon });
      this.setState({ currentCity: cityResults.data[0].display_name });
      this.setState({ cityData: cityResults.data[0]});
      this.setState({ displayCityData: true});
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error has occurred: ${error.response.status}, ${error.response.data.error}`
      })
    }
    // console.log(cityData);
    
    console.log(this.state.cityData);
    this.getWeather();
    this.getMovies();
  }

  getWeather = async () => {
    try {
      let weatherResults = await axios.get(`${process.env.REACT_APP_SERVER}/weather?&lat=${this.state.currentLat}&lon=${this.state.currentLon}`)
      console.log('weather data', weatherResults.data);
      this.setState({
        weatherData: weatherResults.data,
        renderWeather: true,
      })
    } catch (error) {
      this.setState({
        weatherError: true,
        weatherErrorMessage: `An Error Occured With Weather Data: ${error.response.status}, ${error.response.data.error} `
      });
    }
  }

  getMovies = async () => {
    try {
      // console.log("!!!!!!!", this.state.city);
      let movieResults = await axios.get(
        `${process.env.REACT_APP_SERVER}/movies?cityName=${this.state.city}`
        );
      console.log('movie data', movieResults.data);
      this.setState({
        movieData: movieResults.data,
        renderMovies: true,
      })
    } catch (error) {
      this.setState({
        movieError: true,
        movieErrorMessage: `An Error Occured With Movie Data: ${error.response.status}, ${error.response.data.error}`
      });
    }
  }


  render() {
    // console.log(this.state);

    // let dailyForecasts = this.state.weatherData.map((forecast, index) => (
    //   <ListGroup.Item key={index}>{forecast.date}: {forecast.description}</ListGroup.Item>
    // ))

    // let movieList = this.state.movieData.map((movie, index) => (
    //   <ListGroup.Item key={index}>{movie.title}: {movie.overview}, release date: {movie.release}, ratings: {movie.rating}, total votes: {movie.votes}</ListGroup.Item>
    // ))

    return (
      <Container>
        <main>
          <ExploreForm getCityInfo={this.getCityInfo} handleInput={this.handleInput}/>

          {this.state.displayCityData &&
            <CityInfo currentCity={this.state.currentCity} currentLat={this.state.currentLat} currentLon={this.state.currentLon} error={this.state.error} errorMessage={this.state.errorMessage} cityData={this.state.cityData}/>
          }

          {
            this.state.renderWeather &&
            <WeatherForecast weatherData={this.state.weatherData} weatherErrorAlert={this.state.weatherErrorAlert}/>
            // <ListGroup className="m-md-auto w-50">
            //   {dailyForecasts}
            // </ListGroup>
          }

          {
            this.state.renderMovies &&
            <MovieListings movieData={this.state.movieData} movieErrorAlert={this.state.movieErrorAlert}/>
            // <ListGroup className="m-md-auto w-50">
            //   {movieList}
            // </ListGroup>
          }
        </main>
      </Container>
    );
  }
}
export default Main;