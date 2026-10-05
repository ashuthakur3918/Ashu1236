(function(){
/* Frontier v98 — one source of truth for every public interior page. */
function frontierV98Shell(){
  if(document.body.classList.contains("world-home")) return;
  document.body.classList.add("frontier-interior");
  /* Remove every retired visual system before applying the current one. */
  document.querySelectorAll('link[href*="home-v53"],link[href*="home-v54"],link[href*="frontier-rebuild"],link[href*="upficient-inspired"]').forEach(function(x){x.remove();});
  document.querySelectorAll('header:not(.frontier-v98-header),footer:not(.frontier-v98-footer),.footer:not(.frontier-v98-footer),.site-footer:not(.frontier-v98-footer),.access-bar,.world-announcement,.mobile-drawer,.mobile-sticky,.global-nav,.world-masthead,.legacy-header,.site-header,.topbar,.navbar,.global-mobile-drawer,.mega').forEach(function(x){x.remove();});
  document.querySelectorAll('a[href="/buddy.html"],a[href*="buddy.html"]').forEach(function(x){x.remove();});
  var key="data-frontier-v98",href="/frontier-v98.css?v=106",link=document.querySelector("link["+key+"]");
  if(link) link.href=href;
  else { link=document.createElement("link");link.rel="stylesheet";link.href=href;link.setAttribute(key,"true");document.head.appendChild(link); }
  if(!document.querySelector(".frontier-v98-header")){
    document.body.insertAdjacentHTML("afterbegin",'<header class="frontier-v98-header"><div class="frontier-v98-inner"><a class="frontier-v98-brand" href="/" aria-label="Frontier World home"><span class="frontier-v98-mark"><svg viewBox="0 0 80 60" aria-hidden="true"><circle cx="40" cy="30" r="27" fill="#f7f2e7"/><path d="M13 42 28 27 35 34 45 21 56 34 67 27 72 42Z" fill="#102c45"/><circle cx="45" cy="21" r="9" fill="#f3a33b"/><path d="M17 44c17-6 34-7 54-4" fill="none" stroke="#f7f2e7" stroke-width="4"/></svg></span><span>FRONTIER <b>WORLD</b></span></a><nav class="frontier-v98-nav" aria-label="Primary"><a href="/destinations.html">Destinations</a><a href="/experiences.html">Experiences</a><a href="/stays.html">Stays</a><a href="/plan.html">Plan</a><a href="/discover.html">Journal</a><a href="/news.html">News</a><a href="/events.html">Events</a><a href="/offers.html">Offers</a><a href="/live.html">Live</a></nav><div class="frontier-v98-actions"><a class="frontier-v98-search" href="/search.html">⌕ <span>Search</span></a><a class="frontier-v98-action" href="/plan.html">Plan a trip <span>→</span></a><button class="frontier-v98-menu" type="button" aria-label="Open menu" aria-expanded="false">☰</button></div></div><nav class="frontier-v98-mobile" aria-label="Mobile navigation"><a href="/destinations.html">Destinations</a><a href="/experiences.html">Experiences</a><a href="/stays.html">Stays</a><a href="/plan.html">Plan</a><a href="/discover.html">Journal</a><a href="/news.html">News</a><a href="/events.html">Events</a><a href="/offers.html">Offers</a><a href="/live.html">Live</a><a href="/account.html">My Frontier</a></nav></header>');
  }
  if(!document.querySelector(".frontier-v98-footer")){
    document.body.insertAdjacentHTML("beforeend",'<footer class="site-footer frontier-v98-footer"><div class="frontier-v98-footer-top"><div><a class="frontier-v98-brand" href="/"><span class="frontier-v98-mark"><svg viewBox="0 0 80 60" aria-hidden="true"><circle cx="40" cy="30" r="27" fill="#f7f2e7"/><path d="M13 42 28 27 35 34 45 21 56 34 67 27 72 42Z" fill="#102c45"/><circle cx="45" cy="21" r="9" fill="#f3a33b"/><path d="M17 44c17-6 34-7 54-4" fill="none" stroke="#f7f2e7" stroke-width="4"/></svg></span><span>FRONTIER <b>WORLD</b></span></a><p>Travel better. Go further. Practical guides, places and planning.</p></div><div><strong>EXPLORE</strong><a href="/destinations.html">Destinations</a><a href="/experiences.html">Experiences</a><a href="/stays.html">Stays</a><a href="/map.html">Map</a></div><div><strong>PLAN</strong><a href="/plan.html">Plan a trip</a><a href="/itineraries.html">Itineraries</a><a href="/costs.html">Budget</a><a href="/essentials.html">Essentials</a></div><div><strong>DISCOVER</strong><a href="/discover.html">Journal</a><a href="/food.html">Food</a><a href="/events.html">Events</a></div><div><strong>FRONTIER</strong><a href="/live.html">Live</a><a href="/account.html">My Frontier</a><a href="/business.html">For businesses</a><a href="/about.html">About</a><a href="/privacy.html">Privacy</a></div></div><div class="frontier-footer-bottom"><span>© 2026 Frontier World · Travel discovery and planning</span><span><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a> · <a href="/cookies.html">Cookies</a></span></div></footer>');
  }
  var menu=document.querySelector(".frontier-v98-menu"),mobile=document.querySelector(".frontier-v98-mobile");
  if(menu&&mobile&&!menu.dataset.bound){menu.dataset.bound="1";menu.addEventListener("click",function(){var open=mobile.classList.toggle("open");menu.setAttribute("aria-expanded",open?"true":"false");});}
}
if(!document.body.classList.contains("world-home")){
  frontierV98Shell();
  document.addEventListener("DOMContentLoaded",frontierV98Shell);
}
var D=window.FRONTIER_DATA||{};
window.FRONTIER_DATA=D;
var cmsPromise=fetch('/api/cms/public',{cache:'no-store'}).then(function(r){return r.ok?r.json():null;}).then(function(cmsData){
 if(cmsData&&typeof cmsData==='object'){
  Object.keys(cmsData).forEach(function(k){
   if(Array.isArray(cmsData[k])&&cmsData[k].length)D[k]=cmsData[k];
   else if(k!=='_settings'&&cmsData[k]&&typeof cmsData[k]==='object')D[k]=Object.assign(D[k]||{},cmsData[k]);
  });
  window.FRONTIER_DATA=D;
 }
 return D;
}).catch(function(){return D;});
window.FRONTIER_CMS_READY=false;
var cmsEsc=function(v){return String(v??'').replace(/[&<>\"]/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'})[c]});};
var homeDest=document.getElementById('dmoDestinations');if(homeDest)homeDest.innerHTML=(D.destinations||[]).slice(0,6).map(function(x){return '<a class=\"dmo-destination-card\" href=\"/destination.html?place='+encodeURIComponent(x.name)+'\"><img loading=\"lazy\" src=\"'+x.image+'\" alt=\"'+cmsEsc(x.name)+'\"><div><span>'+cmsEsc(x.region)+'</span><h3>'+cmsEsc(x.name)+'</h3><p>'+cmsEsc(x.note)+'</p><b>Explore →</b></div></a>';}).join('');
var homeIt=document.getElementById('dmoItineraries');if(homeIt)homeIt.innerHTML=(D.itineraries||[]).slice(0,4).map(function(x){return '<article><small>'+cmsEsc(x.days)+' · '+cmsEsc(x.fit)+'</small><h3>'+cmsEsc(x.name)+'</h3><p>'+cmsEsc(x.route)+'</p><strong>'+cmsEsc(x.budget)+'</strong><a href=\"/plan.html\">Adapt this route →</a></article>';}).join('');
var homeSt=document.getElementById('dmoStays');if(homeSt)homeSt.innerHTML=(D.stays||[]).slice(0,4).map(function(x){return '<a href=\"/stays.html\"><img loading=\"lazy\" src=\"'+x.image+'\" alt=\"'+cmsEsc(x.name)+'\"><div><span>'+cmsEsc(x.region)+'</span><h3>'+cmsEsc(x.name)+'</h3><p>'+cmsEsc(x.note)+'</p></div></a>';}).join('');
var cmsPageKey=location.pathname.split('/').pop().replace('.html','')||'home';var cmsPage=D.pages&&D.pages[cmsPageKey];if(cmsPage){if(cmsPage.title)document.title=cmsPage.title;if(cmsPage.description){var md=document.querySelector('meta[name="description"]');if(md)md.setAttribute('content',cmsPage.description);}var hero=document.querySelector('.page-hero');if(hero){var ey=hero.querySelector('.eyebrow'),hh=hero.querySelector('h1'),pp=hero.querySelector('p:not(.eyebrow)');if(ey&&cmsPage.eyebrow)ey.textContent=cmsPage.eyebrow;if(hh&&cmsPage.headline)hh.textContent=cmsPage.headline;if(pp&&cmsPage.subheadline)pp.textContent=cmsPage.subheadline;}}var $=function(s){return document.querySelector(s)};
(function(){var slug=location.pathname.split("/").pop().replace(".html","")||"home";document.body.classList.add("frontier-page-"+slug);if(location.pathname==="/guide.html")document.body.classList.add("frontier-guide-page");})();
var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function track(e,m){fetch("/api/event",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event_name:e,host:"Frontier World",page_path:location.pathname,source:new URLSearchParams(location.search).get("utm_source")||"direct",metadata:m||{}})}).catch(function(){});}
track("page_view");
try{if(!localStorage.getItem("frontier_cookie_notice_seen")){var cbn=document.createElement("div");cbn.className="cookie-notice";cbn.setAttribute("role","region");cbn.setAttribute("aria-label","Cookie notice");cbn.innerHTML='<span>Frontier uses essential browser storage for sign-in/preferences and limited site measurement. <a href="/cookies.html">Cookie notice</a> · <a href="/privacy.html">Privacy</a></span><button type="button" aria-label="Dismiss cookie notice">OK</button>';document.body.appendChild(cbn);cbn.querySelector("button").addEventListener("click",function(){try{localStorage.setItem("frontier_cookie_notice_seen","1");}catch(e){}cbn.remove();});}}catch(e){}
if("IntersectionObserver"in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target);}})},{threshold:.08});$$( ".reveal").forEach(function(x){io.observe(x)})}else{$$(".reveal").forEach(function(x){x.classList.add("show")})}
function cards(id,items,type){var el=$(id);if(!el)return;if(!items||!items.length){el.innerHTML='<div class="empty-card"><h3>Nothing is published here yet.</h3><p>Frontier will show this section when verified content is available.</p></div>';return;}el.innerHTML=items.map(function(x,i){var name=typeof x==="string"?x:x.name, note=typeof x==="string"?"Explore this Frontier guide.":(x.note||x.excerpt||"A practical Frontier guide built around place, pace and context."),region=typeof x==="string"?"":(x.region||"");var href=type==="PLACE"?"/destination.html?place="+encodeURIComponent(name):type==="TREK"?"/treks.html#"+encodeURIComponent(name):type==="FESTIVAL"?"/festivals.html#"+encodeURIComponent(name):type==="STAY"?"/stays.html#"+encodeURIComponent(name):"#";var image=typeof x==="object"&&x.image?'<img src="'+esc(x.image)+'" alt="" loading="lazy">':"";return '<a class="data-card editorial-card reveal show" href="'+href+'">'+image+'<div class="card-body"><small>'+esc(region||type)+'</small><h3>'+esc(name)+'</h3><p>'+esc(note)+'</p><span>Explore ↗</span></div></a>';}).join("");}
cards("#destinationsGrid",D.destinations||[],"PLACE");cards("#trekGrid",D.treks||[],"TREK");cards("#festivalGrid",D.festivals||[],"FESTIVAL");cards("#stayGrid",D.stays||[],"STAY");cards("#foodGrid",D.foods||[],"FOOD");
var eg=$("#experienceGrid");if(eg)eg.innerHTML=(D.experiences||[]).map(function(x){var n=typeof x==='string'?x:x.name;var note=typeof x==='string'?'Explore the feeling.':x.note;return '<a class="chip-card experience-card" href="/plan.html?interest='+encodeURIComponent(n)+'"><span>'+(typeof x==='object'&&x.icon?esc(x.icon):'✦')+'</span><div><strong>'+esc(n)+'</strong><small>'+esc(note)+'</small></div><b>↗</b></a>';}).join("");
var sg=$("#seasonGrid");if(sg)sg.innerHTML=(D.seasons||[]).map(function(x){var n=typeof x==='string'?x:x.name;var note=typeof x==='string'?'Explore the travel rhythm of this season.':x.note;return '<a class="season-card" href="/discover.html#seasons"><small>SEASON</small><h3>'+esc(n)+'</h3><p>'+esc(note)+'</p><span>See ideas ↗</span></a>';}).join("");
var rg=$("#routeGrid");if(rg)rg.innerHTML=(D.routes||[]).map(function(x){var n=typeof x==='string'?x:x.name;var s=typeof x==='string'?'Current status needs checking':(x.status||'Current status needs checking');return '<div class="route-row"><span class="status-dot"></span><strong>'+esc(n)+'</strong><em>'+esc(s)+'</em><a href="/live.html">View live layer ↗</a></div>';}).join("");
var ds=$("#destinationSearch");if(ds)ds.addEventListener("input",function(){var v=ds.value.toLowerCase();$$(".data-card").forEach(function(c){c.style.display=c.textContent.toLowerCase().indexOf(v)>-1?"flex":"none";});});
$$(".search-form").forEach(function(f){f.addEventListener("submit",function(e){e.preventDefault();var i=f.querySelector("input");if(i&&i.value.trim()){track("search_submitted",{query:i.value.trim().slice(0,120)});location.href="/search.html?q="+encodeURIComponent(i.value.trim());}else if(i){i.focus();i.setAttribute("aria-invalid","true");}});});
var hsi=$("#homeSearchInput"),hss=$("#homeSearchSuggestions");if(hsi&&hss){var suggestions=["Quiet places","Snow","Easy treks","Homestays","Cafés","Workation","Family-friendly places","Short road trips","Photography","Local food"];function renderSuggestions(v){var q=(v||"").toLowerCase().trim(),items=suggestions.filter(function(x){return !q||x.toLowerCase().indexOf(q)>-1}).slice(0,6);hss.innerHTML=items.map(function(x){return '<button type="button" role="option" aria-selected="false" data-search-suggestion="'+esc(x)+'">'+esc(x)+'<span>↗</span></button>';}).join("");hss.hidden=!items.length||document.activeElement!==hsi;}hsi.addEventListener("focus",function(){renderSuggestions(hsi.value);});hsi.addEventListener("input",function(){hsi.removeAttribute("aria-invalid");renderSuggestions(hsi.value);});hss.addEventListener("mousedown",function(e){var b=e.target.closest("[data-search-suggestion]");if(b){e.preventDefault();hsi.value=b.getAttribute("data-search-suggestion");hss.hidden=true;hsi.focus();}});document.addEventListener("click",function(e){if(!e.target.closest(".search-form"))hss.hidden=true;});}
var planner=$("#planner");
function diffDays(a,b){if(!a||!b)return 5;var x=new Date(a),y=new Date(b),n=Math.round((y-x)/86400000)+1;return Math.max(1,Math.min(30,isFinite(n)?n:5));}
function buildPlan(p){var days=diffDays(p.start.value,p.end.value), interests=$$("input[name=interest]:checked").map(function(x){return x.value;}), start=p.startLocation.value, style=p.style.value, budget=p.budget.value;
 var destination=(p.destination&&p.destination.value||"").trim();var pick=destination?[destination]:interests.indexOf("food")>-1?["Lisbon","Istanbul","Marrakech"]:interests.indexOf("coast")>-1?["Lisbon","Bali","Cape Town"]:interests.indexOf("walking")>-1?["Patagonia","Himachal","Tour du Mont Blanc"]:interests.indexOf("cities")>-1?["Kyoto","Lisbon","Istanbul"]:interests.indexOf("family")>-1?["Bali","Lisbon","Kyoto"]:days<=3?["Lisbon","Sintra"]:days<=5?["Kyoto","Nara","Osaka"]:days<=7?["Marrakech","Atlas","Essaouira"]:["Cape Town","Patagonia","Himachal"]; 
 var stops=pick.slice(0,Math.min(pick.length,Math.ceil(days/2)+1));var dayPlan=Array.from({length:days},function(_,i){var stop=stops[Math.min(i,stops.length-1)];return {day:i+1,place:stop,focus:i===0?"Arrival + orientation":i===days-1?"Flexible final day":interests[i%Math.max(interests.length,1)]||"Explore locally"};});return {days:days,pick:stops,start:start,style:style,budget:budget,interests:interests,dayPlan:dayPlan};}
