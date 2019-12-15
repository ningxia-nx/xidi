// class Login{
//     constructor(){
//         this.phone = document.querySelector(".phone");
//         this.yzm = document.querySelector(".yzm");
//         this.yzmBox = document.querySelector(".yzm-box");
//         this.yzmBtn = document.querySelector(".yzm-btn");
//         this.pass = document.querySelector(".pass");
//         this.sub = document.querySelector(".sub");
//         this.yesBox = document.querySelector(".yes-box");
//         this.i = document.querySelector(".yes-box i");
//         this.addEvent();
//     }
//     addEvent(){
//         var that = this;
//         this.phone.onfocus = function(){

//             that.changeP(this,1);
//         }
//         this.yzmBox.onfocus = function(){
//             that.changeY(this,1);
//         } 
//         this.pass.onfocus = function(){
//             that.changeM(this,1);
//         } 
//         this.phone.onblur = function(){

//             that.changeP(this,0);
//         }
//         this.yzmBox.onblur = function(){
//             that.changeY(this,0);
//         } 
//         this.pass.onblur = function(){
//             that.changeM(this,0);
//         } 

//         this.sub.onclick= function(){
//             that.u = that.phone.value;
//             that.p = that.pass.value;
//             // that.sbt();
//             that.setMsg();
//         }
//     }
//     changeP(i,type){
//         if(type){
//             this.phone.style.border = "2px solid #4ed6d1";
//             i.nextElementSibling.innerHTML = "请输入11位手机号码";
//             i.nextElementSibling.style.color = "#222";
//         }else{
//             if(!this.phone.value){
//                 this.phone.style.border = "2px solid red";
//                 i.nextElementSibling.innerHTML = "请输入手机号码";
//                 i.nextElementSibling.style.color = "red";
//             }
//         }
//     }
//     changeY(i,type){
//         if(type){
//             this.yzmBox.style.border = "2px solid #4ed6d1";
//             this.yzm.nextElementSibling.innerHTML = "请输入短信验证码";
//             this.yzm.nextElementSibling.style.color = "#222";
//         }else{
//             if(!this.yzmBox.value){
//                 this.yzmBox.style.border = "1px solid #ddd";
//                 this.yzm.nextElementSibling.innerHTML = "";
//             }
//         }
//     }
//     changeM(i,type){
//         if(type){
//             this.pass.style.border = "2px solid #4ed6d1";
//             i.nextElementSibling.innerHTML = "密码为6-16位数字、字母、符号的组合";
//             i.nextElementSibling.style.color = "#222";
//         }else{
//             if(!this.pass.value){
//                 this.pass.style.border = "2px solid red";
//                 i.nextElementSibling.innerHTML = "请输入密码";
//                 i.nextElementSibling.style.color = "red";
//             }
//         }
//     }
//     setMsg(){
//         this.msg = localStorage.getItem("userMsg")?JSON.parse(localStorage.getItem("userMsg")):[];
//         if(this.msg.length<1){
//             this.msg.push({
//                 user:this.u,
//                 pass:this.p,
//                 onoff:0
//             })

//             this.success()
//         }else{
//             var type = this.msg.some((val,idx)=>{
//                 return val.user===this.u;
//             })
//             if(type){
//                 this.phone.nextElementSibling.innerHTML = "用户名重复";
//             }else{
//                 this.msg.push({
//                     user:this.u,
//                     pass:this.p,
//                     onoff:0
//                 })

//                 this.success();
//             }
//         }
//         localStorage.setItem("userMsg",JSON.stringify(this.msg));
//     }
//     success(){
//         setTimeout(function(){
//             location.href="login.html";
//         },1000)
//     }
// }
// new Login;


;(function(){
    var oemail = $("#email")[0];
    var opass = $("#pass")[0];
    var opass2 = $("#pass2")[0];
    var obtn = $(".zhuce")[0];
    var ospan0 = document.getElementsByTagName("span")[0];
    var ospan1 = document.getElementsByTagName("span")[1];
    var ospan2 = document.getElementsByTagName("span")[2];
    var ospan3 = document.getElementsByTagName("span")[3];
    var ospan4 = document.getElementsByTagName("span")[4];

    var s  = false;
    var x  = false;
    var y  = false;
    var z  = false;
    var d  = false;

    oemail.onblur = function(){
        var oemailval = oemail.value;

        var oemailreg = /^[a-z\d]{3,15}@[a-z0-9]{2,9}\.[a-z]{2,3}$/;

        if(oemailreg.test(oemailval)){
            ospan0.innerHTML = "<i></i>"

            s = true;
            
        }else{
            ospan0.innerHTML = "邮箱格式不正确"
            s = false;
        }
    }

    opass.onblur = function(){
        if(opass.value.length>=6 && opass.value.length<=20){
            var a  = 0;
            var b  = 0;
            var c  = 0;
            var opreg = /\d+/g;

            var a = opreg.test(this.value) ? 1:0;

            var  opreg2 = /\d[a-zA-Z]+/g;
            var b = opreg2.test(this.value) ? 1:0;
            var opreg3 = /[^a-zA-Z\d]+/g;
            var c = opreg3.test(this.value) ? 1:0;
            var str = "";
            switch(a+b+c){
                case 1:
                    str = "简单";break;
                case 2:
                    str = "一般";break;
                case 3:
                    str = "困难";break;
            }
            ospan2.innerHTML =  str;
            y=true;

        }else{
            ospan2.innerHTML =  "输入有误"
            y=false;
        }

    }
    opass2.onblur = function(){
     if(opass.value==opass2.value && opass2.value!=""){
         ospan3.innerHTML =  "<i></i>"
         z= true;
     }else{
        ospan3.innerHTML =  "两次密码输入不一致"
        z= false;
     }
    }

    if(window.localStorage.userArr){//判断是否存在
    var array = JSON.parse(window.localStorage.userArr);
    }else{
    array = [];//创建一个新数组
    }


    obtn.onclick = function(){
        var  useval  = oemail.value;
        var  passval = opass.value;
    //遍历数组进行匹配
        for(var i =0;i<array.length;i++){
            //判断是否有相同账号
            if(useval==array[i].useval){
                alert("该账号已存在");
                return;
            }
        }
//创建对象
    var obj = {useval:useval,passval:passval,score:0}
    array.push(obj);
    window.localStorage.userArr=JSON.stringify(array);

    if(s&&y&&z){
        alert("注册成功")
        window.location.href = "login.html";
    }else{
        alert("请填写完整信息或用户名重复")
    }

    }    

})();