var FoodManager = cc.Class.extend({
	ctor:function(){
		return true;
	}
});

FoodManager.init = function(){
	MW.Obj.FoodManager = new FoodManager();
};

FoodManager.foodSpawn = function(){
	var gotVaildLoc = false;
	var retryCount = 10;

	while(gotVaildLoc == false && retryCount > 0){
	 	var newLoc = FoodManager.getFoodNewLoc();
		if(MW.Obj.SnakeManager.collideWithBody(newLoc)  == false &&
		   MW.Obj.BlockManager.collideWithBlock(newLoc) == false){
			
			gotVaildLoc = true;
			MW.Container.SnakeFood = SnakeFood.getOrCreate();
			MW.Container.SnakeFood.setPosition(newLoc);
		  //console.log("got vaild loc");
		}else{
			//console.log("collide while search for new food loc");
			retryCount--;
		}
  }
};

FoodManager.getFoodNewLoc = function(){
	var x = 50 * Common.getRandom(1, 20);
	var y = 50 * Common.getRandom(1, 38);
	return cc.p(x, y);
};