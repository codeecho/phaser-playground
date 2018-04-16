export default class Star extends Phaser.GameObjects.Sprite{
    
    constructor(scene, x, y){
        super(scene, x, y, 'star');
        
        scene.physics.world.enable(this);
        scene.add.existing(this);
        
        this.body.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }
    
    hide(){
        this.body.stop();
        this.body.enable = false;
        this.active = false;
        this.visible = false;
    }
    
    respawn(){
        this.body.reset(this.x, 0);
        this.active = true;
        this.visible = true;
        this.body.enable = true;
    }
    
}