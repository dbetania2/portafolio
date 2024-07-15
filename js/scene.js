import { createAnimations,updateAnimation } from './animations.js';


// Función de carga de recursos
export function preload() {
    this.load.spritesheet('tilespisoyparedes', 'assets/tiles/tilespisoyparedes-sheet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('character', 'assets/tiles/character-sheet.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('objetos1', 'assets/tiles/objetos1-sheet.png', { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet('collision', 'assets/tiles/collision-sheet.png', { frameWidth: 32, frameHeight: 32 });
  
    // Cargar el mapa JSON exportado desde Tiled
    this.load.tilemapTiledJSON('map', 'assets/map.json');
  
    // Monitorear progreso de carga
    this.load.on('progress', function (value) {
      console.log('Loading progress: ' + (value * 100) + '%');
    });
  
    this.load.on('complete', function () {
      console.log('Loading complete!');
    });
  }
  
  // Función de creación de la escena
  export function create() {
    const map = this.make.tilemap({ key: 'map' });
  
    // Añadir cada tileset
    const tileset1 = map.addTilesetImage('tilespisoyparedes-Sheet', 'tilespisoyparedes', 32, 32);
    const tileset2 = map.addTilesetImage('objetos1-Sheet', 'objetos1', 48, 48);
    const tileset3 = map.addTilesetImage('character-Sheet', 'character', 32, 32);
    const tileset4 = map.addTilesetImage('collision-Sheet', 'collision', 32, 32);
    
  
    // Crear capas del mapa en un orden sugerido
    const floor = map.createLayer('floor', tileset1);
    const wall1 = map.createLayer('wall1', tileset1);
    const wall2 = map.createLayer('wall2', tileset1);
    const objetos = map.createLayer('objetos', [tileset1, tileset2]);
    const pc = map.createLayer('pc', tileset2);
    const collisionsLayer = map.createLayer('collisions', tileset4);
    const prueba = map.createLayer('prueba', tileset1);
    
  
  
    this.cameras.main.setZoom(3);
    
  
    // Agregar el personaje utilizando Matter.js
    const character = this.matter.add.sprite(400, 375, 'character', null, {
      shape: {
        type: 'rectangle',
        width: 16,
        height: 32
      }
  
    });
    character.setFixedRotation();
    character.setBounce(0);
  
    // Configurar colisiones en la capa de colisiones
    collisionsLayer.setCollisionByProperty({ collides: true });
  
    // Convertir la capa de colisiones a cuerpos de Matter.js
    this.matter.world.convertTilemapLayer(collisionsLayer);
  
  /* cada par de cuerpos que colisionan utilizando `event.pairs`. Para cada par, se registra en la consola un 
  mensaje que indica qué cuerpos han colisionado, mostrando las etiquetas de ambos cuerpos ('bodyA' y 'bodyB').*/

  this.matter.world.on('collisionstart', (event) => {
    event.pairs.forEach(pair => {
      console.log('Colisión detectada entre:', pair.bodyA.label, 'y', pair.bodyB.label);
    });
  });
  
  // Crear animaciones si no existen
  createAnimations.call(this,tileset3);
  
  // Iniciar en la animación quieta
  character.play('quieto');
  
  // Inicializar propiedades de destino
    character.targetX = character.x;
    character.targetY = character.y;
  
  // Velocidad constante
  const speed = 2;
  

  /*Cuando se detecta un clic, se obtienen las coordenadas del puntero en el mundo 
  (targetX y targetY). Estas coordenadas se asignan como el nuevo destino del personaje, actualizando 
  sus propiedades `targetX` y `targetY`. Finalmente, se llama a la función `updateAnimation` para 
  ajustar la animación del personaje. */

  // Controlar el movimiento
  this.input.on('pointerdown', (pointer) => {
    const targetX = pointer.worldX;
    const targetY = pointer.worldY;
  
    // Establecer el destino
    character.targetX = targetX;
    character.targetY = targetY;
  
     // Cambiar animación según la dirección
     updateAnimation(character, targetX, targetY);
  
  });
  
   // Guardar el personaje en la instancia para acceder en update
   this.character = character;
  };
  
    /*Primero, verifica si el personaje tiene un destino diferente de su posición actual. 
    Luego, calcula la dirección y la distancia hacia el destino utilizando vectores y el 
    teorema de Pitágoras. Si la distancia es mayor a un umbral, se normaliza el vector de 
    dirección para determinar la velocidad del movimiento y se aplica al personaje. Si el 
    personaje llega a su destino, se detiene y se reproduce la animación de "quieto". Esto 
    asegura un movimiento fluido y responsivo en el juego.*/

  // Función de actualización
  export function update() {
    const character = this.character;
  
    // Verifica si el personaje tiene un destino
    if (character.targetX !== character.x || character.targetY !== character.y) {
      const directionX = character.targetX - character.x;
      const directionY = character.targetY - character.y;
      const distance = Math.sqrt(directionX * directionX + directionY * directionY);
  
      if (distance > 6) { // Umbral para evitar movimientos pequeños
        const moveX = (directionX / distance) * 2; // Velocidad
        const moveY = (directionY / distance) * 2; // Velocidad
  
        character.setVelocity(moveX, moveY);
        updateAnimation(character, character.targetX, character.targetY);
      } else {
        // Detener el personaje si ha llegado al destino
        character.setVelocity(0, 0);
        character.play('quieto', true); // Reproducir la animación de quieto
      }
    } else {
      character.setVelocity(0, 0);
      character.play('quieto', true);
    }
  }
  
  
  
  
  