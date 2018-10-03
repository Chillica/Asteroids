class GameState {
    constructor () {
        this.ship = new Ship(SHIP_NAME, SHIP_COLOR);
        this.enemy = new Ship(ENEMY_SHIP_NAME, ENEMY_SHIP_COLOR);
        this.asteroids = [];
        this.enemyjson = {};
        this.blinkOn = true;
        this.exploding = false;
        this.level = 0;
        this.shipdeaths = 0;
        this.textAlpha = 1.0;
        this.lives = GAME_LIVES;
    }
    levelCheck() {
        if (this.asteroids.length == 0)
        {
            this.level += 1;
            this.textAlpha = 1.0;
            this.createAsteroidBelt();
            console.log("Level: " + this.level);
        }
        else if (this.shipdeaths >= GAME_LIVES){
            this.level = 0;
            this.shipdeaths = 0;
            this.asteroids = [];
            this.textAlpha = 1.0;
            this.lives = GAME_LIVES;
            this.createAsteroidBelt();
        }
    }
    drawGameText() {
        var text = "Level " + (this.level + 1);
        // draw the game text
        if (this.textAlpha >= 0) {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "rgba(255, 255, 255, " + this.textAlpha + ")";
            ctx.font = "small-caps " + TEXT_SIZE + "px dejavu sans mono";
            ctx.fillText(text, canv.width / 2, canv.height * 0.75);
            this.textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
        }
        // draw the lives
        var lifeColour;
        for (var i = 0; i < this.lives; i++) {
            lifeColour = this.exploding && i == this.lives - 1 ? "red" : "white";
            this.drawLives(SHIP_SIZE + i * SHIP_SIZE * 1.2, SHIP_SIZE, 0.5 * Math.PI, lifeColour);
        }
    }
    createAsteroidBelt() {
        for (var i = 0; i < ROID_NUM + this.level; i++) {
            var asteroid = new Asteroid();
            // random asteroid location (not touching spaceship)
            asteroid.lvlMult = 1 + 0.2 * this.level;
            console.log("Asteroid Speed " + asteroid.lvlMult);
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
        this.levelCheck();
        this.ship.thrustMove();
        this.ship.drawLaser();
        this.laserHits();
        this.drawGameText();
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
                this.lives -= 1;
                this.ship = new Ship();
                this.shipdeaths += 1;
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
    drawLives(x, y, a, colour = "white") {
        var shipsize = (SHIP_SIZE / 2);
        ctx.strokeStyle = colour;
        ctx.lineWidth = SHIP_SIZE / 20;
        ctx.beginPath();
        ctx.moveTo( // nose of the ship
            x + 4 / 3 * shipsize * Math.cos(a),
            y - 4 / 3 * shipsize * Math.sin(a)
        );
        ctx.lineTo( // rear left
            x - shipsize * (2 / 3 * Math.cos(a) + Math.sin(a)),
            y + shipsize * (2 / 3 * Math.sin(a) - Math.cos(a))
        );
        ctx.lineTo( // rear right
            x - shipsize * (2 / 3 * Math.cos(a) - Math.sin(a)),
            y + shipsize * (2 / 3 * Math.sin(a) + Math.cos(a))
        );
        ctx.closePath();
        ctx.stroke();
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
    gamejson() {
        return {
            "myShip": this.myShip.json(),
            "enemy": this.enemy.json(),
            "asteroids": [
               { "asteroids": concatJSON(this.asteroids) }
            ],
            "bullets": [
                {SHIP_NAME: this.concatJSON(this.myShip.lasers.concat(this.enemy.lasers))}
            ]
        }
    }
}