var BlockManager = cc.Class.extend({
	ctor:function(){
		return true;
	},
	collideWithBlock:function(loc){
		var check = false;
		for (var i = 0; i < MW.Container.Blocks.length; i++) {
			if(MW.Container.Blocks[i].x - 25 < loc.x &&
			   MW.Container.Blocks[i].x + 25 > loc.x &&
				 MW.Container.Blocks[i].y - 25 < loc.y &&
			   MW.Container.Blocks[i].y + 25 > loc.y){
				check = true;
				break;
			}
		}
		return check;
	}
});

BlockManager.init = function(){
	MW.Obj.BlockManager = new BlockManager();
};

BlockManager.BlockSpawn = function(){
	var blockNum = Common.getRandom(1, 10);
	for (var i = 0; i < blockNum; i++) {
	 	var newLoc = BlockManager.getNewLoc();
		if(MW.Obj.SnakeManager.collideWithBody(newLoc) == false){
			gotVaildLoc = true;
			var block = Block.getOrCreate();
			block.setPosition(newLoc);
		}else{
			console.log("collide while search for new block loc");
		}
	}
};

BlockManager.getNewLoc = function(){
	var x = 50 * Common.getRandom(1, 20);
	var y = 50 * Common.getRandom(1, 38);
	return cc.p(x, y);
};