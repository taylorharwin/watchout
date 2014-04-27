var Watchout = function(){
  this.gameBoard = d3.select('body').append('svg').attr('class','gameBoard');
  this.player;
  this.enemies;
  this.score = 0;
  this.highScore = 0;
  this.collisionCount = 0;
  this.settings = {
    boardWidth: 800,
    boardHeight: 800,
    duration: 1000
  };
};

Watchout.prototype.createPlayer = function(color){

  var dragMove = function() {
    var x = d3.event.x;
    var y = d3.event.y;
    if(y < 880 && x < 880 && x > 20 && y > 20){
      d3.select(this).attr('x', x).attr('y', y);
    }
  };

  var drag = d3.behavior.drag().on("drag", dragMove);

  // caculate center of board [x, y]
  var rect = this.gameBoard.selectAll('rect').data([1]);

  rect.enter()
      .append('svg:rect')
      .attr('class', 'player')
      .attr('x', (this.settings.boardWidth / 2))
      .attr('y', (this.settings.boardHeight / 2))
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', color)
      .call(drag);

  return rect;
};

Watchout.prototype.rand = function(n){ return (Math.random() * n) | 0; };

Watchout.prototype.createEnemies = function(){
  var enemyData = [1,2,3,4,5,6,7,8,9,10];
  var self = this;

  this.enemies = this.gameBoard.selectAll('circle')
              .data(enemyData);

  this.enemies.enter()
      .append('svg:circle')
      .attr('r','10')
      .attr('fill', 'yellow');

  this.enemies.each(function(){
    d3.select(this).attr('cx', self.rand(self.settings.boardWidth))
      .attr('cy', self.rand(self.settings.boardHeight));
  });
};

Watchout.prototype.moveEnemies = function(elements){
  var self = this;

  elements.transition()
    .duration(this.settings.duration)
    .attr('cx', this.rand(this.settings.boardWidth))
    .attr('cy', this.rand(this.settings.boardHeight))
    .each('end', function(){
      self.moveEnemies(d3.select(this));
    });
};

Watchout.prototype.detectCollision = function(){
  var self = this;

  this.enemies.each(function(){

    var xDis = Math.abs(+d3.select(this).attr('cx') - +self.player.attr('x'));
    var yDis = Math.abs(+d3.select(this).attr('cy') - +self.player.attr('y'));

    if(xDis <= 15 && yDis <= 15){

      if (self.highScore === 0 || self.score > self.highScore){
        self.highScore = self.score;
        d3.select('.high span').text(self.highScore);
      }

      self.score = 0;
      self.collisionCount++;

      d3.select('.collisions span').text(self.collisionCount);
    }
  });
};

Watchout.prototype.startGame = function(){
  this.player = this.createPlayer('red');
  this.createEnemies();
  this.moveEnemies(this.enemies);
  var self = this;

  d3.timer(function(){
    self.detectCollision(self.player, self.enemies);
  });

  setInterval(function(){
    self.score++;
    d3.select(".current span").text(self.score);
  }, 100);
};

var game = new Watchout();
game.startGame();
