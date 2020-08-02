const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

var gravity = 0.5;
var friction = 0.5;
var platforms = []
var playerState = -1;

var player = {
    x: 200,
    y: 200,
    x_v: 0,
    y_v: 0,
    jump: true,
    height: 80,
    width: 40
};

var keys = {
    right: false,
    left: false,
    up: false,
};

var testBlock = new Image();
testBlock.src = 'blocks/test.png'

var playerImage = new Image();
playerImage.src = 'player/player.png'

var playerWalkingImage = new Image();
playerWalkingImage.src = 'player/player_walking.png'

var bg = new Image();
bg.src = 'Space_Game_Background.png'

var moonBlock = new Image();
moonBlock.src = 'blocks/Space Blocks.png'

document.addEventListener('keydown', (event) => {
    //left arrow key
    if (event.keyCode == 37) {
        keys.left = true;
    }
    //up arrow key
    if (event.keyCode == 38) {
        player.y_v = -10;
    }
    //right arrow key
    if (event.keyCode == 39) {
        keys.right = true;
    }
});

document.addEventListener('keyup', (event) => {
    //console.log(event.keyCode);
    if (event.keyCode == 37) {
        keys.left = false;
    }
    if (event.keyCode == 38) {
        if (player.y_v < -2) {
            player.y_v = -3;
        }
    }
    if (event.keyCode == 39) {
        keys.right = false;
    }
});

function loop() {
    ctx.drawImage(bg,0,0);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    createPlats(20);
    //initMap()
    if (player.jump == false) {
        player.x_v *= friction;
    } else {
        player.y_v += gravity;
    }
    player.jump = true;
    for (var loop = 0; loop < 11; loop++) {
        compareToPlats(loop);
    }

    if (keys.left) {
        player.x_v = -2.5;
    }
    if (keys.right) {
        player.x_v = 2.5;
    }
    // ctx.fillStyle("#FFFFFF");
    player.y += player.y_v;
    player.x += player.x_v;
    console.log(player.y_v)
    console.log(player.x_v)
    if (player.x_v >= 0 || player.y_v >= 0) {
        ctx.drawImage(playerWalkingImage, player.x, player.y - 80);
    } else {
        ctx.drawImage(playerImage, player.x, player.y - 80);
    }
}

function compareToPlats(platNumbers) {
    if (platforms[platNumbers].x < player.x && player.x < platforms[platNumbers].x + 160 &&
        platforms[platNumbers].y < player.y && player.y < platforms[platNumbers].y + 40) {
        playerState = platNumbers;
        player.y = platforms[platNumbers].y;
        player.y_v = -player.y_v*0.2;
        player.jump = false;
    }
}

function createPlats(num) {
    for (i = 0; i < num; i++) {
        platforms.push({
            x: Math.floor(Math.random() * (1500)),
            y: Math.floor(Math.random() * (850)),
        });
    }
    platforms.push({
        x: 200,
        y: 200 + player.height,
    })
    for (i = 0; i < num + 1; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, 160, 40);
        for(ii = 0; ii < 4; ii++){
            ctx.drawImage(moonBlock, platforms[i].x + ii*40, platforms[i].y);
        }
        
    }
}
const main = () => {
    setInterval(loop, 40);
}


main();
