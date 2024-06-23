var Snake = (function() {
  var canv, ctx;
  var tileCount = 20;
  var gridSize = 400 / tileCount;
  var player = { x: 10, y: 10 };
  var fruit = { x: 15, y: 15 };
  var trail = [];
  var tail = 5;

  function setup() {
    canv = document.getElementById('gc');
    ctx = canv.getContext('2d');
    document.addEventListener('keydown', keyPush);
    setInterval(game, 1000 / 15);
  }

  function game() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canv.width, canv.height);

  }
  
function keyPush(evt) {
    switch(evt.keyCode) {
        case 37:
            player.x--;
            break;
        case 38:
            player.y--;
            break;
        case 39:
            player.x++;
            break;
        case 40:
            player.y++;
            break;
    }
}
  window.onload = setup;
})();