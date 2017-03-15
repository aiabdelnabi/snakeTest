var g_sharedLayer;
var GameLayer = cc.Layer.extend({
  size:null,
  snakeUpdateDelay: MW.SnakeUpdateDelay,
  touchStartPoint:null,
  touchLastPoint:null,
  isSwipeLeft:false,
  isSwipeRight:false,
  isSwipeUp:false,
  isSwipeDown:false,
  touchThreshold:100,
  isPlaying:true,
  isLost:false,
  leaveScreenWaitTime:50,
  ctor:function () {
    this._super();
    this.init();

    return true;
  },
  init:function(){
    var bRet = false;

    if(this._super()){

      g_sharedLayer = this;
      this.size = cc.winSize; 
      
      var bg = Common.CreateRect(this.size.width, this.size.height, cc.color(205, 226, 127), cc.p(0, 0));
      this.addChild(bg, 1);

      bRet = true;

      SnakeBody.preSet();
      Block.preSet();

      SnakeManager.init();
      SnakeManager.snakeSpawn();

      BlockManager.init();
      BlockManager.BlockSpawn();

      FoodManager.init ();
      FoodManager.foodSpawn();

      ScoreManager.init();
      

      bRet = true;
    }

    return bRet;
  },
  onEnter:function () {
    this._super();

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      swallowTouches: true,
      onTouchBegan: this.onTouchBegan,
      onTouchMoved: this.onTouchMoved,
      onTouchEnded: this.onTouchEnded
    }, this);

    this.schedule(this.onTick);
  },  
  onTouchBegan:function(touch, event){
    var loc = touch.getLocation();

    g_sharedLayer.touchStartPoint = {x: loc.x, y: loc.y};
    g_sharedLayer.touchLastPoint = {x: loc.x, y: loc.y};

    return true;
  },
  onTouchMoved:function(touch, event){
   var loc = touch.getLocation();
   var start = g_sharedLayer.touchStartPoint;

    // check for left
    if( loc.x < start.x - g_sharedLayer.touchThreshold ) {
      // if direction changed while swiping left, set new base point
      if( loc.x > g_sharedLayer.touchLastPoint.x ) {
        start = g_sharedLayer.touchStartPoint = {x: loc.x, y: loc.y};
        g_sharedLayer.isSwipeLeft = false;
      } else {
        g_sharedLayer.isSwipeLeft = true;                        
      }
    }

    // check for right
    if( loc.x > start.x + g_sharedLayer.touchThreshold ) {
        // if direction changed while swiping right, set new base point
        if( loc.x < g_sharedLayer.touchLastPoint.x ) {
          g_sharedLayer.touchStartPoint = {x: loc.x,y: loc.y};
          g_sharedLayer.isSwipeRight = false;
        } else {
          g_sharedLayer.isSwipeRight = true;
        }
    }

    // check for down
    if( loc.y < start.y - g_sharedLayer.touchThreshold ) {
        // if direction changed while swiping down, set new base point
        if( loc.y > g_sharedLayer.touchLastPoint.y ) {
          g_sharedLayer.touchStartPoint = { x: loc.x, y: loc.y};
          g_sharedLayer.isSwipeDown = false;
        } else {
          g_sharedLayer.isSwipeDown = true;
        }
    }

    // check for up
    if( loc.y > start.y + g_sharedLayer.touchThreshold ) {
        // if direction changed while swiping right, set new base point
        if( loc.y < g_sharedLayer.touchLastPoint.y ) {
          g_sharedLayer.touchStartPoint = {x: loc.x,  y: loc.y};
          g_sharedLayer.isSwipeUp = false;
        } else {
          g_sharedLayer.isSwipeUp = true;      
        }
    }

    g_sharedLayer.touchLastPoint = { x: loc.x, y: loc.y};
    
  },
  onTouchEnded:function(touch, event){

    var loc = touch.getLocation();

    if(g_sharedLayer.isSwipeUp){
      MW.Obj.SnakeManager.changeDir(1);  
    }else if(g_sharedLayer.isSwipeRight){
      MW.Obj.SnakeManager.changeDir(2);  
    }else if(g_sharedLayer.isSwipeDown){
      MW.Obj.SnakeManager.changeDir(3);  
    }else if(g_sharedLayer.isSwipeLeft){
      MW.Obj.SnakeManager.changeDir(4);  
    }
    
    g_sharedLayer.touchStartPoint = null;
    g_sharedLayer.isSwipeUp = g_sharedLayer.isSwipeLeft = g_sharedLayer.isSwipeRight = g_sharedLayer.isSwipeDown = false;

  },
  onTick:function(){
    if(this.isPlaying){
      this.updateSnake();  
    }else if(this.isLost){
      if(this.leaveScreenWaitTime < 1){
        this.isLost = false;
        cc.director.runScene(new cc.TransitionFade(0.5, GameMenu.scene()));
      }
      this.leaveScreenWaitTime--;
    }
    
  },
  updateSnake:function(){
    if(this.snakeUpdateDelay < 1){

      MW.Obj.SnakeManager.snakeMove();

      MW.Obj.SnakeManager.snakeEat();

      if(MW.Obj.SnakeManager.snakeHitBlock() || MW.Obj.SnakeManager.collideWithBorder()){
        this.lost();
      }

      this.snakeUpdateDelay = MW.SnakeUpdateDelay;
    }
    this.snakeUpdateDelay--;
  },
  lost:function(){
    this.isPlaying = false;
    this.isLost = true;
  }

});

GameLayer.prototype.addItem = function (item, zIndex) {
  this.addChild(item, zIndex);
};

GameLayer.scene = function () {
  var scene = new cc.Scene();
  var layer = new GameLayer();
  scene.addChild(layer);
  return scene;
};