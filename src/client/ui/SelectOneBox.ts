import * as PIXI from "pixi.js";

//https://codesandbox.io/s/pixi-select-oodt3d?file=/src/select.js:4032-4066

export type Option = {
    value: number,
    description: string
}
export class SelectOneBox extends PIXI.Container {

    private options: Option[];

    private background = new PIXI.Graphics();
    private downArrow = new PIXI.Graphics();
    private selectedText = new PIXI.Text();

    private selectedValue: Option;

    private menu = new PIXI.Container();

    selectOneBoxWidth:number;
    selectOneBoxHeight:number;
    selectOneBoxX:number;
    selectOneBoxY:number;

    constructor(selectOneBoxWidth:number, selectOneBoxHeight:number, selectOneBoxX:number, selectOneBoxY:number, options: Option[], selectedValue:Option) {
        super();

        this.options = options;

        this.selectOneBoxWidth = selectOneBoxWidth;
        this.selectOneBoxHeight = selectOneBoxHeight;
        this.selectOneBoxX = selectOneBoxX;
        this.selectOneBoxY = selectOneBoxY;
        this.selectedValue = selectedValue;

        this.init();

    }

    private init = () => {
        this.addChild(this.background);
        this.addChild(this.downArrow);

        this.draw();
        this.addChild(this.selectedText);

        this.background.eventMode = 'static';
        this.background.onpointerover = () => (this.background.alpha = 0.5);
        this.background.onpointerout = () => (this.background.alpha = 1);
        //rectangle.on("pointerup", () => this.toggleMenu());

        this.showSelectedOptionText();
    };

    private draw = () => {
        this.background.beginFill(0xffc800);
        this.background.drawRect(
            this.selectOneBoxX,
            this.selectOneBoxY,
            this.selectOneBoxWidth,
            this.selectOneBoxHeight
        );
        this.background.endFill();

        const triangleSideSize = this.width*0.1;
        const triangleHalfway = triangleSideSize/2;

        this.downArrow.beginFill(0x000);
        this.downArrow.moveTo(0, 0);
        this.downArrow.lineTo(triangleSideSize, 0);
        this.downArrow.lineTo(triangleHalfway, triangleSideSize * 0.6);
        this.downArrow.endFill();

        this.downArrow.position.x = this.selectOneBoxX + this.selectOneBoxWidth - triangleSideSize*1.5;
        this.downArrow.position.y = this.selectOneBoxY + this.selectOneBoxHeight/2;

        this.selectedText.anchor.y = 0.5;
       this.selectedText.x = this.selectOneBoxX + this.selectOneBoxWidth*0.1;
       this.selectedText.y = this.selectOneBoxY + this.selectOneBoxHeight/2;

    };

    private showSelectedOptionText = () => {
        this.selectedText.text = this.selectedValue.description;
        this.selectedText.style = {
            fontFamily: "Verdana",
            fontSize: 15,
            fill: ["#000000"],
        };
    }

    resize = () => {
        this.background.clear();
        this.downArrow.clear();
        this.draw();
    };


}