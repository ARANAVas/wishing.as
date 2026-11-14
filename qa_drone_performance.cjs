const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const app = fs.readFileSync(__dirname + '/app.js', 'utf8');
const css = fs.readFileSync(__dirname + '/styles.css', 'utf8');
const start = app.indexOf('function renderOccasionDroneShow(id){');
const end = app.indexOf('\nfunction applyFestivalMotion(id)', start);
assert(start >= 0 && end > start, 'drone renderer must be present');
const source = app.slice(start, end);

function setup({width=1440, navigator={}, visibility='visible'}={}) {
  const svg = {innerHTML:'', attrs:{}, dataset:{}, setAttribute(k,v){this.attrs[k]=v;}};
  const handlers = {};
  const stage = {
    dataset:{}, attrs:{}, values:new Set(),
    classList:{
      values:null,
      toggle(name, force){ if(force===undefined) force=!this.values.has(name); if(force)this.values.add(name); else this.values.delete(name); return force; },
      add(name){this.values.add(name);},
      contains(name){return this.values.has(name);}
    },
    setAttribute(k,v){this.attrs[k]=v;},
    getBoundingClientRect(){return {width};}
  };
  stage.classList.values=stage.values;
  const caption={textContent:'',dataset:{}};
  class FakeObserver { constructor(cb){this.cb=cb;} observe(target){this.cb([{isIntersecting:true,target}]);} }
  const window={
    innerWidth:width,
    matchMedia(q){return {matches:q.includes('max-width:600px')?width<=600:q.includes('max-width:1000px')?width<=1000:false};},
    addEventListener(name,fn){handlers['window:'+name]=fn;}
  };
  const document={visibilityState:visibility,addEventListener(name,fn){handlers['document:'+name]=fn;}};
  const context={window,document,navigator,IntersectionObserver:FakeObserver,$:id=>id==='occasionDroneShow'?svg:id==='heroIllustration'?stage:id==='droneShowCaption'?caption:null,Math,Array,String,Number,Object,parseInt,Boolean,console};
  vm.createContext(context);
  vm.runInContext(source,context);
  return {svg,stage,caption,handlers,document,render:context.renderOccasionDroneShow};
}
const count = svg => (svg.innerHTML.match(/class="drone-unit"/g)||[]).length;

const standardMobile=setup({width:390});
standardMobile.render('newyear');
assert(count(standardMobile.svg)===20,'standard mobile should retain its 20-drone cap');
const constrainedMobile=setup({width:390,navigator:{deviceMemory:4,hardwareConcurrency:4}});
constrainedMobile.render('newyear');
assert(count(constrainedMobile.svg)===14,'constrained mobile should use a 14-drone cap');
assert(constrainedMobile.stage.dataset.dronePerformance==='lite','low-power mode should be exposed for diagnostics');
const dataSaverDesktop=setup({width:1440,navigator:{connection:{saveData:true}}});
dataSaverDesktop.render('diwali');
assert(count(dataSaverDesktop.svg)===40,'desktop data-saver mode should use a 40-drone cap');
const hiddenTab=setup({width:1440,visibility:'hidden'});
hiddenTab.render('diwali');
assert(hiddenTab.stage.classList.contains('is-document-hidden'),'hidden tabs should pause the show');
hiddenTab.document.visibilityState='visible';
hiddenTab.handlers['document:visibilitychange']();
assert(!hiddenTab.stage.classList.contains('is-document-hidden'),'the show should resume when the tab becomes visible');
assert(css.includes('.drone-show-stage .drone-halo {') && css.includes('animation: none !important;'),'static outer glow should avoid a second perpetual animation per drone');
assert(css.includes('.drone-show-stage.is-document-hidden .drone-light'),'all recurring light animation should pause in hidden tabs');
assert(css.includes('filter: none !important;'),'the final drone pass should avoid per-point blur/drop-shadow filters');
assert(css.includes('@media (prefers-reduced-motion: reduce)'),'reduced-motion support must remain present');
console.log('PASS: standard/low-power point budgets, data-saver scaling, hidden-tab pause/resume, single light twinkle, filter-free drone layers and reduced-motion support.');
