class GameState {
    constructor () {
        this.myShip = new Ship("myShip");
        this.enemy = new Ship("enemy");
        this.bullets = [];
        this.asteroids = [];
    }

    get gamejson() {
        return json = {
            this:myShip.json,
            this:enemy.json,
            "asteroids": [
                concatJSON(this.asteroids)
            ],
            "bullets": [
                concatJSON(this.bullets)
            ]
        }
    }
    set enemyjson(val)
    {
        this.enemy.json = val;
    }
}