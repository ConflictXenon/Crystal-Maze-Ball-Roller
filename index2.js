// configuration
let tick = 10; // milliseconds
let ballMove = false;
let ballMoveBy = 5;
let ballSize = 25;
let gutterSize = 50;
let gutterMoveBy = 1;
let gutterNext = 0;

// canvas
let canvas = false;
let canvasSize = 500;
let canvasLeft = Math.ceil((window.innerWidth / 2) - (canvasSize / 2));
let canvasRight = canvasLeft + canvasSize;
let canvasTop = 100;

// winzone
let winzone = false;
let winzoneTop = canvasTop + canvasSize - gutterSize;
let winzoneSize = gutterSize;

// ball
let ball = {
    startLeft: Math.ceil((canvasSize / 2) + canvasLeft - (ballSize / 2)),
    startTop: 0 + canvasTop,
    left: Math.ceil((canvasSize / 2) + canvasLeft - (ballSize / 2)),
    top: 0 + canvasTop
}

// panels
let gameoverPanel;
let winPanel;


// gutter array
gutters = [
    {
        left: gutterSize,
        top: gutterSize
    },
    {
        left: gutterSize*2,
        top: gutterSize*2
    },
    {
        left: gutterSize*3,
        top: gutterSize*3
    },
    {
        left: gutterSize*4,
        top: gutterSize*4
    },
    {
        left: gutterSize*5,
        top: gutterSize*5
    },
    {
        left: gutterSize*6,
        top: gutterSize*6
    },
    {
        left: gutterSize*7,
        top: gutterSize*7
    },
    {
        left: gutterSize*8,
        top: gutterSize*8
    }
];

// initialisation
window.onload = load;

// system functions
function load() {
    initialise();
    let intervalID = window.setInterval(ticker,tick);
}

function ticker() {
    moveBall();
    moveGutters();
}

function gameOver() {
    gameoverPanel.style.display = 'block';
}

function win() {
    winPanel.style.display = 'block';
}

// collission detection
function testBall() {
    let ballTest = false;

    // ball corners
    ball.topLeft = {
        left: ball.left,
        top: ball.top
    }
    ball.topRight = {
        left: ball.left + ballSize,
        top: ball.top
    }
    ball.bottomLeft = {
        left: ball.left,
        top: ball.top + ballSize
    }
    ball.bottomRight = {
        left: ball.left + ballSize,
        top: ball.top + ballSize
    }

    // gutter test
    gutters.forEach(gutter => {
        gutter.topLeft = {
            left: gutter.left,
            top: gutter.top
        }
        gutter.topRight = {
            left: gutter.left + gutterSize,
            top: gutter.top
        }
        gutter.bottomLeft = {
            left: gutter.left,
            top: gutter.top + gutterSize
        }
        gutter.bottomRight = {
            left: gutter.left + gutterSize,
            top: gutter.top + gutterSize
        }

        // ball top left
        if(
            // gutter top left corner
            ball.topLeft.left >= gutter.topLeft.left
            &&
            ball.topLeft.top >= gutter.topLeft.top

            &&
            // gutter bottom right corner
            ball.topLeft.left <= gutter.bottomRight.left
            &&
            ball.topLeft.top <= gutter.bottomRight.top
        ) {
            ballTest = true;
        }
            
        // ball top right
        if(
            // gutter top left corner
            ball.topRight.left >= gutter.topLeft.left
            &&
            ball.topRight.top >= gutter.topLeft.top

            &&
            // gutter bottom right corner
            ball.topRight.left <= gutter.bottomRight.left
            &&
            ball.topRight.top <= gutter.bottomRight.top
        ) {
            ballTest = true;
        }

        // ball bottom left
        if(
            // gutter top left corner
            ball.bottomLeft.left >= gutter.topLeft.left
            &&
            ball.bottomLeft.top >= gutter.topLeft.top

            &&
            // gutter bottom right corner
            ball.bottomLeft.left <= gutter.bottomRight.left
            &&
            ball.bottomLeft.top <= gutter.bottomRight.top
        ) {
            ballTest = true;
        }

        // ball bottom right
        if(
            // gutter top left corner
            ball.bottomRight.left >= gutter.topLeft.left
            &&
            ball.bottomRight.top >= gutter.topLeft.top

            &&
            // gutter bottom right corner
            ball.bottomRight.left <= gutter.bottomRight.left
            &&
            ball.bottomRight.top <= gutter.bottomRight.top
        ) {
            ballTest = true;
        }

        // ball in safe zone
        if(
            ball.top >= canvasTop + 0
            &&
            ball.top <= canvasTop + gutterSize
        ) {
            ballTest = true;
        }

        // ball in win zone
        if(
            ball.top >= winzoneTop
            &&
            ball.top <= winzoneTop + winzoneSize
        ) {
            ballTest = 'win';
        }
    });

    return ballTest;
}

