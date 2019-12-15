class Magnifier{
  constructor(){
      this.main = document.querySelector(".main");
      this.span = document.querySelector(".bBox span");
      this.img = document.querySelector(".sBox img");
      this.bBox = document.querySelector(".bBox");
      this.sBox = document.querySelector(".sBox");
      this.init();
  }
  init(){
      var that = this;
      this.bBox.onmouseover = function(){
         that.over();
      }
      this.bBox.onmousemove = function(eve){
          var e = eve ||window.event;
          that.move(e)
      }
      this.bBox.onmouseout = function(){
         that.out();
     }
  }
  over(){
      this.span.style.display = "block";
      this.sBox.style.display = "block"; 
     }
 move(e){
     console.log(e.pageY,this.main.offsetTop,this.span.offsetHeight)
     var l = e.clientX- this.main.offsetLeft-this.span.offsetWidth/2;
     var t = e.pageY- this.main.offsetTop-this.span.offsetHeight/2;
     if(l<0) l=0;
     if(t<0) t =0;
     if(l>this.bBox.offsetWidth-this.span.offsetWidth){
       l=this.bBox.offsetWidth-this.span.offsetWidth
      }
     if(t>this.bBox.offsetHeight-this.span.offsetHeight){
         t=this.bBox.offsetHeight-this.span.offsetHeight
     }
     this.span.style.left = l +"px";
     this.span.style.top = t +"px";
     this.img.style.left = l/(this.bBox.offsetWidth-this.span.offsetWidth)*(this.sBox.offsetWidth- this.img.offsetWidth)+"px";
     this.img.style.top = t/(this.bBox.offsetHeight-this.span.offsetHeight)*(this.sBox.offsetHeight- this.img.offsetHeight)+"px";
 }
  out(){
     this.span.style.display = "none";
     this.sBox.style.display = "none";
  }
}
new Magnifier;

class ChangeNum{
    constructor(){
        this.minus = document.querySelector(".minus");
        this.plus = document.querySelector(".plus");
        this.num = document.querySelector(".num-box input");
        this.max = document.querySelector(".yu em");
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.minus.onclick = function(){
            that.change1();
        }
        this.plus.onclick = function(eve){
            that.change2();
        }
        this.num.onchange = function(){
            that.change3();
        }
    }
    change1(){
        if(this.num.value<=1){
            this.num.value = 1;
        }else{
            this.num.value--;
        }
        return false;
    }
    change2(){
        if(this.num.value>=this.max.innerHTML){
            this.num.value = this.max.innerHTML;
        }else{
            this.num.value++;
        }
    }
    change3(){
        if(this.num.value<=1){
            this.num.value = 1;
        }
        if(this.num.value>=this.max.innerHTML){
            this.num.value = this.max.innerHTML;
        }
    }

}
new ChangeNum;

function Ewm(){
    this.img = document.querySelector(".buy-l img");
    this.saoma = document.querySelector(".saoma");
    this.display();
}
Ewm.prototype.display = function(){
    var that = this;
    this.saoma.onmouseover = function(){
        that.img.style.display = "block"; 
    }
    this.saoma.onmouseout = function(){
        that.img.style.display = "none";
    }
}
 new Ewm;