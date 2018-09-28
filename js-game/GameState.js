class GameState {
    constructor () {
        this.ship = new Ship("myShip");
        this.enemy = new Ship("enemy", "red");
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