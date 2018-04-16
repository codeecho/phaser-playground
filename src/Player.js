import {LOOP} from './constants';

const SPRITE_KEY = 'dude';

const ANIMATION_LEFT = 'left';
const ANIMATION_RIGHT = 'right';
const ANIMATION_IDLE = 'idle';

export default class Player extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){
        super(scene, x, y, SPRITE_KEY);
        
        scene.physics.world.enable(this);
        scene.add.existing(this);
    
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        
        scene.anims.create({
            key: ANIMATION_LEFT,
            frames: scene.anims.generateFrameNumbers(SPRITE_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: LOOP
        });
        
        scene.anims.create({
            key: ANIMATION_IDLE,
            frames: [ { key: SPRITE_KEY, frame: 4 } ],
            frameRate: 20
        });
        
        scene.anims.create({
            key: ANIMATION_RIGHT,
            frames: scene.anims.generateFrameNumbers(SPRITE_KEY, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: LOOP
        });
    }
    
    canJump(){
        return this.body.touching.down
    }
    
    runLeft(){
        this.body.setVelocityX(-160);
        this.anims.play(ANIMATION_LEFT, true);
    }
    
    runRight(){
        this.body.setVelocityX(160);
        this.anims.play(ANIMATION_RIGHT, true);
    }
    
    jump(){
        this.body.setVelocityY(-330);
    }
    
    idle(){
        this.body.setVelocityX(0);
        this.anims.play(ANIMATION_IDLE);
    }
    
    die(){
        this.setTint(0xff0000);
        this.anims.play(ANIMATION_IDLE);
    }
    
}