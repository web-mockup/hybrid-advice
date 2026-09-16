/* Shared version switcher: 2 designs x 3 palettes = 6 combinations.
   Palette changes recolour in place (data-attribute, no reload). Design
   changes need a page load, so those navigate, carrying the palette in ?p=.
   Injected by both index.html and refined.html; window.__DESIGN__ says which. */
(function(){
  var DESIGN = window.__DESIGN__ || 'original';
  var FILES = { original: 'index.html', refined: 'refined.html' };
  var PALETTES = [
    { id: '',       name: 'Muted teal & clay',   sw: '#c96f4f' },
    { id: 'red',    name: 'Red & grey',          sw: '#cc0000' },
    { id: 'hybrid', name: 'Hybrid brand',        sw: '#c4f9a1' }
  ];
  /* This slot was 'orange' before the red & grey recolour; shared links and
     saved preferences still carry the old id, so it maps forward. */
  var ALIAS = { orange: 'red' };
  var DESIGNS = [
    { id: 'original', label: 'Original' },
    { id: 'refined',  label: 'Refined' }
  ];

  var css = document.createElement('style');
  css.textContent = [
    '.pal{position:fixed;right:20px;bottom:20px;z-index:210;font-size:12px;}',
    '.pal-btn{display:flex;align-items:center;gap:9px;padding:9px 13px;border-radius:999px;border:0;cursor:pointer;',
      'background:rgba(19,37,34,.82);color:rgba(247,244,238,.92);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);font-weight:500;}',
    '.pal-btn:hover{background:rgba(19,37,34,.95);}',
    '.pal-sw{width:13px;height:13px;border-radius:50%;flex:none;box-shadow:0 0 0 1px rgba(247,244,238,.35);}',
    '.pal-cv{opacity:.7;transition:transform .3s cubic-bezier(.16,1,.3,1);}',
    '.pal[data-open="1"] .pal-cv{transform:rotate(180deg);}',
    '.pal-menu{position:absolute;right:0;bottom:calc(100% + 8px);min-width:236px;background:rgba(19,37,34,.94);',
      '-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-radius:12px;padding:6px;',
      'opacity:0;transform:translateY(6px);pointer-events:none;transition:opacity .25s cubic-bezier(.16,1,.3,1),transform .25s cubic-bezier(.16,1,.3,1);}',
    '.pal[data-open="1"] .pal-menu{opacity:1;transform:none;pointer-events:auto;}',
    '.pal-grp{padding:9px 10px 5px;font-size:9.5px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(247,244,238,.42);}',
    '.pal-grp + .pal-grp{margin-top:2px;}',
    '.pal-opt{display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;border:0;border-radius:8px;cursor:pointer;',
      'background:transparent;color:rgba(247,244,238,.86);font:inherit;font-size:12px;font-weight:500;text-align:left;}',
    '.pal-opt:hover{background:rgba(247,244,238,.10);color:#fff;}',
    '.pal-opt[aria-checked="true"]{color:#fff;background:rgba(247,244,238,.07);}',
    '.pal-opt .tick{margin-left:auto;opacity:0;}',
    '.pal-opt[aria-checked="true"] .tick{opacity:.9;}',
    '@media (max-width:860px){.pal{right:12px;bottom:12px;}.pal-menu{min-width:210px;}}'
  ].join('');
  document.head.appendChild(css);

  function current(){
    var q = (location.search.match(/[?&]p=([a-z]*)/) || [])[1];
    if (q === undefined) {
      try { q = localStorage.getItem('palette') || ''; } catch(e){ q = ''; }
    }
    return Object.prototype.hasOwnProperty.call(ALIAS, q) ? ALIAS[q] : q;
  }

  function build(){
    var pal = document.createElement('div');
    pal.className = 'pal'; pal.id = 'pal'; pal.setAttribute('data-open','0');

    var menu = '<div class="pal-menu" role="menu" aria-label="Version">';
    DESIGNS.forEach(function(d){
      menu += '<div class="pal-grp">' + d.label + '</div>';
      PALETTES.forEach(function(p){
        menu += '<button type="button" class="pal-opt" role="menuitemradio" data-design="' + d.id +
                '" data-pal="' + p.id + '" aria-checked="false">' +
                '<span class="pal-sw" style="background:' + p.sw + '"></span>' + p.name +
                '<span class="tick">&#10003;</span></button>';
      });
    });
    menu += '</div>';

    pal.innerHTML = menu +
      '<button type="button" class="pal-btn" id="palBtn" aria-haspopup="true" aria-expanded="false">' +
        '<span class="pal-sw" id="palSw"></span><span id="palName"></span>' +
        '<span class="pal-cv">&#9662;</span></button>';
    document.body.appendChild(pal);

    var btn = pal.querySelector('#palBtn'),
        sw  = pal.querySelector('#palSw'),
        nm  = pal.querySelector('#palName'),
        opts = pal.querySelectorAll('.pal-opt');

    function paint(v){
      if (v) document.documentElement.setAttribute('data-palette', v);
      else document.documentElement.removeAttribute('data-palette');
      var dLabel = DESIGN === 'refined' ? 'Refined' : 'Original';
      for (var i = 0; i < opts.length; i++){
        var on = opts[i].getAttribute('data-design') === DESIGN &&
                 (opts[i].getAttribute('data-pal') || '') === (v || '');
        opts[i].setAttribute('aria-checked', on ? 'true' : 'false');
      }
      var p = PALETTES.filter(function(x){ return x.id === (v || ''); })[0] || PALETTES[0];
      nm.textContent = dLabel + ' · ' + p.name;
      sw.style.background = p.sw;
    }
    function close(){ pal.setAttribute('data-open','0'); btn.setAttribute('aria-expanded','false'); }

    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = pal.getAttribute('data-open') === '1';
      pal.setAttribute('data-open', open ? '0' : '1');
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    for (var i = 0; i < opts.length; i++){
      opts[i].addEventListener('click', function(){
        var d = this.getAttribute('data-design'), v = this.getAttribute('data-pal') || '';
        try { localStorage.setItem('palette', v); } catch(e){}
        if (d === DESIGN) { paint(v); close(); }
        else { location.href = FILES[d] + (v ? '?p=' + v : ''); }
      });
    }
    document.addEventListener('click', function(e){ if (!pal.contains(e.target)) close(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

    paint(current());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
