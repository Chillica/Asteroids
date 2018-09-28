class Asteroid {
    constructor() {
        this.pos = new Point();
        this.pos_delta = new Point();
        this.size = 0.0;
    }
    json() {
        return this.json = {
            "pos_delta": {
                "x": this.pos_delta.x,
                "y": this.pos_delta .y
            },
            "pos": {
                "x": this.pos.x,
                "y": this.pos.y
            },
            "size": this.size
        }
    }
}