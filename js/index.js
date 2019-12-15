
$(".banner").banner({
  items:$(".banner").find("img"),
  left:$(".banner").find("#left"),
  right:$(".banner").find("#right"),
  list:true,
  // index:3,
  autoPlay:true,
  delayTime:2000,
  moveTime:1000
});