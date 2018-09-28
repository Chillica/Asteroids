class Ship {
    constructor(ship){
        this.shipname = ship;
        this.pos = new Point;
        this.pos_delta = new Point;
        this.heading = 0.0;
        this.acceleration = 0.0;
        this.json = {};
    }
    json()
    {
        return json = {
            "${this.shipname}": {
                "pos_delta": {
                    "x": this.pos_delta.x,
                    "y": this.pos_delta.y
                },
                "pos": {
                    "x": this.pos.x,
                    "y": this.pos.y
                },
                "heading": this.heading,
                "accleration": this.acceleration
            }
        };
    }
}