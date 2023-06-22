const PORT = process.env.PORT || 5000;
import { createServer } from "http";
import { Server } from 'socket.io';


const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

httpServer.listen(PORT);
console.log("Server: "+PORT)

var intervals = [];
/* var players = [
[ //floor_1
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[]
],
[ //floor_2
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[]
]
];

var armsPlanted = [
[ //floor_1
[],[{name:"sword2",x:1,y:0,id:1,angle:0}],[],[],[],
[],[{name:"sword5",x:1,y:0,id:2,angle:0}],[{name:"sword7",x:1,y:0,id:3,angle:0}],[],[],
[],[],[{name:"sword10",x:0,y:0,id:4,angle:0},{name:"bow1",x:1,y:0,id:5,angle:0}],[],[],
[{name:"sword9",x:1,y:0,id:6,angle:0}],[],[],[],[],
[],[],[],[{name:"sword10",x:1,y:0,id:7,angle:0}],[]
],
[ //floor_2
[],[],[],[],[],
[],[],[],[],[],
[],[],[{name:"sword5",x:-1,y:0,id:8,angle:0}],[],[],
[],[],[],[],[],
[],[],[],[],[]
]
];

var assets = [
[ //floor_1
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[]
],
[ //floor_2
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[]
]
];

var builds = [
[ //floor_1
[],[],[],[],[],
[],[],[],[],[],
[],[],[{id:1,x:0.5,y:0.5,size:1,name:"ArmBlock",hp:200,atkable:true}],[{id:2,x:1,y:1,size:2,name:"MineBlock",hp:100,atkable:true}],[],
[],[],[],[],[],
[],[],[],[],[]
],
[ //floor_2
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[],
[],[],[],[],[]
]
];

var map = [
    [ //floor_1
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:8},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4}
    ],
        [ //floor_2
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4},
    {size:3},{size:4},{size:2},{size:3},{size:4}
    ]
]; */

var players= [];
var armsPlanted = [];
var builds = [];
var map = [];
var assets = [];


var serverData = {
    idPlayers: 0,
    idArms:0,
    idMobs:0,
    idBuilds:0,
    idAssets:0
}

const arms = [
{name:"pickaxe1",class:"A",dmg:5,reload:500,range:[1,0.6],color:0xffffff},
{name:"sword1",class:"F",dmg:10,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword2",class:"B",dmg:12,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword3",class:"A",dmg:15,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword4",class:"F",dmg:15,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword5",class:"B",dmg:17,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword6",class:"A",dmg:20,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword7",class:"F",dmg:20,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword8",class:"B",dmg:22,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword9",class:"A",dmg:25,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xffffff},
{name:"sword10",class:"F",dmg:30,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xCD61D6},
{name:"sword11",class:"B",dmg:35,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xCD61D6},
{name:"sword12",class:"A",dmg:40,reload:300,range:[1,0.5],super:"Sword",reloadSuper:3000,color:0xCD61D6},
{name:"bow1",class:"F",dmg:15,reload:1000,super:"Bow",reloadSuper:7000},
{name:"bow2",class:"B",dmg:25,reload:1000,super:"Bow",reloadSuper:7000},
{name:"bow3",class:"A",dmg:35,reload:1000,super:"Bow",reloadSuper:7000},

{name:"ore1",class:"F",type:1,boost:10}
];

const buildsInfo = [{
    id:1,
    name:"ArmBlock_1",
    hp:120,
    size:1.5
},
{
    id:2,
    name:"ArmBlock_2",
    hp:160,
    size:1.5
},
{
    id:3,
    name:"ArmBlock_3",
    hp:220,
    size:1.5
},
{
    id:4,
    name:"ArmBlock_4",
    hp:280,
    size:1.5
},
{
    id:5,
    name:"ArmBlock_5",
    hp:340,
    size:1.5
}]

const mobs = [{
    id:1,
    icon:"mob_red_1",
    type:"Zombi",
    hp:80,
    dmg:10,
    see:3.5,
    speed:1.6,
    reload:2000,
    seeAtk:1.2,
    seeAtked:0.8,
    arm:"",
    exp:5
},
{
    id:2,
    icon:"mob_red_2",
    type:"Zombi",
    hp:90,
    dmg:15,
    see:3.5,
    speed:1.6,
    reload:2000,
    seeAtk:1.2,
    seeAtked:0.8,
    arm:"",
    exp:5
},
{
    id:3,
    icon:"mob_red_3",
    type:"Zombi",
    hp:100,
    dmg:20,
    see:3.5,
    speed:1.6,
    reload:2000,
    seeAtk:1.2,
    seeAtked:0.8,
    arm:"",
    exp:5
},
{
    id:4,
    icon:"mob_red_4",
    type:"Zombi",
    hp:120,
    dmg:20,
    see:3.5,
    speed:1.6,
    reload:2000,
    seeAtk:1.2,
    seeAtked:0.8,
    arm:"",
    exp:5
},
{
    id:5,
    icon:"mob_red_5",
    type:"Zombi",
    hp:150,
    dmg:25,
    see:3.5,
    speed:1.6,
    reload:2000,
    seeAtk:1.2,
    seeAtked:0.8,
    arm:"",
    exp:5
},
{
    id:6,
    icon:"mob_blue_1",
    type:"Archer",
    hp:30,
    see:4.5,
    speed:1.2,
    reload:4200,
    seeAtk:4,
    arm:"bow1",
    exp:5
},
{
    id:7,
    icon:"mob_blue_2",
    type:"Archer",
    hp:40,
    see:4.5,
    speed:1.2,
    reload:4000,
    seeAtk:4,
    arm:"bow1",
    exp:5
},
{
    id:8,
    icon:"mob_blue_3",
    type:"Archer",
    hp:50,
    see:4.5,
    speed:1.2,
    reload:4000,
    seeAtk:4,
    arm:"bow2",
    exp:5
},
{
    id:9,
    icon:"mob_blue_4",
    type:"Archer",
    hp:60,
    see:4.5,
    speed:1.2,
    reload:4000,
    seeAtk:4,
    arm:"bow2",
    exp:5
},
{
    id:10,
    icon:"mob_blue_5",
    type:"Archer",
    hp:70,
    see:4.5,
    speed:1.2,
    reload:4000,
    seeAtk:4,
    arm:"bow3",
    exp:5
}]

const expNeed = [10,20,30,40,50];

const names = [['BulyP',1],['Eltys',2],['MaxuinPloh',3],['MiturSky',4]];

generate();

