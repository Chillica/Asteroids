class GameState {
    constructor () {
        this.ship = new Ship(SHIP_NAME, SHIP_COLOR);
        this.enemy = new Ship(ENEMY_SHIP_NAME, ENEMY_SHIP_COLOR);
        this.asteroids = [];
        this.enemyjson = {};
        this.blinkOn = true;
        this.exploding = false;
    }
    createAsteroidBelt() {
        for (var i = 0; i < ROID_NUM; i++) {
            var asteroid = new Asteroid();
            // random asteroid location (not touching spaceship)
            while (this.distBetweenPoints(this.ship.pos.x, this.ship.pos.y, asteroid.pos.x, asteroid.pos.y) < ROID_SIZE * 2 + this.ship.radius)
            {
                asteroid.newPos();
            }
            this.asteroids.push(asteroid);
        }
    }
    moveAsteroids() {
        for (var j=0; j < this.asteroids.length; j++)
        {
            this.asteroids[j].move();
        }
    }
    distBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    resetState() {
        this.blinkOn = this.ship.blinkNum % 2 == 0;
        this.exploding = this.ship.explodeTime > 0;
    }
    collide() {
        
        //this.destroyAsteroid();
        this.ship.thrustMove();
        this.ship.drawLaser();
        this.laserHits();

        if (!this.exploding)      
        {
            if (this.blinkOn)
            {
                this.ship.drawShip();
            }
            if(this.ship.blinkNum > 0)
            {
                this.ship.blinkTime--;
                if(this.ship.blinkTime == 0)
                {
                    this.ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
                    this.ship.blinkNum--;
                }
            }
            if (this.ship.blinkNum == 0)
            {
                for (var i = 0; i < this.asteroids.length; i++)
                {
                    if (this.distBetweenPoints(this.ship.pos.x, this.ship.pos.y, this.asteroids[i].pos.x, this.asteroids[i].pos.y) < this.ship.radius + this.asteroids[i].radius)
                    {
                        this.ship.explodeShip();
                        this.destroyAsteroid(i);
                        break;
                    }
                }
            }
            this.ship.move();
        } else {
            this.ship.drawShipExplode();
            this.ship.explodeTime--;
            if(this.ship.explodeTime == 0)
            {
                this.ship = new Ship();
            }
        }
        this.ship.handleScreenEdge();
        this.moveAsteroids();
    }
    laserHits()
    {
        // detect laser hits on asteroids
        var ax, ay, ar, lx, ly;
        for (var i = this.asteroids.length - 1; i >= 0; i--) {

            // grab the asteroid properties
            ax = this.asteroids[i].pos.x;
            ay = this.asteroids[i].pos.y;
            ar = this.asteroids[i].radius;

            // loop over the lasers
            for (var j = this.ship.lasers.length - 1; j >= 0; j--) {

                // grab the laser properties
                lx = this.ship.lasers[j].pos.x;
                ly = this.ship.lasers[j].pos.y;

                // detect hits
                if (this.ship.lasers[j].ttl == 0 && this.distBetweenPoints(ax, ay, lx, ly) < ar) {
                    this.destroyAsteroid(i);
                    this.ship.lasers[j].ttl = Math.ceil(LASER_EXPLODE_DUR * FPS);
                    break;
                }
            }
        }
    }
    destroyAsteroid(j)
    {
        // destroy the asteroid and activate the laser explosion
        var x = this.asteroids[j].pos.x;
        var y = this.asteroids[j].pos.y;
        var r = this.asteroids[j].radius;

        // split the asteroid in two if necessary
        if (r == Math.ceil(ROID_SIZE / 2)) { // large asteroid
            var roid = new Asteroid();
            roid.setArea(x, y, Math.ceil(ROID_SIZE / 4));
            this.asteroids.push(roid);

            var roid = new Asteroid();
            roid.setArea(x, y, Math.ceil(ROID_SIZE / 4));
            this.asteroids.push(roid);

        } else if (r == Math.ceil(ROID_SIZE / 4)) { // medium asteroid
            var roid = new Asteroid();
            roid.setArea(x, y, Math.ceil(ROID_SIZE / 8));
            this.asteroids.push(roid);

            var roid = new Asteroid();
            roid.setArea(x, y, Math.ceil(ROID_SIZE / 8));
            this.asteroids.push(roid);
        }

        // destroy the asteroid
        this.asteroids.splice(j, 1);
    }
    concatJSON(arry) {
        var val = "";
        for (i = 0; i < this.arry.length; i++) {
            if (i == this.arry.length - 1)
                val.concat(this.arry[i].json);
            else
                val.concat(this.arry[i].json + ",");
        }
        return JSON.parse(val);
    }
    get gamejson() {
        return json = {
            this:myShip.json,
            this:enemy.json,
            "asteroids": [
                concatJSON(this.asteroids)
            ],
            "bullets": [
                this.concatJSON(this.myShip.lasers.concat(this.enemy.lasers))
            ]
        }
    }
}