// Definimos la palabra a adivinar
const PALABRA = 'SEÑORA';

// Creamos un array para guardar las letras adivinadas
const letrasAdivinadas = [];

// Creamos un array para guardar las letras usadas
const letrasUsadas = [];

// Obtenemos los elementos del DOM que vamos a necesitar
const palabraElemento = document.getElementById('palabra');
const numIntentosElemento = document.getElementById('numIntentos');
const letrasElemento = document.getElementById('letras');
const formulario = document.getElementById('formulario');
const letraInput = document.getElementById('letra');

// Creamos una función para actualizar la pantalla con las letras adivinadas
function actualizarPalabra() {
  let palabraMostrada = '';
  for (let i = 0; i < PALABRA.length; i++) {
    const letra = PALABRA[i];
    if (letrasAdivinadas.includes(letra)) {
      palabraMostrada += letra + ' ';
    } else {
      palabraMostrada += '_ ';
    }
  }
  palabraElemento.textContent = palabraMostrada;  
}
// Creamos una función para verificar si el jugador ganó
function verificarVictoria() {
    for (let i = 0; i < PALABRA.length; i++) {
      const letra = PALABRA[i];
      if (!letrasAdivinadas.includes(letra)) {
        return false;
      }
    }
    return true;
  }
  
  // Creamos una función para verificar si el jugador perdió
  function verificarDerrota() {
    return letrasUsadas.length >= 6 && !verificarVictoria();
  }
  
  // Creamos una función para manejar el envío del formulario
  function manejarEnvio(evento) {
    evento.preventDefault();
    const letra = letraInput.value.toUpperCase();
    letraInput.value = '';
    if (letrasUsadas.includes(letra) || letrasAdivinadas.includes(letra)) {
      return;
    }
    letrasUsadas.push(letra);
    letrasElemento.textContent = letrasUsadas.join(', ');
    if (PALABRA.includes(letra)) {
      letrasAdivinadas.push(letra);
      actualizarPalabra();
      if (verificarVictoria()) {
        alert('Te veo abajo;)<3');
        formulario.removeEventListener('submit', manejarEnvio);
      }
    } else {
      numIntentosElemento.textContent = 6 - letrasUsadas.length;
      if (verificarDerrota()) {
        alert('¡Inténtalo otra vez!');
        formulario.removeEventListener('submit', manejarEnvio);
      }
    }
  }
  
  // Actualizamos la pantalla con las letras adivinadas
  actualizarPalabra();
  
  // Agregamos un evento de submit al formulario
  formulario.addEventListener('submit', manejarEnvio);