async function spawnMob(x,y,floor,room,mobId) {
    var pos = [x,y]
    var idInt = serverData.idMobs + 1;
    serverData.idMobs += 1;
    var id = "m" + idInt;
    var mob = mobs.find(x=>x.id == mobId);
    var user = {id:id,idInt:idInt,icon:mob.icon,x:pos[0],y:pos[1],dir:[0,0],arm:mob.arm,angle:0,hp:mob.hp,maxHp:mob.hp,type:mob.type,lastDir:Date.now(),lastAtk:Date.now(),room:room,floor:floor,team:"Mobs",type:mob.type};
    players[floor-1][room-1].push(user);
    intervals.push([user.id,[0,0],setInterval(async ()=>{ 
       var player = players[floor-1][room-1].find(x=>x.id == user.id);
       if(player) {
       var xy = [player.x+player.dir[0]*((Date.now()-player.lastDir)/1000),player.y+player.dir[1]*((Date.now()-player.lastDir)/1000)];
       var enemy = players[player.floor-1][player.room-1].find(x=>x.id[0] == "p" && x.floor == player.floor && x.room == player.room && Math.sqrt(Math.pow(Math.abs(x.x - player.x),2) + Math.pow(Math.abs(x.y - player.y),2)) <= mob.see);
       if(enemy) {
       var newDir = {x:enemy.x - player.x,y:enemy.y - player.y}
       var radian = Math.atan2(newDir.y,newDir.x);
       player.angle = (newDir.x == 0 && newDir.y == 0) ? player.angle : -radian * (180 / Math.PI);
       if(mob.type=="Zombi") {
       player.dir = (newDir.x == 0 && newDir.y == 0) ?  [0,0] : [Math.floor(Math.cos(radian)*100)/100 *mob.speed,Math.floor(Math.sin(radian)*100)/100 * mob.speed];
       var playerX = (player.x+player.dir[0]*((Date.now()+200-player.lastDir)/1000));
       var playerY = (player.y+player.dir[1]*((Date.now()+200-player.lastDir)/1000));
       var enemyX = (enemy.x+enemy.dir[0]*((Date.now()+300-enemy.lastDir)/1000));
       var enemyY = (enemy.y+enemy.dir[1]*((Date.now()+300-enemy.lastDir)/1000));
       if(Date.now() - player.lastAtk >= mob.reload && Math.sqrt(Math.pow(Math.abs(enemy.x - player.x),2) + Math.pow(Math.abs(enemy.y - player.y),2)) <= mob.seeAtk) {
        if(Math.sqrt(Math.pow(Math.abs(enemyX - playerX),2) + Math.pow(Math.abs(enemyX - playerX),2)) <= mob.seeAtked) {
        player.lastAtk = Date.now();
        enemy.hp -= mob.dmg;
        if(enemy.hp <= 0) {
        var editPlayer = await Death(enemy,0);
        if(player.room!=editPlayer.room||player.floor!=editPlayer.floor){io.sockets.to(editPlayer.floor+'_'+editPlayer.room).to(editPlayer.floor+'_'+editPlayer.room).emit("editPlayer",editPlayer);}
        io.sockets.to(player.floor+'_'+player.room).to(editPlayer.floor+'_'+editPlayer.room).emit("editPlayer",editPlayer);
        } else {
        io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:player.id,type:mob.type,dmgs:[{id:enemy.id,hp:enemy.hp,type:1}]})
        io.sockets.to(player.floor+'_'+player.room).emit("editPlayer",{id:enemy.id,hp:enemy.hp})
    }
} else {
player.lastAtk = Date.now();
io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:player.id,type:player.type,dmgs:[]})
}
       }
   } else if(mob.type == "Archer") {
    if(Math.sqrt(Math.pow(Math.abs(enemy.x - player.x),2) + Math.pow(Math.abs(enemy.y - player.y),2)) <= mob.seeAtk) {
        var enemyX = (enemy.x+enemy.dir[0]*((Date.now()-enemy.lastDir)/1000));
       var enemyY = (enemy.y+enemy.dir[1]*((Date.now()-enemy.lastDir)/1000));
        player.dir = [0,0];
        var radian = Math.atan2(enemyY-player.y,enemyX-player.x);
        player.angle =  -radian * (180 / Math.PI);
    if(Date.now() - player.lastAtk >= mob.reload) {
            serverData.idAssets += 1;
            var newArraw = {ownerId:id,id:serverData.idAssets,name:"arraw",x:xy[0],y:xy[1],angle:player.angle,dir:[Math.cos((player.angle* Math.PI) / 180.0) * 10,-Math.sin((player.angle* Math.PI) / 180.0) * 10]}
            newAsset(newArraw,player);
            player.lastAtk = Date.now();
            io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:player.id,type:"Bow",dmgs:[]});
        }
    } else {
        player.dir = [Math.floor(Math.cos(radian)*100)/100 *mob.speed,Math.floor(Math.sin(radian)*100)/100 * mob.speed];
    }
   }
   } else {
     if(players[floor-1][room-1].find(x=>x.id[0] == "p"  && x.floor == player.floor && x.room == player.room)) {
        var newdir = player.dir;
        if(newdir[0] == 0 && newdir[1] == 0) {
          if(getRandom(1,5) == 1) {
                newdir = (Math.abs(player.x) > 5 && Math.abs(player.y) > 5) ? [getMobDir(-player.x/Math.abs(player.x)),getMobDir(-player.y/Math.abs(player.y))] : (Math.abs(player.x) > 5) ? [getMobDir(-player.x/Math.abs(player.x)),getRandom(-1,1)] : (Math.abs(player.y) > 5) ? [getRandom(-1,1), getMobDir(-player.y/Math.abs(player.y))] : [getRandom(-1,1),getRandom(-1,1)]
            }
        } else {
        if(Math.abs(player.x) > map[floor-1][room-1].size-1 || Math.abs(player.y) > map[floor-1][room-1].size-map[floor-1][room-1].size-1) {
                newdir = (Math.abs(player.x) > map[floor-1][room-1].size-1 && Math.abs(player.y) > map[floor-1][room-1].size-1) ? [getMobDir(-player.x/Math.abs(player.x)),getMobDir(-player.y/Math.abs(player.y))] : (Math.abs(player.x) > map[floor-1][room-1].size-1) ? [getMobDir(-player.x/Math.abs(player.x)),getRandom(-1,1)] : (Math.abs(player.y) > map[floor-1][room-1].size-1) ? [getRandom(-1,1), getMobDir(-player.y/Math.abs(player.y))] : [getRandom(-1,1),getRandom(-1,1)]
                
        } else {
            if(getRandom(1,10) == 1) {
                newdir = [0,0];
            }
        }
    }
        var radian = Math.atan2(newdir[1],newdir[0]);
        player.angle = (newdir[0] == 0 && newdir[1] == 0) ? player.angle : -radian * (180 / Math.PI);
        player.dir = (newdir[0] == 0 && newdir[1] == 0) ?  [0,0] : [Math.floor(Math.cos(radian)*100)/100 *mob.speed,Math.floor(Math.sin(radian)*100)/100 *mob.speed];
     } else {
        player.dir = [0,0]
     }
   }
       player.x = xy[0];
       player.y = xy[1]
       player.lastDir = Date.now();
       var inter = intervals.find(x=>x[0] == player.id);
       if(inter && (inter[1][0] != player.dir[0] || inter[1][1] != player.dir[1] || inter[1][2] != player.angle)) {
       io.sockets.to(player.floor+'_'+player.room).emit("newDir",{id:player.id,x:xy[0],y:xy[1],dir:player.dir,angle:player.angle});
       intervals.find(x=>x[0] == player.id)[1] = [player.dir,player.angle]
   }
}
    },200)])
    io.sockets.to(user.floor+'_'+user.room).emit("newLog",user);
}

