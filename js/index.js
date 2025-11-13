// index page interactions: hover scaling for cards and a sliding indicator for hezuo buttons

(function(){
  // card hover effect: add class on mouseenter/mouseleave to support touch fallback
  // NOTE: 不包含 `.ys-item`，以避免主页“核心优势”三块与标题/其他元素联动
  var cards = document.querySelectorAll('.pj-box, .fw-item, .yz-item');
  cards.forEach(function(card){
    card.classList.add('interactive-card');
    card.addEventListener('mouseenter', function(){ card.classList.add('is-hover'); });
    card.addEventListener('mouseleave', function(){ card.classList.remove('is-hover'); });
    // touch devices: tap briefly to add effect
    card.addEventListener('touchstart', function(){ card.classList.add('is-hover'); });
    card.addEventListener('touchend', function(){ setTimeout(function(){ card.classList.remove('is-hover'); }, 250); });
  });

  // hezuo button indicator: slides under hovered/active button
  var hezuo = document.querySelector('.hezuo');
  if(!hezuo) return;
  var btnsWrap = hezuo.querySelector('.btns');
  var buttons = btnsWrap ? btnsWrap.querySelectorAll('a') : [];
  if(!btnsWrap || buttons.length===0) return;

  var indicator = document.createElement('div');
  indicator.className = 'btn-indicator';
  btnsWrap.appendChild(indicator);

  function positionIndicator(el){
    var wrapRect = btnsWrap.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    var left = elRect.left - wrapRect.left;
    indicator.style.left = left + 'px';
    indicator.style.width = elRect.width + 'px';
  }

  // initialize under first button
  positionIndicator(buttons[0]);

  buttons.forEach(function(b){
    b.addEventListener('mouseenter', function(){ positionIndicator(b); });
    b.addEventListener('click', function(e){ positionIndicator(b); });
  });

  // if window resizes, reposition to the currently hovered or first button
  window.addEventListener('resize', function(){
    var active = btnsWrap.querySelector('a:hover') || buttons[0];
    positionIndicator(active);
  });

  // --- 额外交互：首页三大功能标签点击行为 ---
  var pageTags = document.querySelectorAll('.ys-item .tag[data-action]');
  if(pageTags && pageTags.length){
    pageTags.forEach(function(t){
      t.addEventListener('click', function(e){
        var action = t.getAttribute('data-action');
        if(action === 'ctrip'){
          // 打开携程官网新窗口
          window.open('https://www.ctrip.com','_blank');
        } else if(action === 'panic'){
          // 简单实现：弹出模拟呼救对话框
          showPanicModal();
        } else if(action === 'stations'){
          // 跳转到线下驿站页
          window.location.href = 'stations.html';
        }
      });
    });
  }

  // 创建并显示简单的呼救模态框
  function showPanicModal(){
    // 如果已经存在则直接显示
    if(document.getElementById('panic-modal')){
      document.getElementById('panic-modal').classList.add('visible');
      return;
    }
    var overlay = document.createElement('div');
    overlay.id = 'panic-modal';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 2400;
    overlay.style.background = 'rgba(0,0,0,0.35)';

    var box = document.createElement('div');
    box.style.background = '#fff';
    box.style.padding = '22px';
    box.style.borderRadius = '10px';
    box.style.maxWidth = '420px';
    box.style.width = '92%';
    box.style.boxShadow = '0 14px 40px rgba(15,35,60,0.18)';

    var h = document.createElement('h3');
    h.textContent = '一键呼救示例';
    h.style.marginTop = '0';
    var p = document.createElement('p');
    p.textContent = '该功能将立即联系应急联系并推送定位，下面是模拟对话提示。';

    var btnCall = document.createElement('button');
    btnCall.textContent = '呼叫 120';
    btnCall.style.marginRight = '10px';
    btnCall.style.padding = '8px 14px';
    btnCall.style.background = '#d9534f';
    btnCall.style.color = '#fff';
    btnCall.style.border = 'none';
    btnCall.style.borderRadius = '6px';
    btnCall.style.cursor = 'pointer';
    btnCall.addEventListener('click', function(){
      alert('模拟：正在拨打急救电话 120 ...');
      closeModal();
    });

    var btnClose = document.createElement('button');
    btnClose.textContent = '取消';
    btnClose.style.padding = '8px 14px';
    btnClose.style.background = '#eee';
    btnClose.style.border = 'none';
    btnClose.style.borderRadius = '6px';
    btnClose.style.cursor = 'pointer';
    btnClose.addEventListener('click', closeModal);

    box.appendChild(h);
    box.appendChild(p);
    var btnRow = document.createElement('div');
    btnRow.style.marginTop = '14px';
    btnRow.appendChild(btnCall);
    btnRow.appendChild(btnClose);
    box.appendChild(btnRow);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e){ if(e.target === overlay) closeModal(); });

    function closeModal(){
      overlay.classList.remove('visible');
      document.body.removeChild(overlay);
    }
  }

})();
