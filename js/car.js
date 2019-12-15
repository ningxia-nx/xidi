;(function(){
    
    class Car{
        constructor(){
            this.url = "http://localhost:83/data/goods.json"   
            this.tbody = document.querySelector(".order_content"); 
            
            this.load();
            this.setList();
        }
        load(){
            var that = this;
            ajaxGet(
                this.url,
                function(res){
                    that.res = JSON.parse(res);
                    console.log(that.res)
                    that.setLocal();   
                });
            }
            setLocal(){
                this.goods  =  localStorage.getItem("goods") ? JSON.parse(localStorage.getItem("goods")):[];  
                console.log(this.goods)
                this.display();  
            }
            display(){
                var str = "";
                // var str2 = "";
                for(var i = 0;i<this.res.length;i++){
                    for(var j = 0;j<this.goods.length;j++){
                        //  console.log(this.res[i],this.goods[i].num)
                        if(this.res[i].goodsId == this.goods[j].id){
                            console.log(parseInt(this.res[i].price.slice(1)))
                            console.log(this.goods[j].num*parseInt(this.res[i].price.slice(1)))
                  str += `
                      <ul class="order_lists order-c" abc ="${this.res[i].goodsId}">
                          <li class="list_chk">
                              <input type="checkbox" id="checkbox_2" class="son_check dan">
                              <label for="checkbox_2"></label>
                          </li>
                          <li class="list_con">
                              <div class="list_img">
                                  <a href="javascript:;"><img src="${this.res[i].url}" alt=""></a>
                              </div>
                              <div class="list_text">
                                  <a href="javascript:;">${this.res[i].name}</a>
                              </div>
                          </li>
                          
                          <li class="list_price">
                              <p class="price">${this.res[i].price}</p>
                          </li>
                          <li class="list_amount">
                              <div class="amount_box">
                                  
                                  <input type="number" value="${this.goods[j].num}" min="1" class="num">
                                 
                              </div>
                          </li>
                          <li class="list_sum">
                              <p class="sum_price">¥${(this.goods[j].num*parseInt(this.res[i].price.slice(1))).toFixed(2)}</p>
                          </li>
                          <li class="list_op">
                              <p class="del">
                                  <a class="delete">删除</a>
                              </p>
                          </li>
                      </ul>
                   `
                //    str2 += `${this.goods[j].num*this.res[i].price}`
                 }
               }
             }
             this.tbody.innerHTML = str;
            //  window.location.href = "product.html";
            //  this.sum.innerHTML = str2;       
        }
         setList(){
   
            //   this.aprice = document.querySelector("aprice"); 
            //   this.check = document.querySelector("check"); 
              
           var that = this;
           this.tbody.addEventListener("click",function(eve){
               var e = eve || window.event;
               var target = e.target || e.srcElement;
               if(target.className =="delete"){
                  that.id = target.parentNode.parentNode.parentNode.getAttribute("abc");
                //   console.log(target.parentNode.parentNode.parentNode)
                target.parentNode.parentNode.parentNode.remove();

                  that.set((i)=>{
                      //删除索引为i的 那个 数组元素
                      that.goods.splice(i,1);
                  });
                  
               }
           });
           this.tbody.addEventListener("input",function(eve){
              var e = eve || window.event;
              var target = e.target || e.srcElement;
              if(target.className == "num"){
                  // 8.保存点击删除的商品的数量和id
                //   console.log(that.sum = target.parentNode.parentNode.nextElementSibling.firstElementChild)

                  that.sum  = target.parentNode.parentNode.nextElementSibling.firstElementChild
                  
                  that.bprice = target.parentNode.parentNode.previousElementSibling.firstElementChild.innerHTML
                  that.eprice = that.bprice.slice(1,that.bprice.length)

                  that.val = target.value;
                  that.id = target.parentNode.parentNode.parentNode.getAttribute("abc");
                  // 9.从localstorage中找到对应的商品数据
                  that.set(function(i){
                      // 修改
                    //   console.log( parseInt (that.goods[i].num)+1 )
                      that.goods[i].num = that.val;

                    //拿到当前点击的兄弟价格元素，然后把乘好的价格 添加到页面上
                    for(var j = 0;j<that.goods.length;j++){
                            that.sum.innerHTML =  (parseInt (that.goods[i].num)) * (parseInt (that.eprice));   
                            // that.sum.innerHTML =  (parseInt (that.goods[i].num)) * that.res[i].price 
                        }
                    


                  })
              }
          })

        }
        

         //删的准备
         set(fn){
        
              for(var i = 0;i<this.goods.length;i++){
                  if(this.goods[i].id == this.id){
                      //获取到对应的i 然后把这个i返回给前面的回调函数    splice那个
                      fn(i);
                  }
              }
              //把删好的值设置回去
              localStorage.setItem("goods",JSON.stringify(this.goods))
         }
    }

    new  Car();

})();