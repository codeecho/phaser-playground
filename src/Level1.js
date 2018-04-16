import {SCENES} from './constants';

import Player from './Player';
import Bomb from './Bomb';
import Star from './Star';
import ScoreLabel from './ScoreLabel';
import PlayerController from './PlayerController';

import Observable from './Observable';

export default class Level1 extends Phaser.Scene{
    
    constructor(){
        super({
            key: SCENES.LEVEL1
        });
        
        this.score = new Observable(0);
    }
    
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    
    create(){
        this.add.image(400, 300, 'sky');
        this.add.image(1200, 300, 'sky');        

        this.platforms = this.createPlatforms();
        
        this.player = new Player(this, 100, 450);
        
        this.playerController = new PlayerController(this, this.player);
        
        this.stars = this.createStars();
        
        this.scoreLabel = new ScoreLabel(this, 16, 16, this.score);
        
        this.bombs = this.add.group();
        
        this.setCollisionHandlers();
        
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.player);
    }
    
    setCollisionHandlers(){
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }
    
    update(){

    }
    
    createPlatforms(){
        const spriteKey = 'ground';
        
        const platforms = this.physics.add.staticGroup();
    
        platforms.create(400, 568, spriteKey).setScale(2).refreshBody();
    
        platforms.create(600, 400, spriteKey);
        platforms.create(50, 250, spriteKey);
        platforms.create(750, 220, spriteKey);
        
        return platforms;
    }
    
    createStars(){
        const stars = this.add.group();
        
        for(let i=0; i<5; i++){
            stars.add(new Star(this, (i+1)*70, 0));
        }
        
        return stars;
    }
    
    collectStar(player, star){
        star.hide();
    
        this.score.set(this.score.get() + 10);
    
        if (this.stars.countActive(true) === 0){
            this.stars.children.iterate(child => child.respawn());
            this.createBomb();
        }
    }
    
    createBomb(){
        const x = this.player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        const bomb = new Bomb(this, x, 16);
        this.bombs.add(bomb);
    }

    hitBomb(player, bomb){
        this.physics.pause();
        player.die();
    }
    
}