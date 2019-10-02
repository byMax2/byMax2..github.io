function init() {
  gameFieldCreation();
  gameCache();
  $('#fadeoutdiv').css("display", "block");
  statWinnerCreat('X ' + winnO, 'x');
  statWinnerCreat('O ' + winnO, 'o');
}

function gameFieldCreation() {
  var content = '<div id="fadeoutdiv" style="display: none;">'; 
  content += '<table id="gameField">';
  for (var i = 0; i < 3; i++) {
    content += "<tr>";
    for (var j = 0; j < 3; j++) {
      content += '<td data-row="' + i + '" data-col="' + j + '" class="tabledata">  </td>';
    }
    content += "</tr>";
  }
  content += "</table>";
  content += "</div>";
  $('#game-logic').append(content);
  createFunctionButton();
}

function gameFieldReset(elementId) {
  $(elementId).remove();
}

function gameFieldDelete() {
  gameArray = [];
  playerXoO = 'X';
  x = 0;
  count = 0;
  gameCache();
  countGame = 0;
}

var gameArray=[];
var playerXoO='X';

function createFunctionButton() {
  $(document).ready( function() {
    $('.tabledata').on('click', function(){
      if (playerXoO == 'X') {
        gameArray.push({ row:$(this).data('row'), col:$(this).data('col'), player:'X' });
        $(this).html('<i class="fas fa-times fa-2x font-color animated rotateIn faster"></i>').hide();
        $(this).fadeIn(20);
        $(this).off('click');
        gameLogic();
        logicStart();
        playerXoO = 'O';
      }
      else {
        gameArray.push({ row:$(this).data('row'), col:$(this).data('col'), player:'O' });
        $(this).html('<i class="far fa-circle fa-2x font-color animated rotateInDownLeft faster"></i>').hide();
        $(this).fadeIn(20);  
        $(this).off('click');
        gameLogic();
        logicStart();
        playerXoO = 'X'; 
      }
    });
  });
}

/* 
function createFunctionButton() {
  $(document).ready( function() {
    kiStartFullArray();
    $('.tabledata').on('click', function(){
      if (playerXoO == 'O') {
        gameArray.push({ row:$(this).data('row'), col:$(this).data('col'), player:'O' });
        $(this).html('<i class="far fa-circle fa-2x font-color animated rotateInDownLeft faster"></i>').hide();
        $(this).fadeIn(20);  
        $(this).off('click');
        gameLogic();
        logicStart();
        playerXoO = 'X';
        kiStartFullArray();
      }
    });
  });
}

function kiStartFullArray() {
  if (kiSet != 0) {
    var tzu = kiTicTacToe().split(',');
    console.log(tzu);
    gameArray.push({ row:tzu[0], col:tzu[1], player:'X' });
    //$(this).html('<i class="fas fa-times fa-2x font-color animated rotateIn faster"></i>').hide();
    //$(this).fadeIn(20);
    //$(this).off('click');
    gameLogic();
    logicStart();
    playerXoO = 'O'; 
  }
}
*/

var x;

function gameCache() {
  x = new Array(3);
  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(3);
  }
  
  for (var i = 0; i < x.length; i++) {
    for (var j = 0; j < x.length; j++) {
      x[i][j] = '.';
    }
  }
  
}

function gameLogic() {
  for (var i = 0; i < gameArray.length; i++) {
    switch(gameArray[i].row) {
      case 0:
        switch(gameArray[i].col) {
          case 0:
            x[0][0] = gameArray[i].player;
            break;
          case 1:
            x[0][1] = gameArray[i].player;
            break;
          case 2:
            x[0][2] = gameArray[i].player;
            break;
        }
        break;
      case 1:
        switch(gameArray[i].col) {
          case 0:
            x[1][0] = gameArray[i].player;
            break;
          case 1:
            x[1][1] = gameArray[i].player;
            break;
          case 2:
            x[1][2] = gameArray[i].player;
            break;
        }
        break;
      case 2:
        switch(gameArray[i].col) {
          case 0:
            x[2][0] = gameArray[i].player;
            break;
          case 1:
            x[2][1] = gameArray[i].player;
            break;
          case 2:
            x[2][2] = gameArray[i].player;
            break;
        }
        break;
    }
  }
}

