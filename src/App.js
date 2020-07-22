import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap';
import "./App.css";

// const apiKey = process.env.REACT_APP_APIKEY
class App extends Component {
  // *----- same as setState in rfc
  constructor(props) {
    super(props)
    this.state = {
      locationName: null,
      temp: null,
      description: null,
      // isLoading: true
    }
  }
  // * ----- 1.how can I get weather by my current location?
  // * ----- ----- ----- ----- ----- ----- first version of current weather
  // showLocation = async (position) => {
  //   var latitude = position.coords.latitude;
  //   var longitude = position.coords.longitude;
  //   let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
  //   let data = await fetch(url)
  //   let result = await data.json()
  //   console.log("result-current", result)
  //   this.setState({ currentWeather: result })
  //   this.setState({ lat: latitude, lon: longitude })
  //   // alert("Latitude : " + latitude + " Longitude: " + longitude);
  // }
  // errorHandler = (err) => {
  //   if (err.code === 1) {
  //     alert("Error: Access is denied!");
  //   } else if (err.code === 2) {
  //     alert("Error: Position is unavailable!");
  //   }
  // }
  // getLocation = () => {
  //   if (navigator.geolocation) {
  //     // timeout at 60000 milliseconds (60 seconds)
  //     var options = { timeout: 60000 };
  //     navigator.geolocation.getCurrentPosition(this.showLocation, this.errorHandler, options);
  //   } else {
  //     alert("Sorry, browser does not support geolocation!");
  //   }
  // }
  // * ----- ----- ----- ----- ----- ----- end of first version of current weather

  componentDidMount = () => {
    this.getLocation()
  }
  // * ----- 1.how can I get weather by my current location? 
  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.latitude, post.coords.longitude)
    })
  }
  async getWeather(latitude, longitude) {
    const apiKey = "3de6162d3745365b168ade2bbe4e1d66";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    this.setState({
      locationName: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      // isLoading: false
    });
  };

  async cityWeather(name) {
    // console.log("call weather")
    const apiKey = "3de6162d3745365b168ade2bbe4e1d66";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
    let response = await fetch(url);
    let data = await response.json();
    //console.log("result", result)
    this.setState({
      locationName: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
    });
  };
  search(event) {
    event.preventDefault()
    console.log(document.getElementById("input").value);
    let d = document.getElementById("input").value;
    this.cityWeather(d);
  }
  render() {
    if (this.state.locationName === null) {
      return (
        <h1>Loading...</h1>
      )
    }
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <Button variant="secondary" onClick={() => this.cityWeather("Hanoi")}>Hanoi</Button>
            <Button variant="secondary" onClick={() => this.cityWeather("Seoul")}>Seoul</Button>{' '}
            <Button variant="secondary" onClick={() => this.cityWeather("Jeju")}>Jeju Island</Button>{' '}
            <Button variant="secondary" onClick={() => this.cityWeather("Los Angeles")}>Los Angeles</Button>{' '}
            <Button variant="secondary" onClick={() => this.cityWeather("New York")}>New York</Button>{' '}
            <Button variant="secondary" onClick={() => this.cityWeather("London")}>London</Button>{' '}
            <Button variant="secondary" onClick={() => this.cityWeather("Paris")}>Paris</Button>{' '}
            <Button variant="secondary" onClick={() => this.cityWeather("Lisbon")}>Lisbon</Button>{' '}

            <form>
              <label>
                Search for<input type="text" name="name" id="input" placeholder="the city weather" />
              </label>
              <input type="submit" value="Click" onClick={this.search.bind(this)} />
            </form>
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Today's Weather App</h1>
            <h2 className="col-12">{this.state.locationName}</h2>
            <h3 className="col-12 text-danger">{this.state.temp}</h3>
            <h3 className="col-12">{this.state.description}</h3>

            <h5>made with 💖 by Jeesun</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default App;