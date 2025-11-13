// services-slider.js
// Simple, robust manual slider for the services page app screenshots
(function(){
  if(typeof window === 'undefined') return;
  document.addEventListener('DOMContentLoaded', function(){
    var slider = document.querySelector('.app-slider');
    if(!slider) return;
    var slidesWrap = slider.querySelector('.slides');
    var originalSlides = Array.from(slidesWrap.children);
    // clone first and last for seamless looping
    var firstClone = originalSlides[0].cloneNode(true);
    var lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
    slidesWrap.appendChild(firstClone);
    slidesWrap.insertBefore(lastClone, slidesWrap.firstChild);
    var slides = Array.from(slidesWrap.children);
    var btnPrev = slider.querySelector('.slider-btn.prev');
    var btnNext = slider.querySelector('.slider-btn.next');
    var dotsWrap = slider.querySelector('.slider-dots');
    // start at 1 because 0 is the prepended lastClone
    var index = 1;

    // create dots for original slides only
    originalSlides.forEach(function(_,i){
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot';
      d.setAttribute('data-index', i);
      d.addEventListener('click', function(){ goTo(i + 1); }); // offset by 1 because of clone
      dotsWrap.appendChild(d);
    });

    var dots = Array.from(dotsWrap.children);

    function update(withTransition){
      var w = slider.querySelector('.slides-wrap').clientWidth;
      if(withTransition === false) {
        slidesWrap.style.transition = 'none';
      } else {
        slidesWrap.style.transition = '';
      }
      slidesWrap.style.transform = 'translateX(' + (-index * w) + 'px)';
      // active dot corresponds to real slide index (index-1)
      var realIndex = (index - 1 + originalSlides.length) % originalSlides.length;
      dots.forEach(function(d,i){ d.classList.toggle('active', i === realIndex); });
      // buttons always available in looping mode
      btnPrev.disabled = false;
      btnNext.disabled = false;
      // restore transition setting after a forced update
      if(withTransition === false) {
        // force reflow then restore transition
        slidesWrap.offsetHeight; // eslint-disable-line no-unused-expressions
        slidesWrap.style.transition = '';
      }
    }

    function goTo(i){
      index = i;
      update(true);
    }

    btnPrev.addEventListener('click', function(){ goTo(index - 1); });
    btnNext.addEventListener('click', function(){ goTo(index + 1); });

    // resize handler to recalc transform using width
    var resizeId = null;
    window.addEventListener('resize', function(){
      clearTimeout(resizeId);
      resizeId = setTimeout(update, 120);
    });

    // transitionend: handle seamless jump when reaching clones
    slidesWrap.addEventListener('transitionend', function(){
      if(index === 0){
        // moved to lastClone (prepended) -> jump to real last
        index = slides.length - 2;
        update(false);
      } else if(index === slides.length - 1){
        // moved to firstClone (appended) -> jump to real first
        index = 1;
        update(false);
      }
    });

    // touch support: simple swipe
    var startX = 0;
    var deltaX = 0;
    slidesWrap.addEventListener('touchstart', function(e){
      startX = e.touches[0].clientX;
      deltaX = 0;
    }, {passive:true});
    slidesWrap.addEventListener('touchmove', function(e){
      deltaX = e.touches[0].clientX - startX;
    }, {passive:true});
    slidesWrap.addEventListener('touchend', function(){
      if(Math.abs(deltaX) > 40){
        if(deltaX < 0) goTo(index + 1);
        else goTo(index - 1);
      }
    });

    // keyboard support
    slider.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft') goTo(index -1);
      if(e.key === 'ArrowRight') goTo(index +1);
    });

    // init - position to first real slide
    update(false);

  });
})();
