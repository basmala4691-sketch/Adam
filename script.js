(function(){
'use strict';
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

/* ---------- DATA ---------- */
var BOOKS=[
{t:'The Theory of Moral Sentiments',y:'1759',c:['#3a1f1a','#1b0f0c'],p:['In this work, Adam Smith explored human morality, sympathy, ethical judgement, and the way people evaluate their own behaviour and the actions of others.','One of its central ideas is that human beings possess the ability to sympathise with the experiences and feelings of others.','The book shows that Smith’s understanding of human nature went beyond personal economic interests.']},
{t:'The Wealth of Nations',y:'1776',full:'An Inquiry into the Nature and Causes of the Wealth of Nations',c:['#1c2a22','#0b140f'],p:['This landmark publication examined how nations generate wealth and how economic systems function.','Smith explored the division of labour, productivity, markets, trade, prices, competition, taxation, and the role of government.','The book helped establish many foundations of classical political economy and profoundly influenced modern economic thought.']},
{t:'Lectures on Jurisprudence',y:'Posthumous',c:['#1f2338','#0c0e1a'],p:['Published posthumously from surviving student notes.','These lectures explore law, justice, property, rights, and the development of political and social institutions.','They provide insight into Smith’s wider philosophical understanding of society and government.']},
{t:'Essays on Philosophical Subjects',y:'1795',c:['#352a14','#17120a'],p:['Published posthumously in 1795.','A collection of Smith’s essays on subjects including astronomy, ancient physics, philosophy, and the history of intellectual thought.','These writings reveal the extraordinary breadth of his interests beyond economics.']}];

var THEORIES=[
{n:'Division of Labour',i:'How specialization makes production more efficient.',e:'Adam Smith argued that dividing a production process into smaller, specialized tasks can increase productivity. When workers focus on particular tasks, they become more skilled, save time, and can produce more goods.',x:'In a smartphone factory, different workers specialize in installing screens, batteries, cameras and other components instead of one person assembling the whole phone. Production becomes faster and more efficient.',w:'It helps explain productivity, specialization, and the development of modern manufacturing.'},
{n:'The Invisible Hand',i:'How individual decisions can contribute to wider economic activity.',e:'Smith used the expression “invisible hand” to describe situations in which individuals pursuing their own interests can unintentionally contribute to broader social and economic outcomes. A business owner seeking profit must attract customers by providing what people want, which can create employment and make goods available.',x:'A bakery produces bread to earn revenue. Customers receive bread, employees receive wages, and suppliers earn money from providing ingredients.',w:'It illustrates how individual economic decisions can interact within a market.',a:'This is not a guarantee that every pursuit of self-interest benefits society. Smith also discussed monopolies, justice, and the importance of institutions.'},
{n:'Self-Interest',i:'Understanding the motivations behind economic decisions.',e:'Smith recognized that people often make economic decisions based on their own interests. Businesses seek profits, workers seek wages, and consumers seek products that satisfy their needs. These motivations can contribute to economic exchange and market activity.',x:'A farmer grows vegetables to earn income. A supermarket buys them to sell to customers. Both parties benefit from the exchange.',w:'Self-interest helps explain why voluntary exchange and market activity occur.'},
{n:'Free Markets and Competition',i:'The role of competition in economic activity.',e:'Smith supported a system of natural liberty in which individuals could engage in economic activity with fewer unnecessary restrictions. He criticized monopolies and privileges that allowed certain businesses to restrict competition. Competition can encourage businesses to improve quality, become more efficient, and offer better value.',x:'When several companies compete to sell similar products, they may improve their products, reduce costs, or provide better services to attract customers.',w:'Competition can encourage innovation, efficiency, and consumer choice.',a:'Smith did not argue that markets should operate without laws or government institutions. He recognized important government responsibilities.'},
{n:'The Extent of the Market',i:'Why larger markets can encourage greater specialization.',e:'Smith argued that the division of labour is limited by the extent of the market. A larger market lets producers specialize because they can sell more of their products to more customers.',x:'A small local business might produce a limited range of goods. A company selling internationally may specialize in particular products and produce them on a much larger scale.',w:'This idea connects market size, specialization, trade, and productivity.'},
{n:'Natural Liberty',i:'The importance of economic freedom within a just society.',e:'Smith’s system of natural liberty emphasized allowing individuals to pursue their economic interests within a framework of justice and appropriate institutions. People should generally be free to choose their occupations, trade, and economic activities.',x:'An individual should generally be able to establish a business, choose what to produce, and compete in the marketplace, provided they follow the law.',w:'The concept influenced later discussions about economic freedom, markets, government, and individual choice.'},
{n:'The Role of Government',i:'Why markets still need institutions and public responsibilities.',e:'Smith did not believe government had no role in the economy. He identified responsibilities for the state, including national defence, the administration of justice, and public works and institutions that private individuals might not provide profitably. He also discussed education and public institutions.',x:'Governments provide courts, maintain public infrastructure, protect citizens, and establish laws that support economic activity.',w:'Smith’s economic philosophy included both individual freedom and important public responsibilities.'}];

/* ---------- INTRO ---------- */
var title=$('#title');
title.textContent.split('').forEach(function(ch,k){var s=document.createElement('span');s.textContent=ch===' '?'\u00A0':ch;s.setAttribute('aria-hidden','true');s.style.animationDelay=(reduce?0:4.2+k*.12)+'s';title.appendChild(s)});
title.firstChild.nodeType===3&&title.removeChild(title.firstChild);
var pImg=$('#portraitImg');
pImg.addEventListener('error',function(){
 $('#portrait').innerHTML='<svg viewBox="0 0 300 400" role="img" aria-label="Stylised silhouette of Adam Smith"><defs><radialGradient id="g" cx="50%" cy="35%" r="60%"><stop offset="0" stop-color="#C6A15B" stop-opacity=".55"/><stop offset="1" stop-color="#59452C" stop-opacity=".1"/></radialGradient></defs><rect width="300" height="400" fill="url(#g)"/><path d="M40 400c0-70 50-95 110-110 60 15 110 40 110 110z" fill="#1a140b" stroke="#C6A15B" stroke-opacity=".5"/><path d="M110 280l40 50 40-50-10-30h-60z" fill="#D8BE8A" fill-opacity=".35"/><ellipse cx="150" cy="165" rx="56" ry="72" fill="#2a2013" stroke="#C6A15B" stroke-opacity=".6"/><path d="M92 170c-14-70 24-112 58-112s72 42 58 112c-8-42-20-62-58-62s-50 20-58 62z" fill="#C9BFAE" fill-opacity=".55"/><path d="M92 170c-18 20-14 52 6 62M208 170c18 20 14 52-6 62" fill="none" stroke="#C9BFAE" stroke-opacity=".5" stroke-width="10" stroke-linecap="round"/></svg>';
});
if(pImg.complete&&pImg.naturalWidth===0)pImg.dispatchEvent(new Event('error'));

/* dust particles */
var cv=$('#dust'),cx=cv.getContext('2d'),dots=[],raf=0,running=true;
function size(){cv.width=innerWidth;cv.height=innerHeight}
size();addEventListener('resize',size);
for(var i=0;i<(innerWidth<700?24:45);i++)dots.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.6+.3,v:Math.random()*.25+.05,a:Math.random()*.5+.15,d:Math.random()*6});
function tick(t){if(!running)return;cx.clearRect(0,0,cv.width,cv.height);
 dots.forEach(function(p){p.y-=p.v;p.x+=Math.sin(t/2000+p.d)*.15;if(p.y<-5){p.y=cv.height+5;p.x=Math.random()*cv.width}
 cx.fillStyle='rgba(216,190,138,'+p.a+')';cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fill()});
 raf=requestAnimationFrame(tick)}
