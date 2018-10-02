class Asteroid {
    constructor() {
        this.lvlMult = 1;
        this.pos = new Point();
        this.pos_delta = new Point();
        this.pos.x = Math.floor(Math.random() * canv.width);
        this.pos.y = Math.floor(Math.random() * canv.height);
        this.pos_delta.x = Math.random() * ROID_SPD * this.lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1);
        this.pos_delta.y = Math.random() * ROID_SPD * this.lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1);
        this.radius = ROID_SIZE / 2;
        this.heading = Math.random() * Math.PI * 2;
        this.offs = [];
        this.vert = Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2);
        // populate the offsets array
        for (var i = 0; i < this.vert; i++) {
            this.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
        }
    }
    setArea(xpos, ypos, astradius) {
        this.pos.x = xpos;
        this.pos.y = ypos;
        this.radius = astradius;
    }
    newPos() {
        this.pos.x = Math.floor(Math.random() * canv.width);
        this.pos.y = Math.floor(Math.random() * canv.height);
    }

    move() {

        this.drawAsteroids();

         // move the asteroid
         this.pos.x += this.pos_delta.x;
         this.pos.y += this.pos_delta.y;

         // handle asteroid edge of screen
         if (this.pos.x < 0 - this.radius) {
             this.pos.x = canv.width + this.radius;
         } else if (this.pos.x > canv.width + this.radius) {
             this.pos.x = 0 - this.radius
         }
         if (this.pos.y < 0 - this.radius) {
             this.pos.y = canv.height + this.radius;
         } else if (this.pos.y > canv.height + this.radius) {
             this.pos.y = 0 - this.radius
         }
    }
    drawAsteroids() {
        // draw the asteroids
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = SHIP_SIZE / 20;
            
        // draw the path
        ctx.beginPath();
        ctx.moveTo(
            this.pos.x + this.radius * this.offs[0] * Math.cos(this.heading),
            this.pos.y + this.radius * this.offs[0] * Math.sin(this.heading)
        );

        // draw the polygon
        for (var j = 1; j < this.vert; j++) {
            ctx.lineTo(
                this.pos.x + this.radius * this.offs[j] * Math.cos(this.heading + j * Math.PI * 2 / this.vert),
                this.pos.y + this.radius * this.offs[j] * Math.sin(this.heading + j * Math.PI * 2 / this.vert)
            );
        }
        ctx.closePath();
        ctx.stroke();
    }
    json() {
        return this.json = {
            "pos": {
                "x": this.pos.x,
                "y": this.pos.y
            },
            "pos_delta": {
                "x": this.pos_delta.x,
                "y": this.pos_delta.y
            },
            "size": this.size
        }
    }
}