import kaplay from "kaplay";
kaplay()

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

const dworf=add([
  sprite("dworf"),
  pos(400,400),
  scale(5,5),
])


onKeyPress("right",()=>{
    dworf.play("run",{loop:true});
    dworf.flipX = false;
})

onKeyDown("right",()=>{
    dworf.move(600,0);
})
onKeyRelease("right",()=>{
    dworf.play("idle",{loop:true});
})


onKeyPress("left",()=>{
    dworf.play("run",{loop:true});
    dworf.flipX = true;
})

onKeyDown("left",()=>{
    dworf.move(-600,0);
})
onKeyRelease("left",()=>{
    dworf.play("idle",{loop:true});
})