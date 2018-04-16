import Phaser from 'phaser'

import Level1 from './Level1';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Level1
    ]
};

var game = new Phaser.Game(config);

