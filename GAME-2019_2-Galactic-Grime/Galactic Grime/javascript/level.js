var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var player
var keyS;
var keyW;
var keyUp;
var keyDown;
var keySpace;
var playerScore;
var mouse;



function preload () {

  cursors = this.input.keyboard.createCursorKeys();//keyboard Access
  console.log(cursors);

}

function create () {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0,0, 'background');
  game.add.sprite()


}

function update () {

}
