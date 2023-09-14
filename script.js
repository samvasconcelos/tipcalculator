"use strict";

// DADOS
const containerDados = document.querySelector(".container__dados");
const containerResultados = document.querySelector(".container__resultados");

const valorContaInput = document.querySelector(".valorConta");
let valorConta = "";
const gorjeta10 = document.querySelector(".gorjeta__10_btn");
const gorjeta15 = document.querySelector(".gorjeta__15_btn");
const gorjeta20 = document.querySelector(".gorjeta__20_btn");
const calcularBtn = document.querySelector(".calcular_btn");
const alertaText = document.querySelector(".alerta_text");

// RESULTADOS VISIVEIS NA TELA
const valorGorjetaEl = document.querySelector(".valorGorjetaEl");
const valorFinalEl = document.querySelector(".valorFinalEl");
const valorContaEl = document.querySelector(".valorContaEl");

let valorFinal = "";
const modal = document.querySelector(".modal");

let gorjeta = 0;

//-----------------
//    FUNCTIONS
// ----------------

// Zerar dados e input
const reset = function () {
  valorConta = 0;
  valorFinal = 0;
  gorjeta = 0;
  valorContaInput.value = "";
  valorContaInput.disabled = true;
  setTimeout(() => {
    valorContaInput.disabled = false;
  }, 1100);
};

// Tornar visível Modal Alerta de Erro
function modalAlertaDisplay() {
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 3000);
  reset();
}

function selecionarGorjeta(btn) {
  console.log(`Gorjeta atual: ${gorjeta * 100}%\n`);

  gorjeta10.classList.remove("outline");
  gorjeta15.classList.remove("outline");
  gorjeta20.classList.remove("outline");

  btn.classList.add("outline");
}

// Checar se valor da Conta é um número ou não.
function checarValorConta() {
  // Se valor da conta incluir "," e "-"
  if (valorConta.includes(",") && valorConta.includes("-")) {
    alertaText.textContent =
      "Utilize números positivos e ponto no lugar da vírgula, por favor!";
    modalAlertaDisplay();
  }
  // Se incluir "-"
  else if (valorConta.includes("-")) {
    alertaText.textContent = "Digite um valor positivo, por favor";
    modalAlertaDisplay();
  }
  // Se incluir ","
  else if (valorConta.includes(",")) {
    alertaText.textContent = `Utilize um ponto ao invés de vírgula para as casas decimais!`;
    modalAlertaDisplay();
  }
  // Se valor da conta não for um número
  if (isNaN(valorConta)) {
    alertaText.textContent = "Valor digitado não é um número!";
    modalAlertaDisplay();
  }
  // Se valor da conta estiver vazio
  else if (valorConta === "") {
    alertaText.textContent = "Nenhum valor digitado!";
    modalAlertaDisplay();
  }
}

// Display valor da conta sem Gorjeta
function valorFinalSemGorjeta() {
  if (gorjeta === 0) {
    console.log(`Gorjeta: 0%`);
    valorFinal = Number(valorConta).toFixed(2);
    console.log(`Valor da Gorjeta: R$0 reais`);
    console.log(`Valor da Conta Final: R$${valorFinal} reais\n`);
    valorFinalEl.textContent = valorFinal;
    valorContaEl.textContent = valorFinal;
  }
}

// Display valor da conta com Gorjeta
function valorFinalComGorjeta() {
  gorjeta *= Number(valorConta);
  gorjeta = gorjeta.toFixed(2);
  valorFinal = (Number(valorConta) + Number(gorjeta)).toFixed(2);
  console.log(`Valor da Gorjeta: R$${gorjeta} reais`);
}

////////////////////////////////////////////
/////////////////  START ///////////////////
////////////////////////////////////////////

valorGorjetaEl.textContent = "0.00";
valorFinalEl.textContent = "0.00";
valorContaEl.textContent = "0.00";

// TIP BUTTONS EVENT-LISTENERS
gorjeta10.addEventListener("click", function () {
  gorjeta = 0.1;
  selecionarGorjeta(this);
});

gorjeta15.addEventListener("click", function () {
  gorjeta = 0.15;
  selecionarGorjeta(this);
});

gorjeta20.addEventListener("click", function () {
  gorjeta = 0.2;
  selecionarGorjeta(this);
});

// BOTÃO CALCULAR EVENT-LISTENER
calcularBtn.addEventListener("click", function () {
  // ABRIR CONTAINER RESULTADO
  containerDados.style.transform = `translateX(0%)`;
  containerResultados.style.transform = `translateX(-10%)`;
  containerResultados.style.boxShadow = `0 10px 35px #333333a5`;

  valorConta = valorContaInput.value;
  console.log(`\nValor da Conta: R$${valorConta} reais`);

  /* Checar se o valor da conta é numeral, ou um número negativo, 
  ou se contém vírgula ( , ) em vez de ponto ( . ) */
  checarValorConta();
  console.log(valorConta, gorjeta);

  // Se gorjeta for = 0

  valorFinalSemGorjeta();

  // Se valor da Conta estiver OK e Gorjeta for maior que 0
  valorFinalComGorjeta();

  console.log(`Valor da Conta Final: R$${valorFinal} reais\n`);
  valorContaEl.textContent = valorConta;
  valorGorjetaEl.textContent = gorjeta;
  valorFinalEl.textContent = valorFinal;
  reset();
});
