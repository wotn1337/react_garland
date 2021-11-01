import React, {useState} from 'react';
import s from './GarlandBall.module.css';
import {colors} from "../common/colors";

const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
}

const GarlandBall = ({shine, size, duration}) => {
	const [color] = useState(getRandomColor());
	return (
		<div className={s.garlandBall}>
			<div className={s.hook} />
			<div
				className={s.ball}
				style={{
					backgroundColor: color,
					boxShadow: shine && `0 0 20px 5px ${color}`,
					width: `${size}px` || '20px',
					height: `${size}px` || '20px',
					transition: `box-shadow ${duration / 1000}s`
				}}
			/>
		</div>
	);
};

export default GarlandBall;