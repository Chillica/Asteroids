class Bullet {
    constructor() {
        this.pos = new Point;
        this.pos_delta = new Point;
        this.ttl = 0.0;
    }
    set pos(point)
    {
        if (typeof point == Point)
            this.pos = point;
        else
            throw "Cannot set value it is the wrong datatype";
    }
    set pos_delta(point) 
    {
        if (typeof point == Point)
            this.pos_delta = point;
        else
            throw "Cannot set value it is the wrong datatype";    
    }
    set ttl(value)
    {
        if(typeof value == double)
            this.ttl = value;
        else
            throw "Cannot set value it is the wrong datatype";
    }
    set json(val) { this.json = JSON.PARSE; }
    get pos() { return this.pos; }
    get pos_delta() { return this.pos_delta; }
    get ttl() { return this.ttl; }
    get json() {
        return this.json = {
            "pos_delta": {
                "x": this.pos_delta.x,
                "y": this.pos_delta .y
            },
            "pos": {
                "x": this.pos.x,
                "y": this.pos.y
            },
            "ttl": this.ttl
        }
    }
}