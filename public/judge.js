;(function(){
       //登录注册 购物车 实时判断
       window.onload = function(){

        if(window.localStorage.userArr){//判断是否存在
        var array = JSON.parse(window.localStorage.userArr);
        }else{
        array = [];//创建一个新数组
        }

          let objdeng = document.querySelector(".objdeng")
          let objzhuce = document.querySelector(".objzhuce")
          console.log(objzhuce)

        //   console.log(array)
        //点击退出 清除cookie的值，再拿个状态 判断是否登录 才可以点击购物车
    	
          objzhuce.addEventListener("click",function(){
            removeCookie("s2")
          })  
       
      
          // console.log(getCookie("s2"))
          //  console.log(getCookie("usename"))
          
          if(getCookie("s2") == "bb"){
             objdeng.innerHTML =  getCookie("usename");
             objzhuce.innerHTML = "退出"       
             objzhuce.addEventListener("click",function(){ 
                
                objdeng.innerHTML   = "请登录";
                objzhuce.innerHTML  = "注册";
                location.reload();         
            }) 
           }
           else{
            objdeng.innerHTML  = "请登录";
            objzhuce.innerHTML  = "注册";     
            objzhuce.addEventListener("click",function(){       
              // alert("前往注册页面")
              
              window.location.href = "register.html";                                                           
           })  
          }

           
              

          
     

       let objcart = document.querySelector(".cart");
       
       objcart.onclick = function(){
        if(getCookie("s2")){
            window.location.href = "car.html";
               
          }else{
            alert("请先进行登录")
               
          }
       }
    
      }
})();