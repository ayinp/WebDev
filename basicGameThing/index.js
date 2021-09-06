const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Projectile{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        context.fillStyle = this.color;
        context.fill();
    }
}

const player1 = new Player(canvas.width / 2, canvas.height / 2, 20, 'red');
player1.draw();
console.log(player1);

function animate(){
    requestAnimationFrame(animate);
    console.log('go');
}

window.addEventListener('click', (event) => {
    const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'blue', null);
    projectile.draw(); 
})

// animate();