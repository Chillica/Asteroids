class Asteroid {
    constructor() {
        this.pos = new Point;
        this.pos_delta = new Point;
        this.size = 0.0;
        this.json = {};
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
    set size(value)
    {
        if(typeof value == double)
            this.size = value;
        else
            throw "Cannot set value it is the wrong datatype";
    }
    set json(val) { this.json = JSON.PARSE; }
    get pos() { return this.pos; }
    get pos_delta() { return this.pos_delta; }
    get size() { return this.size; }
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
            "size": this.size
        }
    }
}