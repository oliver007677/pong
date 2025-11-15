const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

let keys = {}

document.addEventListener("keydown", (ev) => {
    ev.preventDefault()
    keys[ev.key] = true
})

document.addEventListener("keyup", (ev) => {
    keys[ev.key] = false
    console.log(keys)
})

let x = 50
let y = 50

function dibujar_palo(color) {
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.fillRect(x, y, 10, 10)
        ctx.stroke()
    }

function mover_palo() {
        if(keys["ArrowUp"]) {
            y -= 10
        }
                if(keys["ArrowDown"]) {
            y += 10
        }
    }
function animar () {
    ctx.clearRect(0,0,canvas.width,canvas.height)
        dibujar_palo("blue")
        mover_palo()
        requestAnimationFrame(animar)
    }

animar()