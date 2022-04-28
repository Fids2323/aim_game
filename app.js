const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
let score = 0
const timeEL = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#e8fc08', '#fc2d3b', '#g24f0ff', '#41ff24', '#edff24', '#fb24ff', '#f7890a', '#650af7']


startBtn.addEventListener('click', (event) => {
	event.preventDefault()
	screens[0].classList.add('up')
})

//delegation
timeList.addEventListener('click', event => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'))//number
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++
		event.target.remove()
		createRandomCircle()
	}
})


function startGame() {
	setInterval(decreaseTime, 1000)
	createRandomCircle()
	setTime(time)
}

function decreaseTime() {
	if (time === 0) {
		finishGame()
	} else {
		let current = --time
		if (current < 10) {
			current = `0${current}`
		}
		setTime(current)
	}

}

function setTime(value) {
	timeEL.innerHTML = `00:${value}`
}

function finishGame() {
	timeEL.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Счет:<span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10, 60)
	const { width, height } = board.getBoundingClientRect()//destructuring
	const x = getRandomNumber(0, width - size)
	const y = getRandomNumber(0, height - size)
	circle.classList.add('circle')
	const colors = getRandomColor()
	circle.style.background = colors//add
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	board.append(circle)
}


function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
	//const index = Math.floor(Math.random() * colors.length)
	//return colors[index]
	return colors[Math.floor(Math.random() * colors.length)]
}

function winTheGame() {
	function kill() {
		const circle = document.querySelector('.circle')
		if (circle) {
			circle.click()
		}
	}
	setInterval(kill, 75)
}
