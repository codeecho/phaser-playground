export default class ScoreLabel extends Phaser.GameObjects.Text{
    
    constructor(scene, x, y, score){
        super(scene, x, y, '', { fontSize: '32px', fill: '#000' });
        
        scene.add.existing(this);
        
        score.subscribe(newScore => this.setText('Score: ' + newScore), true);
    }
    
}