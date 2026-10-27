(function(){
const cv=document.getElementById('cover'),X=cv.getContext('2d'),CW=180,CH=320;cv.width=CW;cv.height=CH;X.imageSmoothingEnabled=false;
const TI=new Image();TI.src=COVER.title;const SI=new Image();SI.src=COVER.start;
const R=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})();
const stars=[...Array(70)].map(()=>[R()*CW|0,R()*170|0,R()*6.28,R()<.15]);
const clouds=[...Array(4)].map((_,i)=>[R()*CW,20+i*28,20+R()*25,.05+R()*.08]);
// castle offscreen
const cs=document.createElement('canvas');cs.width=CW;cs.height=CH;const C=cs.getContext('2d');
const win=[];
function rect(c,x,y,w,h,col){c.fillStyle=col;c.fillRect(x,y,w,h)}
function tower(x,base,w,h,roof){const top=base-h;rect(C,x,top,w,h,'#2b2440');rect(C,x,top,1,h,'#3d3558');
 for(let i=0;i<roof;i++){const ww=Math.max(1,Math.round((w+2)*(1-i/roof)));rect(C,x+(w-ww)/2|0,top-i-1,ww,1,i%3?'#3a2a5a':'#4a3570')}
 rect(C,x+w/2|0,top-roof-3,1,3,'#887');
 for(let y=top+4;y<base-4;y+=7)for(let xx=x+2;xx<x+w-2;xx+=4)if(R()<.7)win.push([xx,y,R()*6.28,1+R()*3])}
// cliff
C.fillStyle='#161226';C.beginPath();C.moveTo(0,232);C.lineTo(20,200);C.lineTo(40,192);C.lineTo(150,188);C.lineTo(170,205);C.lineTo(180,232);C.fill();
for(let i=0;i<120;i++)rect(C,20+R()*150|0,195+R()*35|0,2,1,'#221b36');
rect(C,25,170,130,22,'#2b2440');
tower(28,192,12,52,16);tower(48,180,10,40,12);tower(70,190,18,84,24);tower(96,182,12,56,15);tower(116,186,9,36,10);tower(132,190,14,62,18);tower(150,192,8,30,9);
for(let x=25;x<155;x+=4)rect(C,x,168,2,2,'#2b2440');
for(let x=30;x<150;x+=6)win.push([x,178,R()*6.28,1+R()*3]);
const owlF=[["k.k...k.k","kkk...kkk",".kkk.kkk.","..kkkkk..","...kyk..."],["........."," ..kkk....","kkkkykkkk","k..kkk..k","........."]];
const tiles=['owl_red','snitch_green','potion_blue','moon_red','key_green','hat_blue'].map((n,i)=>{const im=new Image();im.src=IMG[n];return[im,12+i*28,248+(i%2)*14,i]});
let t=0,raf;
function px(m,x,y,col){m.forEach((r,j)=>[...r].forEach((c,i)=>{if(c=='k'||c=='y'){X.fillStyle=c=='y'?'#ffd650':col;X.fillRect(x+i|0,y+j|0,1,1)}}))}
function frame(){t++;
 const g=['#0b0820','#120c30','#1b1342','#261a55','#30205f'];g.forEach((c,i)=>rect(X,0,i*48,CW,48,c));
 for(let y=0;y<240;y+=2)for(let x=(y/2%2)*2;x<CW;x+=4)if(((x*7+y*3)%11)==0)rect(X,x,y,1,1,'#1e1648');
 stars.forEach(s=>{const b=Math.sin(t*.05+s[2]);if(b>-.3){X.fillStyle=b>.8?'#fff':'#aab';X.fillRect(s[0],s[1],1,1);if(s[3]&&b>.85){X.fillRect(s[0]-1,s[1],3,1);X.fillRect(s[0],s[1]-1,1,3)}}});
 const gl=Math.sin(t*.03)*2;X.fillStyle='rgba(255,240,180,.08)';for(let r=26+gl;r>13;r-=4){X.beginPath();X.arc(138,44,r,0,7);X.fill()}
 X.fillStyle='#fff6d0';X.beginPath();X.arc(138,44,12,0,7);X.fill();rect(X,133,40,3,2,'#e8dcb0');rect(X,141,48,2,2,'#e8dcb0');
 clouds.forEach(c=>{c[0]+=c[3];if(c[0]>CW+30)c[0]=-50;rect(X,c[0]|0,c[1],c[2]|0,3,'#3a2f6a');rect(X,c[0]+4|0,c[1]-2,c[2]*.6|0,2,'#45397a')});
 // broom rider
 const bx=((t*.6)%(CW+80))-40,by=90+Math.sin(t*.04)*6;rect(X,bx|0,by|0,14,1,'#000');rect(X,bx+11|0,by-1|0,4,3,'#000');rect(X,bx+4|0,by-5|0,3,5,'#000');rect(X,bx+4|0,by-7|0,2,2,'#000');rect(X,bx+3|0,by-9|0,1,2,'#000');
 X.drawImage(cs,0,0);
 win.forEach(w=>{const f=Math.sin(t*.1*w[3]+w[2])+Math.sin(t*.37+w[2]*3)*.3;rect(X,w[0],w[1],1,2,f>.2?'#ffcf5a':f>-.5?'#c88a30':'#3a2a30')});
 // lake + reflection
 rect(X,0,232,CW,88,'#0a0a24');
 for(let y=0;y<60;y++){const sy=232-y*2-1,off=Math.round(Math.sin(t*.08+y*.5)*(1+y*.03));X.globalAlpha=.5-y*.007;X.drawImage(cv,0,sy,CW,1,off,232+y,CW,1)}X.globalAlpha=1;
 for(let i=0;i<14;i++){const y=236+i*6,x=(i*37+t*.3*(i%2?1:-1))%CW;rect(X,(x+CW)%CW|0,y,8,1,'#2a3a6a')}
 rect(X,128,240+((t>>3)%3)*3,20,1,'#fff6d0');rect(X,132,250,12,1,'rgba(255,246,208,.5)');
 // owl
 const ox=CW+20-((t*.9)%(CW+60)),oy=60+Math.sin(t*.05)*8;px(owlF[(t>>3)%2],ox,oy,'#d8c8a8');
 // floating tiles
 tiles.forEach(([im,x,y,i])=>{if(im.complete){const yy=y+Math.sin(t*.05+i)*3;X.drawImage(im,x,yy|0,16,20)}});
 // sparkles
 for(let i=0;i<10;i++){const a=(t*.7+i*53)%200,x=(i*41+Math.sin(t*.02+i)*10+CW)%CW,y=260-a;if(a<120){const s=(a>>3)%3;X.fillStyle=i%2?'#ffe27a':'#bfe6ff';X.fillRect(x|0,y|0,1,1);if(s==1){X.fillRect(x-1|0,y|0,3,1);X.fillRect(x|0,y-1|0,1,3)}}}
 if(TI.complete)X.drawImage(TI,(CW-TI.width)/2|0,118+Math.round(Math.sin(t*.06)*2)-110+20);
 if(SI.complete&&(t>>5)%2==0)X.drawImage(SI,(CW-SI.width)/2|0,300);
 raf=requestAnimationFrame(frame)}
window.coverFrame=n=>{for(let i=0;i<n;i++)t++};
frame();
document.getElementById('coverWrap').onclick=()=>{cancelAnimationFrame(raf);document.getElementById('coverWrap').style.display='none';nw()};
})();
