const todosEmojis = [
  '🍥','🥷','🔁','💨','🔥','🌊','💎','🔴',
  '🐸','🐍','🐌','☀️','🌙','🌀','⚡','💥',
  '🎭','🪦','🎌','👁️‍🗨️'
];

const niveis = {
  facil: 4,
  medio: 6,
  dificil: 8,
  insano: 12
};

let nivelAtual = 'facil';
let pares = 4;
let vidas = 5;
let cards = [];
let firstCard = null;
let secondCard = null;
let lock = false;
let matchedCount = 0;

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const vidasDiv = document.getElementById('vidas');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function mostrarTela(id) {
  document.querySelectorAll('.tela').forEach(t => t.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function mostrarTelaNivel() {
  mostrarTela('tela-nivel');
}

function voltarInicio() {
  mostrarTela('tela-inicial');
}

function atualizarVidas() {
  vidasDiv.textContent = '❤️'.repeat(vidas);
}

function iniciarJogo(nivel) {
  nivelAtual = nivel;
  pares = niveis[nivel];
  vidas = 5;
  matchedCount = 0;
  firstCard = null;
  secondCard = null;
  lock = false;
  message.textContent = '';
  gameBoard.innerHTML = '';
  atualizarVidas();

  const selecionados = shuffle(todosEmojis).slice(0, pares);
  cards = shuffle([...selecionados, ...selecionados]);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.emoji = emoji;
    card.textContent = '';
    card.addEventListener('click', virarCarta);
    gameBoard.appendChild(card);
  });

  mostrarTela('tela-jogo');
}

function virarCarta() {
  if (lock || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.textContent = this.dataset.emoji;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lock = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCount++;

    if (matchedCount === pares) {
      setTimeout(() => mostrarTela('tela-vitoria'), 800);
    }

    resetarSelecao();
  } else {
    vidas--;
    atualizarVidas();

    if (vidas === 0) {
      setTimeout(() => mostrarTela('tela-derrota'), 800);
    }

    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetarSelecao();
    }, 1000);
  }
}

function resetarSelecao() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

mostrarTela('tela-inicial');

function voltarCentral() {
  window.location.href = "../index.html"; // Troque para sua URL real
}