import kaplay from "kaplay";
kaplay({
    background: [54, 57, 92],
})
loadSpriteAtlas("sprites/floor.png",{
    "topLeft":{
        x:0,
        y:0,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:0,
        }
    },
        "topMiddle":{
        x:16,
        y:0,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:1,
        }
    },
    "topRight":{
        x:32,
        y:0,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:2,
        }
    },
    "middleLeft":{
        x:0,
        y:16,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:3,
        }
    },
    "middle":{
        x:16,
        y:16,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:4,
        }
    },
    "middleRight":{
        x:32,
        y:16,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:5,
        }
    },
    "bottomLeft":{
        x:0,
        y:32,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:6,
        }
    },
    "bottomMiddle":{
        x:16,
        y:32,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:7,
        }
    },
    "bottomRight":{
        x:32,
        y:32,
        width:48,
        height:48,
        sliceX:3,
        sliceY:3,
        anim:{
            normal:8,
        }
    },
})
loadSpriteAtlas("sprites/Dworf.png", {
    "dworf": {
        x: 0,
        y: 0,
        width: 64,
        height: 72,
        sliceX: 4,
		sliceY: 3,
        anims: {
            noAnim: 0,
            idle: { from: 4, to: 7 },
            run:{from: 8, to:11},
        },
    },
})

loadSpriteAtlas("sprites/slime_spritesheet.png", {
    "slime": {
        x: 0,
        y: 0,
        width: 120,
        height: 30,
        sliceX: 5,
        anims: {
            shuffle: {from: 0, to: 4},
        }
    }
})

loadSpriteAtlas("sprites/hammer.png", {
    "hammer": {
        x: 0,
        y: 0,
        width: 60,
        height: 24,
        sliceX: 6,
        anims: {
            copper: 0,
            steel: 1,
            titan: 2,
            gold: 3,
            abyss: 4,
            emerald: 5,
        }
    }
})



const dworf=add([
  sprite("dworf"),
  pos(100,50),
  scale(5,5),
  area(),
  anchor("center"),
  body(),
])

const HAMMER_DISTANCE = -7;
const hammer = dworf.add([
    pos(-7, 10),
    sprite("hammer"),
    anchor("bot"),
    rotate(0),
    spin(),
    area(),
    
]);
function spin() {
    let spinning = false;
    return {
        id: "spin",
        update() {
            if (spinning) {
                this.angle += 1200 * dt();
                if (this.angle >= 360) {
                    this.angle = 0;
                    spinning = false;
                }
            }
        },
        spin() {
            spinning = true;
        },
    };
}

onKeyPress("space",()=>{
    hammer.spin();
})

onKeyPress("right",()=>{
    dworf.play("run",{loop:true});
    dworf.flipX = false;
    hammer.pos=vec2(-7,10);
})

onKeyDown("right",()=>{
    dworf.move(600,0);
})
onKeyRelease("right",()=>{
    dworf.play("idle",{loop:true});
})

//controls for left
onKeyPress("left",()=>{
    dworf.play("run",{loop:true});
    dworf.flipX = true;
    hammer.pos=vec2(7,10);
})

onKeyDown("left",()=>{
    dworf.move(-600,0);
})
onKeyRelease("left",()=>{
    dworf.play("idle",{loop:true});
})
hammer.onCollide("enemy",(o)=>{
    destroy(o);
    shake(50)
})

dworf.onCollide("enemy", (o)=>{
  dworf.destroy()
  shake(100)
})

setGravity(2400)

//create levels

const level = addLevel([
    // Design the level layout with symbols
    "13          @  13",
    "75222222222222259",
], {
    // The size of each grid
    tileWidth: 80,
    tileHeight: 80,
    // The position of the top left block
    pos: vec2(100, 200),
    // Define what each symbol means (in components)
    tiles: {
        "1": () => [
            sprite("topLeft"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "2": () => [
            sprite("topMiddle"),
            area(),
            scale(5,5),
            body({ isStatic: true }),
            anchor("center"),
        ],
        "3": () => [
            sprite("topRight"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "4": () => [
            sprite("middleLeft"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "5": () => [
            sprite("middle"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "6": () => [
            sprite("middleRight"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "7": () => [
            sprite("bottomLeft"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "8": () => [
            sprite("bottomMiddle"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "9": ()=>[
            sprite("bottomRight"),
            area(),
            scale(5,5),
            anchor("center"),
            body({ isStatic: true }),
        ],
        "@": ()=>[
            sprite("slime"),
            area(),
            scale(5,5),
            anchor("center"),
            body(),
            patrol(),
            "enemy",
        ],
    },
});


function patrol(speed = 60, dir = 1) {
}