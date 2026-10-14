const L=['ru','kk','en'];
const I={
nav_home:['Главная','Басты бет','Home'],nav_poster:['Афиша','Афиша','Events'],nav_tours:['Туры','Турлар','Tours'],nav_tix:['Мои билеты','Билеттерім','My tickets'],
search:['Поиск по названию','Атауы бойынша іздеу','Search by title'],all:['Все','Барлығы','All'],cinema:['Кино','Кино','Cinema'],concert:['Концерты','Концерттер','Concerts'],theatre:['Театр','Театр','Theatre'],standup:['Стендап','Стендап','Stand-up'],
sort_d:['По дате','Күні бойынша','By date'],sort_p:['По цене','Бағасы бойынша','By price'],from:['от','','from'],buy:['Купить билет','Билет алу','Buy ticket'],
cats:['Категории','Санаттар','Categories'],pop:['Популярное в вашем городе','Қалаңыздағы танымал іс-шаралар','Popular in your city'],toursh:['Туры по Казахстану','Қазақстан бойынша турлар','Tours around Kazakhstan'],
none:['Ничего не найдено','Ештеңе табылмады','Nothing found'],date:['Дата и время','Күні мен уақыты','Date and time'],stage:['Сцена','Сахна','Stage'],taken:['Занято','Бос емес','Taken'],sel:['Выбрано','Таңдалды','Selected'],free:['Свободно','Бос','Free'],
total:['Итого','Барлығы','Total'],name:['Имя и фамилия','Аты-жөніңіз','Full name'],phone:['Телефон','Телефон','Phone'],pay:['Оплатить','Төлеу','Pay'],
err:['Проверьте имя, телефон и выбор мест','Аты-жөніңізді, телефонды және орындарды тексеріңіз','Check your name, phone and seat selection'],
pers:['Количество человек','Адам саны','Guests'],dep:['Выезд из','Шығу қаласы','Departing from'],notix:['Пока нет билетов. Выберите событие в афише.','Әзірше билеттер жоқ. Афишадан іс-шара таңдаңыз.','No tickets yet. Pick an event from the listings.'],
support:['Поддержка','Қолдау қызметі','Support'],row:['ряд','қатар','row'],seat:['место','орын','seat'],back:['← Назад','← Артқа','← Back'],days:['дн.','күн','days'],
v_cinema:['Кинозал «Арман»','«Арман» кинозалы','Arman Cinema'],v_concert:['Зал «Тұран»','«Тұран» залы','Turan Hall'],v_theatre:['Городской театр','Қалалық театр','City Theatre'],v_standup:['Клуб «Лофт»','«Лофт» клубы','Loft Club'],
d_cinema:['Сеанс в комфортном зале с объёмным звуком.','Көлемді дыбысы бар жайлы залдағы сеанс.','A screening in a comfortable hall with surround sound.'],
d_concert:['Живой звук, свет и два часа без пауз.','Тірі дыбыс, жарық және үзіліссіз екі сағат.','Live sound, lights and two hours without a break.'],
d_theatre:['Классическая постановка, один антракт.','Классикалық қойылым, бір антракт.','A classic staging with one interval.'],
d_standup:['Новые шутки от лучших комиков города.','Қаланың үздік комиктерінен жаңа әзілдер.','Fresh jokes from the best comics in town.'],
d_tour:['Трансфер, проживание и гид включены в стоимость.','Трансфер, тұру және гид бағаға кіреді.','Transfer, accommodation and a guide are included.']};
const CT=[['alm',['Алматы','Алматы','Almaty']],['ast',['Астана','Астана','Astana']],['shy',['Шымкент','Шымкент','Shymkent']],['akt',['Актау','Ақтау','Aktau']]];
const E=[[1,'cinema','Тихий перевал',210,2500,0,'19:30','alm ast shy akt'],[2,'cinema','Последний рейс',350,2200,1,'21:00','alm ast'],[3,'cinema','Дом на краю степи',25,2000,2,'15:00','alm ast shy akt'],
[4,'concert','Нур и The Nomads',280,8000,3,'20:00','alm ast'],[5,'concert','Оркестр «Алатау»',160,6000,5,'19:00','alm shy'],[6,'concert','Ночь джаза',265,7000,6,'20:30','alm ast akt'],
[7,'theatre','Ревизор',15,5000,8,'18:30','alm ast shy'],[8,'theatre','Лебединое озеро',190,9000,9,'19:00','alm ast'],
[9,'standup','Вечер стендапа',45,4500,4,'20:00','alm ast shy akt'],[10,'standup','Открытый микрофон',330,3500,11,'19:30','alm ast shy akt']].map(a=>({id:a[0],c:a[1],t:a[2],h:a[3],p:a[4],d:a[5],tm:a[6],ct:a[7]}));
const tours=[[1,['Шарын и Чарынский каньон','Шарын мен Шарын шатқалы','Charyn Canyon'],20,45000,2],[2,['Кольсайские озёра','Қолсай көлдері','Kolsai Lakes'],190,55000,3],[3,['Бурабай','Бурабай','Burabay'],150,38000,2],[4,['Мангистау','Маңғыстау','Mangystau'],35,89000,4],[5,['Туркестан','Түркістан','Turkestan'],48,42000,2]].map(a=>({id:a[0],tour:1,c:'tour',t:a[1],h:a[2],p:a[3],dy:a[4]}));
const H={cinema:210,concert:280,theatre:350,standup:45};
const $=id=>document.getElementById(id);
function ld(k,d){try{return localStorage.getItem(k)||d}catch(e){return d}}
function sv(k,v){try{localStorage.setItem(k,v)}catch(e){}}
let lang=ld('lang','ru'),city=ld('city','alm'),cat='all',q='',so='d',hv,sel=new Set();
const li=()=>L.indexOf(lang),T=k=>I[k][li()],ttl=e=>Array.isArray(e.t)?e.t[li()]:e.t;
const cn=()=>CT.find(x=>x[0]==city)[1][li()],evs=()=>E.filter(e=>e.ct.includes(city));
const fm=n=>n.toLocaleString('ru-RU')+' ₸',pf=p=>lang=='kk'?fm(p)+' бастап':T('from')+' '+fm(p);
const dt=o=>{const d=new Date();d.setDate(d.getDate()+o);return d},fd=d=>d.toLocaleDateString(['ru-RU','kk-KZ','en-GB'][li()],{day:'numeric',month:'long',weekday:'short'});
const rnd=s=>{s=Math.sin(s)*1e4;return s-Math.floor(s)};
function poster(e){
 const a=`hsl(${e.h} 75% 48%)`,b=`hsl(${(e.h+55)%360} 80% 22%)`,id='g'+e.id+e.c;let s='';
 if(e.c=='cinema')s='<g class="sp"><circle cx="150" cy="140" r="80" fill="none" stroke="#fff3" stroke-width="14"/><circle cx="150" cy="140" r="14" fill="#fff6"/>'+[0,60,120,180,240,300].map(r=>`<circle cx="150" cy="92" r="13" fill="#fff4" transform="rotate(${r} 150 140)"/>`).join('')+'</g>';
 else if(e.c=='concert')s=[...Array(9)].map((_,i)=>`<rect class="eq" x="${34+i*29}" y="${60+(i%3)*18}" width="18" height="${150-(i%3)*18}" rx="9" fill="#fff4" style="animation-delay:-${i*.19}s"/>`).join('');
 else if(e.c=='theatre')s='<path class="cl" d="M0 0H140Q100 110 140 230H0Z" fill="#fff3"/><path class="cr" d="M300 0H160Q200 110 160 230H300Z" fill="#fff3"/><circle cx="150" cy="150" r="30" fill="#fff2"/>';
 else if(e.c=='standup')s='<g class="fl"><circle cx="150" cy="110" r="42" fill="#fff4"/><rect x="144" y="150" width="12" height="70" rx="6" fill="#fff4"/></g><path d="M80 90Q70 110 80 130M220 90Q230 110 220 130" stroke="#fff5" stroke-width="6" fill="none" stroke-linecap="round"/>';
 else s='<circle class="fl" cx="215" cy="90" r="34" fill="#ffe27a"/><path d="M0 235L80 120 130 185 190 90 300 235Z" fill="#0004"/><path d="M0 235L60 170 110 215 170 150 300 235Z" fill="#0003"/>';
 let ls=[],c='';ttl(e).split(' ').forEach(x=>{if((c+' '+x).trim().length>13&&c){ls.push(c);c=x}else c=(c+' '+x).trim()});ls.push(c);ls=ls.slice(0,3);
 const tx=ls.map((x,i)=>`<text x="18" y="${372-(ls.length-1)*30+i*30}" fill="#fff" font-size="27" font-weight="800" font-family="system-ui,Arial">${x}</text>`).join('');
 return `<svg viewBox="0 0 300 400" role="img" aria-label="${ttl(e)}"><defs><linearGradient id="${id}" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="300" height="400" fill="url(#${id})"/>${s}${tx}</svg>`}
