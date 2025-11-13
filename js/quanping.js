document.addEventListener('DOMContentLoaded', function() {
  // 更稳健地选择轮播项（兼容不同结构）
  var lunboItems = document.querySelectorAll('.quanping-lunbo .lunbo-item');
  if(!lunboItems || lunboItems.length === 0){
    lunboItems = document.querySelectorAll('.lunbo-item');
  }
  if(!lunboItems || lunboItems.length === 0){
    console.warn('quanping: 未找到轮播项 .lunbo-item，轮播未启动');
    return;
  }

  var currentIndex = 0;
  var intervalTime = 3000; // 每张显示时长（毫秒）

  function switchTo(index){
    lunboItems.forEach(function(item){ item.classList.remove('active'); });
    currentIndex = ((index % lunboItems.length) + lunboItems.length) % lunboItems.length;
    lunboItems[currentIndex].classList.add('active');
  }

  function next(){ switchTo(currentIndex + 1); }

  // start
  var lunboInterval = setInterval(next, intervalTime);

  // 不要在鼠标悬停时暂停轮播（按要求移除暂停行为）
  // 如果将来需要恢复悬停暂停，请取消下面注释并保存：
  // var lunboContainer = document.querySelector('.quanping-lunbo .lunbo-container') || document.querySelector('.lunbo-container');
  // if(lunboContainer){
  //   lunboContainer.addEventListener('mouseenter', function(){ clearInterval(lunboInterval); });
  //   lunboContainer.addEventListener('mouseleave', function(){ lunboInterval = setInterval(next, intervalTime); });
  // }

  // keyboard support
  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowRight') { clearInterval(lunboInterval); next(); }
    if(e.key === 'ArrowLeft') { clearInterval(lunboInterval); switchTo(currentIndex - 1); }
  });
});
