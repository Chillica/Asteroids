class Bullet {
    constructor() {
        this.pos = new Point;
        this.pos_delta = new Point;
        this.dist = 0;
        this.ttl = 0.0;
    }
    getjson() {
        return {
            "pos": {
                "x": this.pos.x,
                "y": this.pos.y
            },
            "pos_delta": {
                "x": this.pos_delta.x,
                "y": this.pos_delta.y
            },
            "ttl": this.ttl
        };
    }
}