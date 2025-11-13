// Sidebar overlay toggle + QR flip logic
(function(){
  function $(s, root){ return (root||document).querySelector(s); }
  function $all(s, root){ return Array.from((root||document).querySelectorAll(s)); }

  var sidebar = document.getElementById('site-sidebar');
  if(!sidebar) return;
  var collapsedTab = sidebar.querySelector('.sidebar-collapsed');
  var panel = sidebar.querySelector('.sidebar-panel');

  function setCollapsed(coll){
    if(coll){
      sidebar.classList.remove('expanded');
      sidebar.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
      sidebar.classList.add('expanded');
    }
  }

  // toggle on collapsed tab click
  collapsedTab.addEventListener('click', function(e){
    var expanded = sidebar.classList.contains('expanded');
    setCollapsed(expanded);
  });

  // close when clicking close button
  var closeBtn = sidebar.querySelector('.sidebar-close');
  if(closeBtn) closeBtn.addEventListener('click', function(){ setCollapsed(true); });

  // init collapsed
  setCollapsed(true);

  // QR flip behavior: each .flip-card toggles .is-flipped on click
  $all('.flip-card', sidebar).forEach(function(card){
    card.addEventListener('click', function(){
      card.classList.toggle('is-flipped');
    });
  });

  // If window resizes to small, auto collapse
  window.addEventListener('resize', function(){
    if(window.innerWidth < 640) setCollapsed(true);
  });
})();
