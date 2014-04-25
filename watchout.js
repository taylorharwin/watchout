// start slingin' some d3 here.

//Create a big (parent) SVG board.

var svg = d3.select('body').append('svg').attr('class','gameBoard');

//Create 13 enemies within SVG board. Enemies are small black circles

var enemyCount = 10;
var xPos = 50;
var yPos = 50;
var enemies = [];

// loop from 0 to enemyCount
for(var i = 0; i < enemyCount; i++){
  // append new enemy with a random xPos and yPos between 0 - 900
  xPos = Math.random() * 900;
  yPos = Math.random() * 900;

  var enemy = svg.append('g')
                .attr('transform', 'translate(' + xPos + ',' + yPos + ')')
                .append('circle')
                .attr('cx','25')
                .attr('cy','25')
                .attr('r','25')
                .attr('fill', 'yellow')
                .attr('x', '100')
                .attr('y','100');

  enemies.push(enemy);
}
