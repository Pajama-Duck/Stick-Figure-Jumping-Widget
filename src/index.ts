import Color from "./Color";
import Layer from "./Layer";
import Renderer from "./Renderer";
import Tile from "./Tile";
import Vector from "./Vector";
import Platform from "./Game-Components/Platform";
import TextBox from "./Game-Components/TextBox";

const WIDTH = 40;
const HEIGHT = 30;
var gameRunning = false;
var gravityActive = true;
var isTouchingGround = true;




//all layers
const layers: Record<string, Layer> = {
  background: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
  platforms: new Layer({size: new Vector(WIDTH, HEIGHT)}),
  actor: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
  titleScreen: new Layer({size: new Vector(WIDTH, HEIGHT)})
};


//start screen layer elements
const blankScreen = Array.from({ length: WIDTH*HEIGHT }, (_, i) => {
  const x = i % WIDTH;1
  const y = Math.floor(i / WIDTH);

  return new Tile({
    char: ' ',
    pos: new Vector(x, y),
    background: new Color(0, 0, 0, 255)
  });
});

const title = new TextBox("This is a game", new Vector(WIDTH/2 - 7, HEIGHT/2));

const startButton = new TextBox("Start", new Vector(WIDTH/2 - 3, HEIGHT/2 + 4));


//game layer elements
const player = new Tile({
  background: new Color(0,0,0,0),
  char: '',
  color: new Color(255, 0, 0),
  isVisible: true,
  pos: new Vector(WIDTH/2, HEIGHT-1)
});

const playerBodyStanding = Array.from({length: 9}, (_, i) => {
  var key = "";
  var x = player.pos.x;
  var y = player.pos.y;
  if(i == 0 || i ==1 || i == 2){
    x = player.pos.x - 1 + i;
    y = player.pos.y - 2;
    if(i==1){
      key = "0";
    } else {
      key = "";
    }
  } else if(i == 3 || i == 4 || i == 5){
    x = player.pos.x - 4 + i;
    y = player.pos.y - 1;
    if (i == 3) {
      key = "/";
    } else if (i == 4){
      key = "|";
    } else if (i == 5) {
      key = "\\";
    }
  } else if(i == 6 || i == 7 || i == 8){
    x = player.pos.x - 7 + i;
    y = player.pos.y;
    if (i == 6 || i == 8){
      key = "L";
    } else {
      key = "";
    }
  }
  
  return new Tile({
    char: key,
    pos: new Vector(x, y),
    color: new Color(255, 0, 0),
    isVisible: true,
    background: new Color(0, 0, 0, 0)
  })


})





const backgroundTiles = Array.from({ length: WIDTH*HEIGHT }, (_, i) => {
  const x = i % WIDTH;1
  const y = Math.floor(i / WIDTH);

  return new Tile({
    char: '.',
    pos: new Vector(x, y)
  });
});



var platform = Array.from({length: HEIGHT/3}, (_, i) => {
  return new Platform(Math.floor(Math.random() * (WIDTH-4)), HEIGHT - (3*i));
});




//add layers to the renderer
const renderer = new Renderer();
renderer.setSize(20);
renderer.addLayer('background', layers.background);
renderer.addLayer('platforms', layers.platforms);
renderer.addLayer('actor', layers.actor);
renderer.addLayer('title', layers.titleScreen);



//adds a weird effect to the background but I don't need that
/*renderer.onBeforeDraw(() => {
  layers.background.operations.forEach(op => {
    const newAlpha = (Math.sin(op.pos.x / op.pos.y + 5) + 1) / 2;
    op.color.a = newAlpha;
  })
}) */


const draw = () => {
  backgroundTiles.forEach(tile => layers.background.draw(tile));
  layers.actor.draw(player);
  playerBodyStanding.forEach(tile => layers.actor.draw(tile));
  platform.forEach(Platform => Platform.tiles.forEach(tile => layers.platforms.draw(tile)));
  //blankScreen.forEach(tile => layers.titleScreen.draw(tile));
  //title.tiles.forEach(tile => layers.titleScreen.draw(tile));
  //startButton.tiles.forEach(tile => layers.titleScreen.draw(tile));
    
  renderer.commit();

  requestAnimationFrame(draw);
}

draw();

//controls for character
/*normal character movement, such as in an rpg
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': {
      player.pos.add(new Vector(0, -1));
      break;
    }
    case 'ArrowDown': {
      player.pos.add(new Vector(0, 1));
      break;
    }
    case 'ArrowLeft': {
      player.pos.add(new Vector(-1, 0));
      break;
    }
    case 'ArrowRight': {
      player.pos.add(new Vector(1, 0));
      break;
    }
  }
})*/

