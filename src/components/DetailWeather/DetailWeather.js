import React from 'react';
import './datailWeather.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class DetailWeather extends React.Component {

  constructor({location}) {
    super(location)
    this.state = {
      datailsZip: location.state, 
    }
  }

  componentDidMount() {
    this.getDatails()
  }

    getDatails(){
    let data = this.state.datailsZip.datailsZip;
    let urlWeather = 'http://api.openweathermap.org/data/2.5/weather?id=';
    let urlApiKey = '&appid=1abc861ccc6073edbdc7c74f3a011560';

    fetch(urlWeather + data + urlApiKey )
    .then(body => body.json())
    .then(response => {
      console.log('yep')
      this.setState({
        city: response.name,
        wind: response.wind.speed,
        temp: (response.main.temp - 273).toFixed(0),
        tempMax: (response.main.temp_max - 273).toFixed(0),
        tempMin: (response.main.temp_min - 273).toFixed(0),
        img: response.weather[0].icon,
      })  
       
    })
    .catch(errors => console.log(errors))
  }

  
  weatherCart(){
    return (
      <div className="weatherCart">
        <h2>{this.state.city}</h2>
        <div><img src={`http://openweathermap.org/img/w/${this.state.img}.png`} alt=""/></div>
        <h3>Temperature {this.state.temp}°</h3>
        <h3>Temperature Max {this.state.tempMax}°</h3>
        <h3>Temperature Min {this.state.tempMin}°</h3>
        <h3>Wind speed {this.state.wind} m/s</h3>
        <Link to ="/" className="link">Back</Link>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
      <h1>Weather in Ukraine</h1>
      <div className="main-weather">
        {this.weatherCart()}
      </div>
    </div>
    );
  }
  
}

export default DetailWeather;
