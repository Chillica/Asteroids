// set up event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
window.addEventListener('resize', resizeCanvas, false);

// set up the game loop
setInterval(update, 1000 / FPS);

var canv = document.getElementById("canvas");
var ctx = canv.getContext("2d");

canv.height = window.innerHeight;
canv.width = window.innerWidth;

function resizeCanvas(){
    canv.height = window.innerHeight;
    canv.width = window.innerWidth;
}

gameState = new GameState();

gameState.createAsteroidBelt();


function keyDown(/** @type {KeyboardEvent} */ ev) {
    switch(ev.keyCode) {
        case 32: // space bar (shoot laser)
            gameState.ship.canShoot = true;
            break;
        case 37: // left arrow (rotate ship left)
            gameState.ship.rotLeft = true;
            break;
        case 38: // up arrow (thrust the ship forward)
            gameState.ship.thrusting = true;
            break;
        case 39: // right arrow (rotate ship right)
            gameState.ship.rotRight = true;
            break;
        case 87:
            gameState.asteroids = [];
            break;
        case 65:
            gameState.ship = new Ship();
            gameState.shipdeaths += 1;
            gameState.lives -= 1;
            break;
        case 68:
            console.log("Game JSON: " + JSON.stringify(gameState.gamejson()));
            break;
        /*case 65:
            ship2.rotation = TURN_SPEED / 180 * Math.PI / FPS;
            break;
        case 87:
            ship2.thrusting = true;
            break;
        case 68:
            ship2.rotation = -TURN_SPEED / 180 * Math.PI / FPS;
            break;
            */
    }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
    switch(ev.keyCode) {
        case 32: // space bar (allow shooting again)
            gameState.ship.canShoot = LASER_UNLIMITED;
            break;
        case 37: // left arrow (stop rotating left)
            gameState.ship.rotLeft = false;
            break;
        case 38: // up arrow (stop thrusting)
            gameState.ship.thrusting = false;
            break;
        case 39: // right arrow (stop rotating right)
            gameState.ship.rotRight = false;
            break;
        /*case 65:
            ship2.rotation = 0;
            break;
        case 87:
            ship2.thrusting = false;
            break;
        case 68:
            ship2.rotation = 0;
            break;
            */
    }
}
function update() {
    gameState.resetState();
    //gameState.enemy.thrusting = true;
    gameState.enemy.canShoot = true;
    gameState.enemy.rotRight = true;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    //gameState.ship.move();
    //gameState.ship.drawLaser();
    gameState.collide();
}