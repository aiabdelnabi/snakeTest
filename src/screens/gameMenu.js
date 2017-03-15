var GameMenu = cc.Layer.extend({
  ctor:function(){
    this._super();
    this.init();
  },
  init:function () {
    this._super();

    var size = cc.winSize;

    this.cleanUp();
    
    var bg = Common.CreateRect(size.width, size.height, cc.color(205, 226, 127), cc.p(0, 0));
    this.addChild(bg, 1);

    var logolb = Common.createLbl(MW.TEXTFONT, "Snake", cc.p(size.width / 2, size.height / 2 + 300), cc.color(0,0,0), 200);
    this.addChild(logolb, 1);


    var newGame = new cc.MenuItemSprite(new cc.Sprite(res.play_img), new cc.Sprite(res.play_img), new cc.Sprite(res.play_img), function () {
        this.onPlayAgain();
    }.bind(this));
    newGame.scale = 1;
    var menu = new cc.Menu(newGame);
    this.addChild(menu, 1, 2);
    menu.setPosition(cc.p(size.width / 2, 400));


    return true;
  },
  onPlayAgain:function (pSender) {
    cc.director.runScene(new cc.TransitionFade(0.3, GameLayer.scene()));
  },
  cleanUp:function(){
    MW.Container.SnakeFood = null;
    MW.Container.SnakeBody = [];
    MW.Container.Blocks = [];

    MW.Obj.SnakeManager = null;
    MW.Obj.FoodManager = null;
    MW.Obj.BlockManager = null;
    MW.Obj.ScoreManager = null;
    
  }
});

GameMenu.scene = function () {
  var scene = new cc.Scene();
  var layer = new GameMenu();
  scene.addChild(layer);
  return scene;
};