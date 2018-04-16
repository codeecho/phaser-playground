export default class Bomb extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){
        super(scene, x, y, 'bomb');
        
        scene.physics.world.enable(this);
        scene.add.existing(this);
        
        this.body.setBounce(1);
        this.body.setCollideWorldBounds(true);
        this.body.allowGravity = false;
        
        const velX = Phaser.Math.Between(-200, 200);
        const velY = 100;
        this.body.setVelocity(velX, velY);
    }
    
}