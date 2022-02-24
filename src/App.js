import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Card, Alert, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import './App.css';
// import Forecast from './Forecast';

const SERVER = process.env.REACT_APP_SERVER

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCityData: false,
      cityData: [],
      renderError: false,
      errorMessage: '',
      searchQuery: '',
      showMap: false,
      weatherData: []
    }
  }



  handleInput = e => this.setState({ searchQuery: e.target.value, })


  getCityInfo = async (e) => {
    e.preventDefault();

    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;


    let cityResults = {};
    try {
      cityResults = await axios.get(url);
      this.setState({ currentLat: cityResults.data[0].lat });
      this.setState({ currentLon: cityResults.data[0].lon });
      this.setState({ currentCity: cityResults.data[0].display_name });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An error has occurred: ${error.response.status}, ${error.response.data.error}`
      })
    }

    console.log(cityResults.data[0]);
    this.setState({
      cityData: cityResults.data[0],
      displayCityData: true
    })
    this.getWeather()
  }

  getWeather = async () => {
    try {
      let results = await axios.get(`${SERVER}/weather?cityName=${this.state.searchQuery}`)
      console.log('weather data', results.data);
      this.setState({
        weatherData: results.data,
        renderWeather: true,
      })
    } catch (error) {
      this.setState({
        weatherError: true,
        weatherErrorMessage: `An Error Occured With Weather Data: ${error.response.status}, ${error.response.data}`
      })

    }
  }


  render() {
    // console.log(this.state);

    let dailyForecasts = this.state.weatherData.map((forecast, index) => (
      <ListGroup.Item key={index}>{forecast.date}: {forecast.description}</ListGroup.Item>
    ))

    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>

        <main>

          <Container>
            <Form onSubmit={this.getCityInfo}>
              <Form.Label>Pick A City!
                <Form.Control onInput={this.handleInput} type="text" name="city" />
              </Form.Label>
              <Button type="submit">Explore!</Button>
            </Form>
          </Container>

          {this.state.displayCityData &&
            <Card className="cityCard">
              <Card.Title>{this.state.cityData.display_name}</Card.Title>
              <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&zoom=13&center=${this.state.cityData.lat},${this.state.cityData.lon}`} alt="placehold"
              />
              <Card.Text>Lat: {this.state.cityData.lat}, Lon: {this.state.cityData.lon}</Card.Text>
            </Card>
          }

          {
            this.state.renderWeather &&
            <ListGroup className="m-md-auto w-50">
              {dailyForecasts}
            </ListGroup>
          }

          {/* {
            this.state.error ?
              <div className='cardHolder'>
                <Alert>
                  {this.state.error}
                  {this.state.errorMessage}
                </Alert>
              </div> :
              this.state.currentCity !== '' ?
                <div className='cardHolder'>
                  title={this.state.currentCity} lat={this.state.currentLat} lon={this.state.currentLon}
                </div>
                :
                <></>
          } */}

        </main>
      </>
    );
  }
}
export default App;