class Ship {
    constructor(ship, color) {
        this.name = ship;
        this.pos = new Point;
        this.pos_delta = new Point;
        this.heading = 90 / 180 * Math.PI;
        this.radius = SHIP_SIZE / 2;
        this.rotation = 0;

        this.blinkNum = Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR);
        this.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
        this.explodeTime = 0;

        this.lasers = [];
        this.canShoot = true;
        this.thrusting = false;
        this.thrust = new Point;
        this.color = color;
        this.json = {};

        // Making the position the center on start of ship
        this.pos.x = canv.width / 2;
        this.pos.y = canv.height / 2;
    }
    drawShip() {
        if(this.color === undefined)
            ctx.strokeStyle = "white";
        else
            ctx.strokeStyle = this.color;
        ctx.lineWidth = SHIP_SIZE / 20;
        ctx.beginPath();
        ctx.moveTo (
            this.pos.x + 4 / 3 * this.radius * Math.cos(this.heading),
            this.pos.y - 4 / 3 * this.radius * Math.sin(this.heading)
        );
        ctx.lineTo (
            this.pos.x - this.radius * (2 / 3 * Math.cos(this.heading) + Math.sin(this.heading)),
            this.pos.y + this.radius * (2 / 3 * Math.sin(this.heading) - Math.cos(this.heading))
        );
        ctx.lineTo(
            this.pos.x - this.radius * (2 / 3 * Math.cos(this.heading) - Math.sin(this.heading)),
            this.pos.y + this.radius * (2 / 3 * Math.sin(this.heading) + Math.cos(this.heading))
        );
        ctx.closePath();
        ctx.stroke();
    }
    drawShipExplode() {
        // draw the explosion (concentric circles of different colours)
        ctx.fillStyle = "darkred";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius * 1.7, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius * 1.4, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius * 1.1, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius * 0.8, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius * 0.5, 0, Math.PI * 2, false);
        ctx.fill();
    }
    drawShipTail(){
        ctx.fillStyle = "red";
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = SHIP_SIZE / 10;
        ctx.beginPath();
        ctx.moveTo(
            this.pos.x - this.radius * (2/3 * Math.cos(this.heading) + 0.5 * Math.sin(this.heading)),
            this.pos.y + this.radius * (2/3 * Math.sin(this.heading) - 0.5 * Math.cos(this.heading))
        );
        ctx.lineTo(
            this.pos.x - this.radius * 5/3 * Math.cos(this.heading),
            this.pos.y + this.radius * 5/3 * Math.sin(this.heading),
        );
        ctx.lineTo(
            this.pos.x - this.radius * (2/3 * Math.cos(this.heading) - 0.5 * Math.sin(this.heading)),
            this.pos.y + this.radius * (2/3 * Math.sin(this.heading) + 0.5 * Math.cos(this.heading))
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    explodeShip() {
        this.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
    }
    move() {
        if (this.thrusting) {
            this.thrust.x += SHIP_THRUST * Math.cos(this.heading) / FPS;
            this.thrust.y -= SHIP_THRUST * Math.sin(this.heading) / FPS;
            this.drawShipTail();
            
        } else {
            this.thrust.x -= FRICTION * this.thrust.x / FPS;
            this.thrust.y -= FRICTION * this.thrust.y / FPS;
        }
        this.drawShip();
        
        this.heading += this.rotation;
        this.pos.x += this.thrust.x;
        this.pos.y += this.thrust.y;     

        if (this.pos.x < 0 - this.radius){
            this.pos.x = canv.width + this.radius;
        } else if (this.pos.x > canv.width + this.radius) {
            this.pos.x = 0 - this.radius;
        }

        if (this.pos.y < 0 - this.radius){
            this.pos.y = canv.height + this.radius;
        } else if (this.pos.y > canv.height + this.radius) {
            this.pos.y = 0 - this.radius;
        }
    }
    shootLaser() {
        // create the laser object
        if (this.canShoot && this.lasers.length < LASER_MAX) {
            var laser = new Bullet();
            laser.pos.x = this.pos.x + 4 / 3 * this.radius * Math.cos(this.heading);
            laser.pos.y = this.pos.y - 4 / 3 * this.radius * Math.sin(this.heading);
            laser.pos_delta.x = LASER_SPD * Math.cos(this.heading) / FPS;
            laser.pos_delta.y = -LASER_SPD * Math.sin(this.heading) / FPS;
            laser.dist = 0;
            laser.ttl = 0;

            this.lasers.push(laser);
        }
        // prevent further shooting
        this.canShoot = false;
    }
    drawLaser() {
        // draw the lasers
        for (var i = 0; i < this.lasers.length; i++) {
            if (this.lasers[i].ttl == 0) {
                ctx.fillStyle = "salmon";
                ctx.beginPath();
                ctx.arc(this.lasers[i].pos.x, this.lasers[i].pos.y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
                ctx.fill();
            } else {
                // draw the eplosion
                ctx.fillStyle = "orangered";
                ctx.beginPath();
                ctx.arc(this.lasers[i].pos.x, this.lasers[i].pos.y, this.radius * 0.75, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "salmon";
                ctx.beginPath();
                ctx.arc(this.lasers[i].pos.x, this.lasers[i].pos.y, this.radius * 0.5, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "pink";
                ctx.beginPath();
                ctx.arc(this.lasers[i].pos.x, this.lasers[i].pos.y, this.radius * 0.25, 0, Math.PI * 2, false);
                ctx.fill();
            }
        }
        // move the lasers
        for (var i = this.lasers.length - 1; i >= 0; i--) {
            
            // check distance travelled
            if (this.lasers[i].dist > LASER_DIST * canv.width) {
                this.lasers.splice(i, 1);
                continue;
            }

            // handle the explosion
            if (this.lasers[i].ttl > 0) {
                this.lasers[i].ttl--;

                // destroy the laser after the duration is up
                if (this.lasers[i].ttl == 0) {
                    this.lasers.splice(i, 1);
                    continue;
                }
            } else {
                // move the laser
                this.lasers[i].pos.x += this.lasers[i].pos_delta.x;
                this.lasers[i].pos.y += this.lasers[i].pos_delta.y;

                // calculate the distance travelled
                this.lasers[i].dist += Math.sqrt(Math.pow(this.lasers[i].pos_delta.x, 2) + Math.pow(this.lasers[i].pos_delta.y, 2));
            }

            // handle edge of screen
            if (this.lasers[i].pos.x < 0) {
                this.lasers[i].pos.x = canv.width;
            } else if (this.lasers[i].pos.x > canv.width) {
                this.lasers[i].pos.x = 0;
            }
            if (this.lasers[i].pos.y < 0) {
                this.lasers[i].pos.y = canv.height;
            } else if (this.lasers[i].pos.y > canv.height) {
                this.lasers[i].pos.y = 0;
            }
        }

    }
    json() {
        return json = {
            "${this.shipname}": {
                "pos": {
                    "x": this.pos.x,
                    "y": this.pos.y
                },
                "pos_delta": {
                    "x": this.thrust.x,
                    "y": this.thrust.y
                },
                "heading": this.heading,
                "acceleration": (this.thrust.x + this.thrust.y) / 2
            }
        };
    }
}