async function Death(player,killerID) {
    var enemy = players[player.floor-1][player.room-1].find(x=>x.id == player.id);
    if(enemy.hp <= 0) {
                        if(enemy.id[0] == "p") {
                    var xy = [enemy.x+enemy.dir[0]*((Date.now()-enemy.lastDir)/1000),enemy.y+enemy.dir[1]*((Date.now()-enemy.lastDir)/1000)];
                    if(player.arm!="pickaxe1"){armsPlanted[player.floor-1][player.room-1].push({name:enemy.arm,x:xy[0],y:xy[1],id:enemy.armId,angle:enemy.angle + 90});}
                    io.sockets.sockets.get(enemy.socketId).leave(enemy.floor+'_'+enemy.room)
                    io.sockets.to(enemy.floor+'_'+enemy.room).emit("spawnArm",{name:enemy.arm,x:xy[0],y:xy[1],id:enemy.armId,angle:enemy.angle + 90})
                    //var pos = [getRandom(0,1)*15+7,-(getRandom(0,1)*15+7)];)
                    var pos = [0,0];
                    var armId = serverData.idArms + 1;
                    serverData.idArms += 1;
                    var enemyExp = enemy.exp; for(var i = 0;i<enemy.lvl-1;i++) {enemyExp += expNeed[i];}
                    var lostExp = Math.floor(enemyExp * 0.5);
                    if(killerID[0] == "p") {var killer = players[player.floor-1][player.room-1].find(x=>x.id == killerID);if(killer) {var newLvlKiller = await getLvl(killer.lvl,killer.exp+enemyExp * 0.25);killer.lvl = newLvlKiller.lvl; killer.exp = newLvlKiller.exp;}};
                    var newLvl = await getLvl(1,enemyExp - lostExp);
                    var newenemy = {id:enemy.id,icon:enemy.icon,socketId:enemy.socketId,idInt:enemy.idInt,name:enemy.name,x:pos[0],y:pos[1],dir:[0,0],angle:0,hp:100,maxHp:100,lastDir:Date.now(),lastAtk:Date.now(),lastSuperAtk:Date.now(),arm:"pickaxe1",art:enemy.art,armId:armId,room:13,floor:1,lvl:newLvl.lvl,exp:newLvl.exp,team:"None"};
                    players[player.floor-1][player.room-1].splice(players[player.floor-1][player.room-1].indexOf(enemy),1);
                    players[newenemy.floor-1][newenemy.room-1].push(newenemy)
                    io.sockets.sockets.get(newenemy.socketId).join(newenemy.floor+'_'+newenemy.room)
                    io.to(newenemy.socketId).emit("log",{id:newenemy.id,players:players[0][12],sizeMap:map[0][12].size,armsPlanted:armsPlanted[0][12],builds:builds[0][12],assets:assets[0][12]});
                    return newenemy;
                } else {
                    var inter = intervals.find(x=>x[0] == enemy.id);
                    if(inter) {
                    clearInterval(inter[2])
                    intervals.splice(intervals.indexOf(inter),1);
                    if(enemy.type=="Archer" && getRandom(1,100) <= 15) {
                    var armId = serverData.idArms + 1;
                    serverData.idArms += 1;
                    var xy = [enemy.x+enemy.dir[0]*((Date.now()-enemy.lastDir)/1000),enemy.y+enemy.dir[1]*((Date.now()-enemy.lastDir)/1000)];
                    armsPlanted[player.floor-1][player.room-1].push({name:enemy.arm,x:xy[0],y:xy[1],id:armId,angle:enemy.angle});
                    io.sockets.to(enemy.floor+'_'+enemy.room).emit("spawnArm",{name:enemy.arm,x:xy[0],y:xy[1],id:armId,angle:enemy.angle})
                }
                    players[player.floor-1][player.room-1].splice(players[player.floor-1][player.room-1].indexOf(enemy),1)
                    return {id:"m"};
                }
                }
            }
}

async function getLvl(lvl,exp) {
    var nowExp = exp;
    var nowLvl = lvl;
 while(nowExp >= expNeed[nowLvl-1]) {nowExp -= expNeed[nowLvl-1]; nowLvl += 1;}
 return {lvl:nowLvl,exp:nowExp};
}

