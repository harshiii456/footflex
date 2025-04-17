// shoe-ecommerce/public/js/game.js
document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('startGame');
    const gameResultDiv = document.getElementById('gameResult');

    if (startGameButton) {
        startGameButton.addEventListener('click', async () => {
            // Example game logic (replace with your actual game)
            const gameResults = { score: Math.floor(Math.random() * 100) }; // Example score

            const response = await fetch('/api/game/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameResults)
            });

            const coupon = await response.json();

            if (coupon) {
                gameResultDiv.textContent = `You won! Use coupon: ${coupon.code}`;
            } else {
                gameResultDiv.textContent = 'You did not win.';
            }
        });
    }
});