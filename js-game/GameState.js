class GameState {
    constructor () {
        this.ship = new Ship(SHIP_NAME, SHIP_COLOR);
        this.enemy = new Ship(ENEMY_SHIP_NAME, ENEMY_SHIP_COLOR);
        this.asteroids = [];
        this.enemyjson = {};
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
    distBetweenPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
}