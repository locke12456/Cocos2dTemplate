var Main = cc.Layer.extend({
    helloLabel:null,
    Sprite:null,
    size:null,
    ctor:function () {
        this._super();
    },
    init:function () {
        this._super();
        return true;
    },
    onEnter:function () {
        this._super();
        this.initLayer();
    },
    ccTouchesBegan:function (pTouches, pEvent) {

    },
    ccTouchesMoved:function (pTouches, pEvent) {

    },
    ccTouchesEnded:function (pTouches, pEvent) {

    },
    update:function () {

    }
});
Main.prototype.initLayer = function () {
    /////////////////////////////
    //  呼叫 cc.Director.sharedDirector().getWinSize() 以便取得視窗大小
    var size = this.size = cc.Director.sharedDirector().getWinSize();

    /////////////////////////////
    //  照慣例來個HelloWorld
    this.helloLabel = cc.LabelTTF.create("Hello World", "Arial", 38);
    // 設定文字座標於視窗正中間
    this.helloLabel.setPosition(cc.ccp(size.width / 2, size.height - 40));
    this.helloLabel.setColor(cc.ccc4(0xff, 0, 0, 255));
    // 然後在Layer上加入此文字物件
    this.addChild(this.helloLabel);

    ///////////////////////
    //  然後貼張背景
    var lazyLayer = new cc.LazyLayer();
    this.addChild(lazyLayer);
    var background = new cc.Sprite();
    background.initWithFile("Image/HelloWorld.png");
    background.setPosition(cc.ccp(size.width / 2, size.height / 2));
    background.setAnchorPoint(cc.ccp(0.5, 0.5));
    lazyLayer.addChild(background);
};
Main.scene = function () {
    // 'scene' is an autorelease object
    var scene = cc.Scene.create();
    // 'layer' is an autorelease object
    var layer = Main.node();
    scene.addChild(layer);
    return scene;
};

// implement the "static node()" method manually
Main.node = function () {
    var pRet = new Main();

    // Init the Main display layer.
    if (pRet && pRet.init()) {
        main = pRet;
        return pRet;
    }

    return null;
};
Main.sharedLayer = function () {
    if (main != null)
        return main;
    else
        return Main.node();
};
/*
 'index.html' → 'cocos2d.js'                         →　  'AppDelegate.js'        →           'Main.js'
 ↓(cc.loadjs) part 1 程式加載                ↓(初始化Main.js)                 ↓(遊戲執行)
 '引擎相關Class'                                 next step                          end
 'Main.js'
 'AppDelegate.js'　
 ↓(cc.loadjs) part 2 影音加載
 'cc.Loader.shareLoader().preload'
 ↓(cc.loadjs) part 3 初始化
 next step
 */

