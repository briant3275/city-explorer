import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCityData: false,
      cityData: [],
      renderError: false,
      errorMessage: '',
      searchQuery: '',
      cityData: {},
      showMap: false
    }
  }



  handleInput = e => this.setState({ searchQuery: e.target.value, })


  getCityInfo = async (e) => {
    e.preventDefault();
    //try catch
    let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;

    // console.log(url);
    let cityResults = await axios.get(url);

    // console.log(cityResults.data[0]);
    this.setState({
      cityData: cityResults.data[0],
      displayCityData: true
    })
  }


  render() {
    console.log(this.state);

    return (
      <>
        <header>
          <h1>City Explorer</h1>
        </header>

        <main>

          <Container>
            <Form onSubmit={this.getCityInfo}>
              <label>Pick A City!
              <input onInput={this.handleInput} type="text" name="city" />
              </label>
              <Button type="submit">Explore!</Button>
            </Form>
          </Container>


          <Card>
            {
              this.state.displayCityData &&
              <article>
                <Card.Title>{this.state.cityData.display_name}</Card.Title>
                <Card.Img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&zoom=13&center=${this.state.cityData.lat},${this.state.cityData.lon}`} alt="placehold"
                />
                <Card.Text>Lat: {this.state.cityData.lat}, Lon: {this.state.cityData.lon}</Card.Text>
              </article>
            }
          </Card>

        </main>
      </>
    );
  }
}
export default App;