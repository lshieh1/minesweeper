let page = window.location.pathname
page = page.substring(page.lastIndexOf('/')+1)
if(page === 'index.html') {
	document.querySelector('.beginner').onclick = function() {
		localStorage.setItem('level','b')
		window.location.href='./play.html'
	}
	document.querySelector('.intermediate').onclick = function() {
		localStorage.setItem('level','i')
		window.location.href='./play.html'
	}
	document.querySelector('.expert').onclick = function() {
		localStorage.setItem('level','e')
		window.location.href='./play.html'
	}

}
let board
if(page === 'play.html') {
	if(localStorage.getItem('level') === 'b') {
		board = new Board(9,9,18)
	} else if(localStorage.getItem('level') === 'i') {
		board = new Board(16,16,40)
	} else if(localStorage.getItem('level') === 'e') {
		board = new Board(16,30,99)
	} else {

	}
	board.makeBoard()
	boardEventHandler()
	document.querySelector('.face').addEventListener('click',function() {
		board.restart()
		board.makeBoard()
		boardEventHandler()
	})
	// document.querySelector('.face').addEventListener('mousedown',function() {
	// 	document.querySelector('.face').src = './images/shock.png'
	// })
}


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
			document.querySelector('.face').src = './images/dead.png'
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

function boardEventHandler() {
	document.querySelectorAll('.square').forEach((el) => {
		el.addEventListener('click',squarePressed)
		el.addEventListener('contextmenu',rightClicked)
		el.addEventListener('mousedown',function() {
			document.querySelector('.face').src = './images/shock.png'
		})
		el.addEventListener('mouseup',function() {
			document.querySelector('.face').src = './images/smile.png'
		})
	})
}