if(!reduce)raf=requestAnimationFrame(tick);

$('#enter').addEventListener('click',function(){
 var app=$('#app');app.hidden=false;$('#intro').classList.add('leave');running=false;cancelAnimationFrame(raf);
 setTimeout(function(){$('#intro').hidden=true},1500);observe();
});

/* ---------- ROOMS ---------- */
var current='home',sweep=$('#sweep');
function go(name){
 if(name===current)return;
 var swap=function(){$$('.room').forEach(function(r){r.classList.toggle('active',r.id===name)});
  $$('.nav nav button').forEach(function(b){b.classList.toggle('on',b.dataset.go===name)});
  current=name;window.scrollTo(0,0);observe()};
 if(reduce){swap();return}
 sweep.classList.remove('run');void sweep.offsetWidth;sweep.classList.add('run');
 setTimeout(swap,520);
}
document.addEventListener('click',function(e){var b=e.target.closest('[data-go]');if(b)go(b.dataset.go)});

/* ---------- SCROLL REVEAL / PARALLAX / TIMELINE ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.18});
function observe(){$$('.rv').forEach(function(el){if(!el.classList.contains('in'))io.observe(el)})}
var ticking=false;
function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(function(){
 var y=scrollY;
 if(!reduce)$$('.room.active [data-p]').forEach(function(el){el.style.transform='translateY('+(y*parseFloat(el.dataset.p))+'px)'});
 var tl=$('#timeline');if(current==='man'&&tl){var r=tl.getBoundingClientRect(),pct=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));$('#tlFill').style.height=(pct*100)+'%'}
 ticking=false})}
addEventListener('scroll',onScroll,{passive:true});

/* ---------- BOOKS ---------- */
var panel=$('#panel'),pbox=$('#pbox'),lastFocus=null;
BOOKS.forEach(function(b,k){var el=document.createElement('button');el.className='bk rv';el.style.setProperty('--c1',b.c[0]);el.style.setProperty('--c2',b.c[1]);el.setAttribute('aria-label','Open '+b.t+', '+b.y);
 el.innerHTML='<span class="sp"></span><span class="cv"><b>'+b.t+'</b><span><i></i><small>'+b.y+'</small></span></span>';
 el.addEventListener('click',function(){open(el,{k:'Published '+b.y,t:b.t,bg:'linear-gradient(135deg,'+b.c[0]+','+b.c[1]+')',h:(b.full?'<p class="note">Full title: '+b.full+'</p>':'')+b.p.map(function(x){return'<p>'+x+'</p>'}).join('')})});
 $('#shelf').appendChild(el)});

