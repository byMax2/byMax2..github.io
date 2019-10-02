var gameBoardPlay1=[[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9]];
var posShipPlay1=[[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9]];
var p15=[0,[9,9],[9,9],[9,9],[9,9],[9,9]];
var p14=[0,[9,9],[9,9],[9,9],[9,9]];
var p131=[0,[9,9],[9,9],[9,9]];
var p132=[0,[9,9],[9,9],[9,9]];
var p12=[0,[9,9],[9,9]];

var gameBoardPlay2=[[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9]];
var posShipPlay2=[[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9],[9,9,9,9,9,9,9,9]];
var p25=[0,[9,9],[9,9],[9,9],[9,9],[9,9]];
var p24=[0,[9,9],[9,9],[9,9],[9,9]];
var p231=[0,[9,9],[9,9],[9,9]];
var p232=[0,[9,9],[9,9],[9,9]];
var p22=[0,[9,9],[9,9]];

var sp;
var zl;

var hit1=[0];
var hit2=[0];

var ship;
var rounds=0;



$(document).ready(function(){
	$('#done').on('click',function(){//Schritt abgeschlossen Overlay aktivieren
		console.log('hit');
	});

	$('#pause').on('click',function(){
		$('#p_result').text("pause: "+$('#player').text());
		$('#dispCover').fadeIn(200);
	});

	$('#new').on('click',function(){//neues Spiel starten->reload
		$('.dialog').dialog({
			title: "New Game",
			resizable: false,
			height: "auto",
			width: 320,
			modal: true,
			buttons: {
				"Yes": function(){
					$(this).dialog("close");
					window.location.reload();
				},
				"Cancel": function() {
					$(this).dialog("close");
				}
			}
		});
	});

	$('#nextB').on('click', function(){
		rundraw();
	});
});

function start() {
	$('#dispStart').css('display','block');;
	$('#player').text("player 1");
	$('#p_bot1').text("Please choose your ships position");
	setp1();
}

function drawClear(){
	$('.tapable, .edit').each(function(){
		$(this).css('background','transparent');
		$(this).text("");
	});
}

function draw(player,pos,board,boardEn){
	$('h4').text(player);
	$('#position>tbody>tr>.edit').each(function(){
		if(pos[$(this).data('spalte')][$(this).data('zeile')]!=9){
			$(this).css('background-color','grey');
		}
		else{
			$(this).css('background','transparent');
		}
		if(boardEn[$(this).data('spalte')][$(this).data('zeile')]=='X'){
			$(this).html('<i class="far fa-times-circle"></i>');
		}
		else if(boardEn[$(this).data('spalte')][$(this).data('zeile')]=='O'){
			$(this).html('<i class="far fa-dot-circle"></i>');
		}
		else{
			$(this).html("");
		}
	});
	$('#hit>tbody>tr>.edit').each(function(){
		if(board[$(this).data('spalte')][$(this).data('zeile')]=='X'){
			$(this).html('<i class="far fa-times-circle"></i>');
		}
		else if(board[$(this).data('spalte')][$(this).data('zeile')]=='O'){
			$(this).html('<i class="far fa-dot-circle"></i>');
		}
		else{
			$(this).html("");
		}
	});
}

function setp1(){
	$('#tbstart>tbody>tr>.tapable').on('click', function(){
		sp=$(this).data('spalte');
		zl=$(this).data('zeile');
		if(p15[0]!=5){runset(this,p15,posShipPlay1,5);return;}
		else if(p14[0]!=4){runset(this,p14,posShipPlay1,4);return;}
		else if(p131[0]!=3){runset(this,p131,posShipPlay1,3);return;}
		else if(p132[0]!=3){runset(this,p132,posShipPlay1,3);return;}
		else if(p12[0]!=2){runset(this,p12,posShipPlay1,2);}
		if(p12[0]==2){
			//console.dir(posShipPlay1);
			$('#p_result').text("Player 2, please place your ships.");
			$('#tbstart>tbody>tr>.tapable').off('click');
			$('#dispCover').fadeIn(200);
			$(document).on('keyup',function(e){
				if(e.keyCode==13){
					rundraw();
				}
			});
		}
	});
}

