class Point {
    constructor() {
        this.x = 0.0;
        this.y = 0.0;
    }
    set x(value)
    {
        if (typeof value == double)
            thix.x = value;
        else
            throw "Cannot set value it is the wrong datatype";
    }
    set y(value)
    {
        if (typeof value == double)
        this.y = value;
        else
        throw "Cannot set value it is the wrong datatype";
    }
    get x(){ return this.x; }
    get y() { return this.y; }
}
