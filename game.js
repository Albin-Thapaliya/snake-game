var Snake = (function () {

  const INITIAL_TAIL = 4;
  var fixedTail = true;

  var intervalID;

  var tileCount = 10;
  var gridSize = 400/tileCount;

  const INITIAL_PLAYER = { x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) };

  var velocity = { x:0, y:0 };
  var player = { x: INITIAL_PLAYER.x, y: INITIAL_PLAYER.y };

  var walls = false;

  var fruit = { x:1, y:1 };

  var ActionEnum = { 'none':0, 'up':1, 'down':2, 'left':3, 'right':4 };
  Object.freeze(ActionEnum);
  var lastAction = ActionEnum.none;

  function setup () {
    canv = document.getElementById('gc');
    ctx = canv.getContext('2d');

    game.reset();
  }

  var game = {

    reset: function () {
      ctx.fillStyle = 'grey';
      ctx.fillRect(0, 0, canv.width, canv.height);

      tail = INITIAL_TAIL;
      points = 0;
      velocity.x = 0;
      velocity.y = 0;
      player.x = INITIAL_PLAYER.x;
      player.y = INITIAL_PLAYER.y;
      // this.RandomFruit();
      reward = -1;

      lastAction = ActionEnum.none;

      trail = [];
      trail.push({ x: player.x, y: player.y });
      // for(var i=0; i<tail; i++) trail.push({ x: player.x, y: player.y });
    },

    action: {
      up: function () {
        if (lastAction != ActionEnum.down){
          velocity.x = 0;
          velocity.y = -1;
        }
      },
      down: function () {
        if (lastAction != ActionEnum.up){
          velocity.x = 0;
          velocity.y = 1;
        }
      },
      left: function () {
        if (lastAction != ActionEnum.right){
          velocity.x = -1;
          velocity.y = 0;
        }
      },
      right: function () {
        if (lastAction != ActionEnum.left){
          velocity.x = 1;
          velocity.y = 0;
        }
      }
    },
    log: function () {
      console.log('====================');
      console.log('x:' + player.x + ', y:' + player.y);
      console.log('tail:' + tail + ', trail.length:' + trail.length);
    },

    loop: function () {

      reward = -0.1;

      function DontHitWall () {
        if(player.x < 0) player.x = tileCount-1;
        if(player.x >= tileCount) player.x = 0;
        if(player.y < 0) player.y = tileCount-1;
        if(player.y >= tileCount) player.y = 0;
      }

      var stopped = velocity.x == 0 && velocity.y == 0;

      player.x += velocity.x;
      player.y += velocity.y;

      if (velocity.x == 0 && velocity.y == -1) lastAction = ActionEnum.up;
      if (velocity.x == 0 && velocity.y == 1) lastAction = ActionEnum.down;
      if (velocity.x == -1 && velocity.y == 0) lastAction = ActionEnum.left;
      if (velocity.x == 1 && velocity.y == 0) lastAction = ActionEnum.right;

  function keyPush (evt) {
    switch(evt.keyCode) {
      case 37: //left
      game.action.left();
      evt.preventDefault();
      break;

      case 38: //up
      game.action.up();
      evt.preventDefault();
      break;

      case 39: //right
      game.action.right();
      evt.preventDefault();
      break;

      case 40: //down
      game.action.down();
      evt.preventDefault();
      break;

      case 32: //space
      Snake.pause();
      evt.preventDefault();
      break;

      case 27: //esc
      game.reset();
      evt.preventDefault();
      break;
    }
  }
Snake.start(8);
Snake.setup.keyboard(true);
Snake.setup.fixedTail(false);
