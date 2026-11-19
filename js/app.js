let lang="es";
/* ======================================================
   UTILIDADES
   ====================================================== */
const $=id=>document.getElementById(id);
const U=k=>(window.IMG&&IMG[k])||("img/"+k+((k==="logo"||k.startsWith("topo"))?".png":".jpg"));
document.querySelectorAll("img[data-k]").forEach(i=>i.src=U(i.dataset.k));
const shots=(arr)=>arr.map(([s,a])=>`<div class="shot"><img loading="lazy" src="${U(s)}" alt="${a}"></div>`).join("");

function setLang(l){
  lang=l;document.documentElement.lang=l;
  document.querySelectorAll("[data-i]").forEach(e=>e.textContent=T[l][e.dataset.i]);
  document.querySelectorAll("#lang span[data-l]").forEach(s=>s.classList.toggle("on",s.dataset.l===l));
  PORTAFOLIO.forEach(s=>{const h=$("h-"+s.id);if(h)h.textContent=s.nombre[l]});
  burger.setAttribute("aria-label",T[l].menu);
  $("cPrev").setAttribute("aria-label",T[l].prev);$("cNext").setAttribute("aria-label",T[l].next);
  $("lbPrev").setAttribute("aria-label",T[l].prev);$("lbNext").setAttribute("aria-label",T[l].next);$("lbX").setAttribute("aria-label",T[l].close);
}

/* ---------- Tarjetas de pieza ---------- */
function pieceHTML(list){
  return list.map(([n,im],i)=>`<button class="pcard" data-list="${i}" aria-label="${n}">
    <div class="shot">${im.slice(0,2).map((s,j)=>`<img loading="lazy" src="${U(s)}" alt="${j?"":n}">`).join("")}</div>
    <h3>${n}</h3></button>`).join("");
}
function bindPieces(box,list){
  box.querySelectorAll(".pcard").forEach(b=>b.onclick=()=>{const [n,im]=list[+b.dataset.list];openLB(n,im)});
}
$("pgrid").innerHTML=pieceHTML(PRODUCTOS);bindPieces($("pgrid"),PRODUCTOS);
$("cgrid").innerHTML=COLECCIONES.map(c=>`<a class="colcard" href="#coleccion-${c.id}">
  <div class="ph"><img loading="lazy" src="${U(c.portada)}" alt="${c.nombre}"></div>
  <div class="row"><h3>${c.nombre}</h3><span class="pill" data-i="go">ir</span></div></a>`).join("");
/* ---------- Portafolio ---------- */
$("strip").innerHTML=PORTAFOLIO.map(s=>`<a href="#portafolio-${s.id}" aria-label="${s.nombre.es}"><div class="shot"><img loading="lazy" src="${U(s.portada)}" alt="${s.nombre.es}"></div></a>`).join("");
$("portSections").innerHTML=PORTAFOLIO.map(s=>`<div class="band" id="sec-${s.id}" style="--bg:${s.bg}">
  <div class="side"><h2 id="h-${s.id}">${s.nombre.es}</h2><img class="topo" src="${U("topo1")}" alt="" aria-hidden="true"></div>
  <div class="row${s.tall?" tall":""}${s.wide?" wide":""}">${s.fotos.map(([k,ar],i)=>`<button class="shot" style="--ar:${ar}" data-s="${s.id}" data-idx="${i}" aria-label="${s.nombre.es} ${i+1}"><img src="${U(k)}" alt="${s.nombre.es} ${i+1}"></button>`).join("")}</div>
</div>`).join("");
$("portSections").addEventListener("click",e=>{
  const b=e.target.closest(".shot");if(!b)return;
  const s=PORTAFOLIO.find(x=>x.id===b.dataset.s);
  openLB(s.nombre[lang],s.fotos.map(f=>f[0]),+b.dataset.idx);
});

/* ---------- Visor de fotos ---------- */
const lb=$("lb");let lbList=[],lbI=0;
function lbRender(){
  $("lbImg").src=U(lbList[lbI]);
  const many=lbList.length>1;
  $("lbPrev").style.display=$("lbNext").style.display=many?"":"none";
  $("lbThumbs").innerHTML=many?lbList.map((s,i)=>`<button class="${i===lbI?"on":""}" data-idx="${i}" aria-label="Foto ${i+1}"><img src="${U(s)}" alt=""></button>`).join(""):"";
}
function openLB(title,imgs,start=0){lbList=imgs;lbI=start;$("lbTitle").textContent=title;$("lbImg").alt=title;lbRender();lb.showModal()}
const lbGo=d=>{lbI=(lbI+d+lbList.length)%lbList.length;lbRender()};
$("lbPrev").onclick=()=>lbGo(-1);$("lbNext").onclick=()=>lbGo(1);$("lbX").onclick=()=>lb.close();
$("lbThumbs").onclick=e=>{const b=e.target.closest("button");if(b){lbI=+b.dataset.idx;lbRender()}};
lb.addEventListener("click",e=>{if(e.target===lb||e.target.classList.contains("lb-in"))lb.close()});
lb.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")lbGo(-1);if(e.key==="ArrowRight")lbGo(1)});

