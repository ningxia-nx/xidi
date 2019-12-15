class List{
  constructor(){
    this.url = "http://localhost:83/data/goods.json";
    this.list = document.querySelector(".list");
    this.load();
    this.addEvent();
    }
    load(){
      var that= this;
      $.ajax({
        url:this.url,
        type:"get",
        success:function(res){      
         that.res = res
        //  console.log(res)
         that.display();
        },
        async:false
    });
      // ajaxGet(this.url,function(res){
      //   that.res = JSON.parse(res);
      //   // console.log(that.res)
      //   that.display();
      // })
    }
    display(){
      // var that = this;
      var str = "";
      for(var i = 0;i<this.res.length;i++){
        str +=`<li abc="${this.res[i].goodsId}">
                <div class="list-t">
                  <a class="like" href="">
                  </a>
                  <a class="tu" href="javascript:void(0)">
                    <img src="${this.res[i].url}" alt="">
                  </a>
                </div>
                <div class="list-b">
                  <a href="goods.html">${this.res[i].name}</a>
                  <span class="price">${this.res[i].price}</span>
                  <div class="contry">
                    <img src="${this.res[i].flag}" alt="">
                    <span>${this.res[i].country}</span>
                  </div>
                </div>
              </li>`;
      }
      this.list.innerHTML = str;
    }
    addEvent(){
      // console.log(this.tu)
      var that= this;
 
      this.list.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        console.log(target)
        if(target.parentNode.className == "tu"){
          console.log(1)
          that.id = target.parentNode.parentNode.parentNode.getAttribute("abc");
          console.log(that.id)
          window.location.href="goods.html";
          that.localstroage();
        }
      })
    }
    localstroage(){
      this.goodsindex = localStorage.getItem("goodsindex") ? JSON.parse(localStorage.getItem("goodsindex")) :[];
      //点击的时候 获取当前的id值
      this.goodsindex.push({
          id:this.id,
      });
      localStorage.setItem("goodsindex",JSON.stringify(this.goodsindex));
    }
}
new List;