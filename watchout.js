// start slingin' some d3 here.

//Create a big (parent) SVG board.

var svg = d3.select('body').append('svg').attr('class','gameBoard');

//Create 13 enemies within SVG board. Enemies are small black circles
var boardSize = [800, 800];
var player;
var score = 0;
var highScore = 0;
var collisionCount = 0;
//create player
//place on board in center
//make draggable within board

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove() {
  var x = d3.event.x;
  var y = d3.event.y;

  // keep player with boarders of game board
  if(y < 880 && x < 880 && x > 20 && y > 20){
    d3.select(this).attr('cx', x).attr('cy', y);
  }
}

var createPlayer = function(boardSize, color){

  // caculate center of board [x, y]
  var coords = [(boardSize[0] / 2), (boardSize[1] / 2)];

  return svg.append('circle')
            .attr('cx', coords[0])
            .attr('cy', coords[0])
            .attr('r','10')
            .attr('fill', color)
            .call(drag);
};

var enemyCount = 10;
// var xPos = 50;
// var yPos = 50;
var enemies = [];

var randomLocations = function(boardSize){
  xPos = Math.random() * boardSize[0];
  yPos = Math.random() * boardSize[1];
  return [xPos, yPos];
};


var createEnemies = function(boardSize){
  // loop from 0 to enemyCount
  for(var i = 0; i < enemyCount; i++){
    var coords =  randomLocations(boardSize);
    var enemy = svg.append('circle')
                .attr('cx', coords[0])
                .attr('cy',coords[1])
                .attr('r','10')
                .attr('fill', 'yellow');

    enemies.push(enemy);
  }
};

// create function .move taking x and y for new enemy location
// vars enemy, x, y
var moveEnemy = function(enemy, coords, duration){
  enemy.transition().duration(duration)
  .attr('cx', coords[0]).attr('cy',coords[1]);
};

var moveAllEnemies = function(){
  for (var j = 0; j < enemies.length; j++){
    moveEnemy(enemies[j],randomLocations(boardSize), 1000);
  }
};


var detectCollision = function(player, enemies){
  for (var i = 0; i < enemies.length; i++){
    // calculate area of intersection of enemy and player
    var enemyArea = +enemies[i].attr("cx") + +enemies[i].attr("r");
    var playerArea = +player.attr("cx") + +player.attr("r");

    if(Math.abs(enemyArea - playerArea) <= 8){
      if (highScore === 0 || score > highScore){
        highScore = score;
        console.log(highScore);
        d3.select('.high span').text(highScore);
      }
      // collision
      score = 0;
      //increment collision count
      collisionCount++;
      d3.select('.collisions span').text(collisionCount);
    }
  }
};

var startGame = function(){
  player = createPlayer(boardSize,'red');
  createEnemies(boardSize);

  setInterval(function(){
    moveAllEnemies();
  }, 1500);
  //detectCollision(player, enemies);
  setInterval(function(){
    detectCollision(player, enemies);
  }, 50);
  setInterval(function(){
    score++;
    d3.select(".current span").text(score);
  }, 100);
};

startGame();

// create global score variable (=0)
// when a player and any enemy touch, score gets reset to zero
// At Set Interval, detect player locatiion.
//    Check if enemy players are in same location.
//    //f detect interval (player, enemies)