/* ======================================================
   CARRUSEL LIMPIO (infinito, flechas, swipe, autoplay)
   ====================================================== */
(function(){
  const box=$("carousel"),track=$("track"),N=CARRUSEL.length,CL=4;
  const mk=(k,i)=>`<div class="slide"><img src="${U(k)}" alt="" ${i>3?'loading="lazy"':''} draggable="false"></div>`;
  track.innerHTML=CARRUSEL.map(mk).join("")+CARRUSEL.slice(0,CL).map(mk).join("");
  let per=4,i=0,w=0,busy=false,timer=null;
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  function size(){
    per=innerWidth>1000?4:innerWidth>640?3:2;
    w=box.clientWidth/per;
    [...track.children].forEach(s=>s.style.width=w+"px");
    move(false);
  }
  function move(anim){
    track.style.transition=anim?"transform .75s cubic-bezier(.65,0,.35,1)":"none";
    track.style.transform=`translate3d(${-i*w}px,0,0)`;
    busy=!!anim;
  }
  track.addEventListener("transitionend",()=>{busy=false;if(i>=N){i=0;move(false)}});
  function next(){if(busy)return;i++;move(true)}
  function prev(){
    if(busy)return;
    if(i===0){i=N;move(false);void track.offsetWidth}
    i--;move(true);
  }
  function play(){if(reduce)return;stop();timer=setInterval(next,4800)}
  function stop(){clearInterval(timer)}
  $("cNext").onclick=()=>{next();play()};$("cPrev").onclick=()=>{prev();play()};
  box.addEventListener("mouseenter",stop);box.addEventListener("mouseleave",play);
  box.addEventListener("focusin",stop);box.addEventListener("focusout",play);
  let x0=null;
  track.addEventListener("pointerdown",e=>{x0=e.clientX;stop()});
  addEventListener("pointerup",e=>{if(x0===null)return;const d=e.clientX-x0;x0=null;if(Math.abs(d)>40){d<0?next():prev()}play()});
  document.addEventListener("visibilitychange",()=>document.hidden?stop():play());
  addEventListener("resize",size);
  size();play();
})();

/* ======================================================
   RUTAS  (#inicio, #catalogo-productos, #catalogo-colecciones,
           #coleccion-<id>, #portafolio, #portafolio-<id>)
   ====================================================== */
const routes={"inicio":"v-home","catalogo-productos":"v-prod","catalogo-colecciones":"v-col","portafolio":"v-port"};
function route(){
  const p=location.hash.replace(/^#/,"")||"inicio";
  let id=routes[p];
  if(p.startsWith("coleccion-")){
    const c=COLECCIONES.find(c=>"coleccion-"+c.id===p);
    if(c){id="v-coldet";$("colTitle").textContent=c.nombre;$("colItems").innerHTML=pieceHTML(c.piezas);bindPieces($("colItems"),c.piezas)}
  }
  let target=null;
  if(p.startsWith("portafolio-")){const el=$("sec-"+p.slice(11));if(el){id="v-port";target=el}}
  id=id||"v-home";
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  closeMenu();window.scrollTo(0,0);
  if(target)requestAnimationFrame(()=>target.scrollIntoView({behavior:"auto",block:"start"}));
}
addEventListener("hashchange",route);

/* ---------- Menú ---------- */
const burger=$("burger"),menu=$("menu"),drop=$("drop"),dropBtn=$("dropBtn");
function closeMenu(){menu.classList.remove("open");burger.setAttribute("aria-expanded","false");drop.classList.remove("open");dropBtn.setAttribute("aria-expanded","false")}
burger.onclick=()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
dropBtn.onclick=e=>{e.stopPropagation();const o=drop.classList.toggle("open");dropBtn.setAttribute("aria-expanded",o)};
document.addEventListener("click",e=>{if(!drop.contains(e.target)){drop.classList.remove("open");dropBtn.setAttribute("aria-expanded","false")}});
addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
$("lang").addEventListener("click",e=>{const l=e.target.dataset.l;if(l)setLang(l)});

setLang("es");route();
