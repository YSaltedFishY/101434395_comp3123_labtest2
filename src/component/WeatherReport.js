import React, { Component, useState } from 'react'
import "./Weather.css"
import axios from "axios"

export default class WeatherReport extends Component {


    constructor(props) {
        super(props)
        this.state = {
            today: null,
            day: "",
            city: "Toronto",
            userInput: "",
            errorMSG: "",
            successMSG: ""
        }
    }

    getWeather = async () => {
        const APIkey = "cd60e0a440269d8ede1ab8cafd97a061"
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${APIkey}`
        try {
            // console.log(weatherUrl)
            const response = await axios.get(weatherUrl)
            // console.log(response.data)
            this.setState({ today: response.data })
            // console.log(this.state.today)
            return response.data.icon
        } catch (error) {
            console.log(error)
        }

    }

    getDay = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDate = new Date(); // Get the current date
        this.setState({ day: days[currentDate.getDay()] })
    }

    handleInput = (e) =>{
        this.setState({ userInput: e.target.value})
        console.log(this.state.userInput)
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.checkCityName()
    }

    checkCityName = async () =>{
        const APIkey = "cd60e0a440269d8ede1ab8cafd97a061"
        const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.userInput}&appid=${APIkey}`

        try{
            const response = await axios.get(weatherUrl)
            const data = response.data
            console.log(data)

            if(data.cod === 200){
                // console.log(this.state.userInput)
                this.setState({city: this.state.userInput, today:data})
                // console.log(this.state.city)
                this.setState({errorMSG: ""})
                this.setState({successMSG: `${this.state.userInput} is found! - Weather information updated`})
            }
        }catch(error){
            console.log(error)
            this.setState({errorMSG: "City not found. please enter a valid city name."})
            this.setState({successMSG: ""})
        }

    }



    componentDidMount() {
        this.getWeather()
        this.getDay()
    }

    render() {
        const { today, day, errorMSG,successMSG } = this.state
        // console.log(today)
        // console.log(day)
        // console.log(errorMSG)
        if (!today) {
            return <p>Loading...</p>
        } else {
            return (

                <div>
                    <div className='container'>
                        <h2>WEATHER TODAY</h2>
                        <form onSubmit={this.handleSubmit}>
                            <input type="city" name="city" value={this.state.userInput} placeholder="Toronto" onChange={this.handleInput} required />
                            <button type="submit">Submit</button>
                            
                        </form>
                        {errorMSG && (
                                <p className='error-msg'>{errorMSG}</p>
                            )}
                            {successMSG && (
                                <p className='success-msg'>{successMSG}</p>
                            )}
                        <div className="content">
                            <div className='today'>
                                <p>{day} - {today.name} - {today.sys.country}</p>
                                <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`} alt={`${today.weather[0].main}`} />
                                <p className='bold'>{today.weather[0].description}</p>
                            </div>

                            <div className='details'>
                                <div className='detail-span'>
                                    <span className='detail-left'>FEELS LIKE:</span>
                                    <span className='detail-right'>{(today.main.feels_like - 273.15).toFixed(2)}°C</span>
                                </div>
                                <div className='detail-span'>
                                    <span className='detail-left'>HUMIDITY:</span>
                                    <span className='detail-right'>{today.main.humidity}%</span>
                                </div>
                                <div className='detail-span'>
                                    <span className='detail-left'>WIND:</span>
                                    <span className='detail-right'>{today.wind.speed}km/h</span>
                                </div>
                                <div className='detail-span'>
                                    <span className='detail-left'>AIR PRESSURE</span>
                                    <span className='detail-right'>{today.main.pressure}mb</span>
                                </div>
                                <div className='detail-span'>
                                    <span className='detail-left'>TEMPERATURE:</span>
                                    <span className='detail-right'>{(today.main.temp - 273.15).toFixed(2)}°C</span>
                                </div>
                                <div className='detail-span'>
                                    <span className='detail-left'>MAX TEMP:</span>
                                    <span className='detail-right'>{(today.main.temp_max - 273.15).toFixed(2)}°C</span>
                                </div>
                                <div className='detail-span'>
                                    <span className='detail-left'>MIN TEMP:</span>
                                    <span className='detail-right'>{(today.main.temp_min - 273.15).toFixed(2)}°C</span>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>
            )
        }
    }
}

