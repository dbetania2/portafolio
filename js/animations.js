
// Función para crear animaciones desde el JSON
export function createAnimations(tileset) {
    const animations = [
      {
        key: 'quieto',
        frames: [0, 1, 2, 3],
        frameRate: 5,
        repeat: -1
      },
      {
        key: 'caminarFrente',
        frames: [6, 7, 8],
        frameRate: 5,
        repeat: -1
      },
      {
        key: 'caminarEspalda',
        frames: [12, 13, 14],
        frameRate: 5,
        repeat: -1
      },
      {
        key: 'caminarDerecha',
        frames: [18, 19],
        frameRate: 5,
        repeat: -1
      },
      {
        key: 'caminarIzquierda',
        frames: [24, 25],
        frameRate: 5,
        repeat: -1
      }
    ];
  
    // Este bloque de código itera sobre un array de animaciones llamado 'animations'. Para cada animación, 
    // verifica si ya existe en el sistema de animaciones de Phaser utilizando la clave 'anim.key'. Si la animación 
    // no existe, se crea una nueva animación con los parámetros especificados. Se establece una clave única para 
    // la animación, se generan los frames a partir del sprite 'character', se define la tasa de frames por segundo 
    // para controlar la velocidad de la animación, y se determina cuántas veces se repetirá la animación (si es que 
    // se repetirá).
    
    animations.forEach(anim => {
      if (!this.anims.exists(anim.key)) {
        this.anims.create({
          key: anim.key,
          frames: this.anims.generateFrameNumbers('character', { frames: anim.frames }),
          frameRate: anim.frameRate,
          repeat: anim.repeat
        });
      }
    });
  }
  
// La función `updateAnimation` actualiza la animación de un personaje basado en su posición objetivo. 
// Primero, obtiene las coordenadas del objetivo y la posición actual del personaje. Luego, calcula 
// la distancia entre la posición actual y el objetivo. Si la distancia es mayor a un umbral definido 
// (en este caso, 5), determina si el movimiento horizontal (dx) es mayor que el movimiento vertical (dy). 
// Según esto, se reproduce la animación correspondiente: 'caminarDerecha' o 'caminarIzquierda' para 
// movimientos horizontales, y 'caminarFrente' o 'caminarEspalda' para movimientos verticales.

// Función de actualización de animación 
export function updateAnimation(character) {
  const { targetX, targetY, x, y } = character;
  const dx = targetX - x;
  const dy = targetY - y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 5) { // Umbral para evitar movimientos pequeños
    if (Math.abs(dx) > Math.abs(dy)) {
      character.play(dx > 0 ? 'caminarDerecha' : 'caminarIzquierda', true);
    } else {
      character.play(dy > 0 ? 'caminarFrente' : 'caminarEspalda', true);
    }
  }
}