// movement functions
function moveBall() {
    if(testBall() && ballMove) {
        if(testBall() == 'win') {
            win();
            ballMove = false;
        } else {
            ball.top = ball.top + ballMoveBy;
            ball.me.style.top = ball.top;
        }
    }
    if(!testBall() && ballMove) {
        gameOver();
    }
}

function releaseBall() {
    ballMove = true;
}

function reset() {
    ball.top = ball.startTop;
    ball.me.style.top = ball.top;

    ball.left = ball.startLeft;
    ball.me.style.left = ball.left;

    ballMove = false;

    gutters.forEach(gutter => {
        gutter.move = true;
    });

    gutterNext = 0;

    gameoverPanel.style.display = 'none';
}

function stopGutter() {
    gutters[gutterNext].move = false;
    if(gutterNext < (gutters.length -1)) {
        gutterNext++;
    }
}

function moveGutters() {
    gutters.forEach(gutter => {
        if(gutter.move) {
            gutter.right = gutter.left + gutterSize;
            
            if(gutter.direction == 'right') {
                let newGutterRight = gutter.right + gutterMoveBy;
                if(newGutterRight > canvasRight) {
                    gutter.direction = 'left';
                } else {
                    gutter.left = gutter.left + gutterMoveBy;
                    gutter.me.style.left = gutter.left;
                }
            }

            if(gutter.direction == 'left') {
                let newGutterLeft = gutter.left - gutterMoveBy;
                if(newGutterLeft < canvasLeft) {
                    gutter.direction = 'right';
                } else {
                    gutter.left = newGutterLeft;
                    gutter.me.style.left = gutter.left;
                }   
            }
        }
    });
}

