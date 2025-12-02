window.addEventListener('load', function() {
    // Main player logic
    // Add main variables
    const player = document.getElementById('player');
    const lanePositions = [50, 150, 250];
    let currentLane = 1;

    function moveLeft() {
        if (currentLane > 0) {
            currentLane--;
            updatePlayerPosition();
        }
    }

    function moveRight() {
        if (currentLane < 2) {
            currentLane++;
            updatePlayerPosition();
        }
    }

    function updatePlayerPosition() {
        const x = lanePositions[currentLane];
        player.style.transform = `translateX(${x}px)`;  
    }

    // Example key controls
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft"){
            moveLeft();
        } 
        if (e.key === "ArrowRight"){
            moveRight();
        } 
    });

    // Iniatilize player
    updatePlayerPosition();

    // Main obstacles logic

    const game = document.getElementById('game');

    // Configurable values
    const spawnInterval = 1200;        // ms between spans
    const obstacleSpeed = 4;           // fall speed
    const obstacleWidth = 50;
    const obstacleHeight = 80;

    let obstacles = [];
    let gameOver = false;

    // Spawn obstacles
    function spawnObstacle() {
        if (gameOver) return;

        const lane = Math.floor(Math.random() * 3);
        const x = lanePositions[lane];

        const ob = document.createElement('div');
        ob.classList.add('obstacle');
        ob.style.left = x + 'px';
        ob.style.top = '-100px';

        game.appendChild(ob);

        obstacles.push({
            element: ob,
            lane: lane,
            y: -100
        });
    }

    setInterval(spawnObstacle, spawnInterval);

    // Collision check
    function checkCollision(a, b) {
        const r1 = a.getBoundingClientRect();
        const r2 = b.getBoundingClientRect();

        return !(
            r1.right < r2.left ||
            r1.left > r2.right ||
            r1.bottom < r2.top ||
            r1.top > r2.bottom
        );
    }

    // End game
    function endGame() {
        if (gameOver) return;
        gameOver = true;
        alert("Game Over!");
    }

    // Obstacle animation loop
    function updateObstacles() {
        if (!gameOver) {
            for (let i = obstacles.length - 1; i >= 0; i--) {
                const ob = obstacles[i];

                ob.y += obstacleSpeed;
                ob.element.style.transform = `translateY(${ob.y}px)`;

                // collision test
                if (checkCollision(player, ob.element)) {
                    endGame();
                    return;
                }

                // remove offscreen
                if (ob.y > game.offsetHeight + 100) {
                    ob.element.remove();
                    obstacles.splice(i, 1);
                }
            }
        }

        requestAnimationFrame(updateObstacles);
    }

    requestAnimationFrame(updateObstacles);
});
