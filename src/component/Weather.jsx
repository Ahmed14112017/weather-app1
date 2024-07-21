import React, { useEffect, useRef, useState } from 'react'
import "../component/weather.css"
import { CiSearch } from "react-icons/ci";
import clearicon from "../assets/clear.png"
import cloudicon from "../assets/cloud.png"
import drizzleicon from "../assets/drizzle.png"
import humidityicon from "../assets/humidity.png"
import rainicon from "../assets/rain.png"
import snowicon from "../assets/snow.png"
import windicon from "../assets/wind.png"
const Weather = () => {
  const [weatherData,SetweatherData]=useState(false)

  const search=async(city)=>{
    if(city===""){
      alert("Enter City Name")
      return ;
    }
    try{
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`)
      const data=await response.json()
      if(!response.ok){
        alert(data.message)
        return;
      }
      console.log(data)
      const icon=allIcons[data.weather[0].icon]
  
      SetweatherData({
        temerature:Math.floor(data.main.temp),
        humidity:data.main.humidity,
        windspeed:data.wind.speed,
        location:data.name,
        icon:icon,
  
      })
    }
    catch(error){
      SetweatherData(false)
      console.log("error in fetching data")
    }
    
   
  } 
  useEffect(()=>{
    search("New York")
  },[])
  const inputref=useRef()
  console.log(inputref)
  console.log(inputref)
  const allIcons={
    "01d":clearicon,
    "01n":clearicon,
    "02d":cloudicon,
    "02n":cloudicon,
    "03d":cloudicon,
    "03n":cloudicon,
    "04d":drizzleicon,
    "04n":drizzleicon,
    "09d":rainicon,
    "09n":rainicon,
    "10d":rainicon,
    "10n":rainicon,
    "11d":snowicon,
    "11n":rainicon,
    "13d":rainicon,
    "13n":cloudicon,
    "50d":cloudicon,
    "50n":drizzleicon,
  }
  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputref} type='search' placeholder='search' />
        <CiSearch className='icon' onClick={()=>search(inputref.current.value)}/>
      </div>
      {weatherData?(
        <>
<img src={weatherData.icon} alt='clear' className='weather-icon' />
      <p className='temprature'>{weatherData.temerature}</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidityicon} alt='humidity' className='image-icon'/>
            <p className='data'>{weatherData.humidity}</p>
            <span>humidity</span>
        </div>
        <div className="col">
            <img src={windicon} alt='windicon'/>
            <p className='data'>{weatherData.windspeed}</p>
            <span>wind speed</span>
        </div>
      </div>
     
        </>
      ):(
        <>
        
        </>
      )}
      
        
     
    </div>
  )
}

export default Weather
