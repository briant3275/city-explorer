import React from 'react';
import { ListGroup, Container } from "react-bootstrap";
import ForecastDay from './ForecastDay.js';


class WeatherForecast extends React.Component {
    render() {
        let weatherData = this.props.weatherData;
        let dailyForecasts = weatherData.map((forecast, idx) => (
            <ForecastDay key={idx} forecast={forecast} />
        ));
        return (
            <Container>
                <ListGroup className="m-md-auto w-50">
                    {dailyForecasts}
                </ListGroup>
                <h3>{this.props.weatherErrorAlert}</h3>
            </Container>
        )
    }
}
export default WeatherForecast;
