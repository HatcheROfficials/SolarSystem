const canvas = document.getElementById("world");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

canvas.style.transform = "translate(" + -canvas.width / 2 + "px," + -canvas.height / 2 + "px)";

function init() {
    window.requestAnimationFrame(draw);
}

const sunR = height / 50; // Radius of sun is the unit all length will be defined

class planet {
    radius; // planet radius in terms of suns radius
    orbit; // length of orbit in terms of suns radius
    angularVel_sun; // Rotations around sun in one minute
    color;
    moons;

    constructor(radius, orbit, angularVel_sun, color) {
        this.radius = radius;
        this.orbit = orbit;
        this.angularVel_sun = angularVel_sun;
        this.color = color;
        this.moons = [];
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    move() {
        ctx.translate(this.orbit, 0);
    }
}

class moon {
    radius; // planet radius in terms of suns radius
    orbit; // length of orbit in terms of suns radius
    angularVel_planet; // Rotations around sun in one minute
    color;

    constructor(radius, orbit, angularVel_planet, color) {
        this.radius = radius;
        this.orbit = orbit;
        this.angularVel_planet = angularVel_planet;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    move() {
        ctx.translate(this.orbit, 0);
    }
}

// define planets
var planets = []; // array containing planet objects

// earth
var earth = new planet(sunR / 3, sunR * 3, 5, "blue");
planets.push(earth);

// earth moon
var earth_moon = new moon(sunR/10, sunR/1.5, 6, "grey");
earth.moons.push(earth_moon);

// mars
var mars = new planet(sunR / 3.5, sunR * 4, 8, "red");
planets.push(mars);

// mars moons
var mars_moon1 = new moon(sunR/10, sunR/2.2, 12, "grey");
mars.moons.push(mars_moon1);

var mars_moon2 = new moon(sunR/10, sunR/1.8, 6, "grey");
mars.moons.push(mars_moon2);

// jupiter
var jupiter = new planet(sunR / 1.5, sunR * 8, 3, "brown");
planets.push(jupiter);

// jupiter moons
var jupiter_moon1 = new moon(sunR / 7, sunR, 5, "grey");
jupiter.moons.push(jupiter_moon1);

var jupiter_moon2 = new moon(sunR / 8, sunR*1.2, 4.5, "grey");
jupiter.moons.push(jupiter_moon2);

var jupiter_moon3 = new moon(sunR / 5, sunR*1.5, 2, "grey");
jupiter.moons.push(jupiter_moon3);

// saturn
var saturn = new planet(sunR / 1.8, sunR * 12, 4, "rgb(234,214,184)");
planets.push(saturn);

// saturn moons
var saturn_moon1 = new moon(sunR / 5, sunR*1.5, 2, "grey");
saturn.moons.push(saturn_moon1);

var saturn_moon2 = new moon(sunR / 5, sunR*2.5, 5, "grey");
saturn.moons.push(saturn_moon2);

// uranus
var uranus = new planet(sunR / 2, sunR * 18, 4.5, "rgb(200,150,184)");
planets.push(uranus);

// uranus moons
var uranus_moon1 = new moon(sunR / 8, sunR*0.8, 15, "grey");
uranus.moons.push(uranus_moon1);

var uranus_moon2 = new moon(sunR / 4.5, sunR*1.5, 7, "grey");
uranus.moons.push(uranus_moon2);

var uranus_moon3 = new moon(sunR / 6, sunR*1.2, 3, "grey");
uranus.moons.push(uranus_moon3);

// neptune
var neptune = new planet(sunR / 2.5, sunR * 23, 2, "rgb(230,240,150)");
planets.push(neptune);

// neptune moons
var neptune_moon = new moon(sunR / 6, sunR*1.2, 3, "grey");
neptune.moons.push(neptune_moon);

function draw() {
    const time = new Date();

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, width, height); // clear canvas

    ctx.save(); //origin at 0,0
    ctx.translate(width / 2, height / 2); // bringing origin to center

    // sun
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(0, 0, sunR, 0, 2 * Math.PI);
    ctx.fill();

    for (p of planets) {
        // drawing the planets
        ctx.save();
        ctx.rotate(((2 * Math.PI) / (60 / p.angularVel_sun)) * time.getSeconds() +
            ((2 * Math.PI) / (60000 / p.angularVel_sun)) * time.getMilliseconds());
        p.move();
        p.draw();

        for (m of p.moons) {
            ctx.save();
            ctx.rotate(((2 * Math.PI) / (60 / m.angularVel_planet)) * time.getSeconds() +
                ((2 * Math.PI) / (60000 / m.angularVel_planet)) * time.getMilliseconds());
            m.move();
            m.draw();
            ctx.restore();
        }

        ctx.restore();

        // drawing the orbits
        ctx.strokeStyle = "rgba(255,0,0,0.4)";
        ctx.beginPath();
        ctx.arc(0, 0, p.orbit, 0, 2 * Math.PI);
        ctx.stroke();
    }

    ctx.restore();

    window.requestAnimationFrame(draw);
}

init();
