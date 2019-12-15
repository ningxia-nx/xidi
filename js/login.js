function Tab(){
    this.mes = document.querySelector(".mes");
    this.mima = document.querySelector(".mima");
    this.dx = document.querySelector(".dx");
    this.mm = document.querySelector(".mm"); 
    this.box = document.querySelector(".login-way .box");
    this.addEvent();
}
Tab.prototype.addEvent=function(){
    var that=this;
    this.mes.onclick = function(){
        that.change1();
    }
    this.mima.onclick = function(){
        that.change2();
    }
}
Tab.prototype.change1= function(){
    this.mes.style.fontWeight = "bold";
    this.mima.style.fontWeight = "normal";
    move(this.box,{left:40});
    this.dx.style.display="block";
    this.mm.style.display="none";
}
Tab.prototype.change2= function(){
    this.mes.style.fontWeight = "normal";
    this.mima.style.fontWeight = "bold";
    move(this.box,{left:195});
    this.dx.style.display="none";
    this.mm.style.display="block";
}
new Tab();


class Login{
    constructor(){
        this.usd = document.querySelector(".user");
        this.pwd = document.querySelector(".pass");
        this.btn = document.querySelector(".sub");
        this.span = document.querySelector(".mm>span");
        // console.log(this.span)
        this.addEvent();
    }
    addEvent(){
        var that = this;
        // console.log(that.u.value)
        this.btn.onclick = function(){
            that.u = that.usd.value;
            that.p = that.pwd.value;
            if(!that.u && that.p){
                that.change1();
            }else if(!that.p && that.u){
                that.change2();
            }else if(!that.u && !that.u){
                that.change3();
            }else{
                that.getMsg();
            }
            
        }
    }
    change1(){
        this.usd.style.border = "2px solid red";
        this.pwd.style.border = "1px solid #ddd";
        this.span.innerHTML = "请输入您注册的邮箱、手机号或用户名";
    }
    change2(){
        this.usd.style.border = "1px solid #ddd";
        this.pwd.style.border = "2px solid red";
        this.span.innerHTML = "请输入密码";
    }
    change3(){
        this.usd.style.border = "2px solid red";
        this.pwd.style.border = "2px solid red";
        this.span.innerHTML = "请输入账户和密码"
    }
    getMsg(){
        this.msg = localStorage.getItem("userMsg")?JSON.parse(localStorage.getItem("userMsg")):[];
        var type = 0;
        for(var i = 0;i<this.msg.length;i++){

            if(this.msg[i].user===this.u && this.msg[i].pass===this.p){
                console.log(1)

                location.href = "../index.html";
                this.msg[i].onoff = 1;
                localStorage.setItem("userMsg",JSON.stringify(this.msg));
                type = 1;
            }else if(this.msg[i].user===this.u && this.msg[i].pass!=this.p){
                this.span.innerHTML = "密码错误";
                type = 2
            }
        }
        console.log(type)
        if(type == 0){
            this.usd.style.border = "2px solid red";
            this.span.innerHTML = "用户名不存在，请重新输入"
        }
      
    }
}
new Login;

;(function(){
    if(window.localStorage.userArr){//判断是否存在
		var array = JSON.parse(window.localStorage.userArr);
	}else{
		array = [];//创建一个新数组
	}


	var odeng = document.querySelector(".sub")
	var warning = document.querySelector(".warning")
        console.log(array)

     odeng.onclick = function(){
        var ouser = document.querySelector(".user").value;
        var opass = document.querySelector(".pass").value;
		var isHad = false;//定义一个开关变量
		var index = 0 ; //定义一个下标确定用户
		//遍历数组进行匹配
		for(var i =0;i<array.length;i++){
			if(ouser==array[i].useval){//有这个账号
				isHad=true;
				index=i;
 
			}
		}
		if(isHad){//如果存在
			if(opass==array[index].passval){
				
                setCookie("s2","bb")
                setCookie("usename",ouser)
                
                window.location.href = "index.html";
			}else{
				warning.innerHTML = "密码错误"
			}
		}else{//账号不存在或输入错误
			// alert('账号不存在或输入错误');
			warning.innerHTML = "账号不存在或输入错误"
		}
	}
})();