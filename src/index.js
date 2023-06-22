const HOST = "ws://minerwars.ru"

const socket = io.connect(HOST);

var appSize = (window.innerWidth / window.innerHeight >= 0.7) ? [window.innerHeight*0.56,window.innerHeight] : (window.innerHeight / window.innerWidth >= 2.3) ? [window.innerWidth,window.innerWidth*1.7] : [window.innerWidth,window.innerHeight]

const app = new PIXI.Application({
 width:appSize[0],height:appSize[1],
 resolution: window.devicePixelRatio || 1,
 transparent:true,
 autoDensity:true,
 antialias: false,
 useContextAlpha: false,
 backgroundColor:0xffffff
});

PIXI.settings.FILTER_RESOLUTION = 4;

document.body.appendChild(app.view);
/*document.getElementByTagName("canvas").style.position = "fixed";
document.getElementByTagName("canvas").style.display = "block";
document.getElementByTagName("canvas").style.left = window.innerWidth/2 - appSize[0]/2;
document.getElementByTagName("canvas").style.top = window.innerHeight/2 - appSize[1]/2;
document.getElementByTagName("canvas").style.border = "0px";
document.getElementByTagName("canvas").style.zIndex = "0";
document.getElementByTagName("canvas").style.width = appSize[0]
document.getElementByTagName("canvas").style.height = appSize[1]  */
app.loader.baseUrl = "src/img";
//app.loader.baseUrl = "assets/img";
app.loader.add("player_1","player_1.png")
.add("player_2","player_2.png")
.add("player_3","player_3.png")
.add("player_4","player_4.png")
         .add("block","block.jpg")
         .add("floor","floor.png")
         .add("iron_ore","iron_ore.png")
         .add("joy","joy.png")
         .add("touch","touch.png")
         .add("atk","atk.png")
         .add("super","super.png")
         .add("run","run.png")
         .add("take","take.png")
         .add("fon","fon.jpg")
         .add("ore1","fon.jpg")
          .add("dark","dark.png")
         .add("foots","foots.png")
         .add("enemyRam","enemyRam.png")
         .add("heart","heart.png")
         .add("userRam","userRam.png")
         .add("slot","slot.png")
         .add("pause","pause.png")
         .add("infoRam","infoRam.png")
         .add("atkeffect","atkeffect.png")
         .add("straiteffect","straiteffect.png")
         .add("sword1","sword1.png")
         .add("sword2","sword2.png")
         .add("sword3","sword3.png")
         .add("sword4","sword4.png")
         .add("sword5","sword5.png")
         .add("sword6","sword6.png")
         .add("sword7","sword7.png")
         .add("sword8","sword8.png")
         .add("sword9","sword9.png")
         .add("sword10","sword10.png")
         .add("sword11","sword11.png")
         .add("sword12","sword12.png")
         .add("pickaxe1","pickaxe1.png")
         .add("bow1","bow.png")
         .add("bow1_unload","bow_unload.png")
         .add("bow2","bow.png")
         .add("bow2_unload","bow_unload.png")
         .add("bow3","bow.png")
         .add("bow3_unload","bow_unload.png")
         .add("arraw","arraw.png")
         .add("classF","classF.png")
         .add("classB","classB.png")
         .add("classA","classA.png")
         .add("classS","classS.png")
         .add("mob_red_1","mobs/mob_red_1.png")
         .add("mob_red_2","mobs/mob_red_2.png")
         .add("mob_red_3","mobs/mob_red_3.png")
         .add("mob_red_4","mobs/mob_red_4.png")
         .add("mob_red_5","mobs/mob_red_5.png")
         .add("mob_blue_1","mobs/mob_blue_1.png")
         .add("mob_blue_2","mobs/mob_blue_2.png")
         .add("mob_blue_3","mobs/mob_blue_3.png")
         .add("mob_blue_4","mobs/mob_blue_4.png")
         .add("mob_blue_5","mobs/mob_blue_5.png")
         .add("background","background.jpg")
         .add("wall","wall.jpg")

