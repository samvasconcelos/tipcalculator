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
  removeOutlineGorjeta();
  valorContaInput.value = "";
  valorContaInput.disabled = true;
  setTimeout(() => {
    valorContaInput.disabled = false;
  }, 1100);
};

// Remove o Outline dos Botões da Gorjeta
function removeOutlineGorjeta() {
  gorjeta10.classList.remove("outline");
  gorjeta15.classList.remove("outline");
  gorjeta20.classList.remove("outline");
}

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
  removeOutlineGorjeta();
  btn.classList.add("outline");
}

// Checar se valor da Conta é um número ou não.
function checarValorConta() {
  // Se valor da conta incluir "," e "-"
  if (valorConta.includes(",") && valorConta.includes("-")) {
    alertaText.textContent =
      "Please, use positive numbers and a dot instead of coma!";
    modalAlertaDisplay();
  }
  // Se incluir "-"
  else if (valorConta.includes("-")) {
    alertaText.textContent = "Type a positive number, please!";
    modalAlertaDisplay();
  }
  // Se incluir ","
  else if (valorConta.includes(",")) {
    alertaText.textContent = `Please, use a dot instead of coma for the decimals!`;
    modalAlertaDisplay();
  }
  // Se valor da conta não for um número
  if (isNaN(valorConta)) {
    alertaText.textContent = "Typed value is not a number!";
    modalAlertaDisplay();
  }
  // Se valor da conta estiver vazio
  else if (valorConta === "") {
    alertaText.textContent = "No value!";
    modalAlertaDisplay();
  }
}

// Display valor da conta sem Gorjeta
function valorFinalSemGorjeta() {
  if (gorjeta === 0) {
    console.log(`Tip: 0%`);
    valorFinal = Number(valorConta).toFixed(2);
    console.log(`Tip : $0`);
    console.log(`Final bill: $${valorFinal}\n`);
    valorFinalEl.textContent = valorFinal;
    valorContaEl.textContent = valorFinal;
  }
}

// Display valor da conta com Gorjeta
function valorFinalComGorjeta() {
  gorjeta *= Number(valorConta);
  gorjeta = gorjeta.toFixed(2);
  valorFinal = (Number(valorConta) + Number(gorjeta)).toFixed(2);
  console.log(`Tip: $${gorjeta}`);
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
  console.log(`\nBill value: $${valorConta}`);

  /* Checar se o valor da conta é numeral, ou um número negativo, 
  ou se contém vírgula ( , ) em vez de ponto ( . ) */
  checarValorConta();

  // Se gorjeta for = 0
  valorFinalSemGorjeta();

  // Se valor da Conta estiver OK e Gorjeta for maior que 0
  valorFinalComGorjeta();

  console.log(`Final bill: $${valorFinal}\n`);
  valorContaEl.textContent = valorConta;
  valorGorjetaEl.textContent = gorjeta;
  valorFinalEl.textContent = valorFinal;
  reset();
});
