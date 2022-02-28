import React from "react";
import Card from "react-bootstrap/Card";

class CityInfo extends React.Component {
    render () {
        return (
            <Card className="cityCard">
            <Card.Title>{this.props.currentCity}</Card.Title>
            <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&zoom=13&center=${this.props.currentLat},${this.props.currentLon}`} alt="placehold"
            />
            <Card.Text>Lat: {this.props.currentLat}, Lon: {this.props.currentLon}</Card.Text>
          </Card>
        )
    }
}

export default CityInfo;