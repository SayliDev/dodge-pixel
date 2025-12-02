window.addEventListener('load', function() {
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
});
