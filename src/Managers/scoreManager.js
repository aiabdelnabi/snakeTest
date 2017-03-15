var ScoreManager = cc.Class.extend({
  score:0,
  scoreLbl:null,
  ctor:function(){
    this.init();
  },
  init:function () {
    this.scoreLbl = Common.createLbl(MW.NUMBERFONT, "" + this.score, cc.p(100, 1850), cc.color(0,0,0), 100);
    g_sharedLayer.addItem(this.scoreLbl, 15);

    return true;
  },
  scoreUp:function(){
    this.score++;
    this.scoreLbl.setString(""+ this.score);
  }

});

ScoreManager.init = function(){
  MW.Obj.ScoreManager = new ScoreManager();
};