// start slingin' some d3 here.

var gameBoard = d3.select('body').append('svg').attr('class','gameBoard');

var player;
var score = 0;
var highScore = 0;
var collisionCount = 0;
var settings = {
  boardWidth: 800,
  boardHeight: 800,
  duration: 1000
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);

function dragmove() {
  var x = d3.event.x;
  var y = d3.event.y;

  // keep player within boarders of game board
  if(y < 880 && x < 880 && x > 20 && y > 20){
    d3.select(this).attr('x', x).attr('y', y);
  }
}

var createPlayer = function(color){

  // caculate center of board [x, y]
  var rect = gameBoard.selectAll('rect').data([1]);

  rect.enter()
      .append('svg:rect')
      .attr('class', 'player')
      .attr('x', (settings.boardWidth / 2))
      .attr('y', (settings.boardHeight / 2))
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', color)
      .call(drag);

  return rect;
};

var enemies = [];


var rand = function(n){ return (Math.random() * n) | 0; };

var enemyData = [1,2,3,4,5,6,7,8,9,10];
var enemies ;

var createEnemies = function(){
  // loop from 0 to enemyCount
  enemies = gameBoard.selectAll('circle')
              .data(enemyData);

  enemies.enter()
      .append("svg:circle")
      .attr('r','10')
      .attr('fill', 'yellow');

  enemies.each(function(){
    d3.select(this).attr('cx', rand(settings.boardWidth))
      .attr('cy', rand(settings.boardHeight));
  });
};

// create function .move taking x and y for new enemy location
// vars enemy, x, y
var moveEnemies = function(enemies){
  enemies.transition()
    .duration(settings.duration)
    .attr('cx', rand(settings.boardWidth))
    .attr('cy', rand(settings.boardHeight))
    .each('end', function(){
      moveEnemies(d3.select(this));
    });
};

var detectCollision = function(player, enemies){
  enemies.each(function(){

    var xDis = Math.abs(+d3.select(this).attr("cx") - +player.attr("x"));
    var yDis = Math.abs(+d3.select(this).attr("cy") - +player.attr("y"));

    if(xDis <= 15 && yDis <= 15){

      if (highScore === 0 || score > highScore){
        highScore = score;
        d3.select('.high span').text(highScore);
      }

      score = 0;
      collisionCount++;

      d3.select('.collisions span').text(collisionCount);
    }
  });
};

var startGame = function(){
  player = createPlayer('red');
  createEnemies();
  moveEnemies(enemies);

  setInterval(function(){
    detectCollision(player, enemies);
  }, 15);
  setInterval(function(){
    score++;
    d3.select(".current span").text(score);
  }, 100);
};

startGame();
