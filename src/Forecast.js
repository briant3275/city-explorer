import React from 'react';
import './Forecast.js';

class Forecast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayWeatherData: false,
            weatherData: [],
        }
    }
}

export default Forecast;