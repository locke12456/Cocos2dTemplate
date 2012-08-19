/**
 * Created with JetBrains WebStorm.
 * User: Locke
 * Date: 2012/8/13
 * Time: 下午 4:03
 * To change this template use File | Settings | File Templates.
 */
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
    ccTouchBegan:function (pTouch, pEvent) {
        console.log(pTouch.locationInView().x + "," + pTouch.locationInView().y);
    },
    ccTouchMoved:function (pTouch, pEvent) {

    },
    ccTouchEnded:function (pTouch, pEvent) {

    },
    ccTouchesBegan:function (pTouch, pEvent) {
        for (var i = 0; i < pTouch.length; i++)
            console.log("Point[" + (i + 1) + "](" + pTouch[i].locationInView().x + "," + pTouch[i].locationInView().y + ")");
    },
    ccTouchesMoved:function (pTouch, pEvent) {

    },
    ccTouchesEnded:function (pTouch, pEvent) {

    },
    update:function () {
        this.value = this.value != null ? this.value + 1 : 0;
        this.helloLabel.setString(this.value.toString());
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

    var sprite = this.Sprite = new cc.Sprite();
    sprite.initWithFile("Image/HelloSprite.png");
    sprite.setPosition(cc.ccp(size.width / 2, size.height / 2));
    sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
    sprite.setScale(1);
    this.addChild(sprite);

    var actionMoveBy = cc.MoveBy.create(1, cc.ccp(80, 80));
    var actionRotateBy = cc.RotateBy.create(0.5, 360);
    var actionScaleBy = cc.ScaleBy.create(0.5, 2);
    var actionSpawn = cc.Spawn.create(actionMoveBy, actionRotateBy, actionScaleBy);
    var actionSequence = cc.Sequence.create(actionSpawn, actionSpawn.reverse());
    var actionRepeat = cc.RepeatForever.create(actionSequence);
    //sprite.runAction(actionRepeat);
    var actionMoveBy = cc.MoveBy.create(1, cc.ccp(80, 80));
    var callback = cc.CallFunc.create(sprite, Main.callback, true);
    sprite.runAction(cc.Sequence.create(actionMoveBy, actionMoveBy.reverse(), callback));
    cc.Director.sharedDirector().getTouchDispatcher().addStandardDelegate(this, 1);
    sprite.ccTouchBegan = function (pTouches, pEvent) {
        console.log(pTouches.locationInView().x + "," + pTouches.locationInView().y);
        var actionMoveTo = cc.MoveTo.create(0.5, pTouches.locationInView());
        this.runAction(actionMoveTo);
    };
    sprite.ccTouchMoved = function (pTouches, pEvent) {

    };
    sprite.ccTouchEnded = function (pTouches, pEvent) {

    };
    cc.Director.sharedDirector().getTouchDispatcher().addTargetedDelegate(sprite, 0, true);
    cc.Director.sharedDirector().getScheduler().scheduleUpdateForTarget(this, 0, false);
};
Main.callback = function (sprite, data) {
    var actionRotateBy = cc.RotateBy.create(0.05, 5);
    var callback = cc.CallFunc.create(sprite, Main.callback, true);
    //sprite.runAction(cc.Sequence.create(actionRotateBy, actionRotateBy.reverse(), callback));
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

