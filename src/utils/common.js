var Common = cc.Class.extend({
	ctor:function(){
		return true;
	}
});

Common.getRandom = function(min, max){
	return Math.floor((Math.random() * max) + min);
};

Common.CreateRect = function(width, height, color, pos){
	var rect = new cc.LayerColor(color, width, height);
	rect.setPosition(pos);
	return rect;
};

Common.createLbl = function(fontType, txt, postion, color, fontSize){
  var lbl = new cc.LabelTTF(txt, fontType, fontSize);
  lbl.setPosition(postion);
  lbl.color = color;
  lbl.textAlign = cc.TEXT_ALIGNMENT_CENTER;
  return lbl;
};