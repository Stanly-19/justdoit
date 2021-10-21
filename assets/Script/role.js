
const Input = {};
const State = {
    stand: 1,

}//状态属性控制



cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    onLoad () {
        this.jumpHeight = 200;
        this.jumpDuration = 0.35;
        this.isJump = 0;
        this.speed = 200;
        this.sp = cc.v2(0,0);               //速度向量
        this.roleState = State.stand;         //状态调整
        this.anima = 'idle';           //初始化静止动画
        this.roleAni = this.node.getComponent(cc.Animation);   //获取动画组件

        cc.systemEvent.on('keydown',this.onkeydown,this);
        cc.systemEvent.on('keyup',this.onkeyup,this);     //打开目前场景下的键盘监听
    },
    
    onDestroy() {
        cc.systemEvent.off('keydown',this.onkeydown,this);
        cc.systemEvent.off('keyup',this.onkeyup,this);    //给该场景的键盘监听解绑
    },
    

    setAni(anima){                      //播放动画函数
        if(this.anima == anima) return;
    
            this.anima = anima;
            //if(anima=='idle'){this.roleAni.playAdditive(anima);}
            //else{this.roleAni.play(anima);}
            this.roleAni.play(anima);

    },

    onkeydown(e){      //参数回调
        Input[e.keyCode] = 1;
    },

    onkeyup(e){          //参数回调
        Input[e.keyCode] = 0;
    },

    jumpAction (){   //跳跃动作进行
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());  
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var setJump=cc.callFunc(function(){this.isJump=false},this,this);   //参数回调 ，状态置零
        return cc.sequence(jumpUp,jumpDown,setJump);   
      },

    restart(position){
        this.position = this.node.setPosition(-292.756,-75.861)
    },

    update (dt) {
        
        let anima = this.anima;   //  动画状态函数
        this.position = this.node.getPosition();
        let position = this.position;
        let scalex = Math.abs(this.node.scaleX);   //保持缩放比一致
        this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;     //获取线速度

        if(position.y <= -288){
            this.restart(position);
        }
        if(Input[cc.macro.KEY.a]||Input[cc.macro.KEY.left]){        //移动操作方向判断及其动画调用
            this.sp.x = -1;                                  
            this.node.scaleX = -scalex;
            if(this.isJump==false)
            anima = 'run';
        } else if(Input[cc.macro.KEY.d]||Input[cc.macro.KEY.right]){
            this.sp.x = 1;
            this.node.scaleX = scalex;
            if(this.isJump==false) 
            anima = 'run';
        } else {
            this.sp.x = 0;
             anima = 'idle';
        }
        if(Input[cc.macro.KEY.w]&&!this.isJump){    //  跳跃动作判断及动画实现
            {
                this.isJump = 1;
                this.setAni('jump');
                this.node.runAction(this.jumpAction());
              }
        }

        if(this.sp.x){                     //   移动距离操作
            this.lv.x = this.sp.x * this.speed;
        }else{
            this.lv.x = 0;
        }

        this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;   //   实现移动

        if(anima&&this.isJump==false){        //   播放动画
            this.setAni(anima);
        }

    },

    
});