io.on('connection',(socket)=> {
    var id;
    var isUpdating = false;
    
socket.on("auth",async () => {
    //var pos = [getRandom(0,1)*15+7,-(getRandom(0,1)*15+7)];
    var pos = [0,0]
    var idInt = serverData.idPlayers + 1
    serverData.idPlayers += 1;
    id = "p" + idInt;
    var name = names[getRandom(0,3)];
    var armId = serverData.idArms + 1;
    serverData.idArms += 1;
    var player = {id:id,socketId:socket.id,idInt:idInt,icon:"player_"+name[1],name:name[0],x:pos[0],y:pos[1],dir:[0,0],angle:0,hp:100,maxHp:100,lastDir:Date.now(),lastAtk:Date.now(),lastSuperAtk:Date.now(),arm:"pickaxe1",art:"ore1",room:13,floor:1,armId:armId,lvl:1,exp:0,team:"None"};
    players[0][12].push(player);
    socket.join(player.floor+'_'+player.room)
    socket.emit("log",{id:id,players:players[0][12],sizeMap:map[0][12].size,armsPlanted:armsPlanted[0][12],builds:builds[0][12],assets:assets[0][12]});
    io.sockets.to(player.floor+'_'+player.room).emit("newLog",player);
    socket.on("disconnect",async () => {
    var player = await findPlayer(id);
    var index = players[player.floor-1][player.room-1].indexOf(player); 
   if(player.arm != "pickaxe1") {
    var xy = [player.x+player.dir[0]*((Date.now()-player.lastDir)/1000),player.y+player.dir[1]*((Date.now()-player.lastDir)/1000)];
    armsPlanted[player.floor-1][player.room-1].push({name:player.arm,x:xy[0],y:xy[1],id:player.armId,angle:player.angle + 90});
    io.sockets.to(player.floor+'_'+player.room).emit("spawnArm",{name:player.arm,x:xy[0],y:xy[1],id:player.armId,player:player.angle + 90})
    } 
    socket.leave(player.floor+'_'+player.room)
    io.sockets.to(player.floor+'_'+player.room).emit("exit",id);  
    players[player.floor-1][player.room-1].splice(index,1);
});
});

socket.on('newRoom',newRoom);
async function newRoom(){
            var player = await findPlayer(id)
        if(player != undefined && isUpdating == false) {
            isUpdating = true;
            var playerX = (player.x+player.dir[0]*((Date.now()-player.lastDir)/1000));
            var playerY = (player.y+player.dir[1]*((Date.now()-player.lastDir)/1000));
            var allEnd = false;
            if(playerX >= map[player.floor-1][player.room-1].size) {
                var room = (player.room % 5 == 0) ? player.room - 4 : player.room+1
                await updatePlayer(id,player.floor,room,-map[player.floor-1][room-1].size + 0.3,0);
               socket.emit("log",{id:id,players:players[player.floor-1][room-1],sizeMap:map[player.floor-1][room-1].size,armsPlanted:armsPlanted[player.floor-1][room-1],builds:builds[player.floor-1][room-1],assets:assets[player.floor-1][room-1]});
               isUpdating = false;
               allEnd = true;
            }
            if(playerX <= -map[player.floor-1][player.room-1].size) {
                var room = ((player.room-1) % 5 == 0) ? player.room + 4 : player.room-1
                          await updatePlayer(id,player.floor,room,map[player.floor-1][room-1].size - 0.3,0);
               socket.emit("log",{id:id,players:players[player.floor-1][room-1],sizeMap:map[player.floor-1][room-1].size,armsPlanted:armsPlanted[player.floor-1][room-1],builds:builds[player.floor-1][room-1],assets:assets[player.floor-1][room-1]});
               isUpdating = false;
               allEnd = true;
            }
            if(playerY >= map[player.floor-1][player.room-1].size) {
                 var room = (player.room <= 5) ? player.room + 20 : player.room - 5
                         await updatePlayer(id,player.floor,room,0,-map[player.floor-1][room-1].size + 0.3);
               socket.emit("log",{id:id,players:players[player.floor-1][room-1],sizeMap:map[player.floor-1][room-1].size,armsPlanted:armsPlanted[player.floor-1][room-1],builds:builds[player.floor-1][room-1],assets:assets[player.floor-1][room-1]});
               isUpdating = false;
               allEnd = true;
            }
            if(playerY <= -map[player.floor-1][player.room-1].size) {
                var room = (player.room >= 21) ? player.room - 20 : player.room + 5
                         await updatePlayer(id,player.floor,room,0,map[player.floor-1][room-1].size - 0.3);
               socket.emit("log",{id:id,players:players[player.floor-1][room-1],sizeMap:map[player.floor-1][room-1].size,armsPlanted:armsPlanted[player.floor-1][room-1],builds:builds[player.floor-1][room-1],assets:assets[player.floor-1][room-1]});
               isUpdating = false;
               allEnd = true;
            }
            if(allEnd == false) {
                isUpdating = false
            }
        }
}

socket.on("attack",async ()=>{
        var player = await findPlayer(id)
        if(player != undefined) {
                    var arm = arms.find(x=>x.name == player.arm);
            if(Date.now() - player.lastAtk >= arm.reload) {
            player.lastAtk = Date.now();
            if(arm.super != "Bow") {
            var atkX = Math.cos((player.angle* Math.PI) / 180.0) * arm.range[0];
            var atkY = -Math.sin((player.angle* Math.PI) / 180.0) * arm.range[0];
            attack(arm,atkX,atkY,arm.range[1],"Beat");
        } else {
            serverData.idAssets += 1;
             var playerX = (player.x+player.dir[0]*((Date.now()-player.lastDir)/1000));
            var playerY = (player.y+player.dir[1]*((Date.now()-player.lastDir)/1000));
            var newArraw = {ownerId:id,id:serverData.idAssets,name:"arraw",x:playerX,y:playerY,angle:player.angle,dir:[Math.cos((player.angle* Math.PI) / 180.0) * 10,-Math.sin((player.angle* Math.PI) / 180.0) * 10]}
            newAsset(newArraw,player);
            player.lastAtk = Date.now();
            io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:player.id,type:"Bow",dmgs:[]})
        }
        }
    }
})

socket.on("GoHole",async (buildId) => {
    var player = await findPlayer(id)
        if(player != undefined && builds[player.floor-1][player.room-1].find(x=>x.id == buildId)) {
           var build = builds[player.floor-1][player.room-1].find(x=>x.id == buildId);
           if(build.name == "MineHole") {
           var playerX = (player.x+player.dir[0]*((Date.now()-player.lastDir)/1000));
           var playerY = (player.y+player.dir[1]*((Date.now()-player.lastDir)/1000));
                          var buildRange00 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - playerX)),2) + Math.pow(Math.abs((build.y - (build.size/2) - playerY)),2));
               var buildRange01 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - playerX)),2) + Math.pow(Math.abs((build.y - playerY)),2));
               var buildRange02 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - playerX)),2) + Math.pow(Math.abs((build.y + (build.size/2) - playerY)),2));
               var buildRange10 = Math.sqrt(Math.pow(Math.abs((build.x - playerX)),2) + Math.pow(Math.abs((build.y - (build.size/2) - playerY)),2));
               var buildRange11 = Math.sqrt(Math.pow(Math.abs((build.x - playerX)),2) + Math.pow(Math.abs((build.y - playerY)),2));
               var buildRange12 = Math.sqrt(Math.pow(Math.abs((build.x - playerX)),2) + Math.pow(Math.abs((build.y + (build.size/2) - playerY)),2));
               var buildRange20 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - playerX)),2) + Math.pow(Math.abs((build.y - (build.size/2) - playerY)),2));
               var buildRange21 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - playerX)),2) + Math.pow(Math.abs((build.y - playerY)),2));
               var buildRange22 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - playerX)),2) + Math.pow(Math.abs((build.y + (build.size/2) - playerY)),2));
               if(buildRange00 <= 1 || buildRange01 <= 1 || buildRange02 <= 1 || buildRange10 <= 1 || buildRange11 <= build.size || buildRange12 <= 1 || buildRange20 <= 1 || buildRange21 <= 1 ||  buildRange22 <= 1) {
                  await updatePlayer(id,player.floor+1,player.room,playerX,playerY);
               socket.emit("log",{id:id,players:players[player.floor-1][player.room-1],sizeMap:map[player.floor-1][player.room-1].size,armsPlanted:armsPlanted[player.floor-1][player.room-1],builds:builds[player.floor-1][player.room-1],assets:assets[player.floor-1][player.room-1]});
               }
           }
        }
})

