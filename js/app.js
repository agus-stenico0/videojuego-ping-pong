/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("lienzoPong");
const ctx = canvas.getContext("2d");

const score1DOM = document.getElementById("score1");
const score2DOM = document.getElementById("score2");

let scoreP1 = 0;
let scoreP2 = 0;

const teclas = {
  w: false,
  s: false,
  ArrowUp: false,
  ArrowDown: false,
};

window.addEventListener("keydown", (e) => {
  if (teclas.hasOwnProperty(e.key)) teclas[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  if (teclas.hasOwnProperty(e.key)) teclas[e.key] = false;
});

class Paleta {
  constructor(x, y, ancho, alto, color) {
    this.velocidad = 6;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.color = color;
  }

  dibujar() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
  }

  mover(teclaArriba, teclaAbajo) {
    if (teclaArriba && this.y > 0) this.y -= this.velocidad;
    if (teclaAbajo && this.y + this.alto < canvas.height) this.y += this.velocidad;
  }
}


class Pelota {
  constructor(x, y, radio, color) {
    this.x = x;
    this.y = y;
    this.radio = radio;
    this.color = color;
    this.velX = 4;
    this.velY = 4;
  }

  dibujar() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  mover() {
    this.x += this.velX;
    this.y += this.velY;
    if (this.y <= 0 || this.y >= canvas.height) this.velY *= -1;
  }
}


const jugador1 = new Paleta(10, 150, 20, 100, "white");
const jugador2 = new Paleta(canvas.width-30, 150, 20, 100, "white");
const pelota = new Pelota((canvas.width + 15)/2, canvas.height/2, 15, "#f82222")


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  jugador1.mover(teclas.w,teclas.s);
  jugador2.mover(teclas.ArrowUp,teclas.ArrowDown);
  pelota.mover();

  if (
    pelota.x - pelota.radio < jugador1.x + jugador1.ancho &&
    pelota.y > jugador1.y &&
    pelota.y < jugador1.y + jugador1.alto
  ) {
    pelota.velX *= -1;
  }


  if (
    pelota.x + pelota.radio > jugador2.x &&
    pelota.y > jugador2.y &&
    pelota.y < jugador2.y + jugador2.alto
  ) {
    pelota.velX *= -1;
  }

  if (pelota.x <= 0) {
    scoreP2++;
    score2DOM.innerHTML= scoreP2;
    pelota.x = (canvas.width + 15)/2;
  }
  if (pelota.x >= canvas.width) {
    scoreP1++;
    score1DOM.innerHTML= scoreP1;
    pelota.x = (canvas.width + 15)/2;
  }


  jugador1.dibujar();
  jugador2.dibujar();
  pelota.dibujar();
  requestAnimationFrame(gameLoop);
}

// Arrancar juego
gameLoop();