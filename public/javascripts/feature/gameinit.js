var Player = function (playerId, symbol) {
    this.id = playerId;
    this.choices = [];
    this.symbol = symbol;
    this.name = 'player' + playerId;
    this.score = 0;
}

Player.prototype.reset = function () {
    this.choices = [];
}

var gameState = {
    turn: 0,
    result: 0,
    totalTurns: 0,
    players: {},
    reset: function () {
        this.turn = 0;
        this.result = 0;
        this.totalTurns = 0;
        $('#Result').text("");
    },
    getOpponent: function (player) {
       var id = (player.id == 1 ? 2 : 1);
       return this.players[id];
    }
}

var gameConstants = {
    winningCombs: [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
    minKeyVal: 49 ,
    maxKeyVal: 57
}

var createPlayers = function () {
    p1 = new Player(1, "X");
    p2 = new Player(2, "O");
    gameState.players[p1.id] = p1;
    gameState.players[p2.id] = p2;
}

var initGameState = function () {
    p1.reset();
    p2.reset();
    gameState.reset();
}

var initGameGrid = function () {
    $('table').remove();
    var table = '<table><tbody>';
    for(var i = 0; i < 9 ; i++) {
        table += (i % 3 == 0) ? '<tr>' : '' ;
        table += "<td><span class='tcell'> <div class='num'>" + (i+1) + '</div>' + "<div class='choice'/> </span></td>";
        table += (i % 3 == 2) ? '</tr>' : '';
    }
    table += '<tbody></table>';
    $('#playTable').append(table);
} 