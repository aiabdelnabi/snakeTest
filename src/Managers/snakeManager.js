var SnakeManager = cc.Class.extend({
	snakeDir:1,
	ctor:function(){
		this.snakeDir = Common.getRandom(1, 4);
		return true;
	},
	changeDir:function(newDir){
		if(this.isValidDir(newDir))
			this.snakeDir = newDir;
	},
	isValidDir:function(newDir){
		// snakes can't move backward

		if(this.snakeDir == 1  && newDir == 3)
			return false;

		if(this.snakeDir == 3  && newDir == 1)
			return false;

		if(this.snakeDir == 2  && newDir == 4)
			return false;

  	if(this.snakeDir == 4  && newDir == 2)
			return false;

		return true;
	},
	snakeMove:function(){
		
		for (var i = MW.Container.SnakeBody.length - 1; i > 0; i--) {
			MW.Container.SnakeBody[i].x = MW.Container.SnakeBody[i - 1].x;
			MW.Container.SnakeBody[i].y = MW.Container.SnakeBody[i - 1].y;
		}

		if(this.snakeDir == 1){//up
			MW.Container.SnakeBody[0].y += MW.GameSpeed;
		}else if(this.snakeDir == 2){//right
			MW.Container.SnakeBody[0].x += MW.GameSpeed;
		}else if(this.snakeDir == 3){//down
			MW.Container.SnakeBody[0].y -= MW.GameSpeed;
		}else{//left is 4
			MW.Container.SnakeBody[0].x -= MW.GameSpeed;
		}

	},
	snakeEat:function(){
		if(MW.Container.SnakeFood != null && MW.Container.SnakeFood.active){
			if(this.collideWithHead(MW.Container.SnakeFood.getPosition())){
				MW.Container.SnakeFood.destroy();
				FoodManager.foodSpawn();
				SnakeBody.getOrCreate();
				MW.Obj.ScoreManager.scoreUp();
			}
		}
	},
	snakeHitBlock:function(){
		var check = false;
		for (var i = 0; i < MW.Container.Blocks.length; i++) {
			if(this.collideWithHead(MW.Container.Blocks[i].getPosition())){
				//console.log("hit block");
				check = true;
				break;
			}
		}
		return check;
	},
	collideWithBorder:function(){
		var check = false;
		if(MW.Container.SnakeBody[0].x - 25 < 0 ||
		   MW.Container.SnakeBody[0].x + 25 > 1080 ||
			 MW.Container.SnakeBody[0].y - 25 < 0 ||
		   MW.Container.SnakeBody[0].y + 25 > 1920){
			check = true;
			//console.log("got out of border");
		}
		return check;
	},
	collideWithHead:function(loc){
		var check = false;
		if(MW.Container.SnakeBody[0].x - 25 < loc.x &&
		   MW.Container.SnakeBody[0].x + 25 > loc.x &&
			 MW.Container.SnakeBody[0].y - 25 < loc.y &&
		   MW.Container.SnakeBody[0].y + 25 > loc.y){
			check = true;
		}
		return check;
	},
	collideWithBody:function(loc){
		var check = false;
		for (var i = 0; i < MW.Container.SnakeBody.length; i++) {
			if(MW.Container.SnakeBody[i].x - 25 < loc.x &&
			   MW.Container.SnakeBody[i].x + 25 > loc.x &&
				 MW.Container.SnakeBody[i].y - 25 < loc.y &&
			   MW.Container.SnakeBody[i].y + 25 > loc.y){
				check = true;
				break;
			}
		}
		return check;
	}
});

SnakeManager.init = function(){
	MW.Obj.SnakeManager = new SnakeManager();
};

SnakeManager.snakeSpawn = function(){

	MW.Container.SnakeBody[0].setup(true);
	MW.Container.SnakeBody[0].x = 500;
	MW.Container.SnakeBody[0].y = 600;
	
	MW.Container.SnakeBody[1].setup(true);
	MW.Container.SnakeBody[1].x = 500;
	MW.Container.SnakeBody[1].y = 550;
	
	MW.Container.SnakeBody[2].setup(true);
	MW.Container.SnakeBody[2].x = 500;
	MW.Container.SnakeBody[2].y = 500;	
};