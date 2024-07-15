import { preload, create, update } from './scene.js';

const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 700,
  physics: {
    default: 'matter', // Asegúrate de que la física esté habilitada
    matter: {
      gravity: { y: 0 },
      debug: false, // Puedes activar el debug si necesitas ver colisiones
      enableSleep: true,
      fps: 60 // Ajusta la frecuencia de actualización de las físicas
    }
  },
  render: {
    pixelArt: true,
    antialias: false,
    willReadFrequently: true
  },
  scene: {
    preload: preload,
    create: create,
    update:update,
  }
};


// Creación de la instancia del juego Phaser con la configuración definida
const game = new Phaser.Game(config);





