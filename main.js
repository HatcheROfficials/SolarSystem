const canvas = document.getElementById("world");
const width = canvas.width = window.innerWidth/2;
const height = canvas.height = window.innerHeight/2;

canvas.style.transform = "translate(" + -canvas.width/2 + "px," + -canvas.height/2 + "px)";

function init() {
    window.requestAnimationFrame(draw);
}


function draw() {
    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, width, height); // clear canvas

    ctx.save(); //origin at 0,0
    ctx.translate(width/2,height/2); // bringing origin to center

    const time = new Date();
    
    // sun
    ctx.save(); // origin at center
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(0,0,30,0,7);
    ctx.fill();
        
    // earth
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() +  ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(90,0);
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(0,0,10,0,7);
    ctx.fill();

    // moon
    ctx.rotate(((2 * Math.PI) / 10) * time.getSeconds() +  ((2 * Math.PI) / 10000) * time.getMilliseconds());
    ctx.translate(30,0);
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.arc(0,0,5,0,7);
    ctx.fill();

    ctx.restore();
    
    // Earth Orbit
    ctx.strokeStyle = "rgba(250,0,0,0.5)"
    ctx.beginPath();
    ctx.arc(0,0,90,0,7);
    ctx.stroke();

    // Mars Orbit
    ctx.strokeStyle = "rgba(250,0,0,0.5)"
    ctx.beginPath();
    ctx.arc(0,0,150,0,7);
    ctx.stroke();

    // mars
    ctx.rotate(((2 * Math.PI) / 30) * time.getSeconds() +  ((2 * Math.PI) / 30000) * time.getMilliseconds());
    ctx.translate(150,0);
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(0,0,10,0,7);
    ctx.fill();

    // mars moon
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() +  ((2 * Math.PI) / 6000) * time.getMilliseconds());
    ctx.translate(20,0);
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(0,0,5,0,7);
    ctx.fill();
    ctx.restore();

    // mars moon
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 10) * time.getSeconds() +  ((2 * Math.PI) / 10000) * time.getMilliseconds());
    ctx.translate(30,0);
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(0,0,2,0,7);
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // Earth Orbit
    
    window.requestAnimationFrame(draw);
}

init();
