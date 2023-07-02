import * as PIXI from "pixi.js";

//https://codesandbox.io/s/pixi-select-oodt3d?file=/src/select.js:4032-4066

export type Option = {
  value: number;
  description: string;
};

export type MenuBackgroundOption = {
  option: Option;
  background: PIXI.Graphics;
  text: PIXI.Text;
};
export class SelectOneBox extends PIXI.Container {
  private options: Option[];

  private background = new PIXI.Graphics();
  private downArrow = new PIXI.Graphics();
  private selectedText = new PIXI.Text();

  private selectedValue: Option;

  private menu = new PIXI.Container();
  private menuBackgroundOptions: MenuBackgroundOption[] = [];

  selectOneBoxWidth: number;
  selectOneBoxHeight: number;
  selectOneBoxX: number;
  selectOneBoxY: number;

  constructor(
    selectOneBoxWidth: number,
    selectOneBoxHeight: number,
    selectOneBoxX: number,
    selectOneBoxY: number,
    options: Option[],
    selectedValue: Option
  ) {
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
    this.createMenuOptions();

    this.addChild(this.background);
    this.addChild(this.downArrow);

    this.draw();

    this.addChild(this.selectedText);
    this.addChild(this.menu);

    this.background.eventMode = "static";
    this.background.onpointerover = () => {
      this.background.alpha = 0.5;
      this.menu.visible = true;
    };
    this.background.onpointerout = () => {
      this.background.alpha = 1;
    };

    this.onpointerout = (e: PIXI.FederatedPointerEvent) => {
      this.menu.visible = this.pointerOutsideMenuZone(e.x, e.y);
    };

    //rectangle.on("pointerup", () => this.toggleMenu());

    //this.eventMode = "static";

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

    const triangleSideSize = this.width * 0.1;
    const triangleHalfway = triangleSideSize / 2;

    this.downArrow.beginFill(0x000);
    this.downArrow.moveTo(0, 0);
    this.downArrow.lineTo(triangleSideSize, 0);
    this.downArrow.lineTo(triangleHalfway, triangleSideSize * 0.6);
    this.downArrow.endFill();

    this.downArrow.position.x =
      this.selectOneBoxX + this.selectOneBoxWidth - triangleSideSize * 1.5;
    this.downArrow.position.y =
      this.selectOneBoxY + this.selectOneBoxHeight / 2;

    this.selectedText.anchor.y = 0.5;
    this.selectedText.x = this.selectOneBoxX + this.selectOneBoxWidth * 0.1;
    this.selectedText.y = this.selectOneBoxY + this.selectOneBoxHeight / 2;

    this.menu.visible = false;

    this.menuBackgroundOptions.forEach((menuBackgroundOption, index) => {
      menuBackgroundOption.background.beginFill(0xffc800);
      menuBackgroundOption.background.drawRect(
        this.selectOneBoxX,
        this.selectOneBoxY - this.selectOneBoxHeight * (index + 1),
        this.selectOneBoxWidth,
        this.selectOneBoxHeight
      );
      menuBackgroundOption.background.endFill();

      menuBackgroundOption.text.y = 0.5;
      menuBackgroundOption.text.x =
        this.selectOneBoxX + this.selectOneBoxWidth * 0.1;
      menuBackgroundOption.text.y =
        this.selectOneBoxY +
        this.selectOneBoxHeight / 2 -
        this.selectOneBoxHeight * (index + 1);
    });
  };

  private showSelectedOptionText = () => {
    this.selectedText.text = this.selectedValue.description;
    this.selectedText.style = {
      fontFamily: "Verdana",
      fontSize: 15,
      fill: ["#000000"],
    };
  };

  private createMenuOptions = () => {
    this.options.forEach((option: Option) => {
      const menuBackgroundOption: MenuBackgroundOption = {
        option: option,
        background: new PIXI.Graphics(),
        text: new PIXI.Text(),
      };

      menuBackgroundOption.text.text = option.description;
      menuBackgroundOption.text.style = {
        fontFamily: "Verdana",
        fontSize: 15,
        fill: ["#000000"],
      };

      menuBackgroundOption.background.eventMode = "static";
      menuBackgroundOption.background.onpointerover = () =>
        (this.background.alpha = 0.5);
      menuBackgroundOption.background.onpointerout = () =>
        (this.background.alpha = 1);

      this.menuBackgroundOptions.push(menuBackgroundOption);

      this.menu.addChild(menuBackgroundOption.background);
      this.menu.addChild(menuBackgroundOption.text);
    });
  };

  private pointerOutsideMenuZone: (mouseX: number, mouseY: number) => boolean =
    (mouseX, mouseY) => {
      const top =
        this.selectOneBoxY -
        this.menuBackgroundOptions.length * this.selectOneBoxHeight;
      const bottom = this.selectOneBoxY + this.selectOneBoxHeight;
      const left = this.selectOneBoxX;
      const right = this.selectOneBoxX + this.selectOneBoxWidth;

      //console.log("top:", top, "bottom:", bottom, "left:", left, "right:", right);
      //console.log("mouseX:", mouseX, "mouseY:", mouseY);

      return (
        mouseX > left && mouseX < right && mouseY < bottom && mouseY > top
      );
    };

  resize = () => {
    this.background.clear();
    this.downArrow.clear();

    this.menuBackgroundOptions.forEach((menuBackgroundOption) => {
      menuBackgroundOption.background.clear();
    });

    this.draw();
  };
}
