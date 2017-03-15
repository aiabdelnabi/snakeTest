var SnakeBody = cc.Sprite.extend({
	active:false,
	ctor:function(){
		this._super(res.snake_body_img);
	},
  setup:function(enable){
    this.setVisible(enable);
    this.active = enable;
    this.x = -100;
    this.y = -100;
  }
});

SnakeBody.create = function(){
  var selChild = new SnakeBody();
  selChild.setup(false);
  g_sharedLayer.addItem(selChild, 10);
  MW.Container.SnakeBody.push(selChild);
  return selChild;
};

SnakeBody.preSet = function() {
  var selChild = null;

  for (var i = 0; i < 3; i++) {
    selChild = SnakeBody.create();
  }
};

SnakeBody.getOrCreate = function() {
  var selChild = null;
  for (var i = 0; i < MW.Container.SnakeBody.length; i++) {
    var selChild = MW.Container.SnakeBody[i];
    if (selChild.active == false) {
      selChild.setup(true);
      return selChild;
    }
  }
  selChild = SnakeBody.create();
  selChild.setup(true);
  return selChild;
};