//jumping game character movement
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': {
      if(isTouchingGround == true){
        

        
        characterJumpAnimate;
        setTimeout(characterJump, 50);
        setTimeout(characterJump, 75);
        setTimeout(characterJump, 100);
        setTimeout(characterJump, 125);
        setTimeout(characterJump, 150);
        setTimeout(characterJump, 175);
        setTimeout(characterJump, 225);
        setTimeout(characterJump, 250);
        
      }
      break;
      
    }
    case 'ArrowLeft': {
      if(!(player.pos.x !<= 1)){
        player.pos.add(new Vector(-1, 0));
        playerBodyStanding.forEach(tile => tile.pos.add(new Vector(-1, 0)));
        if(playerOnPlatform() == false && player.pos.y < HEIGHT - 1){
          isTouchingGround = false;
        }
      }
      
      break;
    }
    case 'ArrowRight': {
      if(!(player.pos.x >= WIDTH - 2)){
        player.pos.add(new Vector(1, 0));
        playerBodyStanding.forEach(tile => tile.pos.add(new Vector(1, 0)));
        if(playerOnPlatform() == false && player.pos.y < HEIGHT - 1){
          isTouchingGround = false;
        }
      }
      
      break;
    }
  }
})


//gravity ( character falls if not on ground or platform)
document.addEventListener('DOMContentLoaded', e=>{gameRunning= true});
setInterval(characterFalls, 300);
setInterval(platformsFall, 1500);
function characterFalls(){
  if(isTouchingGround == false && gameRunning == true && gravityActive == true){
    player.pos.add(new Vector(0, 1));
    playerBodyStanding.forEach(tile => tile.pos.add(new Vector(0, 1)));
    if(player.pos.y >= HEIGHT - 1 ) {
      isTouchingGround = true;
      if(player.pos.y > HEIGHT){
        playerBodyStanding.forEach(tile => tile.pos.add(new Vector(0, -1)));
        player.pos.y = HEIGHT - 1;
      }
      
    }else if(playerOnPlatform()){ //player standing on platform 
      isTouchingGround = true;
    } 
  } 
}

function platformsFall(){
  if(gameRunning == true){
    if(playerOnPlatform() == true){
      player.pos.add(new Vector(0, 1));
      playerBodyStanding.forEach(tile => tile.pos.add(new Vector(0, 1)));
    }
    platform.forEach(Platform => {
      Platform.tiles.forEach(tile => tile.pos.y += 1);
      if (Platform.tiles[1].pos.y >= HEIGHT){
        Platform.tiles.forEach(tile => tile.pos.y = 0);
        Platform.tiles[0].pos.x = Math.floor(Math.random() * (WIDTH - 4));
        Platform.tiles[1].pos.x = Platform.tiles[0].pos.x +1;
        Platform.tiles[2].pos.x = Platform.tiles[0].pos.x +2;
        Platform.tiles[3].pos.x = Platform.tiles[0].pos.x +3;
      }
    });
    
  }
}

async function characterJumpAnimate(){
  playerBodyStanding[6].char = "7";
  playerBodyStanding[8].char = "7";
  await wait(100);
  playerBodyStanding[6].char = "|";
  playerBodyStanding[8].char = "|";
  player.pos.add(new Vector(0, -1));
  playerBodyStanding.forEach(tile => tile.pos.add(new Vector(0, -1)));
  return;
}

function characterJump(){
  playerBodyStanding[6].char = "7";
  playerBodyStanding[8].char = "7";
  player.pos.add(new Vector(0, -1));
  playerBodyStanding.forEach(tile => tile.pos.add(new Vector(0, -1)));
  isTouchingGround = false;
}

function playerOnPlatform(): boolean
{
  var onAThing = false;
  platform.forEach(Platform => {
    if(player.pos.y == Platform.tiles[1].pos.y -1 && (player.pos.x == Platform.tiles[0].pos.x || player.pos.x == Platform.tiles[1].pos.x || player.pos.x == Platform.tiles[2].pos.x || player.pos.x == Platform.tiles[3].pos.x)){ //player standing on platform 
      playerBodyStanding[6].char = "L";
      playerBodyStanding[8].char = "L";
      onAThing = true;
    } else if (player.pos.y == Platform.tiles[1].pos.y && (player.pos.x == Platform.tiles[0].pos.x || player.pos.x == Platform.tiles[1].pos.x || player.pos.x == Platform.tiles[2].pos.x || player.pos.x == Platform.tiles[3].pos.x)){ //make it easier for the player to stand on a platform (accounts for small amout of lag))
      player.pos.add(new Vector(0, -1));
      playerBodyStanding.forEach(tile => tile.pos.add(new Vector(0, -1)));
      playerBodyStanding[6].char = "L";
      playerBodyStanding[8].char = "L";
      onAThing = true;
    };
  });
  return onAThing;
}


function wait(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



/* Character Assets

   O        O         O        O        O
 /|\      /|\       /|\      /|\      /|\
_/\_      L_L       7 7      / \      | |


*/




