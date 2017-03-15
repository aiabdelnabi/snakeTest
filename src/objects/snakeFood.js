var SnakeFood = cc.Sprite.extend({
	active:false,
	ctor:function(){
		this._super(res.food_img);
	},
  setup:function(enable){
    this.setVisible(enable);
    this.active = enable;
  },
  destroy:function(){
    this.setup(false);
  }
});

SnakeFood.create = function(){
  var selChild = new SnakeFood();
  selChild.setup(false);
  MW.Container.SnakeFood = selChild;
  g_sharedLayer.addItem(selChild, 10);
  return selChild;
};

SnakeFood.getOrCreate = function() {
  var selChild = MW.Container.SnakeFood;
  if(selChild == null){
    selChild = SnakeFood.create();
  }
  selChild.setup(true);
  return selChild;
};