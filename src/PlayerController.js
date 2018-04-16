export default class PlayerController extends Phaser.GameObjects.GameObject{
    
    constructor(scene, player){
        super(scene, 'PlayerController');
        
        scene.add.existing(this);
        
        this.cursors = scene.input.keyboard.createCursorKeys();
        
        this.player = player;
    }
    
    preUpdate(){
        this.update();
    }
    
    update(){
        if (this.cursors.left.isDown){
            this.player.runLeft();
        }else if (this.cursors.right.isDown){
            this.player.runRight();
        }else{
            this.player.idle();
        }
        
        if (this.cursors.up.isDown && this.player.canJump()){
            this.player.jump();
        }
    }
    
}