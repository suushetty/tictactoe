$(document).ready(function () {
    createPlayers();
    initGameGrid();
    initGameState();
    handleUserInput();
    restart();
});

// Restart the game
var restart = function () {
    $('#restart').click(function(event) {
        event.preventDefault();
        initGameGrid();
        initGameState();
        handleUserInput();
    });
}

// Handle keyboard & mouse inputs
var handleUserInput = function () {
    // Handle Keyboard Input
    $(window).bind('keypress', function (event) {
        var key = (event.keyCode ? event.keyCode : event.which);
        // Check if key pressed is between 1-9
        if(key >= gameConstants.minKeyVal && key <= gameConstants.maxKeyVal) {
            // Pass the right table cell based on the key pressed
            startPlay($('.tcell')[key - gameConstants.minKeyVal]);
        }      
    });

    // Handle Mouse Input
    $('.tcell').click(function (event) {
        startPlay(this);
    });
}

// Start game
var startPlay = function(cell) {
    if (gameState.totalTurns < 9 && gameState.result == 0) {
        playTurn(((gameState.turn == 0 ) ? p1 : p2) , cell);
    }
}

// Manages players turns & updates the game state & the dom accordingly
var playTurn = function (player, cell) {
    var opponent = gameState.getOpponent(player);
    var cellNum = $(cell).find('.num').text();

    // Check if cell has been already filled
    if (player.choices.indexOf(cellNum) >= 0 || opponent.choices.indexOf(cellNum) >= 0 ) {
        return;
    }

    // Save the current choice
    player.choices.push(cellNum);
    // Mark the selection on the grid
    $(cell).find('.choice').text(player.symbol);

    // Check if there  is a winning combination
    var result = arrayIntersect(player.choices);
    if (result.length == 3) {
        // Player won, Update game state
        updateCells(result);
        gameState.result = 1;
        bootbox.alert(player.name + " has won the game");
        player.score++;

        // Update DOM elements     
        $('#' + player.name + 'score').text(player.score);
        $('#Result').text(player.name + " has won the game");
    } else {
        // Game tied
        if (gameState.totalTurns >= 8) {
            bootbox.alert("Game tied");
            $('#Result').text("Game tied");
            gameState.result = 2;
        }

        // Indicate the player, whose turn it is to play
        $('#' + player.name).addClass('off');
        $('#' + player.name).removeClass('on');
        $('#' + opponent.name).addClass('on');
        $('#' + opponent.name).removeClass('off');

        // Toggle game turn
        gameState.turn = 1 - gameState.turn;
    }
    gameState.totalTurns++;
}

// Checks if a winning combination has been made
var arrayIntersect = function (input) {
    input.sort();
    for (var k = 0; k < gameConstants.winningCombs.length; k++){
        var count = 0;
        var i = 0;
        var j = 0;
        var comb = gameConstants.winningCombs[k];
        while (i < comb.length && j < input.length) {  
            if (comb[i] == input[j]) {
                count++;
                i++;
            } 
            j++;
        }
        if (count == 3) {
            return comb;
        }
    }
    return [];            
}

// Update winning cells
var updateCells = function (result) {
    for(var h = 0; h < 3 ; h++) {
        $($('.choice')[result[h]-1]).attr('style', 'color:red');
    }
}