function setp2(){
	$('#tbstart>tbody>tr>.tapable').on('click', function(){
		sp=$(this).data('spalte');
		zl=$(this).data('zeile');
		if(p25[0]!=5){runset(this,p25,posShipPlay2,5);return;}
		else if(p24[0]!=4){runset(this,p24,posShipPlay2,4);return;}
		else if(p231[0]!=3){runset(this,p231,posShipPlay2,3);return;}
		else if(p232[0]!=3){runset(this,p232,posShipPlay2,3);return;}
		else if(p22[0]!=2){runset(this,p22,posShipPlay2,2);}
		if(p22[0]==2){
			$('#tbstart>tbody>tr>.tapable').off('click');
			rounds=11;//damit dispCover nach sart Spielfelder aufruft
			$('#p_bot1').text("Your turn");
			$('#p_bot2').text("SHOT");
			$('#p_result').text("Player 1, please take your first shot.");
			$('#dispCover').fadeIn(200);
			$(document).on('keyup',function(e){
				if(e.keyCode==13){
					rundraw();
				}
			});
		}
	});
}

function runset(ob,arr,pos,ship){
	$('#p_bot2').text("Ship length: "+ship);
	if(arr[arr[0]+1]==9,9){
		if(check(arr,pos,arr[0],ship)){
			$(ob).text(ship);
			$(ob).off('click');
		}
	}
}

function check(arr,pos,a,ship){
	if(a==0){
		if(pos[sp][zl]==9){
			pos[sp][zl]=ship;
			arr[arr[0]+1]=[sp,zl];
			arr[0]=arr[0]+1;
			return true;
		}
		else{
			alert("Chosen position not posible.");
			return false;
		}
	}
	else{
		if(pos[sp][zl]==9){
			var minsp=9;
			var maxsp=0;
			var minzl=9;
			var maxzl=0;
			for (var i=1; i<arr.length; i++){
				if(arr[i][0]>maxsp&&arr[i][0]<8){maxsp=arr[i][0];}
				if(arr[i][0]<minsp){minsp=arr[i][0];}
				if(arr[i][1]>maxzl&&arr[i][1]<8){maxzl=arr[i][1];}
				if(arr[i][1]<minzl){minzl=arr[i][1];}
			}
			if(sp>maxsp){maxsp=sp;}
			if(sp<minsp){minsp=sp;}
			if(zl>maxzl){maxzl=zl;}
			if(zl<minzl){minzl=zl;}
			if(minsp!=maxsp&&minzl==maxzl){
				if(maxsp-minsp>ship-1){
					alert("Chosen position not posible.");
					return false;
				}
				else{
					pos[sp][zl]=ship;
					arr[arr[0]+1]=[sp,zl];
					arr[0]=arr[0]+1;
					return true;
				}
			}
			else if(minsp==maxsp&&minzl!=maxzl){
				if(maxzl-minzl>ship-1){
					alert("Chosen position not posible.");
					return false;
				}
				else{
					pos[sp][zl]=ship;
					arr[arr[0]+1]=[sp,zl];
					arr[0]=arr[0]+1;
					return true;
				}
			}
			else{
				alert("Chosen position not posible.");
				return false;
			}
		}
		else{
			alert("Chosen position not posible.");
			return false;
		}	
	}//if else (pos[sp][zl]==9)
}//check

