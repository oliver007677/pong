const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
ctx.fillStyle = "white";

let keys = {}

document.addEventListener("keydown", (ev) => {
    ev.preventDefault()
    keys[ev.key] = true
})

document.addEventListener("keyup", (ev) => {
    keys[ev.key] = false
    console.log(keys)
})

let puntos_izq = 0
let puntos_der = 0

let velocidad_y = 4
let velocidad_x = 4

let x_izq = 0
let y_izq = canvas.height/2

let y_bola = canvas.height/2
let x_bola = canvas.width/2

let x_der = canvas.width - 10
let y_der = canvas.height/2

function dibujar_texto() {
    ctx.font = "60px 8Bit";
    ctx.fillText(puntos_izq, canvas.width/4, 20);
    ctx.fillText(puntos_der, canvas.width/4 + canvas.width/2, 20);
    ctx.fillText("w : up", canvas.width/4, 30);
    ctx.fillText("s : down", canvas.width/4, 40);
    ctx.fillText("up arrow : up", canvas.width/4 + canvas.width/2, 30);
    ctx.fillText("down arrow : down", canvas.width/4 + canvas.width/2 - 10, 40);
}

function dibujar_bola(color) { 
    ctx.beginPath();
    ctx.fillStyle = color
    ctx.fillRect(x_bola, y_bola, 10, 10);
    ctx.stroke()
}

function mover_bola () {
    x_bola += velocidad_x
    y_bola += velocidad_y

    if (x_bola <= x_izq + 10 && y_bola + 10 >= y_izq && y_bola <= y_izq + 35) {
        velocidad_x = -velocidad_x
    }

    if (x_bola + 10 >= x_der && y_bola + 10 >= y_der && y_bola <= y_der + 35) {
        velocidad_x = -velocidad_x
    }

    /*sale por la izquierda*/
if(x_bola < 1) {
    y_bola = canvas.height/2
    x_bola = canvas.width/2

    if (puntos_der >= 9) {
        window.location.reload();
    }
    else{
        puntos_der += 1
    }

    velocidad_x = 4 * (Math.random() < 0.5 ? 1 : -1)
    velocidad_y = 4 * (Math.random() < 0.5 ? 1 : -1)
}

if(x_bola > canvas.width-10) {
    y_bola = canvas.height/2
    x_bola = canvas.width/2

    if (puntos_izq >= 9) {
        window.location.reload();
    }
    else {
        puntos_izq += 1
    }


    velocidad_x = 4 * (Math.random() < 0.5 ? 1 : -1)
    velocidad_y = 4 * (Math.random() < 0.5 ? 1 : -1)
}

/*sale por la izquierda*/
    if (y_bola > canvas.height -10 || y_bola < 1) {
        velocidad_y = -velocidad_y;
    }
}

function dibujar_palos(color) {
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.fillRect(x_der, y_der, 10, 35);
        ctx.fillRect(x_izq, y_izq, 10, 35);
        ctx.stroke()

        ctx.beginPath()
        ctx.setLineDash([4, 10]);
        ctx.lineWidth = 3;
        ctx.strokeStyle = color;
        ctx.moveTo(canvas.width/2, 0);
        ctx.lineTo(canvas.width/2, canvas.height);
        ctx.stroke();
    }

function mover_palo() {
        if(keys["w"] && y_izq > 1) {
            y_izq -= 5
        }
        if(keys["s"] && y_izq < canvas.height - 30) {
            y_izq += 5
        }
        if(keys["ArrowUp"] && y_der > 1) {
            y_der -= 5
        }
        if(keys["ArrowDown"] && y_der < canvas.height - 30) {
            y_der += 5
        }
    }
function animar () {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    dibujar_texto()
    dibujar_bola("white")
    dibujar_palos("white")
    mover_bola()
    mover_palo()
    requestAnimationFrame(animar)
    }

animar()