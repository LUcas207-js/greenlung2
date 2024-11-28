const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const scoreElement = document.getElementById('score');
const discountsElement = document.getElementById('discounts');
const redeemButton = document.getElementById('redeem-button');
const redeemAnimation = document.getElementById('redeem-animation');
const couponMessage = document.getElementById('coupon-message');
// Ajusta o tamanho do canvas para a tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Variáveis do jogo
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 2, dy: 2, radius: 20 }; // Aumenta o raio da bola
let paddle = { width: 300, height: 40, x: canvas.width / 2 - 150, y: canvas.height - 60 }; // Aumenta a largura e altura da raquete
let score = 0;
let speed = 1;
let gameOver = false;
// Carregar as imagens
let ballImage = new Image();
let paddleImage = new Image();
ballImage.src = 'images/ball.png'; // Certifique-se de que o caminho da imagem está correto
paddleImage.src = 'images/paddle.png'; // Certifique-se de que o caminho da imagem está correto
// Função para desenhar a bola com a imagem
function drawBall() {
 ctx.drawImage(ballImage, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}
// Função para desenhar a raquete com a imagem
function drawPaddle() {
 ctx.drawImage(paddleImage, paddle.x, paddle.y, paddle.width, paddle.height);
}
// Função para atualizar a pontuação
function updateScore() {
 scoreElement.textContent = `Score: ${score}`;
}
// Função para verificar os descontos
function checkDiscounts() {
 // Mostrar os descontos baseados na pontuação
 if (score >= 100 && score < 250) {
   discountsElement.style.display = 'block';
   redeemAnimation.style.display = 'block'; // Inicia a animação de "RESGATAR"
 }
}
// Função para mover a bola
function moveBall() {
 ball.x += ball.dx * speed;
 ball.y += ball.dy * speed;
 // Colisões nas bordas
 if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx *= -1;
 if (ball.y - ball.radius < 0) ball.dy *= -1;
 // Colisão com a raquete
 if (
   ball.y + ball.radius > paddle.y &&
   ball.x > paddle.x &&
   ball.x < paddle.x + paddle.width
 ) {
   ball.dy *= -1;
   score += 2; // Aumenta 2 pontos na colisão
   speed += 0.1; // Aumenta a dificuldade
   updateScore();
   checkDiscounts(); // Verifica e mostra descontos conforme a pontuação
 }
 // Fim de jogo
 if (ball.y - ball.radius > canvas.height) {
   gameOver = true;
   alert('Game Over! Refresh to play again.');
 }
}
// Função para desenhar a tela do jogo
function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawBall();
 drawPaddle();
}
// Função principal de loop do jogo
function gameLoop() {
 if (!gameOver) {
   moveBall();
   draw();
   requestAnimationFrame(gameLoop);
 }
}
// Controle da raquete com o mouse
document.addEventListener('mousemove', (e) => {
 const rect = canvas.getBoundingClientRect();
 const mouseX = e.clientX - rect.left;
 paddle.x = Math.max(0, Math.min(mouseX - paddle.width / 2, canvas.width - paddle.width));
});
// Inicializa o jogo
startButton.addEventListener('click', () => {
 gameOver = false;
 score = 0;
 speed = 1;
 ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, radius: 40 };
 updateScore();
 discountsElement.style.display = 'none';
 redeemAnimation.style.display = 'none'; // Esconde a animação
 couponMessage.style.display = 'none'; // Esconde a mensagem do cupom
 gameLoop();
});
// Quando o jogador clica no botão "RESGATAR"
redeemButton.addEventListener('click', () => {
 couponMessage.style.display = 'block';
 couponMessage.textContent = 'PARABÉNS, SEU CUPOM DE 10% DE DESCONTO EM TODA LOJA É: APERTA10';
 redeemAnimation.style.display = 'none'; // Esconde o botão "RESGATAR" após o clique
});