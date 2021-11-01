import React, {useEffect, useState} from 'react';
import GarlandBall from "./GarlandBall/GarlandBall";
import s from './Garland.module.css';
import {shiningTypes} from "./common/shiningTypes";


const shineRule = (shiningType, ballNumber, shiningNumber, oddShine, shiningNumbers, shine) => {
	switch (shiningType) {
		case shiningTypes.inTurn:
			return ballNumber === shiningNumber;

		case shiningTypes.oddEven:
			return (oddShine && ballNumber % 2 !== 0) || (!oddShine && ballNumber % 2 === 0);

		case shiningTypes.random:
			return shiningNumbers.indexOf(ballNumber) !== -1;

		case shiningTypes.inTurnAndRandom:
			return shiningNumbers.indexOf(ballNumber) !== -1;

		case shiningTypes.rightLeft:
			return ballNumber === shiningNumber;

		case shiningTypes.rightLeftFill:
			return shiningNumbers.indexOf(ballNumber) !== -1;

		case shiningTypes.all:
			return shine;

		case shiningTypes.slow:
			return shine;

		default:
			return false;
	}
}

const getRandomNumbers = (length) => {
	const result = [];
	const randLength = Math.round(Math.random() * length);

	for (let i = 0; i < randLength; i++) {
		const rand = Math.random();
		const number = rand * length;
		result.push(Math.floor(number));
	}

	return result;
}

const Garland = ({length, timeout, shiningType, ballSize}) => {
	const garlandLength = length || 30;
	const [oddShine, setOddShine] = useState(true);
	const [shine, setShine] = useState(true);
	const [shineNumbers, setShineNumbers] = useState([]);
	const [shineNumber, setShineNumber] = useState(0);
	const [rand, setRand] = useState(false);
	const [right, setRight] = useState(true);

	useEffect(
		() => {
			switch (shiningType) {
				case shiningTypes.inTurn:
					setTimeout(() => {
						if (shineNumber !== garlandLength) {
							setShineNumber(shineNumber + 1);
						} else {
							setShineNumber(0);
						}
					}, timeout);
					break;

				case shiningTypes.oddEven:
					setTimeout(() => {
						setOddShine(!oddShine);
					}, timeout);
					break;

				case shiningTypes.random:
					setTimeout(() => {
						setShineNumbers(getRandomNumbers(garlandLength));
					}, timeout);
					break;

				case shiningTypes.inTurnAndRandom:
					setTimeout(() => {
						if (shineNumbers.length < garlandLength && !rand) {
							if (shineNumbers.length === garlandLength - 1) {
								setRand(true);
							}
							setShineNumber(shineNumber + 1);
							setShineNumbers([...shineNumbers, shineNumber]);
						} else {
							setShineNumbers(getRandomNumbers(garlandLength));
						}
					}, timeout);
					break;

				case shiningTypes.rightLeft:
					setTimeout(() => {
						if (right) {
							setShineNumber(shineNumber + 1);
							if (shineNumber === garlandLength - 1) {
								setRight(false);
							}
						} else {
							setShineNumber(shineNumber - 1);
							if (shineNumber === 0) {
								setRight(true);
							}
						}
					}, timeout);
					break;

				// case shiningTypes.rightLeftFill:
				// 	setTimeout(() => {
				// 		if (right) {
				// 			setShineNumber(shineNumber + 1);
				// 			setShineNumbers([...shineNumbers, shineNumber]);
				// 			if (shineNumbers.length === garlandLength) {
				// 				setRight(false);
				// 				setShineNumbers([]);
				// 				setShineNumber(0);
				// 			}
				// 		} else {
				// 			setShineNumber(shineNumber + 1);
				// 			setShineNumbers([...shineNumbers, shineNumbers.length - 1 - shineNumber]);
				// 			if (shineNumbers.length === garlandLength) {
				// 				setRight(true);
				// 				setShineNumbers([]);
				// 				setShineNumber(0);
				// 			}
				// 		}
				// 	}, timeout);
				// 	break;

				case shiningTypes.all:
					setTimeout(() => {
						setShine(!shine);
					}, timeout);
					break;

				case shiningTypes.slow:
					setTimeout(() => {
						setShine(!shine);
					}, timeout);
					break

				default:
					break;
			}
		}, [oddShine, timeout, shineNumbers, shineNumber, shine]
	)

	const garland = [];
	for (let i = 0; i < garlandLength; i++) {
		garland.push(
			<>
				<GarlandBall
					key={i}
					shine={shineRule(shiningType, i, shineNumber, oddShine, shineNumbers, shine)}
					size={ballSize}
					duration={timeout}
				/>
				{/*<img src={line} alt="line" height={ballSize / 2}/>*/}
			</>
		)
	}
	return (
		<div className={s.garland} style={{backgroundSize: ballSize * 3}}>
			{garland}
		</div>
	);
}

export default Garland;