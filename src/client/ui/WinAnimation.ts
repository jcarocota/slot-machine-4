import * as PIXI from "pixi.js";

export class WinAnimation extends PIXI.Container {
    private winAmount = 0;
    private textTitle:PIXI.Text = new PIXI.Text();
    private winAmountTitle:PIXI.Text = new PIXI.Text();
    private styleTitle: PIXI.TextStyle = new PIXI.TextStyle();
    private styleWinAmountTitle: PIXI.TextStyle = new PIXI.TextStyle();
    private posX:number;
    private  posY:number;
    private offsetYTittle=30;

    constructor(winAmount=0, posX=0, posY=0) {
        super();
        this.winAmount = winAmount;
        this.posX = posX;
        this.posY = posY;
        this.init();
    }

    private init = () => {

        this.styleTitle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        this.styleWinAmountTitle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        this.draw();
        this.addChild(this.textTitle);
        this.addChild(this.winAmountTitle);

    };

    private draw = () => {
        this.textTitle = new PIXI.Text('¡Win!', this.styleTitle);
        this.textTitle.anchor.set(0.5);
        this.textTitle.x = this.posX;
        this.textTitle.y = this.posY - this.offsetYTittle;

        this.winAmountTitle = new PIXI.Text(`$ ${this.winAmount} USD`, this.styleWinAmountTitle);
        this.winAmountTitle.anchor.set(0.5);
        this.winAmountTitle.x = this.posX;
        this.winAmountTitle.y = this.posY + this.offsetYTittle;


    };






}