function initialise() {
    // canvas
    canvas = document.createElement('div');
    canvas.style.position = 'absolute';
    canvas.style.top = canvasTop;
    canvas.style.left = canvasLeft;
    canvas.style.height = canvasSize;
    canvas.style.width = canvasSize;
    canvas.style.backgroundColor = '#eee';
    canvas.style.zIndex = 0;
    document.body.appendChild(canvas);

    // ball
    ball.me = document.createElement('img');
    ball.me.setAttribute('src','ball.png');
    ball.me.style.position = 'absolute';
    ball.me.style.top = ball.startTop;
    ball.me.style.left = ball.startLeft;
    ball.me.style.display = 'block';
    ball.me.style.height = ballSize;
    ball.me.style.width = ballSize;
    ball.me.style.zIndex = 10;
    document.body.appendChild(ball.me);

    // gutters
    gutters.forEach(gutter => {
        gutter.me = document.createElement('div');
        document.body.appendChild(gutter.me);
        gutter.me.style.position = 'absolute';
        gutter.me.style.backgroundColor = '#666';
        gutter.me.style.height = gutterSize;
        gutter.me.style.width = gutterSize;
        gutter.direction = 'right';
        gutter.move = true;

        gutter.top = canvasTop + gutter.top;
        gutter.me.style.top = gutter.top;

        gutter.left = canvasLeft + gutter.left
        gutter.me.style.left = gutter.left;
    });

    // ball release
    let ballReleaseWidth = 100;
    let ballRelease = document.createElement('button');
    document.body.appendChild(ballRelease);
    ballRelease.style.position = 'absolute';
    ballRelease.style.width = ballReleaseWidth;
    ballRelease.style.top = canvasTop - 35;
    ballRelease.style.left = canvasLeft;
    ballRelease.style.fontSize = 21;
    ballRelease.innerHTML = 'Release';
    ballRelease.onclick = releaseBall;

    // ball reset
    let ballResetWidth = 100;
    let ballReset = document.createElement('button');
    document.body.appendChild(ballReset);
    ballReset.style.position = 'absolute';
    ballReset.style.width = ballResetWidth;
    ballReset.style.top = canvasTop - 35;
    ballReset.style.left = canvasLeft + ballReleaseWidth + 20;
    ballReset.style.fontSize = 21;
    ballReset.innerHTML = 'Reset';
    ballReset.onclick = reset;

    // gutter stop
    let gutterStopWidth = 100;
    let gutterStop = document.createElement('button');
    document.body.appendChild(gutterStop);
    gutterStop.style.position = 'absolute';
    gutterStop.style.width = gutterStopWidth;
    gutterStop.style.top = canvasTop - 35;
    gutterStop.style.left = canvasLeft + ballReleaseWidth + ballResetWidth + 40;
    gutterStop.style.fontSize = 21;
    gutterStop.innerHTML = 'Stop';
    gutterStop.onclick = stopGutter;

    // game over panel
    gameoverPanel = document.createElement('div');
    gameoverPanel.style.position = 'absolute';
    gameoverPanel.style.display = 'none';
    gameoverPanel.style.top = canvasTop;
    gameoverPanel.style.left = canvasLeft;
    gameoverPanel.style.height = canvasSize;
    gameoverPanel.style.width = canvasSize;
    gameoverPanel.style.backgroundColor = '#f00';
    gameoverPanel.style.zIndex = 100;
    gameoverPanel.innerHTML = 'GAME<br />OVER'
    gameoverPanel.style.textAlign = 'center';
    gameoverPanel.style.fontSize = '48px';
    gameoverPanel.style.fontFamily = 'monospace';
    gameoverPanel.style.color = '#fff';
    gameoverPanel.style.paddingTop = canvasSize / 3;
    gameoverPanel.style.boxSizing = 'border-box';
    document.body.appendChild(gameoverPanel);

    // win panel
    winPanel = document.createElement('div');
    winPanel.style.position = 'absolute';
    winPanel.style.display = 'none';
    winPanel.style.top = canvasTop;
    winPanel.style.left = canvasLeft;
    winPanel.style.height = canvasSize;
    winPanel.style.width = canvasSize;
    winPanel.style.backgroundColor = '#060';
    winPanel.style.zIndex = 100;
    winPanel.innerHTML = 'WINNER'
    winPanel.style.textAlign = 'center';
    winPanel.style.fontSize = '48px';
    winPanel.style.fontFamily = 'monospace';
    winPanel.style.color = '#fff';
    winPanel.style.paddingTop = canvasSize / 3;
    winPanel.style.boxSizing = 'border-box';
    document.body.appendChild(winPanel);

    // win zone
    winZone = document.createElement('div');
    winZone.style.position = 'absolute';
    winZone.style.display = 'block';
    winZone.style.top = canvasTop + canvasSize - gutterSize;
    winZone.style.left = canvasLeft;
    winZone.style.height = winzoneSize;
    winZone.style.width = canvasSize;
    winZone.style.backgroundColor = '#9e9';
    winZone.style.zIndex = 5;
    document.body.appendChild(winZone);
}