async function attack(arm,atkX,atkY,atkRad,type) {
    var dmgs = [];
    var editPlayers = [];
            var player = await findPlayer(id);
            var playerX = (player.x+player.dir[0]*((Date.now()-player.lastDir)/1000));
            var playerY = (player.y+player.dir[1]*((Date.now()-player.lastDir)/1000));
            for(var i = 0;i<players[player.floor-1][player.room-1].length;i++) {
                var enemy = players[player.floor-1][player.room-1][i];
                if(enemy.id != id) {
                var enemyX = (enemy.x+enemy.dir[0]*((Date.now()-enemy.lastDir)/1000));
                var enemyY = (enemy.y+enemy.dir[1]*((Date.now()-enemy.lastDir)/1000));
               var enemyRange00 = Math.sqrt(Math.pow(Math.abs((enemyX - 0.5 - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY - 0.5 - (playerY + atkY))),2));
               var enemyRange01 = Math.sqrt(Math.pow(Math.abs((enemyX - 0.5 - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY - (playerY + atkY))),2));
               var enemyRange02 = Math.sqrt(Math.pow(Math.abs((enemyX - 0.5 - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY + 0.5 - (playerY + atkY))),2));
               var enemyRange10 = Math.sqrt(Math.pow(Math.abs((enemyX - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY - 0.5 - (playerY + atkY))),2));
               var enemyRange11 = Math.sqrt(Math.pow(Math.abs((enemyX - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY - (playerY + atkY))),2));
               var enemyRange12 = Math.sqrt(Math.pow(Math.abs((enemyX - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY + 0.5 - (playerY + atkY))),2));
               var enemyRange20 = Math.sqrt(Math.pow(Math.abs((enemyX + 0.5 - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY - 0.5 - (playerY + atkY))),2));
               var enemyRange21 = Math.sqrt(Math.pow(Math.abs((enemyX + 0.5 - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY - (playerY + atkY))),2));
               var enemyRange22 = Math.sqrt(Math.pow(Math.abs((enemyX + 0.5 - (playerX + atkX))),2) + Math.pow(Math.abs((enemyY + 0.5  - (playerY + atkY))),2));
               if(enemyRange00 <= arm.range[1] || enemyRange01 <= arm.range[1] || enemyRange02 <= arm.range[1] || enemyRange10 <= arm.range[1] || enemyRange11 <= arm.range[1] || enemyRange12 <= arm.range[1] || enemyRange20 <= arm.range[1] || enemyRange21 <= arm.range[1] ||  enemyRange22 <= arm.range[1]) {
                    var damage = arm.dmg;
                    enemy.hp -= damage;
                    if(enemy.hp <= 0) {
                        player.exp += (enemy.id[0] == "m") ? mobs.find(x=>x.icon == enemy.icon).exp : 0
                       while (player.exp >= expNeed[player.lvl-1]) {player.exp -= expNeed[player.lvl-1];player.lvl += 1}
                    var editPlayer = await Death(enemy,player.id);
                      player =  await findPlayer(id)
                    var assetsDmg = [{id:player.id,type:"exp",exp:player.exp,lvl:player.lvl}];
                    if(editPlayer.id[0] == "p") {
                       editPlayers.push(editPlayer)
                       dmgs.push({id:enemy.id,hp:editPlayer.hp,type:1,assets:assetsDmg})
                    } else {
                        dmgs.push({id:enemy.id,hp:0,type:1,assets:assetsDmg})
                    }
            } else {
                  dmgs.push({id:enemy.id,hp:enemy.hp,type:1})
            }
            }
        }
            }

                       for(var i = 0;i<builds[player.floor-1][player.room-1].length;i++) {
                        var build = builds[player.floor-1][player.room-1][i]
                        if(build.atkable == true) {
               var buildRange00 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - (playerX + atkX))),2) + Math.pow(Math.abs((build.y - (build.size/2) - (playerY + atkY))),2));
               var buildRange01 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - (playerX + atkX))),2) + Math.pow(Math.abs((build.y - (playerY + atkY))),2));
               var buildRange02 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - (playerX + atkX))),2) + Math.pow(Math.abs((build.y + (build.size/2) - (playerY + atkY))),2));
               var buildRange10 = Math.sqrt(Math.pow(Math.abs((build.x - (playerX + atkX))),2) + Math.pow(Math.abs((build.y - (build.size/2) - (playerY + atkY))),2));
               var buildRange11 = Math.sqrt(Math.pow(Math.abs((build.x - (playerX + atkX))),2) + Math.pow(Math.abs((build.y - (playerY + atkY))),2));
               var buildRange12 = Math.sqrt(Math.pow(Math.abs((build.x - (playerX + atkX))),2) + Math.pow(Math.abs((build.y + (build.size/2) - (playerY + atkY))),2));
               var buildRange20 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - (playerX + atkX))),2) + Math.pow(Math.abs((build.y - (build.size/2) - (playerY + atkY))),2));
               var buildRange21 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - (playerX + atkX))),2) + Math.pow(Math.abs((build.y - (playerY + atkY))),2));
               var buildRange22 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - (playerX + atkX))),2) + Math.pow(Math.abs((build.y + (build.size/2) - (playerY + atkY))),2));
               if(buildRange00 <= arm.range[1] || buildRange01 <= arm.range[1] || buildRange02 <= arm.range[1] || buildRange10 <= arm.range[1] || buildRange11 <= build.size || buildRange12 <= arm.range[1] || buildRange20 <= arm.range[1] || buildRange21 <= arm.range[1] ||  buildRange22 <= arm.range[1]) {
                    var damage = arm.dmg;
                   damage *= (arm.name=="pickaxe1") ? 5 : 1;
                    build.hp -= damage;
                    dmgs.push({id:build.id,hp:build.hp,type:2})
                    if(build.hp <= 0) {
                        if(build.name == "MineBlock") {
                            var newbuild = {id:serverData.idBuilds+1,x:build.x,y:build.y,size:1,name:"MineHole",hp:400,atkable:false}
                            serverData.idBuilds += 1;
                            builds[player.floor-1][player.room-1].push(newbuild);
                            io.sockets.to(player.floor+'_'+player.room).emit("spawnBuild",newbuild)
                        }
                        if(build.name.split("_")[0] == "ArmBlock") {
                         var newArm = getArmBuild(build.name)
                            var armId = serverData.idArms + 1;
                            serverData.idArms += 1;
                    var xy = [build.x,build.y];
                    armsPlanted[player.floor-1][player.room-1].push({name:newArm,x:xy[0],y:xy[1],id:armId,angle:-45});
                    io.sockets.to(player.floor+'_'+player.room).emit("spawnArm",{name:newArm,x:xy[0],y:xy[1],id:armId,angle:-45})
                        }
                         builds[player.floor-1][player.room-1].splice(builds[player.floor-1][player.room-1].indexOf(builds[player.floor-1][player.room-1][i]),1);
                }
            }
        }
            } 
            io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:id,type:type,dmgs:dmgs});
            editPlayers.forEach(editPlayer => { if(player.room!=editPlayer.room||player.floor!=editPlayer.floor){io.sockets.to(editPlayer.floor+'_'+editPlayer.room).emit("editPlayer",editPlayer) }; io.sockets.to(player.floor+'_'+player.room).emit("editPlayer",editPlayer) })  }


