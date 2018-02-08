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
