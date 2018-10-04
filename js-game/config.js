const FPS = 30; // frames per second default 30
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction) default 0.7
const GAME_LIVES = 3;

const SHIP_NAME = "myShip";
const SHIP_COLOR = "white";
const ENEMY_SHIP_NAME = "enemy";
const ENEMY_SHIP_COLOR = "red";

const SHIP_SIZE = 30; // ship height in pixels default 30
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second default 5
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
const TURN_SPEED = 360; // turn speed in degrees per second default 360

const LASER_DIST = 0.6; // max distance laser can travel as fraction of screen width default 0.6
const LASER_EXPLODE_DUR = 0.1; // duration of the lasers' explosion in seconds default 0.1
const LASER_SPD = 500; // speed of lasers in pixels per second default 600
const LASER_MAX = 20; // maximum number of lasers on screen at once default 10
const LASER_UNLIMITED = false; // true or false value use in conjunction with LASER_MAX to make always shoot.

const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const ROID_NUM = 2; // starting number of asteroids
const ROID_SIZE = 100; // starting size of asteroids in pixels
const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ROID_VERT = 10; // average number of vertices on each asteroid

const TEXT_FADE_TIME = 2.5; // text fade time in seconds
const TEXT_SIZE = 40; // text font height in pixels