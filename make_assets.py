from PIL import Image, ImageDraw
import json
I={
'wand':["..........yy",".........kyy","........kbk.",".......kbk..","......kbk...",".....kak....","....kak.....","...kak......","..kak.......",".kak........","kak.........","kk.........."],
'owl':["..k......k..",".kak....kak.",".kaaaaaaaak.","kawwkaawwkak","kawkwaawkwak","kaawwyywwaak","kaaaayyaaaak",".kabababak..",".kaabababak.","..kaaaaaak..","...kykkyk...","............"],
'broom':["k...........",".k..........","..k.........","...k........","....k.......",".....ky.....","......yyb...",".....ybbbb..","......bbbbb.",".......bbbbb","........bbbb",".........bb."],
'cauldron':["...w..w.....","..w..w..w...","....w..w....",".kkkkkkkkkk.","kbbbbbbbbbbk",".kaaaaaaaak.","kaaaaaaaaaak","kaaaaaaaaaak","kaaaaaaaaaak",".kaaaaaaaak.","..kkkkkkkk..",".k........k."],
'hat':[".......k....","......kak...","......kaak..",".....kaak...",".....kaaak..","....kaaaak..","....kyyyyk..","...kaaaaaak.","..kaaaaaaak.","kkaaaaaaaaakk","kaaaaaaaaaaak",".kkkkkkkkkkk."],
'snitch':["............","ww........ww","wwww....wwww",".wwwwkkwwww.","..wwkyykww..","...kyyyyk...","...kyywyk...","...kyyyyk...","....kyyk....",".....kk.....","............","............"],
'potion':["....kkkk....","....kbbk....",".....kk.....","....kwwk....","....kwwk....","...kwwwwk...","..kaaaaaak..",".kaawaaaaak.",".kawaaaaaak.",".kaaaaaaaak.","..kaaaaaak..","...kkkkkk..."],
'book':["............",".kkkkkkkkkk.",".kyaaaaaaak.",".kyaaaaaaak.",".kyabbbbaak.",".kyaaaaaaak.",".kyabbbaaak.",".kyaaaaaaak.",".kyaaaaaaak.",".kywwwwwwwk.",".kkkkkkkkkk.","............"],
'bolt':["......kkkk..",".....kyyk...","....kyyk....","...kyyk.....","..kyyykkkk..","..kyyyyyyk..","...kkkyyk...",".....kyk....","....kyk.....","...kyk......","..kk........","............"],
'castle':["k.k......k.k","kak..k...kak","kak.kak..kak","kakkaaakkkak","kaaaaaaaaaak","kakaakaakaak","kaaaaaaaaaak","kaaakkkaaaak","kaakbbbkaaak","kaakbbbkaaak","kkkkkkkkkkkk","............"],
'moon':["....kkkk....","..kkyyyk....",".kyyyk......",".kyyk....w..","kyyk.......w","kyyk...w....","kyyk........","kyyyk.....w.",".kyyyk......",".kkyyyykkk..","...kkkkk....","............"],
'key':["..kkk.......",".kyyyk......","kyk.kyk.....","kyk.kyk.....",".kyyyk......","..kyk.......","..kyk.......","..kyykk.....","..kyk.......","..kyykk.....","..kyk.......","...k........"],
}
P=[('red',(176,30,40),(230,180,40)),('green',(30,110,60),(190,195,205)),('blue',(40,70,160),(190,120,60))]
base={'k':(30,22,30),'w':(245,245,240),'y':(240,200,50)}
S=5;T=(64,80)
names=[]
def tile(m,a,b):
    im=Image.new('RGBA',T,(0,0,0,0));d=ImageDraw.Draw(im)
    d.rectangle([0,0,63,79],fill=(120,90,50));d.rectangle([0,0,59,75],fill=(250,240,215))
    d.rectangle([0,0,59,75],outline=(60,40,20));d.rectangle([2,2,57,73],outline=a)
    for y,row in enumerate(m):
        for x,c in enumerate(row[:12]):
            if c=='.':continue
            col={'a':a,'b':b}.get(c,base.get(c))
            d.rectangle([0+x*S,8+y*S,0+x*S+S-1,8+y*S+S-1],fill=col)
    for i in range(3):d.rectangle([4+i*6,66,7+i*6,69],fill=a)
    return im
tiles=[]
for k,m in I.items():
    for pn,a,b in P:
        n=f'{k}_{pn}';im=tile(m,a,b);im.save(f'assets/{n}.png');tiles.append((n,im))
back=Image.new('RGBA',T,(0,0,0,0));d=ImageDraw.Draw(back)
d.rectangle([0,0,63,79],fill=(60,40,20));d.rectangle([0,0,59,75],fill=(70,40,110));d.rectangle([3,3,56,72],outline=(230,190,60))
for y in range(8,70,10):
    for x in range(8,54,10):d.rectangle([x,y,x+1,y+1],fill=(230,190,60))
back.save('assets/tile_back.png')
cols=6;sheet=Image.new('RGBA',(cols*64,6*80));meta={}
for i,(n,im) in enumerate(tiles):
    x,y=i%cols*64,i//cols*80;sheet.paste(im,(x,y));meta[n]={'x':x,'y':y,'w':64,'h':80}
sheet.save('assets/spritesheet.png');json.dump({'tile':[64,80],'frames':meta},open('assets/spritesheet.json','w'),indent=1)
pv=Image.new('RGB',(cols*70+10,7*86+10),(25,20,35))
for i,(n,im) in enumerate(tiles+[('back',back)]):
    pv.paste(im,(10+i%cols*70,10+i//cols*86),im)
pv.save('assets/assets_preview.png')
