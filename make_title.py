from PIL import Image,ImageDraw,ImageFont
f=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',16,index=1)
def txt(s,f,col,out):
    w=int(f.getlength(s))+4;m=Image.new('1',(w,24));ImageDraw.Draw(m).text((2,0),s,font=f,fill=1)
    m=m.crop(m.getbbox());w,h=m.size;im=Image.new('RGBA',(w+2,h+2))
    for dx,dy in[(0,1),(1,0),(1,1),(2,2),(0,2),(2,0),(1,2),(2,1)]:im.paste((40,20,60,255),(dx,dy),m)
    im.paste(col,(1,1),m);im.save(out)
txt('마법학교 사천성',f,(255,214,80,255),'assets/title.png')
txt('터치해서 시작',ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',11,index=1),(255,255,255,255),'assets/start.png')