function card(e){const t=e.tour;return `<a class="card" href="#/${t?'t':'e'}/${e.id}"><div class="po">${poster(e)}</div><div class="cb"><h3>${ttl(e)}</h3><p>${t?T('dep')+' '+cn():T('v_'+e.c)}</p>${t?`<p>${e.dy} ${T('days')}</p>`:`<p>${fd(dt(e.d))} · ${e.tm}</p>`}<span class="pr">${pf(e.p)}</span></div></a>`}
function hdr(p){
 const n=[['','nav_home'],['a','nav_poster'],['t','nav_tours'],['x','nav_tix']].map(x=>`<a href="#/${x[0]}" class="${x[0]==(p||'')||(p=='e'&&x[0]=='a')?'on':''}">${T(x[1])}</a>`).join('');
 $('hd').innerHTML=`<div class="w top"><a class="lg" href="#/">Сахна</a><nav>${n}</nav><select class="sl" id="cs" aria-label="Город">${CT.map(c=>`<option value="${c[0]}"${c[0]==city?' selected':''}>${c[1][li()]}</option>`).join('')}</select><select class="sl" id="ls" aria-label="Язык">${[['ru','Русский'],['kk','Қазақша'],['en','English']].map(l=>`<option value="${l[0]}"${l[0]==lang?' selected':''}>${l[1]}</option>`).join('')}</select></div>`}
