import { aleatorio, nome } from "./aleatorio.js";
import { perguntas } from "./perguntas.js";

const telaInicial = document.querySelector(".tela-inicial");
const botaoIniciar = document.querySelector(".iniciar-btn");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoJogarNovamente = document.querySelector(".novamente-btn");

let atual = 0;
let historiaFinal = "";
let perguntasCustomizadas = [];

function substituiNome() {
    // Faz uma cópia limpa do arquivo de perguntas para evitar o bug de repetição de nomes
    perguntasCustomizadas = JSON.parse(JSON.stringify(perguntas));
    
    for (const pergunta of perguntasCustomizadas) {
        pergunta.enunciado = pergunta.enunciado.replace(/você/gi, nome);
        for (const alternativa of pergunta.alternativas) {
            alternativa.texto = alternativa.texto.replace(/você/gi, nome);
        }
    }
}

function iniciaJogo() {
    atual = 0;
    historiaFinal = "";
    telaInicial.style.display = "none";
    caixaPerguntas.classList.add("mostrar");
    caixaAlternativas.classList.add("mostrar");
    caixaResultado.classList.remove("mostrar");
    substituiNome();
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntasCustomizadas.length) {
        mostraResultado();
        return;
    }
    
    const perguntaAtual = perguntasCustomizadas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.innerHTML = "";

    for (const alternativa of perguntaAtual.alternativas) {
        const botao = document.createElement("button");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => {
            respostaSelecionada(alternativa);
        });
        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacao = aleatorio(opcaoSelecionada.afirmacao);
    historiaFinal += afirmacao + " ";
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    caixaPerguntas.classList.remove("mostrar");
    caixaAlternativas.classList.remove("mostrar");
    caixaResultado.classList.add("mostrar");
    textoResultado.textContent = `Em 2049, ${nome} ${historiaFinal.trim()}`;
}

function jogaNovamente() {
    caixaResultado.classList.remove("mostrar");
    telaInicial.style.display = "block";
}

botaoIniciar.addEventListener("click", iniciaJogo);
botaoJogarNovamente.addEventListener("click", jogaNovamente);

substituiNome();