/* ---------- THEORIES ---------- */
THEORIES.forEach(function(t,k){var el=document.createElement('button');el.className='card tilt rv';el.dataset.v=k;
 el.innerHTML='<h4>'+t.n+'</h4><p>'+t.i+'</p>';
 el.addEventListener('click',function(){var g=$('#grid');g.classList.add('has-open');el.classList.add('sel');
  open(el,{k:'Theory',t:t.n,v:k,h:'<p>'+t.e+'</p><h5>A real-world example</h5><p class="ex">'+t.x+'</p><h5>Why it matters</h5><p>'+t.w+'</p>'+(t.a?'<p class="note">Accuracy note: '+t.a+'</p>':'')})});
 $('#grid').appendChild(el)});
if(!reduce)document.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.card');if(!c||$('#grid').classList.contains('has-open'))return;
 var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
 c.style.setProperty('--ry',((x-.5)*12)+'deg');c.style.setProperty('--rx',((.5-y)*12)+'deg');c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%')});
document.addEventListener('pointerout',function(e){var c=e.target.closest&&e.target.closest('.card');if(c){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}});

/* ---------- PANEL ---------- */
function open(trigger,d){lastFocus=trigger;$('#pk').textContent=d.k;$('#pt').textContent=d.t;$('#pb').innerHTML=d.h;
 var bg=d.bg||(d.v!==undefined?getComputedStyle($$('.card')[d.v]).getPropertyValue('--bg'):'');
 pbox.style.setProperty('--bg',d.v!==undefined?'':bg);
 if(d.v!==undefined){pbox.dataset.v=d.v;$('#pvis').style.display='block'}else{delete pbox.dataset.v;pbox.style.backgroundImage=bg;$('#pvis').style.display='none'}
 panel.hidden=false;pbox.scrollTop=0;document.body.style.overflow='hidden';$('#close').focus()}
function close(){panel.hidden=true;document.body.style.overflow='';pbox.style.backgroundImage='';$('#grid').classList.remove('has-open');$$('.card.sel').forEach(function(c){c.classList.remove('sel')});if(lastFocus)lastFocus.focus()}
$('#close').addEventListener('click',close);
panel.addEventListener('click',function(e){if(e.target===panel)close()});
document.addEventListener('keydown',function(e){if(panel.hidden)return;if(e.key==='Escape')close();
 if(e.key==='Tab'){e.preventDefault();$('#close').focus()}});
})();