function home(){
 const l=evs(),f=l.slice(0,3);
 $('app').innerHTML=`<div class="hero" id="hr"><div class="w hi" id="hs"></div></div>
 <div class="w sec"><h2>${T('cats')}</h2><div class="tl">${Object.keys(H).map(c=>`<a class="tile" style="--t:${H[c]}" href="#/a/${c}">${T(c)}</a>`).join('')}</div></div>
 <div class="w sec"><h2>${T('pop')}</h2><div class="gr">${l.slice(0,4).map(card).join('')}</div></div>
 <div class="w sec"><h2>${T('toursh')}</h2><div class="gr">${tours.slice(0,4).map(card).join('')}</div></div>`;
 let i=0;const s=()=>{const e=f[i%f.length];$('hr').style.setProperty('--hc',`hsl(${e.h} 70% 30%)`);
  $('hs').innerHTML=`<div><h1>${ttl(e)}</h1><p>${T('v_'+e.c)} · ${cn()} · ${fd(dt(e.d))}, ${e.tm}</p><a class="bt" href="#/e/${e.id}">${T('buy')}</a><div class="dots">${f.map((_,k)=>`<button data-i="${k}" aria-label="${k+1}" class="${k==i%f.length?'on':''}"></button>`).join('')}</div></div><div class="po">${poster(e)}</div>`};
 s();$('hs').onclick=ev=>{const b=ev.target.closest('[data-i]');if(b){i=+b.dataset.i;s()}};hv=setInterval(()=>{i++;s()},5000)}
function afisha(c){
 cat=c||'all';
 $('app').innerHTML=`<div class="w sec"><h2>${T('nav_poster')} · ${cn()}</h2><div class="fb">${['all','cinema','concert','theatre','standup'].map(x=>`<button class="ch${x==cat?' on':''}" data-c="${x}">${T(x)}</button>`).join('')}<input id="q" class="sl" placeholder="${T('search')}" value="${q}"><select id="so" class="sl"><option value="d">${T('sort_d')}</option><option value="p"${so=='p'?' selected':''}>${T('sort_p')}</option></select></div><div class="gr" id="gl"></div></div>`;
 const draw=()=>{let l=evs().filter(e=>(cat=='all'||e.c==cat)&&ttl(e).toLowerCase().includes(q.toLowerCase()));l.sort((a,b)=>so=='p'?a.p-b.p:a.d-b.d);$('gl').innerHTML=l.length?l.map(card).join(''):`<p class="mut">${T('none')}</p>`};
 draw();
 $('q').oninput=e=>{q=e.target.value;draw()};$('so').onchange=e=>{so=e.target.value;draw()};
 document.querySelectorAll('.ch').forEach(b=>b.onclick=()=>{cat=b.dataset.c;document.querySelectorAll('.ch').forEach(x=>x.classList.toggle('on',x==b));draw()})}
