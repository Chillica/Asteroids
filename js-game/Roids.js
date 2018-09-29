
const ROIDS_NUM = 3; // Starting number of asteroids
const ROIDS_SIZE = 100; // Starting size of asteroids in pixels
const ROIDS_SPD = 50; // Max starting speed of asteroids in pixels per second.
const ROIDS_VERT = 10; // average number of verticies on each asteroid
const ROIDS_JAG = 0.4 // Jaggedness of the asteroids (0 = non, 1 = lots)

// Set up Asteroids
var roids = [];
createAsteroidBelt();

function createAsteroidBelt(){
    roids = [];

    var x, y;

    for (var i = 0; i < ROIDS_NUM; i++){
        do {
            x = Math.floor(Math.random() * canv.width);
            y = Math.floor(Math.random() * canv.height);
    
        } while (distanceBetweenPoints(ship.x, ship.y, x, y) < ROIDS_SIZE * 2 + ship.r);
        
        roids.push(newAsteroid(x, y));
    }
}

//Function used so that the asteroids do not spawn on the space ship in the beginning of the game.
function distanceBetweenPoints(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2 - y1, 2));
}

function newAsteroid(x, y){
    var roid = {
        x: x,
        y: y,
        xv: Math.random() * ROIDS_SPD / FPS *(Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ROIDS_SPD / FPS *(Math.random() < 0.5 ? 1 : -1),
        r: ROIDS_SIZE / 2,
        a: Math.random() * Math.PI * 2, // in radians
        vert: Math.floor(Math.random() * (ROIDS_VERT + 1) + ROIDS_VERT / 2),
        offs: [] 
    };

    // create the vertex offsets array
    for (var i = 0; i < roid.vert; i++){
        roid.offs.push(Math.random() * ROIDS_JAG * 2 + 1 - ROIDS_JAG);
    }

    return roid;
}



//Place this in the update function:

// Draw asteroids function
ctx.strokeStyle = "slategrey";
ctx.lineWidth = SHIP_SIZE / 20;
var x, y, r, a, vert, offs;
for( var i = 0; i < roids.length; i++){
     
    // get the asteroid properties
    x = roids[i].x;
    y = roids[i].y;
    r = roids[i].r;
    a = roids[i].a;
    vert = roids[i].vert;
    offs = roids[i].offs;

    // draw a path
    ctx.beginPath();
    ctx.moveTo(
        x + r * offs[0] * Math.cos(a),
        y + r * offs[0] * Math.sin(a)
    );

    // draw a polygon
    for (var j = 1; j < vert; j++){
        ctx.lineTo(
            x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
            y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
        );
    }

    ctx.closePath();
    ctx.stroke();
    // move the asteroid
    roids[i].x += roids[i].xv;
    roids[i].y += roids[i].yv;

    // handle edge of screen
    if (roids[i].x < 0 - roids[i].r){
        roids[i].x = canv.width + roids[i].r;
    } else if (roids[i].x > canv.width + roids[i].r) {
        roids[i].x = 0 - roids[i].r
    }

    if (roids[i].y < 0 - roids[i].r){
        roids[i].y = canv.width + roids[i].r;
    } else if (roids[i].y > canv.height + roids[i].r) {
        roids[i].y = 0 - roids[i].r
    }


}