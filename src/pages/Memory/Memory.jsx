import { useState, useEffect } from 'react'
import '../Memory/Memory.css'
import { memoryImages } from '../../data/dataMemory'
import { shuffle } from 'lodash'





function Memory() {
	// make a pair of img arr and shuffle them
	const [cards, setCards] = useState([]);
	// collect the all picked ids in new arr.
	const [match, setMatch] = useState([]);
	// make sure that array has unique ids
	const [clicker, setClicker] = useState([]);
	// collect the ids of the two first picked cards.
	const [openCard, setopenCard] = useState([]);
	// counter
	const [counter, setCounter] = useState(0);
	// result block, make it visible
	const [finishGame, setfinishGame] = useState(false);
	

	function resetCards() {
		const cards = shuffle([...memoryImages, ...memoryImages]);
		setCards(cards);
	};
	useEffect(() => {
		resetCards()
	}, []);


	const handleFlip = (index) => {
		setopenCard((opened) => [...opened, index])
	}

	// logic
	useEffect(() => {
		// if choosed cards doesn't match than flip cards back with daley
		if (openCard.length === 2) setTimeout(() => setopenCard([]), 600);

		// first and second picked card
		const firstmatch = cards[openCard[0]];
		const secondmatch = cards[openCard[1]];

		// if cards matched then create new arr with matched id
		if (secondmatch && firstmatch.id === secondmatch.id) {
			setMatch([...match, secondmatch.id]);
		}

		// count the clicks
		if (firstmatch && secondmatch) {
			setCounter(counter + 1)
		}
		// eslint-disable-next-line
	}, [openCard]);


	useEffect(() => {
		// show the result block
		if (clicker.size === 8) {
			setfinishGame(true)
		}
		if (match){
			setClicker(new Set(match))
		}
	},[clicker.size, match])


	// RESTART game
	function resetGame() {
		setMatch([])
		setfinishGame(false)
		setClicker(0)
		setTimeout(() => setCards(shuffle([...memoryImages, ...memoryImages])), 500)
		setTimeout(() => setCounter(0), 500)
	}


	return (
		<section>
			<div className="memory-wrapper">
				<h1>Memory game</h1>
				<div className="memory-container">
					<div className="memory-content">
						{cards.map(({ frontImg, id }, index) => {

							let flipCard = false;
							// flip the choosed card with css class
							// comparing our new arr(index) with dataImages(index) if matched, add flip css class
							if (openCard.includes(index) || match.includes(id)) {
								flipCard = true;
							};

							return (
								<div className={`cards ${flipCard === true ? 'flip' : ''}`} key={index} onClick={() => handleFlip(index)} >
									<div className="inner">
										<div className='front ' >
											<img src={frontImg} alt="icon" />
										</div>
										<div className='back' ></div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className={`results ${finishGame === true ? 'active' : ''}`}>
					<div className="result-items">
						<div className="counters-title">
							<h2>Clicks</h2>
						</div>
						<div className="counters-num">
							<h2>{counter}</h2>
						</div>
						<div className="restart" onClick={() => resetGame()}>
							<h1>RESTART</h1>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Memory;
