

/*BOARD CLASS*/
class Board {
	constructor(width,height,numBombs) {
		this.width = width
		this.height = height
		this.numBombs=numBombs
		this.squares = []
		this.bombCounter=numBombs
	}

	addBombCounter() {
		this.bombCounter++
	}

	subBombCounter() {
		this.bombCounter--
	}

	getBombCounter() {
		return this.bombCounter
	}

	getWidth() {
		return this.width
	}

	getHeight() {
		return this.height
	}

	setAllClicked() {
		this.squares.forEach((el) => {
			el.forEach((e) => {
				e.setClicked()
			})
		})
	}

	makeBoard() {
		this.createSquares()
		this.makeColumnsRows()
		this.initializeCounter()
		this.randomGenerator()
		this.countBombsAroundSquares()
	}

	initializeCounter() {
		document.querySelector('.counter').innerHTML = this.numBombs
	}


	getSquare(id) {
		let arr = id.split('_')
		return this.squares[arr[0]][arr[1]]
	}

	getSquares() {
		return this.squares
	}

	//generate random number with width and 
	randomGenerator() {
		for(let i=0;i<this.numBombs;i++) {
			let x = Math.floor(Math.random() * this.width)+1
			let y = Math.floor(Math.random() * this.height)+1
			if(!this.squares[x][y].isBomb()) {
				this.squares[x][y].setBomb()
			} else {
				i--
			}
		}
	}

	countBombsAroundSquares() {
		for(let i=1;i<=this.width;i++) {
			for(let j=1;j<=this.height;j++) {
				if(!this.squares[i][j].isBomb()) {
					for(let l=i-1;l<=i+1;l++) {
						for(let s=j-1;s<=j+1;s++) {
							if(this.squares[l][s].isBomb()) {
								this.squares[i][j].incrementBombsAround()
							}
						}
					} 
				}
			}
		}
	}

	makeColumnsRows() {
		document.querySelector('.grid-container').setAttribute('style',`grid-template-columns: repeat(${this.height},20px);
			grid-template-rows: repeat(${this.width},20px);`)
	}

	createSquares() {
		//console.log('herro')
		for(let i=0;i<=this.width+1;i++) {
			this.squares.push([])
			for(let j=0;j<=this.height+1;j++) {
				let square = new Square(i,j)
				this.squares[i].push(square)
				if(!((i===0 || j===0) || (i===this.width+1 || j===this.height+1))) {
					square.addSquareIntoHTML()
				}
			}
		}
	}
}

/*SQUARE CLASS*/
class Square {
	constructor(x,y) {
		this.x=x
		this.y=y
		this.numBombsAround=0
		this.bomb=false
		this.flag=false
		this.clicked=false
	}

	addSquareIntoHTML() {
		let square = document.createElement('div')
		square.className = 'square'
		square.id = `${this.x}_${this.y}`
		square.innerHTML = "&nbsp;"
		square.setAttribute('style',`grid-row: ${this.x}; grid-column: ${this.y}`)
		document.querySelector('.grid-container').appendChild(square)
	}

	getX() {
		return this.x
	}

	getY() {
		return this.y
	}

	isBomb() {
		return this.bomb
	}

	setBomb() {
		this.bomb=true
	}

	isFlagged() {
		return this.flag
	}

	setFlag(set) {
		this.flag=set
	}

	incrementBombsAround() {
		this.numBombsAround++
	}

	getBombsAround() {
		return this.numBombsAround
	}

	isClicked() {
		return this.clicked
	}

	setClicked() {
		this.clicked=true
	}
}

let beginnerBoard = new Board(9,9,10)
let intermediateBoard = new Board(16,16,40)
let board = new Board(16,30,99)
board.makeBoard()

// let board


