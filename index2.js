// configuration
let tick = 50; // milliseconds
let ballMove = true;
let ballMoveBy = 5;
let ballSize = 25;
let gutterSize = 50;
let gutterMoveBy = 5;

// canvas
let canvas = false;
let canvasSize = 500;
let canvasLeft = Math.ceil((window.innerWidth / 2) - (canvasSize / 2));
let canvasTop = 100;

// ball
let ball = {
    startLeft: Math.ceil((canvasSize / 2) + canvasLeft - (ballSize / 2)),
    startTop: 0 + canvasTop,
    left: Math.ceil((canvasSize / 2) + canvasLeft - (ballSize / 2)),
    top: 0 + canvasTop
}


// gutter array
gutters = [
    {
        left: gutterSize,
        top: 0
    },
    {
        left: gutterSize*2,
        top: gutterSize
    },
    {
        left: gutterSize*3,
        top: gutterSize*2
    },
    {
        left: gutterSize*4,
        top: gutterSize*3
    },
    {
        left: gutterSize*5,
        top: gutterSize*4
    },
    {
        left: gutterSize*6,
        top: gutterSize*5
    },
    {
        left: gutterSize*7,
        top: gutterSize*6
    },
    {
        left: gutterSize*8,
        top: gutterSize*7
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
    });

    return ballTest;
}

// movement functions
function moveBall() {
    if(testBall()) {
        ball.top = ball.top + ballMoveBy;
        ball.me.style.top = ball.top;
    }
}

function moveGutters() {
    let canvasRight = canvasLeft + canvasSize;
    
    gutters.forEach(gutter => {
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

        gutter.top = canvasTop + gutter.top;
        gutter.me.style.top = gutter.top;

        gutter.left = canvasLeft + gutter.left
        gutter.me.style.left = gutter.left;
    });
}