/*SOURCES
https://stackoverflow.com/questions/19106911/recursive-minesweeper-0-fill
*/

/*BOARD CLASS*/
class Board {
	constructor(width,height,numBombs) {
		this.width = width
		this.height = height
		this.numBombs=numBombs
		this.squares = []
	}

	makeBoard() {
		this.createSquares()
		this.makeColumns()
		this.randomGenerator()
		this.countBombsAroundSquares()
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

	makeColumns() {
		let autoStr = ''
		for(let i=0;i<this.height;i++) {
			autoStr+='20px '
		}
		document.querySelector('.grid-container').setAttribute('style','grid-template-columns: '+autoStr)
	}

	// makeRows() {
	// 	let autoStr = ''
	// 	for(let i=0;i<this.width;i++) {
	// 		autoStr+='auto '
	// 	}
	// 	document.querySelector('.grid-container').setAttribute('style','grid-template-rows: '+autoStr)
	// }

	createSquares() {
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

	getSquare(id) {
		let arr = id.split('_')
		return this.squares[arr[0]][arr[1]]
	}

	getSquares() {
		return this.squares
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


function revealNumber(square) {
	switch(board.getSquare(square.id).getBombsAround()) {
		case 1:
			square.setAttribute('style','background: white; color: blue')
			square.innerHTML = 1
			board.getSquare(square.id).setClicked()
			break
		case 2:
			square.setAttribute('style','background: white; color: green')
			square.innerHTML = 2
			board.getSquare(square.id).setClicked()
			break
		case 3:
			square.setAttribute('style','background: white; color: red')
			square.innerHTML = 3
			board.getSquare(square.id).setClicked()
			break
		case 4:
			square.setAttribute('style','background: white; color: purple')
			square.innerHTML = 4
			board.getSquare(square.id).setClicked()

			break
		case 5:
			square.setAttribute('style','background: white; color: maroon')
			square.innerHTML = 5
			board.getSquare(square.id).setClicked()
			break
		case 6:
			square.setAttribute('style','background: white; color: turquoise')
			square.innerHTML = 6
			board.getSquare(square.id).setClicked()
			break
		case 7:
			square.setAttribute('style','background: white; color: black')
			square.innerHTML = 7
			board.getSquare(square.id).setClicked()
			break
		case 8:
			square.setAttribute('style','background: white; color: gray')
			square.innerHTML = 8
			board.getSquare(square.id).setClicked()
			break
		case 0:
			square.setAttribute('style','background: white;')
			revealZeros(square)
			// let squ = board.getSquare(square.id)
			// squ.setClicked()
			// for(let i=squ.getX()-1;i<=squ.getX()+1;i++) {
			// 	for(let j=squ.getY()-1;j<=squ.getY()+1;j++) {
			// 		//if(!)
			// 		let sq = document.getElementById(`${i}_${j}`)
			// 		if(board.getSquare(sq.id).getBombsAround() === 0) {
			// 			sq.setAttribute('style','background: white;')
			// 			revealNumber(sq)
			// 		} else {
			// 			revealNumber(sq)
			// 		}
			// 	}
			// }
			break
	}
}

function revealZeros(square) {

}

function showBombs() {
	board.getSquares().forEach((el) => {
		el.forEach((e) => {
			e.setClicked()
			if(e.isBomb()) {
				let bomb = document.getElementById(`${e.getX()}_${e.getY()}`)
				bomb.setAttribute('style','background: red')
			}
		})
	})
}

function squarePressed() {
	if(!board.getSquare(this.id).isFlagged()) {
		//board.getSquare(this.id).setClicked()
		if(!board.getSquare(this.id).isBomb()) {
			revealNumber(this)
			//board.getSquare(this.id).setLeftClicked()
		} else {
			showBombs()
			//make smiley face dead face
		}
	}
}

function rightClicked(e) {
	e.preventDefault();
	if(!board.getSquare(this.id).isFlagged()) {
		if(board.getSquare(this.id).isClicked()) {
			return
		}
		let flag = document.createElement('img')
		flag.src = './images/flag.png'
		flag.id = 'flag'
		this.appendChild(flag)
		board.getSquare(this.id).setFlag(true)
	} else {
		this.removeChild(this.querySelector('#flag'))
		board.getSquare(this.id).setFlag(false)
	}
}

document.querySelectorAll('.square').forEach((el) => {
	el.addEventListener('click',squarePressed)
	el.addEventListener('contextmenu',rightClicked)
})
// let count =0
// for(let i=0;i<=16+1;i++) {
// 	console.log(board.squares[i][30].bomb)
// 	for(let j=0;j<=30+1;j++) {
// 			console.log(board.squares[1][j].bomb)
// 	}
// }