socket.on('useSuper',async (data) => {
    var player = await findPlayer(id);
    if(player) {
            var arm = arms.find(x=>x.name == player.arm);
            if(Date.now() - player.lastSuperAtk >= arm.reloadSuper) {
                if(arm.super == "Sword") {
            player.lastSuperAtk = Date.now();
    var playerX = (player.x+player.dir[0]*((Date.now()-player.lastDir)/1000));
    var playerY = (player.y+player.dir[1]*((Date.now()-player.lastDir)/1000));
    var atkX = Math.cos((player.angle* Math.PI) / 180.0) * 1.5
    var atkY = -Math.sin((player.angle* Math.PI) / 180.0) * 1.5;
    //updatePlayer(id,-1,0,0, playerX + atkX,player.y+atkY )
    player.dir = data[0];
    player.angle = data[1];
    player.lastDir = Date.now()
    player.x = playerX + atkX;
    player.y = playerY + atkY;
    if(player.x >= map[player.floor-1][player.room-1].size || player.x <= -map[player.floor-1][player.room-1].size || player.y >= map[player.floor-1][player.room-1].size || player.y <= -map[player.floor-1][player.room-1].size) {
   newRoom();
    } else {
    io.sockets.to(player.floor+'_'+player.room).emit("newDir",{id:id,x:player.x,y:player.y,dir:player.dir,angle:player.angle,tp:true});
    }
     io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:id,type:arm.super,dmgs:[]});
} else if(arm.super=="Bow") {
    player.lastSuperAtk = Date.now();
    var playerX = (player.x+player.dir[0]*((Date.now()-player.lastDir)/1000));
    var playerY = (player.y+player.dir[1]*((Date.now()-player.lastDir)/1000));
    var newArraw1 = {ownerId:id,id:serverData.idAssets+1,name:"arraw",x:playerX,y:playerY,angle:player.angle-20,dir:[Math.cos(((player.angle-20)* Math.PI) / 180.0) * 10,-Math.sin(((player.angle-20)* Math.PI) / 180.0) * 10]}
    var newArraw2 = {ownerId:id,id:serverData.idAssets+2,name:"arraw",x:playerX,y:playerY,angle:player.angle,dir:[Math.cos((player.angle* Math.PI) / 180.0) * 10,-Math.sin((player.angle* Math.PI) / 180.0) * 10]}
    var newArraw3 = {ownerId:id,id:serverData.idAssets+3,name:"arraw",x:playerX,y:playerY,angle:player.angle+20,dir:[Math.cos(((player.angle+20)* Math.PI) / 180.0) * 10,-Math.sin(((player.angle+20)* Math.PI) / 180.0) * 10]}
    serverData.idAssets+=3;
    newAsset(newArraw1,player); newAsset(newArraw2,player); newAsset(newArraw3,player);
    io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:id,type:"Bow",dmgs:[]});
}
}
}
})

socket.on("takeArm",async (armTaked) => {
var player = await findPlayer(id)
var arm = armsPlanted[player.floor-1][player.room-1].find(x=>x.id === armTaked);
var playerXY = [player.x+player.dir[0]*((Date.now()-player.lastDir)/1000),player.y+player.dir[1]*((Date.now()-player.lastDir)/1000)];
if(player != undefined && arm != undefined && Math.sqrt(Math.pow(Math.abs((arm.x - playerXY[0])),2) + Math.pow(Math.abs((arm.y - playerXY[1])),2)) <= 1.3) {
var newArmPos = [Math.cos((player.angle* Math.PI) / 180.0) * 1.2 + playerXY[0],-Math.sin((player.angle* Math.PI) / 180.0) * 1.2 + playerXY[1]];
newArmPos[0] = (newArmPos[0] > map[player.floor-1][player.room-1].size) ? map[player.floor-1][player.room-1].size : (newArmPos[0] < -map[player.floor-1][player.room-1].size) ? -map[player.floor-1][player.room-1].size : newArmPos[0];
newArmPos[1] = (newArmPos[1] > map[player.floor-1][player.room-1].size) ? map[player.floor-1][player.room-1].size : (newArmPos[1] < -map[player.floor-1][player.room-1].size) ? -map[player.floor-1][player.room-1].size : newArmPos[1];
//var newArmPos = [player.x+player.dir[0]*((Date.now()-player.lastDir)/1000),player.y+player.dir[1]*((Date.now()-player.lastDir)/1000)]
io.sockets.to(player.floor+'_'+player.room).emit("newArm",[id,{name:arm.name,x:newArmPos[0],y:newArmPos[1],id:arm.id,angle:player.angle - 170,lastArm:player.arm,lastArmId:player.armId,playerXY:playerXY}])
armsPlanted[player.floor-1][player.room-1].push({name:player.arm,x:newArmPos[0],y:newArmPos[1],id:player.armId,angle:player.angle - 170});
players[player.floor-1][player.room-1].find(x=>x.id === id).arm = arm.name;
players[player.floor-1][player.room-1].find(x=>x.id === id).armId = arm.id;
armsPlanted[player.floor-1][player.room-1].splice(armsPlanted[player.floor-1][player.room-1].indexOf(arm),1);
}
})

socket.on("newDir",async (data)=>{
    if(Math.abs(data.dir[0]) <= 2 &&Math.abs(data.dir[1]) <= 2){
     var player = await findPlayer(id)
    if(player != undefined) {
    var xy = [player.x+player.dir[0]*((Date.now()-player.lastDir)/1000),player.y+player.dir[1]*((Date.now()-player.lastDir)/1000)];
    var index = players[player.floor-1][player.room-1].indexOf(player);
    if(players[player.floor-1][player.room-1][index]) {
    players[player.floor-1][player.room-1][index].lastDir = Date.now();
    players[player.floor-1][player.room-1][index].x = xy[0];
    players[player.floor-1][player.room-1][index].y = xy[1];
    players[player.floor-1][player.room-1][index].dir = [data.dir[0],data.dir[1]];
    players[player.floor-1][player.room-1][index].angle = data.angle;
    io.sockets.to(player.floor+'_'+player.room).emit("newDir",{id:id,x:xy[0],y:xy[1],dir:data.dir,angle:data.angle});
}
}}})
})

    function getRandom(min,max) {
        return Math.floor(Math.random() * (max-min+1)) + min;
    }
    function getMobDir(num) {
        return (num < 0) ? getRandom(num,0) : getRandom(0,num)
    }
    async function findPlayer(id) {
        var player;
         players.forEach(floor => {
                floor.forEach(room => {
                   if(room.find(x=>x.id == id)) {
                    player = room.find(x=>x.id == id);
                   }
                })
            })
        return player;
    }

    async function updatePlayer(id,floor,room,x,y) {
                  for(var floorI = 0; floorI < players.length;floorI++) {
                for(var roomI = 0; roomI < players[floorI].length;roomI++) {
                   if(players[floorI][roomI].find(x=>x.id == id)) {
                    var player = players[floorI][roomI].find(x=>x.id == id);
                    var index = players[floorI][roomI].indexOf(player);
                    players[floorI][roomI].splice( players[floorI][roomI].indexOf(player),1);
                    var lastPlayerData = {floor:player.floor+"",room:player.room+""}
                    player.floor = floor;
                    player.room = room;
                    player.x = x
                    player.y = y
                    player.lastDir = Date.now();
                    players[floor-1][room-1].push(player);
                    io.sockets.sockets.get(player.socketId).leave(lastPlayerData.floor+'_'+lastPlayerData.room)
                    io.sockets.sockets.get(player.socketId).join(player.floor+'_'+player.room)
                    io.sockets.to(player.floor+'_'+player.room).to(lastPlayerData.floor+'_'+lastPlayerData.room).emit("editPlayer",player)
                    break;
                }
                }
            }
        return;
    }

    function newAsset(data,player) {
    assets[player.floor-1][player.room-1].push(data)
    io.sockets.to(player.floor+'_'+player.room).emit("spawnAsset",data);
    var arm = arms.find(x=>x.name==player.arm);
    arrawAttack(data.id,0.5,arm,player);
    var time = 150;
    var interval = setInterval(()=>{
     var asset = assets[player.floor-1][player.room-1].find(x=>x.id==data.id);
          if(asset == undefined ) {
       clearInterval(interval);
          } else {
     asset.x+=asset.dir[0]*time/1000;
     asset.y+=asset.dir[1]*time/1000;
     arrawAttack(asset.id,0.5,arm,player);
     if(Math.abs(asset.x) >= map[player.floor-1][player.room-1].size+1 || Math.abs(asset.y) >= map[player.floor-1][player.room-1].size+1) {
       assets[player.floor-1][player.room-1].splice(assets[player.floor-1][player.room-1].indexOf(assets[player.floor-1][player.room-1].find(x=>x.id==data.id)),1);
       io.sockets.to(player.floor+'_'+player.room).emit("removeAsset",asset.id);
       clearInterval(interval);
     }
 }
    },time)
}