if(planner)planner.addEventListener("submit",async function(e){e.preventDefault();var start=planner.start.value,end=planner.end.value,invalid=[];planner.querySelectorAll("[aria-invalid=true]").forEach(function(x){x.removeAttribute("aria-invalid")});if(!start)invalid.push(planner.start);if(!end)invalid.push(planner.end);if(start&&end&&new Date(end)<new Date(start)){invalid.push(planner.end);planner.end.setCustomValidity("End date must be on or after the start date.");}else planner.end.setCustomValidity("");if(!planner.name.value.trim())invalid.push(planner.name);if(!planner.email.validity.valid)invalid.push(planner.email);if(invalid.length){invalid.forEach(function(x){x.setAttribute("aria-invalid","true")});invalid[0].focus();return;}var plan=buildPlan(planner),contact={name:planner.name.value,email:planner.email.value,phone:planner.phone.value,start_date:planner.start.value,end_date:planner.end.value,group_size:planner.people.value,destination:planner.destination?planner.destination.value:"",starting_location:planner.startLocation.value,budget:planner.budget.value,travel_style:planner.style.value,interests:plan.interests.join(", "),message:planner.message.value,trip_source:"planner"};$("#planOutput").innerHTML='<div class="plan-result"><small>YOUR PERSONALIZED STARTING POINT</small><h2>'+plan.days+' days · '+esc(plan.start)+'</h2><div>'+plan.pick.map(function(x,i){return '<span>'+String(i+1).padStart(2,"0")+' · '+esc(x)+'</span>';}).join("")+'</div><p><strong>'+esc(plan.style)+' · '+esc(plan.budget)+'</strong></p><p>Built around '+(plan.interests.length?esc(plan.interests.join(", ")):"your general interests")+'. This is a planning direction, not a live booking. Verify weather, road conditions, permits, prices and availability before travel.</p><div class="hero-actions"><button type="button" class="btn orange" id="saveGeneratedTrip">Save this trip</button><!-- retired feature link removed --></div></div>';
 track("planner_completed",{days:plan.days,start:plan.start,style:plan.style,budget:plan.budget,interests:plan.interests});var saveBtn=$("#saveGeneratedTrip");if(saveBtn)saveBtn.addEventListener("click",function(){saveGeneratedTrip(plan);});try{var r=await fetch("/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(contact)});var j=await r.json();if(j.ok){planner.querySelector("button").textContent="Trip brief saved ✓";planner.querySelector("button").disabled=true;}}catch(err){track("lead_submit_error",{message:String(err).slice(0,120)});}});
var dg=$("#destinationDetail");
if(dg){var q=new URLSearchParams(location.search).get("place")||"Kyoto", base=(D.destinations||[]).find(function(x){return x.name===q;})||{name:q,region:"Global destination",note:"A place to explore with context."}, d=(D.destinationDetails||{})[q]||{region:base.region||"Global destination",best:"Check current seasonal guidance before travelling.",duration:"Flexible",budget:"Varies by destination, season and travel style.",reach:"Check current transport options and official travel guidance.",stay:"Choose a base that matches your pace, access and budget.",do:["Explore local places","Try regional food","Spend time outdoors"],who:base.note||"Travellers who want to explore a destination with context.",tips:"Use Frontier's planner to shape this destination around your dates, pace and interests."};document.title=q+" — Destination Guide | Frontier World";dg.innerHTML='<section class="destination-hero"><div><p class="eyebrow">DESTINATION GUIDE · '+esc(d.region)+'</p><h1>'+esc(q)+'<br><em>plan it with context.</em></h1><p>'+esc(d.who)+'</p><div class="hero-actions"><a class="btn orange" href="/plan.html?destination='+encodeURIComponent(q)+'">Plan My Trip</a><a class="btn secondary" href="/destinations.html">Compare Places</a></div></div></section><section class="section destination-overview"><div class="fact-grid"><div><small>BEST TIME</small><strong>'+esc(d.best)+'</strong></div><div><small>IDEAL DURATION</small><strong>'+esc(d.duration)+'</strong></div><div><small>BUDGET GUIDE</small><strong>'+esc(d.budget)+'</strong></div><div><small>WHO IT SUITS</small><strong>'+esc(d.who)+'</strong></div></div></section><section class="section"><div class="split-head"><div><p class="eyebrow">PRACTICAL PLANNING</p><h2>Know before<br><em>you go.</em></h2></div><p>'+esc(d.tips)+'</p></div><div class="practical-grid"><article><small>HOW TO REACH</small><p>'+esc(d.reach)+'</p></article><article><small>WHERE TO STAY</small><p>'+esc(d.stay)+'</p></article><article><small>LOCAL FIT</small><p>'+esc(d.who)+'</p></article></div></section><section class="section feature-band"><p class="eyebrow">THINGS TO DO</p><h2>Build your days<br><em>around what matters.</em></h2><div class="activity-grid">'+d.do.map(function(x){return '<a href="/plan.html?interest='+encodeURIComponent(x)+'"><strong>'+esc(x)+'</strong><span>Plan around this ↗</span></a>';}).join("")+'</div></section><section class="section"><div class="planner-card"><div><p class="eyebrow">READY TO PERSONALIZE?</p><h2>Make '+esc(q)+'<br><em>fit your trip.</em></h2><p>Tell Frontier your dates, starting point, budget and interests. We’ll turn this guide into a route you can refine with a local expert or your own research.</p></div><a class="btn orange" href="/plan.html?destination='+encodeURIComponent(q)+'">Build My Itinerary</a></div></section>';}
function renderItineraries(){var ig=$("#itineraryGrid");if(!ig)return;var q=new URLSearchParams(location.search),days=q.get("days"),style=(q.get("style")||"").toLowerCase();var items=(D.itineraries||[]).filter(function(x){return (!days||String(x.days).indexOf(days)>-1)&&(!style||style==="road-trip"&&/road trip|escape/i.test(x.fit||""));});if(!items.length){ig.innerHTML='<div class="empty-card"><h3>No itineraries match that filter.</h3><p>Try all itineraries or choose a different duration/style.</p><a href="/itineraries.html">See all routes →</a></div>';return;}ig.innerHTML=items.map(function(x){return '<article class="itinerary-card"><small>'+esc(x.days)+'</small><h3>'+esc(x.name)+'</h3><p>'+esc(x.route)+'</p><div><span>'+esc(x.fit)+'</span><strong>'+esc(x.budget)+'</strong></div><a class="btn secondary" href="/plan.html">Adapt this route →</a></article>';}).join("");}renderItineraries();
cmsPromise.then(function(){
 window.FRONTIER_CMS_READY=true;
 renderItineraries();
 cards("#destinationsGrid",D.destinations||[],"PLACE");
 cards("#trekGrid",D.treks||[],"TREK");
 cards("#festivalGrid",D.festivals||[],"FESTIVAL");
 cards("#stayGrid",D.stays||[],"STAY");
 cards("#foodGrid",D.foods||[],"FOOD");
 var eg2=$("#experienceGrid");if(eg2)eg2.innerHTML=(D.experiences||[]).map(function(x){var n=typeof x==='string'?x:x.name;return '<a class="chip-card experience-card" href="/plan.html?interest='+encodeURIComponent(n)+'"><span>'+(typeof x==='object'&&x.icon?esc(x.icon):'✦')+'</span><div><strong>'+esc(n)+'</strong><small>'+esc(typeof x==='string'?'Explore the feeling.':x.note)+'</small></div><b>↗</b></a>';}).join('');
 var sg2=$("#seasonGrid");if(sg2)sg2.innerHTML=(D.seasons||[]).map(function(x){var n=typeof x==='string'?x:x.name;return '<a class="season-card" href="/discover.html#seasons"><small>SEASON</small><h3>'+esc(n)+'</h3><p>'+esc(typeof x==='string'?'Explore the travel rhythm of this season.':x.note)+'</p><span>See ideas ↗</span></a>';}).join('');
 var rg2=$("#routeGrid");if(rg2)rg2.innerHTML=(D.routes||[]).map(function(x){return '<div class="route-row"><span class="status-dot"></span><strong>'+esc(typeof x==='string'?x:x.name)+'</strong><em>'+esc(typeof x==='string'?'Current status needs checking':(x.status||'Current status needs checking'))+'</em><a href="/live.html">View live layer ↗</a></div>';}).join('');
 var dg2=$("#dmoDestinations");if(dg2)dg2.innerHTML=(D.destinations||[]).slice(0,6).map(function(x){return '<a class="dmo-destination-card" href="/destination.html?place='+encodeURIComponent(x.name)+'"><img loading="lazy" src="'+x.image+'" alt="'+esc(x.name)+'"><div><span>'+esc(x.region)+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.note)+'</p><b>Explore →</b></div></a>';}).join('');
 var it2=$("#dmoItineraries");if(it2)it2.innerHTML=(D.itineraries||[]).slice(0,4).map(function(x){var d=String(x.days||"").match(/\d+/);return '<article><small>'+esc(x.days)+' · '+esc(x.fit)+'</small><h3>'+esc(x.name)+'</h3><p>'+esc(x.route)+'</p><strong>'+esc(x.budget)+'</strong><a href="/itineraries.html'+(d?'?days='+encodeURIComponent(d[0]):'')+'">View this route →</a><a href="/plan.html?destination='+encodeURIComponent(x.route||x.name||"")+'">Adapt this route →</a></article>';}).join('');
 var st2=$("#dmoStays");if(st2)st2.innerHTML=(D.stays||[]).slice(0,4).map(function(x){return '<a href="/stays.html"><img loading="lazy" src="'+x.image+'" alt="'+esc(x.name)+'"><div><span>'+esc(x.region)+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.note)+'</p></div></a>';}).join('');
 window.dispatchEvent(new CustomEvent('frontier:cms-ready',{detail:D}));
}).catch(function(){window.FRONTIER_CMS_READY=true;window.dispatchEvent(new CustomEvent('frontier:cms-ready',{detail:D}));});
/* Retired conversational assistant removed. Trip planning is handled by the planner and enquiry flow. */ 
function saveGeneratedTrip(plan){fetch("/api/me").then(function(r){return r.json();}).then(function(me){if(!me.authenticated){location.href="/login?next="+encodeURIComponent(location.pathname+location.search+"#saved");return;}return fetch("/api/trips",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:(plan.days+" day "+(plan.style||"Frontier")+" trip"),destination:plan.pick.join(" → "),start_date:planner.start.value,end_date:planner.end.value,style:plan.style,budget:plan.budget,interests:plan.interests.join(", "),plan_json:JSON.stringify({version:1,generatedAt:new Date().toISOString(),dayPlan:plan.dayPlan,verification:{required:true,checkedAt:null}}),status:"draft"})});}).then(function(r){if(!r)return;if(!r.ok)throw new Error("save_failed");return r.json();}).then(function(){var b=$("#saveGeneratedTrip");if(b){b.textContent="Saved to My Trips ✓";b.disabled=true;}}).catch(function(){var b=$("#saveGeneratedTrip");if(b)b.textContent="Sign in to save this trip";});}
/* Living imagery + motion system */
(function(){
  var imagePools={
    nature:[
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=82&sat=-10",
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=82&blur=0",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=82"
    ],
    city:[
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&w=1600&q=82"
    ],
    stay:[
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=82"
    ],
    people:[
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=82"
    ]
  };
  function poolFor(el){
    var s=(el.alt+" "+el.className+" "+location.pathname).toLowerCase();
    if(/stay|hotel|villa|room|resort/.test(s))return imagePools.stay;
    if(/city|urban|kyoto|lisbon|marrakech/.test(s))return imagePools.city;
    if(/story|people|travell|community/.test(s))return imagePools.people;
    return imagePools.nature;
  }
  function shuffle(a){
    return a.map(function(v){return {v:v,r:Math.random()};}).sort(function(x,y){return x.r-y.r;}).map(function(x){return x.v;});
  }
  function startLivingImages(){
    /* Frontier's editorial motion is intentionally restrained: the homepage keeps one hero image rather than rotating every card. */
    if(document.body.classList.contains("world-home"))return;
    var selector=".page-hero img";
    $$(selector).forEach(function(img){
      if(img.dataset.staticImage==="true"||img.dataset.livingReady==="true")return;
      img.dataset.livingReady="true";
      var pool=shuffle(poolFor(img));
      if(img.currentSrc)pool.unshift(img.currentSrc);
      var i=Math.floor(Math.random()*pool.length);
      var rounds=0;
      function swap(){
        if(document.body.classList.contains("reduced-motion"))return;
        i=(i+1)%pool.length;rounds++;
        if(rounds>=pool.length){pool=shuffle(pool);i=0;rounds=0;}
        var next=pool[i];
        if(!next||next===img.src){i=(i+1)%pool.length;next=pool[i];}
        img.classList.add("image-fade-out");
        window.setTimeout(function(){img.src=next;img.classList.remove("image-fade-out");},420);
      }
      window.setTimeout(swap,6000+Math.random()*3500);
      window.setInterval(swap,10500+Math.random()*3500);
    });
  }
  function startMotion(){
    var targets=$$(".dmo-destination-card,.dmo-category-grid a,.dmo-inspiration-grid>a,.dmo-itinerary-grid article,.dmo-stay-grid a,.data-card,.chip-card,.season-card,.practical-grid article,.activity-grid a,.wayfinder-card,.planner-card,.route-row");
    targets.forEach(function(el){el.classList.add("motion-ready");});
    if("IntersectionObserver"in window){
      var mo=new IntersectionObserver(function(entries){
        entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("motion-visible");mo.unobserve(e.target);}});
      },{threshold:.08,rootMargin:"0px 0px -40px"});
      targets.forEach(function(el){mo.observe(el);});
    }else targets.forEach(function(el){el.classList.add("motion-visible");});
  }
  startMotion();startLivingImages();
