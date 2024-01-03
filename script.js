document.addEventListener("DOMContentLoaded", function () {
    const gamePattern = [];
    const userClickedPattern = [];
    const buttonColors = ["green", "red", "yellow", "blue"];
    let level = 0;
    let gameStarted = false;

    document.getElementById("start-btn").addEventListener("click", function () {
        if (!gameStarted) {
            gameStarted = true;
            nextSequence();
        }
    });

    document.querySelectorAll(".btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const userChosenColor = button.id;
            userClickedPattern.push(userChosenColor);
            playSound(userChosenColor);
            animatePress(button.id); // Pass the correct argument

            checkAnswer(userClickedPattern.length - 1);
        });
    });

    function nextSequence() {
        userClickedPattern.length = 0;
        level++;
        updateLevelDisplay();

        const randomNumber = Math.floor(Math.random() * 4);
        const randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        flashColorSequence();
    }

    function flashColorSequence() {
        gamePattern.forEach(function (color, index) {
            setTimeout(function () {
                playSound(color);
                animateColor(color);
            }, 1000 * index);
        });
    }

    function playSound(name) {
        const audio = new Audio(`sounds/${name}.mp3`);
        audio.play();
    }

    function animateColor(color) {
        const button = document.getElementById(color);
        if (button) {
            button.classList.add("pressed");
            setTimeout(function () {
                button.classList.remove("pressed");
            }, 100);
        } else {
            console.error("Element with ID " + color + " not found.");
        }
    }

    function animatePress(color) {
        const button = document.getElementById(color);
        if (button) {
            button.classList.add("pressed");
            setTimeout(function () {
                button.classList.remove("pressed");
            }, 100);
        } else {
            console.error("Element with ID " + color + " not found.");
        }
    }

    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        } else {
            gameOver();
        }
    }

    function gameOver() {
        playSound("wrong");
        document.body.classList.add("game-over");
        setTimeout(function () {
            document.body.classList.remove("game-over");
        }, 200);

        document.getElementById("level-title").textContent = "Game Over, Press Start to Restart";
        level = 0;
        gamePattern.length = 0;
        gameStarted = false;
    }

    function updateLevelDisplay() {
        document.getElementById("level-title").textContent = "Level " + level;
    }
});
