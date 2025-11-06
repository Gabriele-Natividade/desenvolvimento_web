let numeroSecreto;
let vidas;
let nivelSelecionado = 10;
let maxNumero = 100;

const numeroChute = document.getElementById("num1");
const resultado = document.getElementById("txtResultado");
const btnChutar = document.getElementById("btChutar");
const txtStatus = document.getElementById("status");
const btnVoltar = document.getElementById("btVoltar");
const voltarContainer = document.getElementById("voltar-container");
const msgNumero = document.getElementById("msgNumero");
const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");

// Ao carregar, exibe tela inicial com fade
window.addEventListener("load", () => {
    telaInicial.classList.add("mostrar");
});

// Seleção de nível
document.getElementById("nivel-facil").addEventListener("click", () => iniciarJogo(10, 100));
document.getElementById("nivel-medio").addEventListener("click", () => iniciarJogo(5, 100));
document.getElementById("nivel-dificil").addEventListener("click", () => iniciarJogo(10, 200));

btnChutar.addEventListener("click", verificarChute);
btnVoltar.addEventListener("click", voltarMenu);
numeroChute.addEventListener("keydown", e => { if (e.key === "Enter") verificarChute(); });

function iniciarJogo(vidasTotais, max) {
    nivelSelecionado = vidasTotais;
    maxNumero = max;
    msgNumero.innerHTML = `<strong>O número secreto está entre 1 e ${maxNumero}.</strong>`;
    mudarTela(telaInicial, telaJogo);
}

function mudarTela(atual, proxima) {
    atual.classList.remove("mostrar");
    setTimeout(() => {
        atual.style.display = "none";
        proxima.style.display = "block";
        setTimeout(() => proxima.classList.add("mostrar"), 50);
        novoJogo();
    }, 700);
}

function novoJogo() {
    btnChutar.disabled = false;
    numeroChute.disabled = false;
    voltarContainer.style.display = "none";

    numeroSecreto = Math.floor(Math.random() * maxNumero) + 1;
    vidas = nivelSelecionado;
    atualizarVidas();

    numeroChute.value = "";
    resultado.innerHTML = "";
    numeroChute.focus();
}

function verificarChute() {
    const num = Number(numeroChute.value);

    if (isNaN(num) || num < 1 || num > maxNumero) {
        alert(`O palpite deve estar entre 1 e ${maxNumero}!`);
        numeroChute.value = "";
        numeroChute.focus();
        return;
    }

    if (num === numeroSecreto) {
        resultado.innerHTML += `<strong>🎉 Você acertou! O número era ${numeroSecreto}!</strong><br>`;
        fimDeJogo();
    } else {
        resultado.innerHTML += `Palpite: ${num} — O número é ${num > numeroSecreto ? "Menor" : "Maior"}!<br>`;
        vidas--;
        atualizarVidas();
    }

    numeroChute.value = "";
    numeroChute.focus();
}

function atualizarVidas() {
    txtStatus.innerHTML = "♥ ".repeat(vidas);
    if (vidas <= 0) {
        resultado.innerHTML += `<strong>💀 Você perdeu! O número era ${numeroSecreto}.</strong>`;
        fimDeJogo();
    }
}

function fimDeJogo() {
    btnChutar.disabled = true;
    numeroChute.disabled = true;
    voltarContainer.style.display = "block";
}

function voltarMenu() {
    telaJogo.classList.remove("mostrar");
    setTimeout(() => {
        telaJogo.style.display = "none";
        telaInicial.style.display = "block";
        setTimeout(() => telaInicial.classList.add("mostrar"), 50);
        resultado.innerHTML = "";
    }, 700);
}