/* Calm sticky header + once-only route-line reveal */
  var homeHeader=document.querySelector(".world-home .dmo-header");
  if(homeHeader){
    var syncHomeHeader=function(){homeHeader.classList.toggle("is-scrolled",window.scrollY>80);};
    window.addEventListener("scroll",syncHomeHeader,{passive:true});syncHomeHeader();
  }
  var routeForms=document.querySelectorAll(".frontier-route-form");
  if("IntersectionObserver" in window && routeForms.length){
    var routeIO=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("route-drawn");routeIO.unobserve(e.target);}});
    },{threshold:.35});
    routeForms.forEach(function(x){routeIO.observe(x);});
  }else routeForms.forEach(function(x){x.classList.add("route-drawn");});
})();
  /* v44 — global travel UX polish */
(function(){
  if(false){
    var launcher=document.createElement("a");
    launcher.href="/guide.html";
    launcher.className="frontier-guide-launcher-disabled";
    launcher.innerHTML='<span class="guide-spark">✦</span><span>AI Guide</span>';
    launcher.setAttribute("aria-label","Open Frontier AI Guide");
    document.body.appendChild(launcher);
  }
  var progress=document.createElement("div");
  progress.className="frontier-scroll-progress";
  progress.setAttribute("aria-hidden","true");
  document.body.appendChild(progress);
  var top=document.createElement("button");
  top.type="button";top.className="frontier-back-top";top.innerHTML="↑";
  top.setAttribute("aria-label","Back to top");top.hidden=true;
  document.body.appendChild(top);
  function scrollUX(){
    var doc=document.documentElement,max=doc.scrollHeight-window.innerHeight;
    progress.style.transform="scaleX("+(max>0?Math.min(1,window.scrollY/max):0)+")";
    top.hidden=window.scrollY<650;
  }
  window.addEventListener("scroll",scrollUX,{passive:true});scrollUX();
  top.addEventListener("click",function(){window.scrollTo({top:0,behavior:document.body.classList.contains("reduced-motion")?"auto":"smooth"});});
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape" && document.activeElement){document.activeElement.blur();}
  });
  if("IntersectionObserver"in window){
    var sections=document.querySelectorAll("main>section:not(.dmo-hero):not(.guide-hero),main section.section");
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("section-visible");});},{threshold:.05});
    Array.prototype.forEach.call(sections,function(s){s.classList.add("section-ready");io2.observe(s);});
  }
})();
var root=document.body;document.querySelectorAll("[data-font]").forEach(function(b){b.addEventListener("click",function(){if(b.dataset.font==="up")root.classList.add("large-text");else root.classList.remove("large-text");});});var cb=document.querySelector("[data-contrast]");if(cb)cb.addEventListener("click",function(){var on=root.classList.toggle("high-contrast");cb.setAttribute("aria-pressed",on);});var mb2=document.querySelector("[data-motion]");if(mb2)mb2.addEventListener("click",function(){var on=root.classList.toggle("reduced-motion");mb2.setAttribute("aria-pressed",on);});})();
/* v98 cleanup: all legacy navigation/footer mutation removed. */