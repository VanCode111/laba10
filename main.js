window.onload = function(){
	let cnv = document.getElementById('canvas');
	const cnvWidth = 250;
	const cnvHeight = 250;
	let players = ["player1", "player2"];
	let schet = [0, 0];
	let hods = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
	let pobedaHods = [[[0, 0], [0, 1], [0, 2]], 
	[[1, 0], [1, 1], [1, 2]], 
	[[2, 0], [2, 1], [2, 2]], 
	[[0, 0], [1, 0], [2, 0]],
	[[0, 1], [1, 1], [2, 1]],
	[[0, 2], [1, 2], [2, 2]],
	[[0, 0], [1, 1], [2, 2]],
	[[0, 2], [1, 1], [2, 0]],];
	let oSize = cnvWidth / 12;
	let yach = cnvWidth / 3;
	let xSize = cnvWidth / 6;
	cnv.width = cnvWidth;
	cnv.height = cnvHeight;
	let ctx = cnv.getContext('2d');
	let hod = 1;
	let plr = 0;
	startGame(ctx, cnvWidth, cnvHeight);
	document.getElementById("reset").onclick = function(){newRaund();};
	document.getElementById("newraund").onclick = function(){startGame();};
	cnv.addEventListener('click', function(e){newHod(e, ctx, oSize, yach, xSize);});

	function newRaund(){
		canvas.width = canvas.width;
		hods = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
		hod = 1;
		schet = [0, 0];
		document.getElementById("player1").innerText = schet[0];
		document.getElementById("player2").innerText = schet[1];
		vivodhod();
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(cnvWidth/3, 0);
		ctx.lineTo(cnvWidth/3, cnvHeight);
		ctx.moveTo((cnvWidth/3)*2, 0);
		ctx.lineTo((cnvWidth/3)*2, cnvHeight);
		ctx.moveTo(0, cnvHeight/3);
		ctx.lineTo(cnvWidth, cnvHeight/3);
		ctx.moveTo(0, (cnvHeight/3)*2);
		ctx.lineTo(cnvWidth, (cnvHeight/3)*2);
		ctx.stroke();
	}
	function startGame(){
		canvas.width = canvas.width;
		hods = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
		hod = 1;
		vivodhod();
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.moveTo(cnvWidth/3, 0);
		ctx.lineTo(cnvWidth/3, cnvHeight);
		ctx.moveTo((cnvWidth/3)*2, 0);
		ctx.lineTo((cnvWidth/3)*2, cnvHeight);
		ctx.moveTo(0, cnvHeight/3);
		ctx.lineTo(cnvWidth, cnvHeight/3);
		ctx.moveTo(0, (cnvHeight/3)*2);
		ctx.lineTo(cnvWidth, (cnvHeight/3)*2);
		ctx.stroke();
	}

	function vivodhod(){
		if (plr == 0){
			document.getElementById("plrnow").innerText = "первый";
		}else{
			document.getElementById("plrnow").innerText = "второй";
		}
		if (hod == 0){
			document.getElementById("znak").innerText = "O";
		}else{
			document.getElementById("znak").innerText = "X";
		}
	}

	function newHod(e, ctx, oSize, yach, xSize){
		let change = false;
		if (hod == 0){
			let hodo = drawO(e, ctx, oSize, yach);
			if (hodo == true){
				hod = 1;
				change = true;
			}
		}else{
			let hodo = drawX(e, ctx, xSize, yach);
			if (hodo == true){
				hod = 0;
				change = true;
			}
		}
		let status = "";
		for (key of pobedaHods){
		if (hods[key[0][0]][key[0][1]] === hods[key[1][0]][key[1][1]] && hods[key[1][0]][key[1][1]] === hods[key[2][0]][key[2][1]] && hods[key[1][0]][key[1][1]] != " "){
			status = "Победа";
			break;
		}
		}
		if (status == "Победа"){
			schet[plr] += 1;
			document.getElementById(players[plr]).innerText = schet[plr];
			ctx.fillStyle = 'rgba(255,255,255,.7)';
            ctx.fillRect(0,0, cnvWidth, cnvWidth);
            ctx.font="25px Arial";
            if (plr == 0){
            	ctx.strokeText('Победил первый', 0, cnvWidth / 2);
            }else{
            	ctx.strokeText('Победил второй', 0, cnvWidth / 2);
            }
		}else if (change == true){
			if (plr == 1){
					plr = 0;
				}else{
					plr = 1;
				}
				vivodhod();
		}
		
	}

	function getPositionX(e, yach){
		if (e.offsetX < yach){
			positionX = yach /2;
			idx = 0;
		}else if (e.offsetX < yach*2){
			positionX = yach*2 - yach/2;
			idx = 1;
		}else{
			positionX = yach*3 - yach/2;
			idx = 2;
		}
		return [positionX, idx];
	}

	function getPositionY(e, yach){
		if (e.offsetY < yach){
			positionY = yach /2;
			idx = 0;
		}else if (e.offsetY < yach*2){
			positionY =  yach*2 - yach/2;
			idx = 1;
		}else{
			positionY = yach*3 - yach/2;
			idx = 2;
		}
		return [positionY, idx];
	}

	function drawO(e, ctx, oSize, yach){
		[positionX, x] = getPositionX(e, yach);
		[positionY, y] = getPositionY(e, yach);
		if (hods[y][x] === " "){
			ctx.beginPath();
			ctx.arc(positionX, positionY, oSize, 0,2 *Math.PI);
			ctx.stroke();
			hods[y][x] = "O";
			return true;
		}else{
			return false;
		}
		//- (xSize/Math.sqrt(2))/2
	}
	function drawX(e, ctx, xSize, yach){
		[positionX, x] = getPositionX(e, yach);
		[positionY, y] = getPositionY(e, yach);
		positionY -= (xSize/Math.sqrt(2))/2;
		positionX -= (xSize/Math.sqrt(2))/2;
		if (hods[y][x] === " "){
			ctx.beginPath();
			ctx.moveTo(positionX, positionY);
			ctx.lineTo(positionX + xSize, positionY + xSize);
			ctx.moveTo(positionX, positionY + xSize);
			ctx.lineTo(positionX + xSize , positionY);
			ctx.stroke();
			hods[y][x] = "X";
			return true;
		}else{
			return false;
		}
	}
};