import React from 'react';
import './App.scss';
import PLACES from "./components/services/PLACES"
import DetailWeather from "./components/DetailWeather/DetailWeather"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {

  state = {
    cities: []
  }

  componentDidMount() {
      this.getWeather()

  }

  getWeather() {
    let arrZip = [];
    PLACES.forEach(function(item) {
      if (typeof item === 'object') {
        let keys = Object.keys(item)
        keys.forEach((key) => {
            if(key === "zip"){
              arrZip.push(item[key])
            }
          }); 
      }
    });
    
    let urlWeather = 'http://api.openweathermap.org/data/2.5/weather?id=';
    let urlApiKey = '&appid=1abc861ccc6073edbdc7c74f3a011560';

     for(let getZip of arrZip){
      fetch(urlWeather + getZip + urlApiKey )
      .then(body => body.json())
      .then(response => {
        this.setState({
          cities: [...this.state.cities,{
            city: response.name,
            weather: (response.main.temp - 273).toFixed(0),
            img: response.weather[0].icon,
            zip:getZip,
          }]
        })   
      })
      .catch(errors => console.log(errors))
    }   
  }

  handleClick(it){
    this.detailWeather.getDatails(it)
    // console.log(it)
  }

  weatherCart(){
      if(this.state.cities.length > 0){
        return (
          <>
            {this.state.cities.map((item,index) => {
              return (
                <div className="weatherCart" key={index}>
                  <h2>{item.city}</h2>
                  <div><img src={`http://openweathermap.org/img/w/${item.img}.png`} alt=""/></div>
                  <h3>Temperature {item.weather}°</h3>
                  <Link to={{pathname: '/detailweather', 
                      state:{ datailsZip: item.zip,}
                    }}>Details
                  </Link>
                </div>
                )
              })
            }
          </>
        )
      }
      else {
        return (
          <>
          </>
        )
      }
  
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

export default App;
