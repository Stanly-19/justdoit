// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       //anim: cc.Animation
    },

    onLoad () {
        
        this.anima = 'rotate';
        var anima = this.anima;
        this.roleAni = this.node.getComponent(cc.Animation);
        this.roleAni.play(anima);
    },
    update (dt) {     
        
    },
});
