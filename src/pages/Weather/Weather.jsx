import '../Weather/Weather.css';
import { useState, useEffect, useRef } from 'react';
import moment from 'moment';



export default function Weather() {
	const [lat, setLat] = useState()
	const [long, setLong] = useState()
	// set all of the data from API
	const [data, setData] = useState([])
	// catch name of the city from the input
	const [search, setSearch] = useState()
	// convert 'UA' to the full name 'Ukraine'
	const [region, setRegion] = useState()
	// catch the local name of the region
	const [localState, setlocalState] = useState()
	// errors
	const [error, setError] = useState(null);


	const inputRef = useRef(null);

	// get the name from the input and set the search state
	const handleClick = e => {
		e.preventDefault();
		setSearch(inputRef.current.value);
	};
	// convert 'UA' to the 'Ukraine'
	useEffect(() => {
		if (typeof data.main != 'undefined') {
			const regionNames = new Intl.DisplayNames(
				['en'], { type: 'region' }
			);
			setRegion(regionNames.of(data.sys.country))
		}
	}, [data])


	// Get the main Api from the Location
	useEffect(() => {
		const apiKey = '42c1c3b7fbd9de4c0b55c98335a56e98'
		const fetchData = async () => {
			try {
				const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`);
				if (response.ok) {
					const result = await response.json();
					setData(result);
				} else {
					throw new Error('Network response was not ok.');
				}
			} catch (error) {
				setError(error);
			}
		};
		if (lat) {
			fetchData();
		}

	}, [lat, long]);

	// Set the lat and lon depends on the input value
	useEffect(() => {
		const apiKey = '42c1c3b7fbd9de4c0b55c98335a56e98';
		async function fetchData() {
			try {
				const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${apiKey}`);
				if (!response.ok) {
					throw new Error(`Network response was not ok. Status: ${response.status}`);
				}
				const data = await response.json();
				setLong(data[0].lon);
				setLat(data[0].lat);
				setlocalState(data[0].state);
			} catch (error) {
				console.error(error);
				setError(`An error occurred: ${error.message}`);
			}
		}
		if (search) {
			fetchData();
		}
	}, [search]);

	// Get the coords by browser Geolocation API, if User denied Geolocation show default location "NY"
	useEffect(() => {
		if (!search && !error) {
			 if (navigator.geolocation) {
				  navigator.geolocation.getCurrentPosition(function (position) {
						setLat(position.coords.latitude);
						setLong(position.coords.longitude);
				  }, function (error) {
						setError(error.message)
				  });
			 } else {
				setLat(40.7306);
				setLong(-73.9352);
			 }
		} else {
			setLat(40.7306);
			setLong(-73.9352);
		}
  }, [search, error]);



	return (
		<>
			{(typeof data.main != 'undefined') ? (
				<div className="weather-wrapper">
					<div className="title">
						<h1>Your Weather</h1>
					</div>
					<div className="weather-container">
						<div className="weather-content">
							<div className="content-search">
								<div className="search-items">
									<input type="text"
										ref={inputRef}
										placeholder='search...' />
									<button onClick={handleClick}>OK</button>
								</div>
								<div className="content-data">
									<p><span>{moment().format('dddd')}</span></p>
									<p>{moment().format('LL')}</p>
								</div>
							</div>
							<div className="content-widget">
								<div className="widget-name">
									<h1>{region}</h1>
									<hr />
									<p>{!localState ? data.name : `${data.name} ${localState}`}</p>
								</div>
								<div className="widget-info">
									<div className="info-icon">
										<img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="icon" />
										<hr />
									</div>
									<div className="info-data">
										<p><span>Sunrise: </span>{new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
										<p><span>Sunset: </span>{new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
										<p><span>Wind speed: </span>{data.wind.speed} m/s</p>
										<p><span>Humidity: </span>{data.main.humidity}%</p>
										<p><span>Description: </span>{data.weather[0].description}</p>
									</div>
								</div>
								<div className="widget-temp">
									<h1>
										{Math.round(`${data.main.temp}`)}
										<span> °C</span>
									</h1>
									<h2>
										Feels like: <span>{Math.round(`${data.main.feels_like}`)}</span> °C
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="error-page">
					{error && <div className='err-block'><h1>Error: {error.message}</h1></div>}
				</div>
			)
			}
		</>
	)
}