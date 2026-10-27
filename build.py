import base64,json,os
names=sorted(f[:-4] for f in os.listdir('assets') if f.endswith('.png') and f not in('spritesheet.png','assets_preview.png','tile_back.png','title.png','start.png','cover.png','favicon.png'))
img={n:'data:image/png;base64,'+base64.b64encode(open(f'assets/{n}.png','rb').read()).decode() for n in names}
html=open('template.html').read().replace('/*IMG*/',json.dumps(img))
cov={k:'data:image/png;base64,'+base64.b64encode(open(f'assets/{k}.png','rb').read()).decode() for k in('title','start')}
html=html.replace('/*COVER*/',json.dumps(cov)).replace('/*COVERJS*/',open('cover.js').read())
open('index.html','w').write(html)
