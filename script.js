// Selecting elements
const coin = document.getElementById('coin');
const flipButton = document.getElementById('flip-button');
const resultDiv = document.getElementById('result');
const side1Input = document.getElementById('side1');
const side2Input = document.getElementById('side2');
const coinSide1 = document.getElementById('coin-side1');
const coinSide2 = document.getElementById('coin-side2');
const coinDraw = document.getElementById('coin-draw');

// Create notification element once
const notificationDiv = document.createElement('div');
notificationDiv.classList.add('notification');
document.body.appendChild(notificationDiv);

// Update coin sides based on input
side1Input.addEventListener('input', () => {
    coinSide1.textContent = side1Input.value || 'Heads';
});

side2Input.addEventListener('input', () => {
    coinSide2.textContent = side2Input.value || 'Tails';
});

// Coin flip logic
flipButton.addEventListener('click', () => {
    // Reset the coin position
    coin.style.transform = 'rotateX(0deg) rotateY(0deg)';

    // Hide result and notification before the flip
    resultDiv.classList.remove('show');
    notificationDiv.classList.remove('show');

    // Hide the coin text during the flip
    coinSide1.style.visibility = 'hidden';
    coinSide2.style.visibility = 'hidden';
    coinDraw.style.visibility = 'hidden';

    // Introduce 1% chance for a draw
    const randomFlip = Math.random();
    const result = randomFlip < 0.01 ? 'draw' : randomFlip < 0.5 ? 'heads' : 'tails';

    // Randomize the flipping angles for heads or tails
    let flipAngleX = Math.floor(Math.random() * 360) + 720; // At least two full flips
    let flipAngleY = 0;

    if (result === 'heads') {
        flipAngleY = 0; // Heads
    } else if (result === 'tails') {
        flipAngleY = 180; // Tails
    } else {
        flipAngleX = 90; // Draw
        flipAngleY = 0;
    }

    // Apply the flipping transformation
    coin.style.transform = `rotateX(${flipAngleX}deg) rotateY(${flipAngleY}deg)`;

    // Show result and confetti after the flip animation finishes (4s for the animation)
    setTimeout(() => {
        let resultText = '';
        if (result === 'heads') {
            resultText = side1Input.value || 'Heads';
        } else if (result === 'tails') {
            resultText = side2Input.value || 'Tails';
        } else {
            resultText = 'Draw';
        }

        // Show the result
        resultDiv.textContent = `Result: ${resultText}`;
        resultDiv.classList.add('show');

        // Show notification
        notificationDiv.textContent = `Congratulations! You got ${resultText}!`;
        notificationDiv.classList.add('show');

        // Restore visibility of the corresponding side text
        if (result === 'heads') {
            coinSide1.style.visibility = 'visible';
        } else if (result === 'tails') {
            coinSide2.style.visibility = 'visible';
        } else {
            coinDraw.style.visibility = 'visible';
        }
    }, 5000); // Matches the 5s animation duration
});
