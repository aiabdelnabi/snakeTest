var Block = cc.Sprite.extend({
	active:false,
	ctor:function(){
		this._super(res.block_img);
	},
  setup:function(enable){
    this.setVisible(enable);
    this.active = enable;
  }
});

Block.create = function(){
  var selChild = new Block();
  selChild.setup(false);
  g_sharedLayer.addItem(selChild, 10);
  MW.Container.Blocks.push(selChild);
  return selChild;
};

Block.preSet = function() {
  var selChild = null;

  for (var i = 0; i < 3; i++) {
    selChild = Block.create();
  }
};

Block.getOrCreate = function() {
  var selChild = null;
  for (var i = 0; i < MW.Container.Blocks.length; i++) {
    var selChild = MW.Container.Blocks[i];
    if (selChild.active == false) {
      selChild.setup(true);
      return selChild;
    }
  }
  selChild = Block.create();
  selChild.setup(true);
  return selChild;
};