function rundraw(){
	drawClear();
	console.log(rounds);
	if(rounds<10){
		$('#dispCover').fadeOut(200);
		$(document).off('keyup');
		$('#player').text("player 2")
		setp2();
	}
	else if(rounds%2!=0){
		console.log("hit1");
		$('#dispStart').css('display','none');
		draw("player 1",posShipPlay1,gameBoardPlay1,gameBoardPlay2);
		$('#dispCover').fadeOut(200);
		$(document).off('keyup');
		$('#dispPlay').fadeIn(200);
		$('.tapable').on('click', function(){
			sp=$(this).data('spalte');
			zl=$(this).data('zeile');
			shot(this,posShipPlay2,gameBoardPlay1,hit1);
		});
	}
	else{
		console.log("hit2");
		$('#dispStart').css('display','none');
		draw("player 2",posShipPlay2,gameBoardPlay2,gameBoardPlay1);
		$('#dispCover').fadeOut(200);
		$(document).off('keyup');
		$('#dispPlay').fadeIn(200);
		$('.tapable').on('click', function(){
			sp=$(this).data('spalte');
			zl=$(this).data('zeile');
			shot(this,posShipPlay1,gameBoardPlay2,hit2);
		});
	}
}

function shot(ob,pos,board,hit){
	rounds++;
	$('.tapable').off('click');
	if(pos[sp][zl]!=9){
		board[sp][zl]="X";
		$(ob).html('<i class="far fa-times-circle"></i>');
		hit[0]++;
		if(won()){}
		else{
			setTimeout(function(){
				$('#dispCover').fadeIn(200);
				$(document).on('keyup',function(e){
					if(e.keyCode==13){
						rundraw();
					}
				});
			},500);
			$('#p_result').text("you hit");
		}
		
	}
	else{
		board[sp][zl]="O";
		$(ob).html('<i class="far fa-dot-circle"></i>');
		setTimeout(function(){
			$('#dispCover').fadeIn(200);
			$(document).on('keyup',function(e){
				if(e.keyCode==13){
					rundraw();
				}
			});
		},500);
		$('#p_result').text("you missed");
	}
}

function won(){
	if(hit1[0]==17){
		$('#dispPlay').fadeOut(200);
		drawfinish("Player 1 won!",posShipPlay1,gameBoardPlay1,posShipPlay2,gameBoardPlay2);
		$('#dispEnd').fadeIn(200);
		$('#pause').off('click');
		return true;
	}
	if(hit2[0]==17){
		$('#p_bot1').text("Game over");
		$('#p_bot2').text("");
		$('#dispPlay').fadeOut(200);
		drawfinish("Player 2 won!",posShipPlay2,gameBoardPlay2,posShipPlay1,gameBoardPlay1);
		$('#dispEnd').fadeIn(200);
		return true;
	}
	return false;
}

function drawfinish(player,poswin,boardwin,poslose,boardlose){
	$('h4').text(player);
	$('#p_bot1').text("Game over");
	$('#p_bot2').text("");
	$('#resp1>tbody>tr>.edit').each(function(){
		$(this).css('background-color','rgba(97,136,176,0.5)');
		if(poslose[$(this).data('spalte')][$(this).data('zeile')]!=9){
			$(this).css('background-color','grey');
		}
		else{
			$(this).css('background','none');
		}
		if(boardwin[$(this).data('spalte')][$(this).data('zeile')]=='X'){
			$(this).html('<i class="far fa-times-circle"></i>');
		}
		else if(boardwin[$(this).data('spalte')][$(this).data('zeile')]=='O'){
			$(this).html('<i class="far fa-dot-circle"></i>');
		}
		else{
			$(this).html("");
		}
	});
	$('#resp2>tbody>tr>.edit').each(function(){
		$(this).css('background-color','rgba(97,136,176,0.5)');
		if(poswin[$(this).data('spalte')][$(this).data('zeile')]!=9){
			$(this).css('background-color','grey');
		}
		else{
			$(this).css('background','none');
		}
		if(boardlose[$(this).data('spalte')][$(this).data('zeile')]=='X'){
			$(this).html('<i class="far fa-times-circle"></i>');
		}
		else if(boardlose[$(this).data('spalte')][$(this).data('zeile')]=='O'){
			$(this).html('<i class="far fa-dot-circle"></i>');
		}
		else{
			$(this).html("");
		}
	});
}

