var MW = MW || {};

MW.TEXTFONT = "res/zorque.ttf";
MW.NUMBERFONT = "arial";

MW.GameSpeed = 50;

MW.SnakeUpdateDelay = 5;

MW.Obj = {
	SnakeManager: null,
	FoodManager : null,
	BlockManager: null,
	ScoreManager: null
};

MW.Container = {
	SnakeFood: null,
	SnakeBody: [],
	Blocks	 : []
};