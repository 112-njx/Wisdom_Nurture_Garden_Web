// ui.js
// Adds scroll reveal (.reveal-card) and mouse tilt (.interactive-tilt) to common card selectors
(function(){
  if(typeof window === 'undefined') return;

  var selectors = [
    '.ys-item', '.fw-item', '.yz-item', '.rh-item', '.rh-row', '.jk-item', '.al-item', '.hb-item', '.pj-box', '.pj-right img',
    /* Add homepage top-level sections so they also reveal like other pages */
    '.youshi', '.pingjia', '.hezuo'
  ];

  var elements = [];
  selectors.forEach(function(s){
    document.querySelectorAll(s).forEach(function(el){
      // add reveal class if not present
      if(!el.classList.contains('reveal-card')) el.classList.add('reveal-card');
      // add hover-class support (use same class as index.js: is-hover)
      if(!el.classList.contains('interactive-card')) el.classList.add('interactive-card');
      elements.push(el);
    });
  });

  // IntersectionObserver for reveal on scroll
  try{
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(ent){
        if(ent.isIntersecting){
          ent.target.classList.add('visible');
          // optionally unobserve to reduce work
          io.unobserve(ent.target);
        }
      });
    },{root:null,rootMargin:'0px 0px -6% 0px',threshold:0.08});

    elements.forEach(function(el, idx){
      // staggered delay for natural effect
      el.style.transitionDelay = (Math.min(6, idx) * 60) + 'ms';
      io.observe(el);
    });
  }catch(e){
    // fallback: just show all
    elements.forEach(function(el){ el.classList.add('visible'); });
  }

  // Hover / touch behavior: simple scale like homepage (add/remove is-hover)
  elements.forEach(function(el){
    el.addEventListener('mouseenter', function(){ el.classList.add('is-hover'); });
    el.addEventListener('mouseleave', function(){ el.classList.remove('is-hover'); });
    el.addEventListener('touchstart', function(){ el.classList.add('is-hover'); });
    el.addEventListener('touchend', function(){ setTimeout(function(){ el.classList.remove('is-hover'); }, 220); });
  });

})();