app.loader.onComplete.add(start);
app.loader.onProgress.add(showProgress);
app.loader.load();
function showProgress(e) { }
function start() {
               const pixelW = app.screen.width/7;
               var move_mode = false;
               var can_atk = true;
               var can_superAttack = true
               var wait_dir = [];
               var moveId;

               const expNeed = [10,20,30,40,50];

               var players = [];
               var armsPlanted = [];
               var assets = [];
               var builds = [];
               
               var game = new PIXI.Container(); 
               app.stage.addChild(game); 
               
               var camera = new PIXI.Container();
               var control = new PIXI.Container();
                
               camera.x =  app.screen.width/2;
               camera.y =  app.screen.height/2

               game.addChild(camera,control);
               game.sortableChildren = true;

               camera.zIndex = 0;
               control.zIndex = 100; 

               var dark = PIXI.Sprite.from(app.loader.resources.dark.texture);
               dark.anchor.set(0.5);
               dark.x = app.screen.width/2
               dark.y = app.screen.height/2
               dark.width = (app.screen.height * 1.3 / dark.height) * dark.width
               dark.height = app.screen.height * 1.3
               dark.alpha = 1;

               var darkIn = new PIXI.Graphics();
               darkIn.beginFill(0x000000);
               darkIn.drawRect(0, 0, appSize[0], appSize[1]);
               darkIn.alpha = 0;

               control.addChild(dark,darkIn);

               var moveControl = new PIXI.Container();
               control.addChild(moveControl);

               var background1 = PIXI.Sprite.from(app.loader.resources.background.texture);
               background1.anchor.set(0.5);
               background1.width = pixelW * 32;
               background1.height = pixelW * 16;
               background1.y = -pixelW * 8;
               var background2 = PIXI.Sprite.from(app.loader.resources.background.texture);
               background2.anchor.set(0.5);
               background2.width = pixelW * 32;
               background2.height = pixelW * 16;
               background2.y = pixelW * 8;

               camera.addChild(background1,background2);


              /* var blocks = new PIXI.Container();
               camera.addChild(blocks); */

                              var buildsSee = new PIXI.Container();
               camera.addChild(buildsSee);

                var armsPlantedSee = new PIXI.Container();
               camera.addChild(armsPlantedSee);

               var assetsSee = new PIXI.Container();
               camera.addChild(assetsSee);

               var playersCont = new PIXI.Container();
               camera.addChild(playersCont);
               playersCont.sortableChildren = true;

             var walls = new PIXI.Container();
               camera.addChild(walls);
               for(var i = 0;i<4;i++) {
              var wall = PIXI.Sprite.from(app.loader.resources.wall.texture);
              wall.anchor.set(0.5);
              wall.width = pixelW * 32;
              wall.height = pixelW * 8;
              walls.addChild(wall);
               }
               setWalls(2);  

               function setWalls(mapSize) {
              walls.children[0].y = -pixelW * (mapSize + 4);
               walls.children[1].x = pixelW * (mapSize + 4); walls.children[1].angle = 90;
               walls.children[2].y = pixelW * (mapSize + 4);
               walls.children[3].x = -pixelW * (mapSize + 4); walls.children[3].angle = 270; 
               }

               var armArray = [];
               var artArray = [];

               var playerCont = new PIXI.Container();
               playerCont.filters = [new PIXI.filters.OutlineFilter(2, 0x000000)];
               playersCont.addChild(playerCont);

const arms = [
{name:"pickaxe1",class:"A",dmg:5,reload:500,range:[1,0.6],color:0xffffff,scale:0.2},
{name:"sword1",class:"F",dmg:10,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword2",class:"B",dmg:12,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword3",class:"A",dmg:15,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword4",class:"F",dmg:15,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword5",class:"B",dmg:17,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword6",class:"A",dmg:20,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword7",class:"F",dmg:20,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword8",class:"B",dmg:22,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword9",class:"A",dmg:25,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff,scale:0.2},
{name:"sword10",class:"F",dmg:30,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xCD61D6,scale:0.2},
{name:"sword11",class:"B",dmg:35,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xCD61D6,scale:0.2},
{name:"sword12",class:"A",dmg:40,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xCD61D6,scale:0.2},
{name:"bow1",class:"F",dmg:15,reload:1000,super:"Bow",reloadSuper:7000,scale:0.4},
{name:"bow2",class:"B",dmg:25,reload:1000,super:"Bow",reloadSuper:7000,scale:0.4},
{name:"bow3",class:"A",dmg:35,reload:1000,super:"Bow",reloadSuper:7000,scale:0.4},

{name:"ore1",class:"F",type:1,boost:10,scale:0.2}
];

const sizeArm = [
{name:'pickaxe1',size:1.2,x:0.2,ramX:0.5,armName:"Деревянная кирка (A)",info:"Плохое оружие для битвы, \nно хорошо ломает камни \nи строения",nameFill:0x5e81ff},

{name:'sword1',size:1.5,x:0.25,ramX:0.24,armName:"Железный меч (F)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0xf23030},
{name:'sword2',size:1.5,x:0.25,ramX:0.24,armName:"Железный меч (B)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},
{name:'sword3',size:1.5,x:0.25,ramX:0.24,armName:"Железный меч (A)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},

{name:'sword4',size:1.5,x:0.25,ramX:0.24,armName:"Золотой меч (F)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0xf23030},
{name:'sword5',size:1.5,x:0.25,ramX:0.24,armName:"Золотой меч (B)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},
{name:'sword6',size:1.5,x:0.25,ramX:0.24,armName:"Золотой меч (A)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},

{name:'sword7',size:1.8,x:0.2,ramX:0.5,armName:"Алмазный меч (F)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0xf23030},
{name:'sword8',size:1.8,x:0.2,ramX:0.5,armName:"Алмазный меч (B)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},
{name:'sword9',size:1.8,x:0.2,ramX:0.5,armName:"Алмазный меч (A)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},

{name:'sword10',size:1.8,x:0.2,ramX:0.5,armName:"Обсидиановый меч (F)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0xf23030},
{name:'sword11',size:1.8,x:0.2,ramX:0.5,armName:"Обсидиановый меч (B)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},
{name:'sword12',size:1.8,x:0.2,ramX:0.5,armName:"Обсидиановый меч (A)",info:"Быстрое оружие, хорошее \nпротив всех врагов, \nно с низкой дальностью",nameFill:0x5e81ff},

{name:'bow1',size:1.2,x:0.2,ramX:0.7,armName:"Арбалет (F)",info:"Дальнее оружие, хорошее \nпротив дальних врагов, \nно с низкой скоростью",nameFill:0xf23030},
{name:'bow2',size:1.2,x:0.2,ramX:0.7,armName:"Арбалет (B)",info:"Дальнее оружие, хорошее \nпротив дальних врагов, \nно с низкой скоростью",nameFill:0x5e81ff},
{name:'bow3',size:1.2,x:0.2,ramX:0.7,armName:"Арбалет (A)",info:"Дальнее оружие, хорошее \nпротив дальних врагов, \nно с низкой скоростью",nameFill:0x5e81ff},

{name:'ore1',size:1.2,x:0.2,ramX:0.5,artName:"Старый осколок (F)",info:"Осколок боди, который \nсможет наконец-то \nсделать альфу",nameFill:0xf23030}
];

const mobs = [
{id:1,icon:"mob_red_1",atkLength:0.4},
{id:5,icon:"mob_red_5",atkLength:0.4}
]

var touch_rad, angle, radian = 0;
var touchPos = {x:app.screen.width/4.8,y:app.screen.height-app.screen.width/3.5}
var dir = [0,0];
var lastDir = {dir:[0,0],angle:0,boost:1};
 
var keysPressed = [];
document.onkeydown = (e) => {if(!keysPressed.find(x=>x == e.keyCode)){ keysPressed.push(e.keyCode);getKeyDir()}}
document.onkeyup = (e) => {if(keysPressed.find(x=>x == e.keyCode)){keysPressed.splice(keysPressed.indexOf(e.keyCode),1);getKeyDir()}}

function getDir(newDir) {
radian = Math.atan2(newDir.y,newDir.x);
angle = (newDir.x == 0 && newDir.y == 0) ? angle : radian * (180 / Math.PI);
dir = (newDir.x == 0 && newDir.y == 0) ?  [0,0] : [Math.floor(Math.cos(radian)*100)/100,-Math.floor(Math.sin(radian)*100)/100];
if(lastDir.dir != dir || lastDir.boost != boost){wait_dir.push({dir:dir,angle:angle,boost:boost}) };
touch_rad = Math.sqrt(Math.sqrt(Math.pow(Math.abs(newDir.x * pixelW),2) + Math.pow(Math.abs(newDir.y * pixelW),2)));
touchPos.x = (touch_rad < joy.width/3) ? touch_rad * dir[0] + app.screen.width/4.8: dir[0] * joy.width / 3 +app.screen.width/4.8
touchPos.y = (touch_rad < joy.width/3) ? touch_rad * -dir[1] + app.screen.height-app.screen.width/3.5: -dir[1] * joy.width / 3 + app.screen.height-app.screen.width/3.5
}

function getKeyDir() {
    var newDir = {x:0,y:0};
    keysPressed.forEach(key => {
    if(key == '40' || key == '83' ) { newDir.y += joy.width/3; }
    if(key == '38' ||key == '87') { newDir.y -= joy.width/3; }
    if(key == '37' || key == '65') { newDir.x -= joy.width/3; }
    if(key == '39' || key == '68') { newDir.x += joy.width/3; }
    if(key == '69') { takeArm() }
})
getDir(newDir);
}
               
               var slotPause = PIXI.Sprite.from(app.loader.resources.pause.texture);
               slotPause.width = pixelW / slotPause.height * slotPause.width;
               slotPause.height = pixelW;
               slotPause.x = -pixelW* 0.2
               slotPause.y = slotPause.height * 0.2;
               slotPause.alpha = 1;

               var slotArm = PIXI.Sprite.from(app.loader.resources.slot.texture);
               slotArm.width = pixelW / slotArm.height * slotArm.width;
               slotArm.height = pixelW;
               slotArm.x = -pixelW*0.2
               slotArm.y = slotArm.height * 1.4;
               slotArm.alpha = 1;
               slotArm.interactive = true;
               slotArm.on("pointerdown",() => {
               armInfoCont.alpha = 1;
               slotArm.on("pointerup",() => {
               armInfoCont.alpha = 0;
               });
               slotArm.on("pointerupoutside",() => {
                armInfoCont.alpha = 0;
               });
               })

                slotArm.on("pointerover",() => {
                armInfoCont.alpha = 1;
                slotArm.on("pointerout",() => {
                armInfoCont.alpha = 0;
               });
               });

                var slotArt = PIXI.Sprite.from(app.loader.resources.slot.texture);
               slotArt.width = pixelW / slotArt.height * slotArt.width;
               slotArt.height = pixelW;
               slotArt.x = -pixelW*0.2
               slotArt.y = slotArm.height * 2.43;
               slotArt.alpha = 0

               slotArt.on("pointerdown",() => {
                artInfoCont.alpha = 1;
                slotArt.on("pointerup",() => {
                artInfoCont.alpha = 0;
               });
                 slotArt.on("pointerupoutside",() => {
                artInfoCont.alpha = 0;
               });
               });

               slotArt.on("pointerover",() => {
                artInfoCont.alpha = 1;
                slotArt.on("pointerout",() => {
                artInfoCont.alpha = 0;
               });
               });

               var armInfoCont = new PIXI.Container()
               armInfoCont.alpha = 0
 
               var infoArm = PIXI.Sprite.from(app.loader.resources.infoRam.texture);
               infoArm.width = appSize[0]/5 / infoArm.height * infoArm.width;
               infoArm.height = appSize[0]/5;
               infoArm.x = pixelW * 1.2
               infoArm.y = slotArm.height * 1.4;
               armInfoCont.addChild(infoArm)

               var armName = new PIXI.Text('',{fontFamily:'Helvetica',fill:"white",textAlign:"left",fontSize:infoArm.height / 8,fontWeight:'bold',padding:10 });
               armName.y = infoArm.height * 1.2
               armName.x = pixelW * 1.4
               armName.anchor.set(0,0.5)
               armInfoCont.addChild(armName)

               var armInfo = new PIXI.Text('',{fontFamily:'Helvetica',fill:'white',textAlign:"left",fontSize:infoArm.height / 8,lineHeight:infoArm.height / 6,fontWeight:'bold',padding:10 });
               armInfo.y = infoArm.height * 1.35
               armInfo.x = pixelW * 1.4
               armInfo.anchor.set(0,0)
               armInfoCont.addChild(armInfo)


               var artInfoCont = new PIXI.Container()
               artInfoCont.alpha = 0
 
               var infoArt = PIXI.Sprite.from(app.loader.resources.infoRam.texture);
               infoArt.width = appSize[0]/5 / infoArt.height * infoArt.width;
               infoArt.height = appSize[0]/5;
               infoArt.x = pixelW * 1.2
               infoArt.y = slotArt.height * 1.4;
               artInfoCont.addChild(infoArt)

               var artName = new PIXI.Text('',{fontFamily:'Helvetica',fill:"white",textAlign:"left",fontSize:infoArt.height / 8,fontWeight:'bold',padding:10 });
               artName.y = infoArt.height * 1.2
               artName.x = pixelW * 1.4
               artName.anchor.set(0,0.5)
               artInfoCont.addChild(artName)

               var artInfo = new PIXI.Text('',{fontFamily:'Helvetica',fill:'white',textAlign:"left",fontSize:infoArt.height / 8,lineHeight:infoArt.height / 6,fontWeight:'bold',padding:10 });
               artInfo.y = infoArt.height * 1.35
               artInfo.x = pixelW * 1.4
               artInfo.anchor.set(0,0)
               artInfoCont.addChild(artInfo)


              var userRam = PIXI.Sprite.from(app.loader.resources.userRam.texture);
               userRam.width = (pixelW / userRam.height) * userRam.width;
               userRam.height = pixelW;
               userRam.y =  userRam.height * 0.2
               userRam.x = app.screen.width / 2 - userRam.width / 2
               userRam.alpha = 1;
               
               var userHp = new PIXI.Container()
               var userHpHearts = [];

               for(var i = 0; i < 10; i++) {
                var heart = PIXI.Sprite.from(app.loader.resources.heart.texture);
                heart.width = (pixelW / 3.2 / heart.height) * heart.width;
                heart.height = pixelW / 3.2
                heart.x =  slotPause.width * 1.58 + i * heart.width;
                heart.y = userRam.y + userRam.height * 0.4
                userHp.addChild(heart)
                userHpHearts.push(heart)
               }

               var userName = new PIXI.Text('',{fontFamily:'Helvetica',fill:'white',textAlign:"center",fontSize:userRam.height/4.5,fontWeight:'bold',padding:userRam.height });
               userName.y = userRam.height * 0.47
               userName.x = app.screen.width / 2
               userName.anchor.set(0.5);

               var frontExp = new PIXI.Graphics();
               frontExp.lineStyle(pixelW / 18, 0x4181da);
               frontExp.moveTo(slotPause.width * 2.1,userRam.y + userRam.height * 0.79);

               var backExp = new PIXI.Graphics();
               backExp.beginFill(0xabc7ef);
               backExp.drawRect(slotPause.width * 2.1, userRam.y + userRam.height * 0.77, userRam.x * 1.3, pixelW / 18);

               var expLvl = new PIXI.Text('Lv. 1',{fontFamily:'Helvetica',fill:0xabc7ef,textAlign:"center",fontSize:userRam.height/8,fontWeight:1000,padding:userRam.height });
               expLvl.y = userRam.y + userRam.height * 0.73
               expLvl.x = slotPause.width * 1.8

               var fpsText = new PIXI.Text("",{fontFamily:'Helvetica',fill:'white',textAlign:"center",fontSize:16,fontWeight:'bold',padding:10});
               fpsText.x = 10;
               fpsText.y = appSize[1] - 30;

               var floorText = new PIXI.Text("Этаж 1",{fontFamily:'Helvetica',fill:'white',textAlign:"right",fontSize:10,fontWeight:'bold',padding:10});
               floorText.x = appSize[0] - 50;
               floorText.y = 15;

               control.addChild(slotPause,slotArm,slotArt,armInfoCont,artInfoCont,userRam,userHp,userName,backExp,frontExp,expLvl,fpsText,floorText);

               var animExp = [0,0];
               var animLvl = [1,1];
               var animated = true;

               function setExp(lvl,exp) {
                if(animated) {
               animated = false;
               animExp[0] = animExp[1];
               animLvl[0] = animLvl[1];
               animExp[1] = exp;
               animLvl[1] = lvl;
               requestAnimationFrame( animateExp );
               } else {
               animExp[1] = exp;
               animLvl[1] = lvl;
               }
               }

               function animateExp() {
                if(animLvl[0] < animLvl[1] && animExp[0] >= expNeed[animLvl[0]-1]) {
                 frontExp.clear();
                 animLvl[0] += 1;
                 animExp[0] = 0;
                 expLvl.text = "Lv. "+animLvl[0];
                }
                if(expNeed[animLvl[0]-1] * 0.01 > 0) {
               frontExp.moveTo(slotPause.width * 2.1 + userRam.x * (1.3 * animExp[0]/expNeed[animLvl[0]-1]),userRam.y + userRam.height * 0.8);
               animExp[0] += expNeed[animLvl[0]-1] * 0.01;
               frontExp.lineStyle(pixelW / 18, 0x4181da);
               frontExp.lineTo(slotPause.width * 2.1 + userRam.x * (1.3 * animExp[0]/expNeed[animLvl[0]-1]), userRam.y + userRam.height * 0.8);
                     }
               if(animLvl[0] < animLvl[1] || animExp[0] < animExp[1]) {
                requestAnimationFrame( animateExp );
              } else {
              animExp[0] = animExp[1];
              animLvl[0] = animLvl[1];
              animated = true;
              }
               }

               function setExpRe(lvl,exp) {
                if((lvl<animLvl[1]) || (lvl == animLvl[1] && exp < animExp[1])) {
                  animExp[1] = exp;
                  animExp[0] = exp;
                  animLvl[1] = lvl;
                  animLvl[0] = lvl;
                  expLvl.text = "Lv. "+lvl;
                  frontExp.clear();
                  frontExp.moveTo(slotPause.width * 2.1,userRam.y + userRam.height * 0.8);
                  frontExp.lineStyle(pixelW / 18, 0x4181da);
                  frontExp.lineTo(slotPause.width * 2.1 + userRam.x * (1.3 * animExp[0]/expNeed[animLvl[0]-1]), userRam.y + userRam.height * 0.8);
                } else if(lvl>animLvl || (lvl == animLvl[1] && exp > animExp[1])) {
                      setExp(lvl,exp);
                }
               }


               let id;
               let size;
               var hasPlayer = false;
              setTimeout(()=>socket.emit("auth"),2000);;
               socket.on("log",(data) => generate(data));

              async function generate(data) {
                id = data.id;
                size = data.sizeMap; setWalls(size);
                    var playerSU = data.players.find(x=>x.id == id);
                    playerSU.x *= pixelW;
                    playerSU.y *= -pixelW;
                    floorText.text = "Этаж "+playerSU.floor;
                if(hasPlayer == true) {
                    var playerS = players.find(x=>x.user.id == id);
                 if(playerS.user.floor == playerSU.floor) { darkInScreen(0.15,0.2) } else { darkInScreen(0.8,1) };
                    playerS.user = playerSU;
                var pcl = playersCont.children.length
                for(var i = 0; i < pcl;i++) {playersCont.removeChild(playersCont.children[0])}
                playersCont.addChild(playerCont)
                players = [playerS];
            }
                data.players.forEach(async (playerData) => {
                  if(playerData.id == data.id && hasPlayer == false) {
                        hasPlayer = true;
               var player = PIXI.Sprite.from(app.loader.resources[playerData.icon].texture);
               player.width = pixelW;
               player.height = pixelW;
               player.anchor.set(0.5);
               //player.cullable = true;

               players.push({user:playerData})

                    userName.text = playerData.name
                    camera.x = -playerData.x*pixelW + app.screen.width/2;
                    camera.y = playerData.y*pixelW  + app.screen.height/2;
                    playerCont.x = playerSU.x
                    playerCont.y = playerSU.y

                    var heartsLife = Math.ceil(playerData.hp / 10);
                    for(var g = 0;g < userHpHearts.length;g++) {
                          if(g < heartsLife) {
                            userHpHearts[g].alpha = 1;
                          }  else {
                            userHpHearts[g].alpha = 0.4;
                          }
                    }

               var armSize = sizeArm.find(y=>y.name == playerData.arm)

               var arm = PIXI.Sprite.from(app.loader.resources[playerData.arm].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x

               playerCont.addChild(player,arm);

               if(arms.find(x=>x.name == playerData.arm).super) {
              atkSuper.width = atkSuper.height
               } else {
               atkSuper.width =  0;
               }

               var armView = PIXI.Sprite.from(app.loader.resources[playerData.arm].texture);
               armView.anchor.set(0.5)
               armView.height = (pixelW * armSize.ramX / armView.width) * armView.height;
               armView.width = pixelW * armSize.ramX
               armView.angle = -45
               armView.y = slotArm.y + pixelW/2.3
               armView.x = pixelW / 2.2
               armView.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];

               var classArm = PIXI.Sprite.from(app.loader.resources["class"+arms.find(x=>x.name == playerData.arm).class].texture);
               classArm.anchor.set(0.5)
               classArm.height = (pixelW /2.4 / classArm.width) * classArm.height
               classArm.width = pixelW /2.4;
               classArm.y = slotArm.y * 1.1
               classArm.x = pixelW * 0.9

               armName.text = armSize.armName
               armName.style.fill = armSize.nameFill;
               armInfo.text = armSize.info

               control.addChild(armView,classArm);


               armArray = [arm,armView,classArm];
               
               if(arms.find(x=>x.name ==playerData.art)) {

               var artSize = sizeArm.find(y=>y.name == playerData.art)

               var artView = PIXI.Sprite.from(app.loader.resources[playerData.art].texture);
               artView.anchor.set(0.5)
               artView.height = (pixelW * artSize.ramX / artView.width) * artView.height;
               artView.width = pixelW * artSize.ramX
               artView.angle = -45
               artView.y = slotArt.y + pixelW/2.3
               artView.x = pixelW / 2.2
               artView.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];

               var classArt = PIXI.Sprite.from(app.loader.resources["class"+arms.find(x=>x.name == playerData.art).class].texture);
               classArt.anchor.set(0.5)
               classArt.height = (pixelW /2.4 / classArt.width) * classArt.height
               classArt.width = pixelW /2.4;
               classArt.y = slotArt.y * 1.1
               classArt.x = pixelW * 0.9

               control.addChild(artView,classArt);
               artArray = [artView,classArt];

               artName.text = artSize.artName
               artName.style.fill = artSize.nameFill;
               artInfo.text = artSize.info

                  slotArt.interactive = true;
                 artArray[0].alpha = 1
                artArray[1].alpha = 1
                slotArt.alpha = 1;
} else {
    slotArt.interactive = false;
                 artArray[0].alpha = 0
                artArray[1].alpha = 0
                artInfoCont.alpha = 0;
                slotArt.alpha = 0;

}

                  } else if(playerData.id == id){playerCont.x = playerSU.x; players.find(x=>x.user.id == id).user.x = playerSU.x;playerCont.y = playerSU.y; players.find(x=>x.user.id == id).user.y = playerSU.y;camera.x = -playerSU.x * 0.5 + app.screen.width/2;camera.y = -playerSU.y*0.5 + app.screen.height/2;setExpRe(playerSU.lvl,playerSU.exp)}else{await spawnEnemy(playerData);}
                })

            while(armsPlantedSee.children.length > 0) {armsPlantedSee.removeChild(armsPlantedSee.children[0])}
            while(armsPlanted.length > 0) {armsPlanted.splice(0,1)}
            data.armsPlanted.forEach(armPlanted => {
              var arm = PIXI.Sprite.from(app.loader.resources[armPlanted.name].texture);
              arm.width = (pixelW * (sizeArm.find(x=>x.name == armPlanted.name).size / 1.5) / arm.height) * arm.width;
              arm.height = pixelW * (sizeArm.find(x=>x.name == armPlanted.name).size / 1.5)
              arm.anchor.set(0.5);
              arm.x = armPlanted.x * pixelW;
              arm.y = -armPlanted.y * pixelW;
              arm.angle = armPlanted.angle;
              armsPlanted.push([arm,armPlanted])
              armsPlantedSee.addChild(arm)
          })
              /*              blocks.children.forEach(child => { blocks.removeChild(child); })   
                for(var x = -(data.sizeMap+4);x < data.sizeMap+5;x++) {
                               for(var y = -(data.sizeMap+4);y < data.sizeMap+5;y++) {
                                if((x<-(data.sizeMap)) || (x > data.sizeMap) || (y < -(data.sizeMap)) || (y > data.sizeMap)) {
               var block = PIXI.Sprite.from(app.loader.resources.block.texture);
               block.width = pixelW;
               block.height = pixelW;
               block.anchor.set(0.5);
               block.x = x * pixelW
               block.y = y * pixelW
               blocks.addChild(block);
           } else {
                           var block = PIXI.Sprite.from(app.loader.resources.floor.texture);
               block.width = pixelW;
               block.height = pixelW;
               block.anchor.set(0.5);
               block.x = x * pixelW
               block.y = y * pixelW
               blocks.addChild(block);
           }
           }
           } */

           while(buildsSee.children.length > 0) {buildsSee.removeChild(buildsSee.children[0])}
            while(builds.length > 0) {builds.splice(0,1)}
              data.builds.forEach(build => {
                build.x *= pixelW;
                build.y *= -pixelW;
                var block = PIXI.Sprite.from(app.loader.resources["fon"].texture);
                //var block = PIXI.Sprite.from(app.loader.resources[build.name].texture);
               block.width = pixelW * build.size;
               block.height = pixelW * build.size;
               block.anchor.set(0.5);
               block.x = build.x
               block.y = build.y
               buildsSee.addChild(block);
               builds.push([block, build])
              })

                      assets.forEach(asset => {
  assetsSee.removeChild(asset[0]);
  assets.splice(assets.indexOf(assets.find(x=>x[1].id == asset.id)),1);
});
 while(assetsSee.children.length > 0) {assetsSee.removeChild(assetsSee.children[0])}
data.assets.forEach((asset)=>spawnAsset(asset));
               }

               socket.on("newLog",(data) => {
                if(data.id!=id) {
            spawnEnemy(data);
                }
               })

                             async function spawnEnemy(playerData) {
                                var player = players.find(y => y.user.id == id);
                                if(!player || (playerData.floor == player.user.floor && playerData.room == player.user.room)) {
                     var enemyPlayer = new PIXI.Container();
                     playersCont.addChild(enemyPlayer);

                    var userCont = new PIXI.Container();
                    userCont.filters = [new PIXI.filters.OutlineFilter(3, 0xf23030)];
                    userCont.angle = playerData.angle;

              enemyPlayer.x = playerData.x * pixelW;
              enemyPlayer.y = -playerData.y * pixelW;

               var enemy = PIXI.Sprite.from(app.loader.resources[playerData.icon].texture);
               enemy.width = pixelW;
               enemy.height = pixelW;
               enemy.anchor.set(0.5);
               //enemy.cullable = true;

               if(playerData.id[0] == "p") {

               var armSize = sizeArm.find(y=>y.name == playerData.arm)

               var arm = PIXI.Sprite.from(app.loader.resources[playerData.arm].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x

               userCont.addChild(enemy,arm);

               var enemyRam = PIXI.Sprite.from(app.loader.resources.enemyRam.texture);
               enemyRam.width = (pixelW*0.6 / enemyRam.height) * enemyRam.width;
               enemyRam.height = pixelW * 0.6;
               enemyRam.anchor.set(0.5)
               enemyRam.y =  enemyRam.height * 1.7
               enemyRam.zOrder = 1

               var enemyName = new PIXI.Text(playerData.name,{fontFamily:'Helvetica',fill:'white',textAlign:"center",fontSize:enemyRam.height/Math.sqrt(playerData.name.length)/1.3,fontWeight:'bold',padding:enemyRam.height});
               enemyName.anchor.set(0.5)
               enemyName.y = enemyRam.height * 1.52

               var enemyHp = new PIXI.Container()
               var enemyHpHearts = [];

               for(var g = 0; g < 5; g++) {
                var heart = PIXI.Sprite.from(app.loader.resources.heart.texture);
                heart.width = (pixelW / 5.5 / heart.height) * heart.width;
                heart.height = pixelW / 5.5
                heart.x = -enemyRam.width * 0.37 + g * heart.width;
                heart.y = enemyRam.y - enemyRam.height * 0.04
                enemyHp.addChild(heart)
                enemyHpHearts.push(heart)
               }

               var heartsLife = Math.ceil(playerData.hp / 16);
                    for(var g = 0;g < enemyHpHearts.length;g++) {
                          if(g < heartsLife) {
                            enemyHpHearts[g].alpha = 1;
                          }  else {
                            enemyHpHearts[g].alpha = 0.4;
                          }
                    }

               enemyPlayer.addChild(userCont,enemyRam,enemyHp,enemyName)
               players.push({playerCont:enemyPlayer,player:userCont,ram:enemyRam,hp:enemyHp,hearts:enemyHpHearts,arm:arm,user:playerData});
               return;
           } else {
            if(playerData.arm) {
            var armSize = sizeArm.find(y=>y.name == playerData.arm)
               var arm = PIXI.Sprite.from(app.loader.resources[playerData.arm].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x
               userCont.addChild(enemy,arm);
            enemyPlayer.addChild(userCont)
            players.push({playerCont:enemyPlayer,player:userCont,arm:arm,user:playerData});
          } else {
            userCont.addChild(enemy)
            enemyPlayer.addChild(userCont)
            players.push({playerCont:enemyPlayer,player:userCont,user:playerData});
          }
            return;
           }
       }
                  }

               var editedPlayers = [];
               socket.on("editPlayer",(data) => {
                editedPlayers.push(data);
                var player = players.find(x=>x.user.id == data.id)
                if(player == undefined && data.id != id) {
                  spawnEnemy(data);
                } else {
                if(data.id == id) {
                    if(data.x || data.x == 0) {playerCont.x = data.x * pixelW; player.user.x = data.x * pixelW;}
                    if(data.y || data.y == 0) {playerCont.y = -data.y * pixelW; player.user.y = -data.y * pixelW;}
                    if(data.hp || data.hp == 0) {
                        player.user.hp = data.hp
                  var heartsLife = Math.ceil(data.hp / 10);
                    for(var g = 0;g < userHpHearts.length;g++) {
                          if(g < heartsLife) {
                            userHpHearts[g].alpha = 1;
                          }  else {
                            userHpHearts[g].alpha = 0.4;
                          }
                    }
                }
                   
                   if(data.arm) {
                                    player.user.arm = data.arm;
                player.user.armId = data.armId;
               var armSize = sizeArm.find(y=>y.name == data.arm);
               playerCont.removeChild(armArray[0]);
               var arm = PIXI.Sprite.from(app.loader.resources[data.arm].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x

               armArray[0] = arm;

               if(arms.find(x=>x.name == data.arm).super) {
               atkSuper.width = atkSuper.height
               } else {
               atkSuper.width =  0;
               }

               playerCont.addChild(armArray[0])
               control.removeChild(armArray[1]);

               var armView = PIXI.Sprite.from(app.loader.resources[data.arm].texture);
               armView.anchor.set(0.5)
               armView.height = (pixelW * armSize.ramX / armView.width) * armView.height;
               armView.width = pixelW * armSize.ramX
               armView.angle = -45
               armView.y = slotArm.y + pixelW/2.3
               armView.x = pixelW / 2.2
               armView.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];

               armName.text = armSize.armName
               armName.style.fill = armSize.nameFill;
               armInfo.text = armSize.info

               armArray[1] = armView;
               control.addChild(armArray[1])


               armArray[2].texture = app.loader.resources["class"+arms.find(x=>x.name == data.arm).class].texture;
               }

               if(data.art) {

                if(arms.find(x=>x.name == data.art)) {

               control.removeChild(artArray[0]);


               var artSize = sizeArm.find(y=>y.name == data.art)

               var artView = PIXI.Sprite.from(app.loader.resources[data.art].texture);
               artView.anchor.set(0.5)
               artView.height = (pixelW * artSize.ramX / artView.width) * artView.height;
               artView.width = pixelW * artSize.ramX
               artView.angle = -45
               artView.y = slotArt.y + pixelW/2.3
               artView.x = pixelW / 2.2
               artView.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];

               var classArt = PIXI.Sprite.from(app.loader.resources["class"+arms.find(x=>x.name == data.art).class].texture);
               classArt.anchor.set(0.5)
               classArt.height = (pixelW /2.4 / classArt.width) * classArt.height
               classArt.width = pixelW /2.4;
               classArt.y = slotArt.y * 1.1
               classArt.x = pixelW * 0.9

               artName.text = artSize.artName
               artName.style.fill = artSize.nameFill;
               artInfo.text = artSize.info

               artArray[0] = artView;
               control.addChild(artArray[0])

                   slotArt.interactive = true;
                 artArray[0].alpha = 1
                artArray[1].alpha = 1
                slotArt.alpha = 1;


               artArray[1].texture = app.loader.resources["class"+arms.find(x=>x.name == data.art).class].texture;
           } else {
             slotArt.interactive = false;
                 artArray[0].alpha = 0
                artArray[1].alpha = 0
                artInfoCont.alpha = 0;
                slotArt.alpha = 0;
           }
               }

                  players[players.indexOf(players.find(x=>x.id == data.id))] = player;
                } else {
                    if((data.room && data.room != player.user.room) || (data.floor && data.floor != player.user.floor)) {
     var index;
    for(var i = 0;i<players.length;i++) {
        if(players[i].user.id == data.id) {
            index = i;
            break;
        }
    }
    playersCont.removeChild(players[index].playerCont);
    players.splice(index,1);

                    } else {
                  if(data.x || data.x == 0) {player.playerCont.x = data.x * pixelW; player.user.x = data.x * pixelW;}
                  if(data.y || data.y == 0) {player.playerCont.y = -data.y * pixelW; player.user.y = -data.y * pixelW;}
                  if(data.hp || data.hp == 0) {
                    player.user.hp = data.hp;
                 var heartsLife = Math.ceil(data.hp / 16);
                    for(var g = 0;g < player.hearts.length;g++) {
                           if(g == heartsLife - 1) {
                            player.hearts[g].alpha = 0.4 + 0.6 * (data.hp - (heartsLife-1)*16) / 16;
                          }  else {
                            if(g < heartsLife) {
                              player.hearts[g].alpha = 1;
                            } else {
                            player.hearts[g].alpha = 0.4;
                        }
                          }
                    }
                }
               
               if(data.arm) {
                player.user.arm = data.arm;
                player.user.armId = data.armId;
                              var armSize = sizeArm.find(y=>y.name == data.arm);
               player.player.removeChild(player.arm);
               var arm = PIXI.Sprite.from(app.loader.resources[data.arm].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x

               player.arm = arm;
               player.player.addChild(player.arm);
}
                players[players.indexOf(players.find(x=>x.id == data.id))] = player;
}
                }
            }
               })


               socket.on("newArm",(data) => {
                  var user = players.find(x=>x.user.id == data[0]).user;
                if(user != undefined) {
                  var lastArm = data[1].lastArm;
                  var lastId = data[1].lastArmId;
                  var arm = armsPlanted.find(x=>x[1].id == data[1].id);
                  if(arm != undefined) {
                  if(arm[1].name != user.arm) {   
                  if(user.id == id) {
                                       if(arms.find(x=>x.name == data[1].name).super) {
               atkSuper.width = atkSuper.height
               } else {
               atkSuper.width =  0;
               }

               var armSize = sizeArm.find(y=>y.name == data[1].name);
               playerCont.removeChild(armArray[0]);

               var arm = PIXI.Sprite.from(app.loader.resources[data[1].name].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x

               armArray[0] = arm;
               playerCont.addChild(armArray[0])
               control.removeChild(armArray[1]);

               var armView = PIXI.Sprite.from(app.loader.resources[data[1].name].texture);
               armView.anchor.set(0.5)
               armView.height = (pixelW * armSize.ramX / armView.width) * armView.height;
               armView.width = pixelW * armSize.ramX
               armView.angle = -45
               armView.y = slotArm.y + pixelW/2.3
               armView.x = pixelW / 2.2
               armView.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];

               armName.text = armSize.armName
               armName.style.fill = armSize.nameFill;
               armInfo.text = armSize.info

               armArray[1] = armView;
               control.addChild(armArray[1])

               armArray[2].texture = app.loader.resources["class"+arms.find(x=>x.name == data[1].name).class].texture;

                players.find(x=>x.user.id == data[0]).user.arm = data[1].name;
                players.find(x=>x.user.id == data[0]).user.armId = data[1].id
                  } else {
                  var enemy = players.find(x=>x.user.id == data[0]);
               var armSize = sizeArm.find(y=>y.name == data[1].name);

               enemy.player.removeChild(enemy.arm);
               var arm = PIXI.Sprite.from(app.loader.resources[data[1].name].texture);
               arm.anchor.set(0.5,0.9)
               arm.width = (pixelW * armSize.size / arm.height) * arm.width;
               arm.height = pixelW * armSize.size
               arm.angle = 95
               arm.y = pixelW / 1.95
               arm.x = pixelW * armSize.x

               enemy.arm = arm;
               enemy.player.addChild(enemy.arm);

              enemy.user.armId = data[1].id;
              enemy.user.arm = data[1].name;
                  }
              var playerXY = players.find(x=>x.user.id == data[0]).playerCont;

              var armPlanted = armsPlanted[armsPlanted.indexOf(armsPlanted.find(x=>x[1].id == data[1].id))];
              armsPlantedSee.removeChild(armPlanted[0]);
              armsPlanted.splice(armsPlanted.indexOf(armPlanted),1);

              var armNew = PIXI.Sprite.from(app.loader.resources[lastArm].texture);
              armNew.width = (pixelW * (sizeArm.find(x=>x.name == lastArm).size / 1.5) / armNew.height) * armNew.width;
              armNew.height = pixelW * (sizeArm.find(x=>x.name == lastArm).size / 1.5)
              armNew.anchor.set(0.5);
              armNew.x = data[1].playerXY[0] * pixelW;
              armNew.y = -data[1].playerXY[1] * pixelW;
              armNew.angle = data[1].angle;
              armsPlanted.push([armNew,{name:lastArm,x:data[1].x,y:data[1].y,id:lastId,angle:data[1].angle + 90}])
              armsPlantedSee.addChild(armNew);
                }
                 }
                }
               })


               socket.on("spawnArm",(data) => {
              var armNew = PIXI.Sprite.from(app.loader.resources[data.name].texture);
              armNew.width = (pixelW / armNew.height) * armNew.width;
              armNew.height = pixelW;
              armNew.anchor.set(0.5);
              armNew.x = data.x * pixelW
              armNew.y = -data.y * pixelW
              armNew.angle = data.angle;
              armsPlanted.push([armNew,data])
              armsPlantedSee.addChild(armNew);
               })

                socket.on("spawnAsset",(data) => {
              spawnAsset(data);
               })

                function spawnAsset(data) {
              var assetNew = PIXI.Sprite.from(app.loader.resources[data.name].texture);
              if(data.name=="arraw") {
              assetNew.height = (pixelW / assetNew.width * 0.8) * assetNew.height;
              assetNew.width = pixelW * 0.8;
              assetNew.anchor.set(0.5);
              assetNew.x = data.x * pixelW
              assetNew.y = -data.y * pixelW
              assetNew.angle = data.angle;
              //assetNew.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];

              var atkeffect = PIXI.Sprite.from(app.loader.resources.straiteffect.texture);
               atkeffect.height = (pixelW / atkeffect.width * 12) * atkeffect.height
               atkeffect.width = pixelW * 12
               atkeffect.anchor.set(0.5);
               atkeffect.tint = 0xffffff;
               atkeffect.alpha = 0.7;
               atkeffect.x = -pixelW * 11;
               atkeffect.y = 0;
               //atkeffect.angle = playerAttacked[2];

               assetNew.addChild(atkeffect)
            }
              assets.push([assetNew,data])
              assetsSee.addChild(assetNew);
                }

                 socket.on("removeAsset",(assetId) => {
                   for(var i = 0;i<assets.length;i++) {
                    if(assets[i][1].id == assetId) {
                          assetsSee.removeChild(assets[i][0]);
                          assets.splice(i,1);
                    }
                   }
                 })


               socket.on("spawnBuild",(data) => {
                data.x *= pixelW;
                data.y *= -pixelW
              var build = PIXI.Sprite.from(app.loader.resources["fon"].texture);
              build.width = data.size * pixelW
              build.height = data.size * pixelW
              build.anchor.set(0.5);
              build.x = data.x
              build.y = data.y
              builds.push([build,data])
              buildsSee.addChild(build);
               })

          /* var nearMap = [];
              var lastNearMap = [-999999,-999999]
              var collisions = []; */

               setInterval(()=>{
                var last = (wait_dir.length>0) ? wait_dir[wait_dir.length-1] : {dir:dir,angle:angle,boost:boost}
                wait_dir = [];
                /* if(Math.sqrt(Math.pow(Math.abs(playerCont.x - lastNearMap[0]),2) + Math.pow(Math.abs(playerCont.y - lastNearMap[1]),2)) >= pixelW*2) {
                      lastNearMap = [playerCont.x,playerCont.y]
                  nearMap = [];
for(var i = 0;i<map.length;i++) {
if(Math.sqrt(Math.pow(Math.abs(map[i].x - playerCont.x),2) + Math.pow(Math.abs(map[i].y - playerCont.y),2)) <= pixelW*7) {
nearMap.push(map[i]);
if(!mapSee.children.find(x=>x == map[i])) {mapSee.addChild(map[i])}
} else {
    if(mapSee.children.find(x=>x == map[i])) {mapSee.removeChild(map[i])}
}
}
for(var i = 0;i<mapSee.children.length;i++) {
    if(!map.find(x=>x==mapSee.children[i])) {
        mapSee.removeChild(mapSee.children[i])
    }
}
}
for(var i = 0;i<nearMap.length;i++) {
  if(playerCont.x + pixelW/2.2 > nearMap[i].x - pixelW/2.2 && playerCont.x - pixelW/2.2 < nearMap[i].x + pixelW/2.2 && playerCont.y + pixelW/2.2 > nearMap[i].y - pixelW/2.2 && playerCont.y - pixelW/2.2 < nearMap[i].y + pixelW/2.2) {
if(!collisions.find(x=>x[0] == nearMap[i].x && x[1] == nearMap[i].y)) {
  collisions.push([nearMap[i].x,nearMap[i].y])
}
} else {
if(collisions.find(x=>x[0] == nearMap[i].x && x[1] == nearMap[i].y)) {
  collisions.splice(collisions.indexOf(collisions.find(x=>x[0] == nearMap[i].x && x[1] == nearMap[i].y)))
}
}
}
                last[0] = ((last[0] > 0 && collisions.find(x=>x[0] - pixelW/2 > playerCont.x && !collisions.find(y=>y != x && x[0] + pixelW/2 > playerCont.x && x[1] == y[1])))||(last[0] < 0 && collisions.find(x=>x[0] + pixelW/2 < playerCont.x && !collisions.find(y=>y != x && x[0] - pixelW/2 < playerCont.x && x[1] == y[1])))) ? 0 : last[0]
                last[1] = ((last[1] > 0 && collisions.find(x=>x[1] + pixelW/2 < playerCont.y && !collisions.find(y=>y != x && y[1] - pixelW/2 < playerCont.y && x[0] == y[0])))||(last[1] < 0 && collisions.find(x=>x[1] - pixelW/2 > playerCont.y && !collisions.find(y=>y != x && y[1] + pixelW/2 > playerCont.y && x[0] == y[0])))) ? 0 : last[1]
*/
if(Math.abs(playerCont.x) >= size * pixelW || Math.abs(playerCont.y) >= size * pixelW) {
    socket.emit('newRoom');
}
if(last.dir[0] != lastDir.dir[0] || last.dir[1] != lastDir.dir[1] || last.angle != lastDir.angle || last.boost != lastDir.boost) {
socket.emit("newDir",{dir:[last.dir[0] * last.boost, last.dir[1] * last.boost],angle:last.angle});
lastDir = last;
}},70);

function darkInScreen(alphaMust,delay) {
  var darkInAnimate = true;
  var alpha = 0;
  var time = 0;
var darkInInt = setInterval(() => {
  if(darkInAnimate) {
    alpha += alphaMust * (50 / delay / 1000);
    darkIn.alpha = alpha;
  if(alpha >= alphaMust) {
    darkInAnimate = false;
}
} else {
    alpha -= alphaMust * (50 / delay / 1000);
    darkIn.alpha = alpha;
        if(alpha <= 0) {
    darkIn.alpha = 0;
  clearInterval(darkInInt);
}
}
time += 50;
},50);
}

let delta = 0;
let last = Date.now();
let fps = 0;
 app.ticker.add(() => {
 delta = (Date.now()-last) / 1000;
 if(Math.abs(Math.floor(1000/(Date.now()-last)) - fps)>=20) {
fps = Math.floor(1000/(Date.now()-last))
fpsText.text = fps+" fps"
} 
 last = Date.now();
 var newPlayers = players;
 players.forEach(playerU => {
    if(playerU.user.dir != [0,0]) {
  if(playerU.user.id == id)  {
    if(playerU.user.dir) {
playerCont.x += playerU.user.dir[0]*pixelW*delta;
playerCont.y -= playerU.user.dir[1]*pixelW*delta;

playerU.user.x += playerU.user.dir[0]*pixelW*delta;
playerU.user.y -= playerU.user.dir[1]*pixelW*delta;

}
} else {
      if(playerU.user.dir) {
playerU.playerCont.x+=playerU.user.dir[0]*pixelW*delta;
playerU.playerCont.y-=playerU.user.dir[1]*pixelW*delta;

playerU.user.x += playerU.user.dir[0]*pixelW*delta;
playerU.user.y -= playerU.user.dir[1]*pixelW*delta;
}
}
}


if(playerU.user.id == id) {
   camera.x -= (playerCont.x + (camera.x - app.screen.width/2)) * delta * 10;
   camera.y -= (playerCont.y + (camera.y - app.screen.height/2)) * delta * 10;
  if(Math.abs(playerU.user.angle - playerCont.angle)>=2) {
    if(Math.abs(playerU.user.angle - playerCont.angle) > 180) {
      if(playerCont.angle<0) {
playerCont.angle -= Math.abs((360-playerU.user.angle + playerCont.angle) )/10;
  if(playerCont.angle < -180) {
  playerCont.angle += 360
}} else {
playerCont.angle += Math.abs((360+playerU.user.angle - playerCont.angle))/10;
  if(playerCont.angle > 180) {
  playerCont.angle -= 360
}
}
    } else {
    playerCont.angle += (playerU.user.angle - playerCont.angle)/10;
  }
  }
} else {
      if(playerU.user.dir) {
    if(Math.abs(playerU.user.angle - playerU.player.angle) >= 2) {
    if(Math.abs(playerU.user.angle - playerU.player.angle) > 180) {
      if(playerU.player.angle<0) {
playerU.player.angle -= Math.abs((360-playerU.user.angle + playerU.player.angle) )/10;
 if(playerU.player.angle < -180) {
  playerU.player.angle += 360
}
      } else {
playerU.player.angle += Math.abs((360+playerU.user.angle - playerU.player.angle))/10;
  if(playerU.player.angle > 180) {
  playerU.player.angle -= 360
}
}
    } else {
    playerU.player.angle += (playerU.user.angle - playerU.player.angle)/10;
  }
  }
}
}
})
if(Math.abs(touch.x - touchPos.x) > 1) {
    touch.x += (touchPos.x - touch.x)/5;
}
if(Math.abs(touch.y - touchPos.y) > 1) {
    touch.y += (touchPos.y - touch.y)/5;
}
playersCont.children.sort((a,b) => {
  return (a.position.y < b.position.y)?1:-1
})
armsPlanted.forEach(armPlanted => {
  if(armPlanted[0].x != armPlanted[1].x * pixelW || armPlanted[0].y != -armPlanted[1].y * pixelW ){
    armPlanted[0].x += (armPlanted[1].x * pixelW - armPlanted[0].x) * delta * 5
    armPlanted[0].y += (-armPlanted[1].y * pixelW - armPlanted[0].y) * delta * 5
    if(Math.pow(Math.abs(armPlanted[1].x  * pixelW - armPlanted[0].x),2) + Math.pow(Math.abs(-armPlanted[1].y * pixelW - armPlanted[0].y),2)  <= pixelW/10) {
      armPlanted[0].x = armPlanted[1].x * pixelW;
      armPlanted[0].y = -armPlanted[1].y * pixelW;
    }
  }
})

assets.forEach(asset => {
asset[0].x+=asset[1].dir[0]*pixelW*delta;
asset[0].y-=asset[1].dir[1]*pixelW*delta;
});

})
               var atk = PIXI.Sprite.from(app.loader.resources.atk.texture);
               atk.width = app.screen.width/4.2;
               atk.height = app.screen.width/4.2;
               atk.anchor.set(0.5);
               atk.x = app.screen.width - app.screen.width/4.8;
               atk.y = app.screen.height - app.screen.width/2.7;
               atk.interactive = true;
               moveControl.addChild(atk)
               atk.on("pointerdown",attack);

               function attack() {
                if(can_atk == true) {
                can_atk = false;
                      atk.alpha = 0.75;
                      atk.width *= 0.95;
                      atk.height *= 0.95;
                      socket.emit("attack",id);
                       setTimeout(()=>{
                        can_atk = true;
                         atk.alpha = 1;
                         atk.width *= (1/0.95);
                         atk.height *= (1/0.95);
                      },arms.find(x=>x.name == players.find(y=>y.user.id == id).user.arm).reload)
                    }}


                                   var atkSuper = PIXI.Sprite.from(app.loader.resources.super.texture);
               atkSuper.width = app.screen.width/6;
               atkSuper.height = app.screen.width/6;
               atkSuper.anchor.set(0.5);
               atkSuper.x = app.screen.width - app.screen.width/2.3;
               atkSuper.y = app.screen.height - app.screen.width/2.7;
               atkSuper.interactive = true;
               atkSuper.width = 0;
               moveControl.addChild(atkSuper)
               atkSuper.on("pointerdown",superAttack);

                    function superAttack() {
                if(can_superAttack == true) {
                can_superAttack = false;
                      atkSuper.alpha = 0.75;
                      atkSuper.width *= 0.95;
                      atkSuper.height *= 0.95;
                      socket.emit('useSuper',[dir,angle]);
                       setTimeout(()=>{
                        can_superAttack = true;
                         atkSuper.alpha = 1;
                         atkSuper.width *= (1/0.95);
                         atkSuper.height *= (1/0.95);
                      },arms.find(x=>x.name == players.find(y=>y.user.id == id).user.arm).reloadSuper)
                    }}

               socket.on("attacked",(data) => {
                if(data.id == id || players.find(x=>x.user.id == data.id)) {
                var playerAttacked = (data.id == id) ? [playerCont,armArray[0],playerCont.angle] : [players.find(x=>x.user.id == data.id).playerCont,players.find(x=>x.user.id == data.id).arm,players.find(x=>x.user.id == data.id).user.angle]
                var attacked = 0;

                         if(data.type == "Beat") {
               var atkeffectR = arms.find(x=>x.name == players.find(y=>y.user.id == data.id).user.arm).range
               var atkeffect = PIXI.Sprite.from(app.loader.resources.atkeffect.texture);
               atkeffect.height = (pixelW / atkeffect.width) * atkeffect.height
               atkeffect.width = pixelW * atkeffectR[0]
               atkeffect.anchor.set(0.5);
               atkeffect.tint = arms.find(x=>x.name == players.find(y=>y.user.id == data.id).user.arm).color;
               atkeffect.alpha = 0;
               atkeffect.x = Math.cos((playerAttacked[2]* Math.PI) / 180.0) * atkeffectR[0] * pixelW + playerAttacked[0].x;
               atkeffect.y = Math.sin((playerAttacked[2] * Math.PI) / 180.0) * pixelW * atkeffectR[0] + playerAttacked[0].y;
               atkeffect.angle = playerAttacked[2] + 50
               camera.addChild(atkeffect);

                                    var effectInt = setInterval(() => {
                        if(attacked == 0 && atkeffect.alpha < 0.4) {
                          atkeffect.alpha += 0.2
                        }
                        if(attacked == 1 && atkeffect.alpha > 0) {
                          atkeffect.alpha -= 0.1
                        }
                        if(attacked == 2) {
                          clearInterval(effectInt);
                          camera.removeChild(atkeffect)
                        }
                     },30)

                      var atkInt = setInterval(() => {
                        if(attacked == 0) {
                         playerAttacked[1].angle -= 40
                          if(playerAttacked[1].angle <=34) {
                            attacked = 1;
                          }
                        }
                                                if(attacked == 1) {
                          playerAttacked[1].angle += 10
                          if(playerAttacked[1].angle >= 95) {
                            attacked = 2
                            clearInterval(atkInt);
                          }
                        }
                      },30);
                  } else if(data.type == "Sword") {

                var atkeffect = PIXI.Sprite.from(app.loader.resources.straiteffect.texture);
               atkeffect.height = (pixelW / atkeffect.width) * atkeffect.height
               atkeffect.width = pixelW * 2
               atkeffect.anchor.set(0.5);
               atkeffect.tint = arms.find(x=>x.name == players.find(y=>y.user.id == data.id).user.arm).color;
               atkeffect.alpha = 0;
               atkeffect.x = -Math.cos((playerAttacked[2]* Math.PI) / 180.0) * pixelW / 2 + playerAttacked[0].x;
               atkeffect.y = -Math.sin((playerAttacked[2] * Math.PI) / 180.0) * pixelW / 2 + playerAttacked[0].y;
               atkeffect.angle = playerAttacked[2];
               camera.addChild(atkeffect);

                                                        var effectInt = setInterval(() => {
                        if(attacked == 0 && atkeffect.alpha < 0.5) {
                          atkeffect.alpha += 0.1
                        }
                        if(attacked == 1 && atkeffect.alpha > 0) {
                          atkeffect.alpha -= 0.1
                        }
                        if(attacked == 2) {
                          clearInterval(effectInt);
                          camera.removeChild(atkeffect)
                        }
                     },40)

                        var aIp = 0;

                     var atkInt = setInterval(() => {
                        if(attacked == 0) {
                        aIp -= 10;
                          if(aIp  <= -40) {
                            attacked = 1;
                          }
                        }
                                                if(attacked == 1) {
                          aIp  += 10
                          if(aIp  >= 40) {
                            attacked = 2
                            clearInterval(atkInt);
                          }
                        }
                      },40); 
                  } else if(data.type == "Bow") {
playerAttacked[1].texture = app.loader.resources[players.find(x=>x.user.id == data.id).user.arm+"_unload"].texture;
var atkInt = setInterval(() => {
                        if(attacked == 0) {
                         playerAttacked[1].angle -= 40
                          if(playerAttacked[1].angle <=34) {
                            attacked = 1;
                          }
                        }
                                                if(attacked == 1) {
                          playerAttacked[1].angle += 10
                          if(playerAttacked[1].angle >= 95) {
                            attacked = 2
                            clearInterval(atkInt);
                          }
                        }
                      },30);
setTimeout(()=>{if(players.find(x=>x.user.id == data.id)) {playerAttacked[1].texture = app.loader.resources[players.find(x=>x.user.id == data.id).user.arm].texture;}},arms.find(x=>x.name==players.find(x=>x.user.id == data.id).user.arm).reload);
                  } else {
                    if(data.type == "Zombi") {
                        var player = players.find(x=>x.user.id == data.id);
                        var attacked = 0;
                        var mob = mobs.find(x=>x.icon == player.user.icon);
                        var dirAttacked = [Math.cos((player.user.angle* Math.PI) / 180.0) * mob.atkLength * pixelW, Math.sin((player.user.angle* Math.PI) / 180.0) * mob.atkLength * pixelW];
                              var atkInt = setInterval(() => {
                        if(attacked == 0) {
                         player.player.x += dirAttacked[0]/10;
                         player.player.y += dirAttacked[1]/10;
                          if(Math.abs(player.player.x) >= Math.abs(dirAttacked[0]) && Math.abs(player.player.y) >= Math.abs(dirAttacked[1])) {
                            attacked = 1;
                          }
                        }
                                                if(attacked == 1) {
                          player.player.x -= dirAttacked[0]/10;
                          player.player.y -= dirAttacked[1]/10;
                          if(((dirAttacked[0] <= 0 && player.player.x >= 0) || (dirAttacked[0] >= 0 && player.player.x <= 0)) && ((dirAttacked[1] <= 0 && player.player.y >= 0) || (dirAttacked[1] >= 0 && player.player.y <= 0))) {
                            attacked = 2;
                            player.player.x = 0;
                            player.player.y = 0;
                            clearInterval(atkInt);
                          }
                        }
                      },10);
                    }
                    }
                                            if(data.dmgs.length >= 1) {
                            var needNewMap = false;
                          data.dmgs.forEach(obj => {
                            if(obj.type == 1 && players.find(x=>x.user.id == obj.id)) {
                            players.find(x=>x.user.id == obj.id).user.hp = obj.hp;
                            var index = players.indexOf(players.find(x=>x.user.id == obj.id));
                            var playerDmged = players[index]
                            if(obj.hp > 0) {
                            if(obj.id != id) {
                                if(obj.id[0] == "p") {
                    var heartsLife = Math.ceil(obj.hp / 16);
                    if(heartsLife > 0) {
                    for(var g = 0;g < playerDmged.hearts.length;g++) {
                          if(g == heartsLife - 1) {
                            playerDmged.hearts[g].alpha = 0.4 + 0.6 * (obj.hp - (heartsLife-1)*16) / 16;
                          }  else {
                            if(g < heartsLife) {
                              playerDmged.hearts[g].alpha = 1;
                            } else {
                            playerDmged.hearts[g].alpha = 0.4;
                        }
                          }
                    }
                  }
              }
                            playerDmged.player.alpha = 0.8
                            alphaPlayer(obj.id,1,200)
                            } else {
                    var heartsLife = Math.ceil(obj.hp / 10);
                    if(heartsLife > 0) {
                    for(var g = 0;g < userHpHearts.length;g++) {
                                                   if(g == heartsLife - 1) {
                            userHpHearts[g].alpha = 0.4 + 0.6 * (obj.hp - (heartsLife-1)*10) / 10;
                          }  else {
                            if(g < heartsLife) {
                              userHpHearts[g].alpha = 1;
                            } else {
                            userHpHearts[g].alpha = 0.4;
                        }
                          }
                    }
                  }
                            playerCont.alpha = 0.8
                            setTimeout(() => {
                              playerCont.alpha = 1
                            },200)
                            }
                        } else {
                            if(obj.id[0] == "m") {
                            playersCont.removeChild(playerDmged.playerCont);
                            players.splice(index,1);
                        }
                        }
                                                if(obj.assets) {
                          for(var i = 0;i<obj.assets.length;i++) {
                            if(obj.assets[i].type=="exp") {
                              if(obj.assets[i].id == id){
                                setExp(obj.assets[i].lvl,obj.assets[i].exp)
                              }
                            }
                          }
                        }
                          } else {
                           
                            if(obj.type == 2) {
                               var build = builds.find(x=>x[1].id == obj.id);
                               if(build!=undefined && build != null) {
                              if(obj.hp > 0) {
                              buildAtked(build[0],[build[0].x,build[0].y])
                            } else {
                              buildsSee.removeChild(build[0])
                              builds.splice(builds.indexOf(build),1)
                            }
                        }
                            } 
                          }
                          })
                        /*  if(needNewMap == true) {
                            for(var i = 0;i<mapSee.children.length;i++) {
    if(!map.find(x=>x==mapSee.children[i])) {
        mapSee.removeChild(mapSee.children[i])
    }
}
                           lastNearMap = [-999999,-999999]
                          } */
                        }
                    }
               })

               function alphaPlayer(idPlayer,alpha,delay) {
                            setTimeout(() => {
                                if(players.find(x=>x.user.id == idPlayer)) {
                              players[players.indexOf(players.find(x=>x.user.id == idPlayer))].player.alpha = alpha
                          }
                            },delay)
               }
                
                                              function buildAtked(block,posBuild) {
                                                var value = 0;
                                                var dirs = [-1,1];
                             var blockInterval = setInterval(() => {
                                                                 if(value < 10) {
                                  block.x = posBuild[0] + dirs[getRandom(0,1)];
                                  block.y = posBuild[1] + dirs[getRandom(0,1)];
                                  value += 1;
                                 } else {
                                  block.x = posBuild[0]
                                  block.y = posBuild[1]
                                  clearInterval(blockInterval)
                                 }
                               },40)
                              }

               let boost = 1;

               var run = PIXI.Sprite.from(app.loader.resources.run.texture);
               run.width = app.screen.width/6;
               run.height = app.screen.width/6;
               run.anchor.set(0.5);
               run.x = app.screen.width - app.screen.width/2.9;
               run.y = app.screen.height - app.screen.width/5.2;
               run.interactive = true;
               moveControl.addChild(run)

              run.on("pointerdown",function(e){
                run.alpha = 0.75;
                run.width *= 0.95;
                run.height *= 0.95;
                boost = 2;
                wait_dir.push({dir:dir,angle:radian* (180 / Math.PI),boost:2})
                   }); 

              run.on("pointerup",function(e){
                run.alpha = 1
                run.width *= (1/0.95);
                run.height *= (1/0.95);
                boost = 1;
                wait_dir.push({dir:dir,angle:radian* (180 / Math.PI),boost:1})
                   });

                   run.on("pointerupoutside",function(e){
                run.alpha = 1
                run.width *= (1/0.95);
                run.height *= (1/0.95);
                boost = 1;
                wait_dir.push({dir:dir,angle:radian* (180 / Math.PI),boost:1})
                   });  

               var take = PIXI.Sprite.from(app.loader.resources.take.texture);
               take.alpha = 0;
               take.height = (app.screen.width/5 / take.width) * take.height
               take.width = app.screen.width/5;
               take.anchor.set(0.5);
               take.x = app.screen.width - app.screen.width/2.9;
               take.y = app.screen.height - app.screen.width/1.8;
               take.interactive = true;
               moveControl.addChild(take);

               var taken = false;

               var nearestArmSee = PIXI.Sprite.from(app.loader.resources["pickaxe1"].texture);
               nearestArmSee.filters = [new PIXI.filters.OutlineFilter(1, 0x000000)];
               nearestArmSee.scale.set(0.2,0.2)
               nearestArmSee.x = -app.screen.width/20
               nearestArmSee.y = -app.screen.width/20
               nearestArmSee.angle = -45
               nearestArmSee.anchor.set(0.5);
               take.addChild(nearestArmSee);
               var nearestArmSeeName = "";
               var nearestArmSeeId = 0;

               setInterval(() => {
               var nearestArm = [];
                              armsPlanted.forEach(armPlanted => {
                                var how = Math.sqrt(Math.pow(Math.abs((armPlanted[1].x * pixelW - playerCont.x)),2) + Math.pow(Math.abs((-armPlanted[1].y*pixelW - playerCont.y)),2))
                                if(how <= pixelW && (how < nearestArm[1] || nearestArm.length == 0) && players.find(x=>x.user.id == id).user.arm != armPlanted[1].name) {
                                    nearestArm = [armPlanted[1].id,how];
                                }
                              })
                              var nearArm = armsPlanted.find(x=>x[1].id == nearestArm[0]);
                              if(nearArm != undefined) {
                                if(nearArm[1].id != nearestArmSeeId && armsPlanted.find(x=>x[1].id == nearestArmSeeId)) {
                                 armsPlanted.find(x=>x[1].id == nearestArmSeeId)[0].filters = [new PIXI.filters.OutlineFilter(0, 0xffffff)];
                                }
                                if(nearArm[1][0] != nearestArmSeeName) {
               nearestArmSee.texture = app.loader.resources[nearArm[1].name].texture;
               nearestArmSee.scale.set(arms.find(x=>x.name==nearArm[1].name).scale,arms.find(x=>x.name==nearArm[1].name).scale);
               nearestArmSeeName = nearArm[1].name
               nearestArmSeeId = nearArm[1].id
               take.alpha = (players.find(x=>x.user.id == id).user.arm != nearestArmSeeName) ? 1 : 0.75;
               nearArm[0].filters = [new PIXI.filters.OutlineFilter(2, 0xffffff)];
                                }
                              } else {
                                if(take.alpha != 0) {
                                take.alpha = 0;
                                 if(armsPlanted.find(x=>x[1].id == nearestArmSeeId)) {
                                 armsPlanted.find(x=>x[1].id == nearestArmSeeId)[0].filters = [new PIXI.filters.OutlineFilter(0, 0xffffff)];
                                }
                            }
                              } 

                    for(var i = 0;i<builds.length;i++) {
                        var build = builds[i][1];
                        if(build.name == "MineHole") {
                              var buildRange00 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - playerCont.x)),2) + Math.pow(Math.abs((build.y - (build.size/2) - playerCont.y)),2));
               var buildRange01 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - playerCont.x)),2) + Math.pow(Math.abs((build.y - playerCont.y)),2));
               var buildRange02 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - playerCont.x)),2) + Math.pow(Math.abs((build.y + (build.size/2) - playerCont.y)),2));
               var buildRange10 = Math.sqrt(Math.pow(Math.abs((build.x - playerCont.x)),2) + Math.pow(Math.abs((build.y - (build.size/2) - playerCont.y)),2));
               var buildRange11 = Math.sqrt(Math.pow(Math.abs((build.x - playerCont.x)),2) + Math.pow(Math.abs((build.y - playerCont.y)),2));
               var buildRange12 = Math.sqrt(Math.pow(Math.abs((build.x - playerCont.x)),2) + Math.pow(Math.abs((build.y + (build.size/2) - playerCont.y)),2));
               var buildRange20 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - playerCont.x)),2) + Math.pow(Math.abs((build.y - (build.size/2) - playerCont.y)),2));
               var buildRange21 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - playerCont.x)),2) + Math.pow(Math.abs((build.y - playerCont.y)),2));
               var buildRange22 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - playerCont.x)),2) + Math.pow(Math.abs((build.y + (build.size/2) - playerCont.y)),2));

               if(buildRange00 <= pixelW || buildRange01 <= pixelW || buildRange02 <= pixelW || buildRange10 <= pixelW || buildRange11 <= build.size/2*pixelW || buildRange12 <= pixelW || buildRange20 <= pixelW || buildRange21 <= pixelW || buildRange22 <= pixelW) {
                socket.emit("GoHole",build.id);
                   }
               }
               }
                            },200)

                             take.on("pointerdown",takeArm); 
                             function takeArm() {
                              if(taken == false && armsPlanted.find(x=>x[1].id == nearestArmSeeId) && players.find(x=>x.user.id == id).user.arm != nearestArmSeeName) {
                      socket.emit("takeArm",nearestArmSeeId);
                                taken = true;
                take.alpha = 0.75;
                take.width *= 0.95;
                take.height *= 0.95;
                setTimeout(() => {
                take.width *= (1/0.95);
                take.height *= (1/0.95);
                taken = false},200)
              }
                   }

               var joy = PIXI.Sprite.from(app.loader.resources.joy.texture);
               joy.width = app.screen.width/3.6;
               joy.height = app.screen.width/3.6;
               joy.anchor.set(0.5);
               joy.x = app.screen.width/4.8;
               joy.y = app.screen.height-app.screen.width/3.5;
               moveControl.addChild(joy);

               var touch = PIXI.Sprite.from(app.loader.resources.touch.texture);
               touch.anchor.set(0.5);
               touch.interactive = true;
               touch.width = joy.width/1.8
               touch.height = joy.width/1.8
               touch.x = app.screen.width/4.8;
               touch.y = app.screen.height-app.screen.width/3.5;
               moveControl.addChild(touch);

               touch.on("pointerdown",function(e){
                if(move_mode == false) {
                  moveId = e.data.pointerId;
                  touch.width = joy.width/1.6
               touch.height = joy.width/1.6
                move_mode = true;
                      getDir({x:e.data.global.x - joy.x, y:e.data.global.y - joy.y});
                    }
                   });

                      touch.on("pointerup",function(e){
                      dir = [0,0]
                      move_mode = false;
                      touch.width = joy.width/1.8
                      touch.height = joy.width/1.8
                              touchPos = {x:app.screen.width/4.8,y:app.screen.height-app.screen.width/3.5}
                       wait_dir.push({dir:dir,angle:radian* (180 / Math.PI),boost:boost})
                   });

                             touch.on("pointerupoutside",function(e){
                                dir = [0,0]
                      move_mode = false;
                           touch.width = joy.width/1.8
               touch.height = joy.width/1.8
                              touchPos = {x:app.screen.width/4.8,y:app.screen.height-app.screen.width/3.5}
                       wait_dir.push({dir:dir,angle:radian* (180 / Math.PI),boost:boost})
                   });

                         touch.on("pointermove",function(e){
                            if(move_mode == true&&e.data.pointerId == moveId) {
getDir({x:e.data.global.x - joy.x, y:e.data.global.y - joy.y});
}
                   });


                         socket.on("newDir",(data)=>{
                            var player = players.find(x=>x.user.id === data.id);
                          if(player) {
                         if(data.id == id) {  
                         if(Math.abs((data.x* pixelW - playerCont.x)) >= pixelW /2 || Math.abs((-data.y * pixelW - playerCont.y)) >= pixelW /2 || data.tp) {   
                          playerCont.x = data.x*pixelW
                          playerCont.y = -data.y*pixelW

                          player.user.x = data.x*pixelW
                          player.user.y = -data.y*pixelW
                          }
                          players.find(x=>x.user.id===data.id).user.dir = data.dir;
                          players.find(x=>x.user.id===data.id).user.angle = data.angle;
                          if(data.tp) {
                            playerCont.angle = data.angle;
                          }
                          //collisions = []
                        } else {
                              var enemy = players[players.indexOf(players.find(x=>x.user.id == data.id))];
                              if(Math.abs((data.x * pixelW - enemy.playerCont.x)) >= pixelW /2 || Math.abs((-data.y * pixelW -  enemy.playerCont.y)) >= pixelW /2 || data.tp) {
                               enemy.playerCont.x = data.x * pixelW;
                               enemy.playerCont.y = -data.y * pixelW;

                               player.user.x = data.x*pixelW
                               player.user.y = -data.y*pixelW
                              }
                               enemy.user.dir = data.dir;
                               enemy.user.angle = data.angle;
                               if(data.tp) {
                            enemy.player.angle = data.angle;
                          }
                        }}
                         })

socket.on("exit",(data)=>{
  if(data != id && players.find(x=>x.user.id === data)) {
     var index;
    for(var i = 0;i<players.length;i++) {
        if(players[i].user.id == data) {
            index = i;
            break;
        }
    }
    playersCont.removeChild(players[index].playerCont);
    players.splice(index,1);
  }
  })
                        }

    function getRandom(min,max) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }
