export function showSorterGame() {
    document.querySelector('script').src = './sorter.js';

    const styles = document.querySelector('link');
    styles.href = '../style/sorter.css';

    document.querySelector('.container').innerHTML = '';


    const APP = document.querySelector('.container');
    const GRID_WIDTH = 5;
    const AIR_HEIGHT = 8;

    const AIR_SIZE = GRID_WIDTH * AIR_HEIGHT;

    let containers = [
        {
            sort: 'bio',
            color: 'url(./img-sorter/containers/bio.png)',
        },
        {
            sort: 'paper',
            color: 'url(./img-sorter/containers/paper.png)',
        },
        {
            sort: 'plastic',
            color: 'url(./img-sorter/containers/plastic.png)',
        },
        {
            sort: 'glass',
            color: 'url(./img-sorter/containers/glass.png)',
        },
        {
            sort: 'mix',
            color: 'url(./img-sorter/containers/mix.png)',
        },
    ];

    const trash = [
        {
            sort: 'plastic',
            path: 'url(./img-sorter/trash/aluminium-foil.png)',
        },
        {
            sort: 'plastic',
            path: 'url(./img-sorter/trash/plastic-bag.png)',
        },
        {
            sort: 'plastic',
            path: 'url(./img-sorter/trash/plastic-bottle.png)',
        },
        {
            sort: 'plastic',
            path: 'url(./img-sorter/trash/puszka.png)',
        },
        {
            sort: 'glass',
            path: 'url(./img-sorter/trash/glass_bottle.png)',
        },
        {
            sort: 'glass',
            path: 'url(./img-sorter/trash/glass-bottles.png)',
        },
        {
            sort: 'paper',
            path: 'url(./img-sorter/trash/box-paper.png)',
        },
        {
            sort: 'paper',
            path: 'url(./img-sorter/trash/newspaper.png)',
        },
        {
            sort: 'bio',
            path: 'url(./img-sorter/trash/apple.png)',
        },
        {
            sort: 'bio',
            path: 'url(./img-sorter/trash/banana.png)',
        },
        {
            sort: 'bio',
            path: 'url(./img-sorter/trash/leaves.png)',
        },
        {
            sort: 'mix',
            path: 'url(./img-sorter/trash/cup-mix.png)',
        },
        {
            sort: 'mix',
            path: 'url(./img-sorter/trash/tube.png)',
        },
        {
            sort: 'mix',
            path: 'url(./img-sorter/trash/fish-bone.png)',
        },
        {
            sort: 'mix',
            path: 'url(./img-sorter/trash/toy.png)',
        },
    ];

    let width = GRID_WIDTH;
    let interval = 1000;
    let timerId;
    let nextRandom = 0;
    let score = 0;
    let lives = 3;
    let countForSpeed = 0; //for speedUp() function

    //create all the cells for grid

    const grid = createGrid();
    const scoreDisplay = createScoreDisplay();
    const gameOverDisplay = gameOverMenu();

    let cells = Array.from(document.querySelectorAll('.cell'));
    const showScore = document.querySelector('.score_current');
    const showLives = document.querySelector('.lives_current');
    const startButton = document.querySelector('.btn-start');
    
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');


    function createGrid() {
        let cellsWrapper = document.createElement('div');
        cellsWrapper.classList.add('wrapper');
        APP.appendChild(cellsWrapper);

        for (let i = 0; i < AIR_SIZE; i++) {
            let gridElement = document.createElement('div');
            gridElement.classList.add('cell');
            gridElement.classList.add('trash');
            cellsWrapper.appendChild(gridElement);
        }

        containers.forEach((el) => {
            let gridElement = document.createElement('div');
            gridElement.classList.add('cell');
            gridElement.classList.add('containers');
            gridElement.setAttribute('sort', `${el.sort}`);
            gridElement.style.backgroundImage = el.color;
            cellsWrapper.appendChild(gridElement);
        });
    }

    function createScoreDisplay() {
        let display = document.createElement('section');
        display.classList.add('score');
        let h2Score = document.createElement('h2');
        h2Score.innerHTML = 'Score';
        h2Score.classList.add('score_heading');
        display.appendChild(h2Score);
        let scoreDiv = document.createElement('div');
        scoreDiv.classList.add('score_current');
        scoreDiv.innerHTML = '0';
        display.appendChild(scoreDiv);
        let h3Lives = document.createElement('h3');
        h3Lives.innerHTML = 'Lives';
        h3Lives.classList.add('score_lives-heading');
        display.appendChild(h3Lives);
        let livesDiv = document.createElement('div');
        livesDiv.classList.add('lives_current');
        livesDiv.innerHTML = '3';
        display.appendChild(livesDiv);
        APP.appendChild(display);
        let startBtn = document.createElement('button');
        startBtn.classList.add('btn-start');
        startBtn.classList.add('btn');
        startBtn.innerHTML = 'Start';
        display.appendChild(startBtn);
    }

    function gameOverMenu() {
        let gameOverWrapper = document.createElement('div');
        gameOverWrapper.classList.add('game-over');
        gameOverWrapper.innerHTML = '<h2>Oops... The game is over!</h2><h3>Your score is:</h3>';
        APP.appendChild(gameOverWrapper);
    }

    startButton.addEventListener('click', () => {
        if (startButton.innerHTML === 'Start') {
            startButton.innerHTML = 'Pause';
        } else startButton.innerHTML = 'Start';
        if (timerId) {
            document.removeEventListener('keydown', control);
            clearInterval(timerId);
            timerId = null;
        } else {
            document.addEventListener('keydown', control);
            draw();
            timerId = setInterval(move, 1000);
            nextRandom = Math.floor(Math.random() * trash.length);
        }
    });

    function control(e) {
        if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 40) {
            move();
        }
    }

    let random = Math.floor(Math.random() * trash.length);
    let current = trash[random];

    //move the trash down -- move()
    let currentPosition = 2;

    function draw() {
        cells[currentPosition].style.backgroundImage = current.path;
    }

    function undraw() {
        cells[currentPosition].style.backgroundImage = 'none';
    }

    function move() {
        undraw();
        currentPosition = currentPosition += width;
        stopMoving();
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRight = currentPosition % width === width - 1;
        if (!isAtRight) currentPosition += 1;
        draw();
    }

    function moveLeft() {
        undraw();
        const isAtRight = currentPosition % width === 0;
        if (!isAtRight) currentPosition -= 1;
        draw();
    }

    function stopMoving() {
        // if 'containers' are on the next row
        if (cells[currentPosition].classList.contains('containers')) {
            addScore();

            // start a new item falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * trash.length);
            current = trash[random];
            currentPosition = 2;
            speedUp();
            gameOver();
        }
    }

    function addScore() {
        if (cells[currentPosition].getAttribute('sort') === current.sort) {
            score += 10;
            showScore.textContent = score;
        } else {
            lives -= 1;
            showLives.textContent = lives;
        }
    }

    function speedUp() {
        if (countForSpeed === 5) {
            countForSpeed = 0;
            clearInterval(timerId);
            timerId = setInterval(move, (interval -= 100));
        } else {
            countForSpeed += 1;
        }
    }

    function gameOver() {
        if (lives === 0) {
            clearInterval(timerId);
            timerId = null;
            addTheLastScore();
            document.querySelector('.game-over').classList.add('active');
            document.querySelector('.score').classList.add('hidden');
            document.removeEventListener('keydown', control);
        }
    }

    function addTheLastScore() {
        let lastScoreWrapper = document.createElement('div');
        lastScoreWrapper.classList.add('game-over__score');

        let scoreDiv = document.createElement('div');
        scoreDiv.classList.add('game-over__score_value');
        let currentScore = document.querySelector('.score_current');
        localStorage.sorterScore = currentScore.innerHTML;
        scoreDiv.textContent = currentScore.innerHTML;
        lastScoreWrapper.appendChild(scoreDiv);

        let restartBtn = document.createElement('button');
        restartBtn.classList.add('btn-restart');
        restartBtn.classList.add('btn');
        restartBtn.innerHTML = 'Restart';
        lastScoreWrapper.appendChild(restartBtn);
        restartBtn.addEventListener('click', restartFn);

        let gameOverParent = document.querySelector('.game-over');
        gameOverParent.appendChild(lastScoreWrapper);
    }

    function restartFn() {
        document.location.reload();
    }
}