var count = 0;

function logicStart() {
  if (count < 8) {
    count++; 
    rowWin();
    colWin();
    diaWin();
  }
  else {
    if (rowWin() == false && diaWin() == false && colWin() == false) {
      winnerGame("Es ist Unentschieden");
    }
  }
  
}

function rowWin() {
  var bools = false;
  for (var i = 0; i < x.length; i++) { 
    if (x[i][0] == x[i][1] && x[i][1] == x[i][2] && x[i][0] != '.') {
      winnerGame("Gewonnen hat: " + playerXoO);
      bools = true;
      $('.tabledata').off('click'); 
    }
  }
  return bools; 
}

function colWin() {
  var bools = false;
  for (var i = 0; i < x.length; i++) { 
    if (x[0][i] == x[1][i] && x[1][i] == x[2][i] && x[0][i] != '.') {
      winnerGame("Gewonnen hat: " + playerXoO);
      bools = true;
      $('.tabledata').off('click'); 
    }
  }
  return bools;
}

var countGame = 0;

function diaWin() {
  var bools = false;
  if (x[0][0] == x[1][1] && x[1][1] == x[2][2] && x[0][0] != '.' && countGame == 0) {
    winnerGame("Gewonnen hat: " + playerXoO);
    bools = true;
    countGame++;
    $('.tabledata').off('click'); 
  }
  if (x[0][2] == x[1][1] && x[1][1] == x[2][0] && x[0][2] != '.' && countGame == 0) { 
    winnerGame("Gewonnen hat: " + playerXoO);
    bools = true;
    $('.tabledata').off('click');
  }
  return bools;
}

function winnerPanelCreation(winner) {
  var content = '<p id="tablewinn" style="display: none;">';
  content += winner;
  content += '</p>';
  $('#game-logic').append(content);
}

function winnerGame(winner) {
  winnerPanelCreation(winner);
  if (winner == "Gewonnen hat: X") {
    statWinner('X');
  }
  if (winner == "Gewonnen hat: O") {
    statWinner('O');
  }
  $('#fadeoutdiv').fadeOut(100, function() {
    $('#tablewinn').fadeIn(100);
  });
}

var winnX = 0;
var winnO = 0;

function statWinner(winner) {
  switch (winner) {
    case "X":
      winnX++;
      statWinnerCreat('X ' + winnX, 'x');
      changeBorderColorX();
      break;
    case "O":
      winnO++;
      statWinnerCreat('O ' + winnO, 'o');
      changeBorderColorO();
      break;
  }
}

function statWinnerCreat(elementW, elementIdX) {
  gameFieldReset('#content-' + elementIdX);
  var content = '<div id="content-' + elementIdX + '">';
  content += 'Gewonnene Spiele ' + elementW;
  content += '</div>';
  $('#' + elementIdX + '-player').append(content);
}

function changeBorderColorX() {
  if (winnX > winnO) {
    fadeInOutBorder('o','x');
  } 
}

function changeBorderColorO() {
  if (winnO > winnX) {
    fadeInOutBorder('x','o');
  }
}

function fadeInOutBorder(elementX, elementO) {
  $('#' + elementO + '-player').addClass('shadowInCss');
  if( $('#' + elementX + '-player').attr('class') == "shadowInCss") {
    $('#' + elementX + '-player').removeClass("shadowInCss");
    $('#' + elementX + '-player').addClass('shadowOutCss');
  }
  if( $('#' + elementX + '-player').attr('class') == "shadowOutCss") {
    $('#' + elementO + '-player').removeClass("shadowOutCss");
  }
}

/* KI Set UP */

/*
var kiSet = 0;

function kiStart() {
  if (kiSet == 1) {
    winnerGame("KI is Set!");
    console.log(kiTicTacToe());
  }
}

function kiTicTacToe() {
  var kix = getRandomInt(3);
  var kiy = getRandomInt(3);
  if (x[kix][kiy] == '.') {
    return kix + ',' + kiy;
  }
  else {
    kiTicTacToe();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
*/
