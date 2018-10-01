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
        if (!this.exploding)
        {
            if (this.blinkOn)
            {
                this.ship.move();
                this.ship.drawLaser();
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
                        {this.ship.explodeShip();}
                }
            }
        } else {
            this.ship.drawShipExplode();
            this.ship.explodeTime--;
            if(this.ship.explodeTime == 0)
            {
                this.ship = new Ship();
            }
        }
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