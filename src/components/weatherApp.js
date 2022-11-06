import { useEffect, useState } from 'react';
import WeatherForm from './weatherForm';
import WeatherMainInfo from './weatherMainInfo';
import styles from './weatherApp.module.css';

export default function WeatherApp() {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		loadInfo();
	}, []);

	useEffect(() => {
		document.title = `Clima | ${weather?.location.name ?? ''}`;
	}, [weather]);

	async function loadInfo(city = 'Cordoba, Argentina') {
		try {
			const request = await fetch(
				`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
			);
			const json = await request.json();
			setWeather(json);
			console.log(json);
		} catch (error) {}
	}

	function handleChangeCity(city) {
		setWeather(null);
		loadInfo(city);
	}

	return (
		<div className={styles.weatherConteiner}>
			<WeatherForm onChangeCity={handleChangeCity} />
			<WeatherMainInfo weather={weather} />
		</div>
	);
}