async function arrawAttack(arrawId,range,arm,player) {
    var dmgs = [];
    var editPlayers = [];
            var arraw = assets[player.floor-1][player.room-1].find(x=>x.id==arrawId);
            if(arraw != undefined) {
            var arrawX = arraw.x
            var arrawY = arraw.y
            for(var i = 0;i<players[player.floor-1][player.room-1].length;i++) {
                var enemy = players[player.floor-1][player.room-1][i];
                if(enemy.id != player.id && (player.team == "None" || (enemy.team != player.team))) {
                var enemyX = (enemy.x+enemy.dir[0]*((Date.now()-enemy.lastDir)/1000));
                var enemyY = (enemy.y+enemy.dir[1]*((Date.now()-enemy.lastDir)/1000));
               var enemyRange00 = Math.sqrt(Math.pow(Math.abs((enemyX - 0.5 - arrawX)),2) + Math.pow(Math.abs((enemyY - 0.5 - arrawY)),2));
               var enemyRange01 = Math.sqrt(Math.pow(Math.abs((enemyX - 0.5 - arrawX)),2) + Math.pow(Math.abs((enemyY - arrawY)),2));
               var enemyRange02 = Math.sqrt(Math.pow(Math.abs((enemyX - 0.5 - arrawX)),2) + Math.pow(Math.abs((enemyY + 0.5 - arrawY)),2));
               var enemyRange10 = Math.sqrt(Math.pow(Math.abs((enemyX - arrawX)),2) + Math.pow(Math.abs((enemyY - 0.5 - arrawY)),2));
               var enemyRange11 = Math.sqrt(Math.pow(Math.abs((enemyX - arrawX)),2) + Math.pow(Math.abs((enemyY - arrawY)),2));
               var enemyRange12 = Math.sqrt(Math.pow(Math.abs((enemyX - arrawX)),2) + Math.pow(Math.abs((enemyY + 0.5 - arrawY)),2));
               var enemyRange20 = Math.sqrt(Math.pow(Math.abs((enemyX + 0.5 - arrawX)),2) + Math.pow(Math.abs((enemyY - 0.5 - arrawY)),2));
               var enemyRange21 = Math.sqrt(Math.pow(Math.abs((enemyX + 0.5 - arrawX)),2) + Math.pow(Math.abs((enemyY - arrawY)),2));
               var enemyRange22 = Math.sqrt(Math.pow(Math.abs((enemyX + 0.5 - arrawX)),2) + Math.pow(Math.abs((enemyY + 0.5  - arrawY)),2));
               if(enemyRange00 <= range || enemyRange01 <= range || enemyRange02 <= range || enemyRange10 <= range || enemyRange11 <= 0.5 || enemyRange12 <= range || enemyRange20 <= range || enemyRange21 <= range ||  enemyRange22 <= range) {
                    var damage = arm.dmg;
                    enemy.hp -= damage;
                    if(enemy.hp <= 0) {
                        player.exp += (enemy.id[0] == "m") ? mobs.find(x=>x.icon == enemy.icon).exp : 0
                       while (player.exp >= expNeed[player.lvl-1]) {player.exp -= expNeed[player.lvl-1];player.lvl += 1}
                    var editPlayer = await Death(enemy,player.id);
                      player =  await findPlayer(player.id)
                    var assetsDmg = [{id:player.id,type:"exp",exp:player.exp,lvl:player.lvl}];
                    if(editPlayer.id[0] == "p") {
                       editPlayers.push(editPlayer)
                       dmgs.push({id:enemy.id,hp:editPlayer.hp,type:1,assets:assetsDmg})
                    } else {
                        dmgs.push({id:enemy.id,hp:0,type:1,assets:assetsDmg})
                    } } else { dmgs.push({id:enemy.id,hp:enemy.hp,type:1})}
            }}} for(var i = 0;i<builds[player.floor-1][player.room-1].length;i++) {
                        var build = builds[player.floor-1][player.room-1][i]
                        if(build.atkable == true) {
               var buildRange00 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - arrawX)),2) + Math.pow(Math.abs((build.y - (build.size/2) - arrawY)),2));
               var buildRange01 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - arrawX)),2) + Math.pow(Math.abs((build.y - arrawY)),2));
               var buildRange02 = Math.sqrt(Math.pow(Math.abs((build.x - (build.size/2) - arrawX)),2) + Math.pow(Math.abs((build.y + (build.size/2) - arrawY)),2));
               var buildRange10 = Math.sqrt(Math.pow(Math.abs((build.x - arrawX)),2) + Math.pow(Math.abs((build.y - (build.size/2) - arrawY)),2));
               var buildRange11 = Math.sqrt(Math.pow(Math.abs((build.x - arrawX)),2) + Math.pow(Math.abs((build.y - arrawY)),2));
               var buildRange12 = Math.sqrt(Math.pow(Math.abs((build.x - arrawX)),2) + Math.pow(Math.abs((build.y + (build.size/2) - arrawY)),2));
               var buildRange20 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - arrawX)),2) + Math.pow(Math.abs((build.y - (build.size/2) - arrawY)),2));
               var buildRange21 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - arrawX)),2) + Math.pow(Math.abs((build.y - arrawY)),2));
               var buildRange22 = Math.sqrt(Math.pow(Math.abs((build.x + (build.size/2) - arrawX)),2) + Math.pow(Math.abs((build.y + (build.size/2) - arrawY)),2));
               if(buildRange00 <= range || buildRange01 <= range || buildRange02 <= range || buildRange10 <= range || buildRange11 <= build.size || buildRange12 <= range || buildRange20 <= range || buildRange21 <= range ||  buildRange22 <= range) {
                    var damage = arm.dmg;
                    build.hp -= damage;
                    dmgs.push({id:build.id,hp:build.hp,type:2})
                    if(build.hp <= 0) {
                        if(build.name == "MineBlock") {
                            var newbuild = {id:serverData.idBuilds+1,x:build.x,y:build.y,size:1,name:"MineHole",hp:400,atkable:false}
                            serverData.idBuilds += 1;
                            builds[player.floor-1][player.room-1].push(newbuild);
                            io.sockets.to(player.floor+'_'+player.room).emit("spawnBuild",newbuild)
                        }
                        if(build.name.split("_")[0] == "ArmBlock") {
                         var newArm = getArmBuild(build.name)
                            var armId = serverData.idArms + 1;
                            serverData.idArms += 1;
                    var xy = [build.x,build.y];
                    armsPlanted[player.floor-1][player.room-1].push({name:newArm,x:xy[0],y:xy[1],id:armId,angle:-45});
                    io.sockets.to(player.floor+'_'+player.room).emit("spawnArm",{name:newArm,x:xy[0],y:xy[1],id:armId,angle:-45})
                        }
                         builds[player.floor-1][player.room-1].splice(builds[player.floor-1][player.room-1].indexOf(builds[player.floor-1][player.room-1][i]),1);
                }}}} 
            if(dmgs.length > 0) {
            assets[player.floor-1][player.room-1].splice(assets[player.floor-1][player.room-1].indexOf(assets[player.floor-1][player.room-1].find(x=>x.id==arrawId)),1);
            io.sockets.to(player.floor+'_'+player.room).emit("removeAsset",arrawId);
            io.sockets.to(player.floor+'_'+player.room).emit("attacked",{id:player.id,type:"arraw",dmgs:dmgs});
            editPlayers.forEach(editPlayer => { if(player.room!=editPlayer.room||player.floor!=editPlayer.floor){io.sockets.to(editPlayer.floor+'_'+editPlayer.room).emit("editPlayer",editPlayer) }; io.sockets.to(player.floor+'_'+player.room).emit("editPlayer",editPlayer) }) } } }

