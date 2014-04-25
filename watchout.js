// start slingin' some d3 here.

//Create a big (parent) SVG board.

var svg = d3.select('body').append('svg').attr('class','gameBoard');

//Create 13 enemies within SVG board. Enemies are small black circles
var boardSize = [800, 800];
var enemyCount = 10;
var xPos = 50;
var yPos = 50;
var enemies = [];

var randomLocations = function(boardSize){
  xPos = Math.random() * boardSize[0];
  yPos = Math.random() * boardSize[1];
  return [xPos, yPos];
};

// loop from 0 to enemyCount
for(var i = 0; i < enemyCount; i++){
  var coords =  randomLocations(boardSize);

  var enemy = svg.append('g')
                .attr('transform', 'translate(' + coords[0] + ',' + coords[1] + ')')
                .append('circle')
                .attr('cx','25')
                .attr('cy','25')
                .attr('r','25')
                .attr('fill', 'yellow')
                .attr('x', '100')
                .attr('y','100');

  enemies.push(enemy);
}

// create function .move taking x and y for new enemy location
// vars enemy, x, y
var moveEnemy = function(enemy, coords, duration){
  enemy.transition().duration(duration).attr('transform', 'translate(' + xPos + ',' + yPos + ')');
};

var moveAllEnemies = function(){
  for (var j = 0; j < enemies.length; j++){
    moveEnemy(enemies[j],randomLocations(boardSize), 1000);
  }
};

var startGame = function(){
  setInterval(function(){
    moveAllEnemies();
  }, 1000);
};

startGame();






