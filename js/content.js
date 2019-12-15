;(function(){
  class proDucts{
  constructor(){
      this.url = "http://localhost:83/data/goods.json";
      // console.log(this.url)
      this.tbody = document.querySelector(".main"); 
      this.btn = document.querySelector(".buy-r"); 
      this.num  = document.querySelector(".num2");
      this.load();
      // this.setList();
      this.addEvent();
    }
    load(){
      var that = this;
      ajaxGet(
        this.url,
        function(res){
          that.res = JSON.parse(res);  
          // console.log(that.res) 
          that.setLocal();  
    });
  }
setLocal(){
      this.goodsindex = localStorage.getItem("goodsindex") ? JSON.parse(localStorage.getItem("goodsindex")):[];  
     
      this.display();  
}
display(){
  var str = "";
  
  for(var i=0;i<this.res.length;i++){
    if(this.res[i].goodsId  == this.goodsindex[this.goodsindex.length-1].id){
      console.log(1)
      // document.querySelector(".imgpro").src = this.res[i].url;
      // document.querySelector(".imgpro1").src = this.res[i].url;
      // document.querySelector(".imgpro2").src = this.res[i].url;
      // document.querySelector(".imgpro3").src = this.res[i].url;
      // document.querySelector(".mz").innerHTML = this.res[i].name;
      // document.querySelector(".country").innerHTML = this.res[i].country;
      // document.querySelector(".country").innerHTML = this.res[i].country;
      // document.querySelector(".h1").innerHTML = this.res[i].name;
      // document.querySelector(".text").innerHTML =this.res[i].abstract;
      // document.querySelector(".money").innerHTML = this.res[i].price;
      // document.querySelector(".small1").src = this.res[i].small;
      // document.querySelector(".small2").src = this.res[i].small;
      // document.querySelector(".small3").src = this.res[i].small;
      // document.querySelector(".big1").src = this.res[i].big;
      // document.querySelector(".dzj").src = this.res[i].dzj;
      // document.querySelector(".t1").innerHTML = this.res[i].brand;
      // document.querySelector(".t2").innerHTML = this.res[i].country;
      // document.querySelector(".t3").innerHTML = this.res[i].name;
      // document.querySelector(".t4").innerHTML = this.res[i].t1;
      // document.querySelector(".t5").innerHTML = this.res[i].t2;
      // document.querySelector(".t6").innerHTML = this.res[i].t3;
      // document.querySelector(".x1").src = this.res[i].x1;
      // document.querySelector(".c1").src = this.res[i].c1;
      // document.querySelector(".c2").src = this.res[i].c2;
      // document.querySelector(".c3").src = this.res[i].c3;
      // document.querySelector(".c4").src = this.res[i].c4;
      // console.log()
      this.dd = this.res[i].goodsId;
      console.log(this.dd)
    }
  }  
}
addEvent(){
  var that = this;
  this.btn.addEventListener("click",function(even){
    
    var e = even || window.event;
    var target  = e.target || e.srcElement;
    //    console.log(that.dd)                               
    that.id  = that.dd;   
    console.log(that.dd)           
    that.Localstorage();                                
  })
  this.num.onblur = function(){
    that.num2 = that.num.value;         
  }
}
Localstorage(){
  console.log(1)
     this.goods = localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")) :[];
     //通过长度判断是否是第一次存
       //判断是否重复加入购物车
         var onoff = true;
         console.log(this.goods)
         for(var i =0;i<this.goods.length;i++){
             if(this.goods[i].id === this.id){
              // this.goods[i].num++;
              // this.goods[i].num = this.num2;
               this.goods[i].num = this.num.value;
               onoff = false;
         } 
       }
        if(onoff){
         this.goods.push({
           id:this.id,
           num :1
          })
          }  
      localStorage.setItem("goods",JSON.stringify(this.goods));
   } 

  }
  new proDucts();

})();