function getArmBuild(name) {
 var newArmChance = getRandom(1,100);
                            var newArm;
                            if(name.split("_")[1] == 1) { newArm = (newArmChance <= 50) ? "sword1" : (newArmChance <= 80) ? "sword2" : "sword3"}
                            if(name.split("_")[1] == 2) { newArm = (newArmChance <= 40) ? "sword2" : (newArmChance <= 70) ? "sword3" : (newArmChance <= 90) ? "sword4" : "sword5"}
                            if(name.split("_")[1] == 3) { newArm = (newArmChance <= 40) ? "sword5" : (newArmChance <= 70) ? "sword6" : (newArmChance <= 90) ? "sword7" : "sword8"}
                            if(name.split("_")[1] == 4) { newArm = (newArmChance <= 40) ? "sword7" : (newArmChance <= 70) ? "sword8" : (newArmChance <= 90) ? "sword9" : "sword10"}
                            if(name.split("_")[1] == 5) { newArm = (newArmChance <= 40) ? "sword9" : (newArmChance <= 70) ? "sword10" : (newArmChance <= 90) ? "sword11" : "sword12"}
                            return newArm;
}

            function generate() {
                var toSpawn = [];
                var spawnId = 12;
                var lastSpawnId;
                for(var floor = 0; floor < 10;floor++) {
                        lastSpawnId = spawnId;
                        if(spawnId < 10) {
                          var spawnIdAdd = getRandom(1,15)
                          if(spawnIdAdd == 5 || Math.abs(spawnIdAdd) == 1) {
                            spawnIdAdd += 2;
                          } 
                          spawnId+=spawnIdAdd
                        } else if(spawnId < 15) {
                          var spawnIdAdd = getRandom(-15,10)
                          if(spawnIdAdd == 5 || Math.abs(spawnIdAdd) == 1) {
                            spawnIdAdd -= 2;
                          } 
                          if(spawnIdAdd + spawnIdAdd < 0) {
                            spawnIdAdd = -spawnId;
                          }
                          if(spawnIdAdd + spawnIdAdd > 24) {
                            spawnIdAdd = 24-spawnId;
                          }
                          spawnId += spawnIdAdd;
                        } else {
                            var spawnIdAdd = getRandom(-14,-2)
                          if(spawnIdAdd == 5 || Math.abs(spawnIdAdd) == 1) {
                            spawnIdAdd -= 2;
                          } 
                          spawnId+=spawnIdAdd
                        }
                        if(floor == 9) { spawnId = -1; }
                    var playersNew = [];
                    var armsPlantedNew = [];
                    var assetsNew = [];
                    var buildsNew = [];
                    var mapNew = [];
                    var hardLvl = (floor<2) ? 1 : (floor<4) ? 2 : (floor<6) ? 3 : (floor<8) ? 4 : 5;
                    for(var room = 0;room<25;room++) {
                        var buildsNewRoom = [];
                        var size = (room != lastSpawnId) ? getRandom(4,7) : 3;
                        if(room != lastSpawnId) {
                            var mobsLength  = (floor<2) ? getRandom(3,size) : (floor<4) ? getRandom(3,size) : (floor<6) ? getRandom(4,size) : (floor<8) ? getRandom(4,size) : getRandom(4,size)
                 if(room != spawnId) {for(var i = 0;i < mobsLength;i++) {
    toSpawn.push([getRandom(-size,size),getRandom(-size,size),floor+1,room+1,hardLvl+getRandom(0,1)*5]);}
    var buildInfo = buildsInfo.find(x=>x.id == hardLvl)
    for(var i = 0;i<getRandom(0,2);i++){serverData.idBuilds += 1; buildsNewRoom.push({id:serverData.idBuilds,x:getRandom(-size+1,size-1),y:getRandom(-size+1,size-1),size:buildInfo.size,name:buildInfo.name,hp:buildInfo.hp,atkable:true}) }
                    } else {
serverData.idBuilds += 1; buildsNewRoom.push({id:serverData.idBuilds,x:getRandom(-size+1,size-1),y:getRandom(-size+1,size-1),size:2,name:"MineBlock",hp:300,atkable:true})
                    }} else {
                        serverData.idBuilds += 1; buildsNewRoom.push({id:serverData.idBuilds,x:getRandom(-size+1,size-1),y:getRandom(-size+1,size-1),size:1.5,name:"ArmBlock_1",hp:200,atkable:true})
                    }
                    playersNew.push([]);
                    armsPlantedNew.push([]);
                    assetsNew.push([]);
                    buildsNew.push(buildsNewRoom);
                    mapNew.push({size:size})
                }
                players.push(playersNew);
                armsPlanted.push(armsPlantedNew);
                assets.push(assetsNew);
                builds.push(buildsNew);
                map.push(mapNew)
            }
            toSpawn.forEach((mob)=>spawnMob(mob[0],mob[1],mob[2],mob[3],mob[4]));
        }