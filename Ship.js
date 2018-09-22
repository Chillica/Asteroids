class Ship {
    constructor(shipname){
        this.shipname = shipname;
        this.pos = new Point;
        this.pos_delta = new Point;
        this.heading = 0.0;
        this.acceleration = 0.0;
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
    set heading(value)
    {
        if(typeof value == double)
            this.heading = value;
        else
            throw "Cannot set value it is the wrong datatype";
    }
    set acceleration(value)
    {
        if(typeof value == double)
        this.acceleration = value;
        else
        throw "Cannot set value it is the wrong datatype";
    }
    set json(val) { this.json = JSON.PARSE; }
    
    get pos() { return this.pos; }
    get pos_delta() { return this.pos_delta; }
    get heading() { return this.heading; }
    get acceleration() { return this.acceleration; }
    get json()
    {
        return json = {
            "${this.shipname}": {
                "pos_delta": {
                    "x": this.pos_delta.x,
                    "y": this.pos_delta .y
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