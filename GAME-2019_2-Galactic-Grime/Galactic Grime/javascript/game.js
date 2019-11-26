var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', { preload: preload, create: create, update: update });

var player;
var alien1;
var cursors;
var playerScore = 0;
var scoreString;
var statetext;
var scoretext;
var playerLives;
var mouse;
var fireButton;
var explosions;
var enemyBullets;
var firingTimer = 0;
var livingEnemies = [];
var fireRate = 100;
var nextFire = 0;
var bulletTime = 0;
var lives = 3;


function preload () {

  cursors = this.input.keyboard.createCursorKeys();
  console.log(cursors);

  game.load.image('background', 'Assets/Background.jpg');
  game.load.image('alienLvl1', 'Assets/alienLevel1.png');
  game.load.image('explosion', 'Assets/Explosion.png');
  game.load.spritesheet('spaceship', 'Assets/UFO.png', 32, 43);
  game.load.spritesheet('bullet', 'Assets/bossBullet.png');
  game.load.image('invader', 'Assets/alienLevel1.png');
  game.load.image('kaboom', 'Assets/Explosion.png');
  game.load.image('heart', 'Assets/heartLife.png');

}

function create () {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.add.sprite(0,0, 'background');
  game.add.sprite()

scoreString = 'Score : ';
scoreText = game.add.text(10, 10, scoreString + playerScore, { font: '34px Arial', fill: '#fff' });

lives = game.add.group();
game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
stateText.anchor.setTo(0.5, 0.5);
stateText.visible = false;

  player = game.add.sprite(game.world.centerX, game.world.centerY, 'spaceship');
  game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
  player.anchor.setTo(0.5, 0.5);
  player.body.collideWorldBounds = true;
  player.body.immovable = true;
  player.body.allowRotation = false;

  alien1 = game.add.group();
  alien1.enableBody = true;
  alien1.physicsBodyType = Phaser.Physics.ARCADE;
  alien1 = game.add.sprite(600, 100, 'alienLvl1');
  alien1 = game.add.sprite(600, 490, 'alienLvl1');
  alien1 = game.add.sprite(150, 490, 'alienLvl1');


  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;

  for (var i = 0; i < 3; i++)
{
    var heart = lives.create(game.world.width - 100 + (30 * i), 60, 'heart');
    heart.anchor.setTo(0.5, 0.5);
    heart.alpha = 0.4;
}

  bullets.createMultiple(50, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);

  explosions = game.add.group();
  explosions.createMultiple(30, 'kaboom');
  explosions.forEach(setupInvader, this);

  fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  createAlien1();


for (var i = 0; i < 3; i++)
{
    var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
    ship.anchor.setTo(0.5, 0.5);
    ship.angle = 90;
    ship.alpha = 0.4;
}

function createAlien1() {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var alien;
            if (alien) {
            alien1.create(48, 50, 'invader');
            alien.anchor.setTo(0.5, 0.5);
            alien.play('fly');
            alien.body.moves = true;
            alien.name = 'alien' + x.toString() + y.toString();
            alien.checkWorldBounds = true;
            alien.body.velocity.y = 50 + Math.random();
          }
        }

    }

    alien1.x = 100;
    alien1.y = 50;


  var tween = game.add.tween(alien1).to( { y: 250, x: 370 }, 3000, Phaser.Easing.Linear.None, true, 0, 0.5, true);

  tween.onLoop.add(descend, this);
  }

}


function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}

function descend() {

    alien1.y += 10;
    alien1.x += 10;

}

function update () {

  player.rotation = game.physics.arcade.angleToPointer(player);

  if (game.input.activePointer.isDown)
  {
      fire();
  }

  game.physics.arcade.overlap(bullets, alien1, collisionHandler, null, this);
  game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);


}

function fire() {

    if (game.time.now > bulletTime)
    {

        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;game.physics.arcade.moveToPointer(bullet, 300);
            bulletTime = game.time.now + 250;
        }
    }


}

function collisionHandler (bullet, alien) {


    bullet.kill();
    alien.kill();


    var explosion = explosions.getFirstExists(false);
    if (explosion) {
    explosion.reset(alien.body.x, alien.body.y);
    explosion.play('kaboom', 30, false, true);
  }


    if (alien1.countLiving() == 0)
    {
      playerScore += 1000;
      scoreText.text = scoreString + playerScore;


      stateText.text = " You Won, \n Click to restart";
      stateText.visible = true;

      game.input.onTap.addOnce(restart,this);
  }

}


function enemyHitsPlayer (player,alien1) {

    bullet.kill();

    live = lives.getFirstAlive();

    if (live)
    {
        live.kill();
    }

    var explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);

    if (lives.countLiving() < 1)
    {
        player.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        game.input.onTap.addOnce(restart,this);
    }

}

function restart () {

    lives.callAll('revive');
    alien1.removeAll();
    createAlien1();
    player.revive();
    stateText.visible = false;

}

//https://phaser.io/examples/v2/input/follow-mouse
//https://phaser.io/examples/v2/arcade-physics/shoot-the-pointer
//https://phaser.io/examples/v2/games/invaders
