// interacao.js — versão melhorada
function acabarFaseDerrota() {
  clearInterval(timerInterval);
  jogoAtivo = false;
  mostrarMensagem(`😢 Fim de jogo! Palavra: ${palavraAtual}`);
  // desativa teclado
  const botoes = boxTeclado.querySelectorAll("button");
  botoes.forEach((b) => (b.disabled = true));
}

function fimDoJogoVitoria() {
  clearInterval(timerInterval);
  jogoAtivo = false;
  palavraEl.textContent = "—";
  boxTeclado.innerHTML = "";
  mostrarMensagem("🏆 Você venceu todas as palavras! Parabéns!");
  btnIniciar.disabled = false;
  btnReiniciar.disabled = true;
}

function resetTimer(segundos) {
  clearInterval(timerInterval);
  let restante = segundos;
  tempoEl.textContent = formatarTempo(restante);
  timerInterval = setInterval(() => {
    restante--;
    tempoEl.textContent = formatarTempo(restante);
    if (restante <= 0) {
      clearInterval(timerInterval);
      mostrarMensagem("⏰ Tempo esgotado! Vida perdida.");
      perderVida();
      // se ainda houver vidas e jogo ativo, avisa e segue
      if (vidas > 0) {
        // reativa teclado e espera
        setTimeout(() => {
          if (jogoAtivo) resetTimer(tempoMax);
        }, 900);
      }
    }
  }, 1000);
}

function formatarTempo(s) {
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function mostrarMensagem(txt) {
  mensagemEl.textContent = txt;
}
