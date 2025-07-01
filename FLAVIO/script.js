const perguntas = [
  {
    pergunta: "Quem é o pai do Naruto?",
    opcoes: ["Minato Namikaze", "Jiraiya", "Kakashi", "Sasuke"],
    resposta: "Minato Namikaze"
  },
  {
    pergunta: "Qual o nome do clã do Sasuke?",
    opcoes: ["Hyuga", "Uzumaki", "Uchiha", "Nara"],
    resposta: "Uchiha"
  },
  {
    pergunta: "Qual o nome da raposa selada no Naruto?",
    opcoes: ["Kurama", "Shukaku", "Gyuki", "Matatabi"],
    resposta: "Kurama"
  },
  {
    pergunta: "Quem treinou o time 7 inicialmente?",
    opcoes: ["Iruka", "Kakashi", "Yamato", "Asuma"],
    resposta: "Kakashi"
  }
];

let indiceAtual = 0;
let pontuacao = 0;
let respostaSelecionada = null;

const quiz = document.getElementById("quiz");
const botaoProxima = document.getElementById("next");
const resultado = document.getElementById("resultado");
const progresso = document.getElementById("progresso");
const feedback = document.getElementById("feedback");

const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaFinal = document.getElementById("tela-final");
const btnIniciar = document.getElementById("btn-iniciar");
const btnVoltar = document.getElementById("btn-voltar");
const btnReiniciar = document.getElementById("btn-reiniciar");

btnIniciar.addEventListener("click", () => {
  telaInicial.style.display = "none";
  telaQuiz.style.display = "block";
  iniciarQuiz();
});

btnVoltar.addEventListener("click", () => {
  window.location.href = "../index.html";
});

btnReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  pontuacao = 0;
  respostaSelecionada = null;
  telaFinal.style.display = "none";
  telaQuiz.style.display = "block";
  iniciarQuiz();
});

function iniciarQuiz() {
  carregarPergunta();
}

function carregarPergunta() {
  const perguntaAtual = perguntas[indiceAtual];
  progresso.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  quiz.innerHTML = `
    <div class="question">${perguntaAtual.pergunta}</div>
    <div class="options">
      ${perguntaAtual.opcoes.map(opcao => `
        <div class="option">${opcao}</div>
      `).join('')}
    </div>
  `;

  feedback.textContent = '';
  botaoProxima.disabled = true;
  respostaSelecionada = null;

  const opcoes = document.querySelectorAll(".option");
  opcoes.forEach(option => {
    option.addEventListener("click", () => {
      opcoes.forEach(o => o.classList.remove("selected"));
      option.classList.add("selected");
      respostaSelecionada = option.textContent;
      botaoProxima.disabled = false;
    });
  });
}

botaoProxima.addEventListener("click", () => {
  const respostaCorreta = perguntas[indiceAtual].resposta;

  if (respostaSelecionada === respostaCorreta) {
    pontuacao++;
    feedback.textContent = "✅ Resposta correta!";
  } else {
    feedback.textContent = `❌ Resposta errada!`;
  }

  botaoProxima.disabled = true;

  setTimeout(() => {
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
      carregarPergunta();
    } else {
      mostrarResultado();
    }
  }, 1500);
});

function mostrarResultado() {
  telaQuiz.style.display = "none";
  telaFinal.style.display = "block";

  let emoji = "😐";
  if (pontuacao === perguntas.length) emoji = "😎";
  else if (pontuacao < 2) emoji = "😢";

  resultado.innerHTML = `Você acertou <strong>${pontuacao} de ${perguntas.length}</strong> perguntas!<br>${emoji}`;
}

const btnVoltarFinal = document.getElementById("btn-voltar-final");
btnVoltarFinal.addEventListener("click", () => {
  window.location.href = "../index.html";
});