function revealNumber(square) {
	let val = board.getSquare(square.id).getBombsAround()
	if(val === 1) {
		square.setAttribute('style','background: white; color: blue')
		square.innerHTML = 1
		board.getSquare(square.id).setClicked()
	} else if(val === 2) {
		square.setAttribute('style','background: white; color: green')
		square.innerHTML = 2
		board.getSquare(square.id).setClicked()
	} else if(val === 3) {
		square.setAttribute('style','background: white; color: red')
		square.innerHTML = 3
		board.getSquare(square.id).setClicked()
	} else if(val === 4) {
		square.setAttribute('style','background: white; color: purple')
		square.innerHTML = 4
		board.getSquare(square.id).setClicked()
	} else if(val === 5) {
		square.setAttribute('style','background: white; color: maroon')
		square.innerHTML = 5
		board.getSquare(square.id).setClicked()
	} else if(val === 6) {
		square.setAttribute('style','background: white; color: turquoise')
		square.innerHTML = 6
		board.getSquare(square.id).setClicked()
	} else if(val === 7) {
		square.setAttribute('style','background: white; color: black')
		square.innerHTML = 7
		board.getSquare(square.id).setClicked()
	} else if(val === 8) {
		square.setAttribute('style','background: white; color: gray')
		square.innerHTML = 8
		board.getSquare(square.id).setClicked()
	} else if(val === 0) {
		square.setAttribute('style','background: white;')
		//revealZeros(square)
		let squ = board.getSquare(square.id)
		squ.setClicked()
		for(let i=squ.getX()-1;i<=squ.getX()+1;i++) {
			for(let j=squ.getY()-1;j<=squ.getY()+1;j++) {
				if(!(i===0 || j===0 || i===board.getWidth()+1 || j===board.getHeight()+1) && !(board.getSquare(`${i}_${j}`).isClicked()) && !board.getSquare(`${i}_${j}`).isFlagged()) {
					let sq = document.getElementById(`${i}_${j}`)
					if(board.getSquare(`${i}_${j}`).getBombsAround() === 0) {
						revealNumber(sq)
					} else {
						revealNumber(sq)
					}
				}
			}
		}
	}
}

function showBombs(t) {
	board.setAllClicked()
	board.getSquares().forEach((el) => {
		el.forEach((e) => {
			if(e.isBomb() && !e.isFlagged() && t.id !== `${e.getX()}_${e.getY()}`) {
				let bomb = document.getElementById(`${e.getX()}_${e.getY()}`)
				let bombImg = document.createElement('img')
				bombImg.src = './images/bomb.png'
				bombImg.className = 'bomb'
				let parent = bomb.parentNode
				parent.replaceChild(bombImg,bomb)
			} else if(e.isFlagged() && !e.isBomb()) {
				let square = document.getElementById(`${e.getX()}_${e.getY()}`)
				let flag = square.querySelector('.flag')
				square.removeChild(flag)
				let bomb = document.createElement('img')
				let x = document.createElement('img')
				bomb.src = './images/bomb.png'
				bomb.className = 'bomb flagged'
				x.src = './images/x.png'
				x.className = 'x'
				square.appendChild(bomb)
				square.appendChild(x)
			}
		})
	})
}
function squarePressed() {
	if(!board.getSquare(this.id).isFlagged()) {
		//board.getSquare(this.id).setClicked()
		if(!board.getSquare(this.id).isBomb() && !board.getSquare(this.id).isClicked()) {
			revealNumber(this)
			//board.getSquare(this.id).setLeftClicked()
		} else if(!board.getSquare(this.id).isClicked()){
			this.setAttribute('style','background: red')
			let bomb = document.createElement('img')
			bomb.src = './images/bomb.png'
			bomb.className = 'bomb red'
			bomb.innerHTML = ''
			this.appendChild(bomb)
			showBombs(this)
			//make smiley face dead face
		}
	}
}

function rightClicked(e) {
	e.preventDefault()
	//console.log(board.getSquare(this.id))
	if(!board.getSquare(this.id).isFlagged()) {
		if(board.getSquare(this.id).isClicked()) {
			return
		}
		let flag = document.createElement('img')
		flag.src = './images/flag.png'
		flag.className = 'flag'
		this.innerHTML = ''
		this.appendChild(flag)
		board.getSquare(this.id).setFlag(true)
		board.subBombCounter()
		document.querySelector('.counter').innerHTML = board.getBombCounter()
	} else {
		let flag = this.querySelector('.flag')
		this.removeChild(flag)
		this.innerHTML = "&nbsp;"
		board.getSquare(this.id).setFlag(false)
		board.addBombCounter()
		document.querySelector('.counter').innerHTML = board.getBombCounter()
	}
}

document.querySelectorAll('.square').forEach((el) => {
	el.addEventListener('click',squarePressed)
	el.addEventListener('contextmenu',rightClicked)
})

// 	console.log(board.squares[i][30].bomb)
// 	for(let j=0;j<=30+1;j++) {
// 			console.log(board.squares[1][j].bomb)
// 	}