function toursPage(){$('app').innerHTML=`<div class="w sec"><h2>${T('toursh')}</h2><div class="gr">${tours.map(card).join('')}</div></div>`}
function detail(e){
 sel=new Set();const t=e.tour,ds=t?[7,14,21]:[e.d,e.d+2,e.d+4],pr=r=>r<2?Math.round(e.p*1.4/100)*100:e.p;
 $('app').innerHTML=`<div class="w dt"><div class="po">${poster(e)}</div><div><a class="mut" href="#/${t?'t':'a'}">${T('back')}</a><h1>${ttl(e)}</h1><p class="mut">${t?T('dep')+' '+cn()+' · '+e.dy+' '+T('days'):T('v_'+e.c)+' · '+cn()}</p><p>${T('d_'+e.c)}</p>
 <div class="pn"><label>${T('date')}<br><select id="ss" class="sl">${ds.map(d=>`<option value="${d}">${fd(dt(d))}${t?'':' · '+e.tm}</option>`).join('')}</select></label>
 ${t?`<label>${T('pers')}<br><select id="np" class="sl">${[1,2,3,4,5,6].map(n=>`<option>${n}</option>`).join('')}</select></label>`:`<div id="sm"></div><div class="lgd"><span>▢ ${T('free')}</span><span style="color:var(--hot)">■ ${T('sel')}</span><span>▪ ${T('taken')}</span></div>`}
 <div class="tot">${T('total')}: <b id="tt">0 ₸</b></div><input id="nm" class="sl" placeholder="${T('name')}" autocomplete="name"><input id="ph" class="sl" type="tel" placeholder="${T('phone')}" autocomplete="tel"><button class="bt" id="pay">${T('pay')}</button><div class="er" id="er"></div></div></div></div>`;
 const tot=()=>{$('tt').textContent=fm(t?e.p*$('np').value:[...sel].reduce((s,k)=>s+pr(+k.split('-')[0]),0))};
 const seats=()=>{const d=+$('ss').value;sel.clear();let h=`<div class="sc">${T('stage')}</div>`;
  for(let r=0;r<6;r++){h+=`<div class="sr"><i>${r+1}</i>`;for(let c=0;c<10;c++)h+=`<button class="st${r<2?' v':''}${rnd(e.id*97+d*7+r*13+c)<.3?' x':''}" data-k="${r}-${c}" aria-label="${T('row')} ${r+1}, ${T('seat')} ${c+1}"></button>`;h+='</div>'}
  $('sm').innerHTML=h;tot()};
 if(t){$('np').onchange=tot;tot()}else{seats();$('ss').onchange=seats;
  $('sm').onclick=ev=>{const b=ev.target.closest('.st');if(!b||b.classList.contains('x'))return;const k=b.dataset.k;sel.has(k)?sel.delete(k):sel.add(k);b.classList.toggle('s');tot()}}
 $('pay').onclick=()=>{
  if($('nm').value.trim().length<2||$('ph').value.replace(/\D/g,'').length<10||(!t&&!sel.size)){$('er').textContent=T('err');return}
  const a=JSON.parse(ld('tix','[]')),n=t?+$('np').value:sel.size;
  a.push({k:e.id,tour:t?1:0,when:dt(+$('ss').value).toISOString(),seats:t?[]:[...sel].map(x=>{const p=x.split('-');return T('row')+' '+(+p[0]+1)+', '+T('seat')+' '+(+p[1]+1)}),n,total:t?e.p*n:[...sel].reduce((s,k)=>s+pr(+k.split('-')[0]),0),code:Math.random().toString(36).slice(2,8).toUpperCase()});
  sv('tix',JSON.stringify(a));location.hash='#/x'}}
function tix(){
 let a=[];try{a=JSON.parse(ld('tix','[]'))}catch(e){}
 const qr=c=>{let s='';for(let i=0;i<81;i++)if(rnd(parseInt(c,36)%9973+i)>.5)s+=`<rect x="${i%9}" y="${i/9|0}" width="1" height="1"/>`;return `<svg viewBox="0 0 9 9" class="qr">${s}</svg>`};
 $('app').innerHTML=`<div class="w sec"><h2>${T('nav_tix')}</h2>${a.length?a.slice().reverse().map(x=>{const e=(x.tour?tours:E).find(y=>y.id==x.k);if(!e)return'';return `<div class="tk"><div class="po">${poster(e)}</div><div><h3 style="margin:0 0 4px">${ttl(e)}</h3><div class="mut">${fd(new Date(x.when))}${x.tour?'':' · '+e.tm}</div><div>${x.tour?T('pers')+': '+x.n:x.seats.join(' · ')}</div><div class="pr">${fm(x.total)}</div></div><div class="qc">${qr(x.code)}${x.code}</div></div>`}).join(''):`<p class="mut">${T('notix')}</p>`}</div>`}
function ftr(){$('ft').innerHTML=`<span>© 2026 Сахна</span><span>${T('support')}:</span><a href="https://t.me/jerryzzxo" target="_blank" rel="noopener">Telegram @jerryzzxo</a><a href="https://wa.me/77075599068" target="_blank" rel="noopener">WhatsApp +7 707 559 9068</a>`}
function route(){
 clearInterval(hv);const[p,i]=location.hash.slice(2).split('/');hdr(p);ftr();document.documentElement.lang=lang;
 if(p=='e'){const e=E.find(x=>x.id==i);e?detail(e):home()}
 else if(p=='t'){i?detail(tours.find(x=>x.id==i)||tours[0]):toursPage()}
 else if(p=='a')afisha(i);else if(p=='x')tix();else home();
 scrollTo(0,0)}
document.addEventListener('change',e=>{
 if(e.target.id=='cs'){city=e.target.value;sv('city',city);route()}
 if(e.target.id=='ls'){lang=e.target.value;sv('lang',lang);route()}});
addEventListener('hashchange',route);route();
