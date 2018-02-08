class Board {
	constructor(width,height,numBombs) {
		this.width = width
		this.height = height
		this.numBombs=numBombs
		this.squares = []
		this.bombCounter=numBombs
	}

	restart() {
		this.squares = []
		document.querySelector('.face').src = './images/smile.png'
		this.bombCounter=this.numBombs
		let parent = document.querySelector('.grid-container')
		while(parent.firstChild) {
			parent.removeChild(parent.firstChild)
		}
	}

	checkWin() {
		let list = []
		for(let i=1;i<=this.width;i++) {
			for(let j=1;j<=this.height;j++) {
				if(!this.squares[i][j].isBomb()) {
					list.push(this.squares[i][j])
				}
			}
		}
		let val = true
		list.forEach((s) => {
			if(!s.isClicked()) {
				val = false
			}
		})
		return val
	}

	showFlags() {
		this.squares.forEach((el) => {
			el.forEach((e) => {
				if(e.isBomb() && !e.isFlagged()) {
					let flag = document.createElement('img')
					flag.src = './images/flag.png'
					flag.className = 'flag won'
					document.getElementById(`${e.getX()}_${e.getY()}`).appendChild(flag)
				}
			})
		})
	}

	addBombCounter() {
		this.bombCounter++
	}

	subBombCounter() {
		this.bombCounter--
	}

	setBombCounterZero() {
		this.bombCounter = 0
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

