var menuState = {
  create: function() {
    title = game.add.text(game.world.centerX, game.world.centerY-100, 'Missile Defense', {font: '50px Arial', fill: '#00ff00'});
    title.anchor.setTo(0.5, 0.5);

    help = game.add.text(80, game.world.centerY+50, '', {font: '25px Arial', fill: '#ffffff'});
    helpText = 'Use the mouse to aim your ships gun at the aliens. \n';
    helpText += 'Protect your ship until the rescue team arrives.';
    help.text = helpText;

    instructions = game.add.text(80, game.world.height-80, 'Press the "BEGIN" button to start', {font: '25px Arial', fill: '#ffffff'});

    button = game.add.button(game.world.centerX, game.world.centerY, 'button');
    button.anchor.setTo(0.5,0.5);
    button.onInputUp.add(this.start);
    text = game.add.text(button.x,button.y,'BEGIN');
    text.anchor.setTo(0.5,0.5);
  },

  start: function() {
    game.global.score = 0;
    game.global.wave = 0;
    game.state.start('level');
  },
};
