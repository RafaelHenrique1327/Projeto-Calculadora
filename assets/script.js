const display = document.querySelector('.calculator__output');
const teclas = document.querySelectorAll('.calculator__key');
const operadores = document.querySelectorAll('.calculator__key--operator');
const enter = document.querySelector('.calculator__key--enter');
const clean = document.querySelector('.calculator__key--cleanDisplay');
const dot = document.querySelector('.calculator__key--dot');

let novoNumero = true;
let operador;
let numeroAnterior;

const operadorPendente = () => operador !== undefined;

const calcular = () => {
    if(operadorPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        let resultado;
        switch (operador) {
            case '+':
                resultado = numeroAnterior + numeroAtual;
                break;
            case '-':
                resultado = numeroAnterior - numeroAtual;
                break;
            case 'x':
                resultado = numeroAnterior * numeroAtual;
                break;
            case '/':
                resultado = numeroAnterior / numeroAtual;
                break;
            default:
                return;
        }
        
        atualizarDisplay(resultado);
    }
}

const atualizarDisplay = (texto) => {
    if(novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    }else {
        display.textContent += texto;
    }
    
}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
teclas.forEach((numero) =>  numero.addEventListener('click', inserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',','.'));
    }
}
operadores.forEach((operador) => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined;
}

enter.addEventListener('click', ativarIgual);

const cleanDisplay = () => {
    display.textContent = '';
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;

}
clean.addEventListener('click', cleanDisplay);

const existDot = () => display.textContent.indexOf(',') !== -1;
const existValue = () => display.textContent.length > 0;

const inserirDot = () => {
    if (!existDot()) {
        if (existValue()) {
            atualizarDisplay('.')
        }else {
            atualizarDisplay('0,');
        }
    }
}
dot.addEventListener('click', inserirDot);

const mapaTeclado = {
    '0'        : '.calculator__key[data-key="0"]',
    '1'        : '.calculator__key[data-key="1"]',
    '2'        : '.calculator__key[data-key="2"]',
    '3'        : '.calculator__key[data-key="3"]',
    '4'        : '.calculator__key[data-key="4"]',
    '5'        : '.calculator__key[data-key="5"]',
    '6'        : '.calculator__key[data-key="6"]',
    '7'        : '.calculator__key[data-key="7"]',
    '8'        : '.calculator__key[data-key="8"]',
    '9'        : '.calculator__key[data-key="9"]',
    '+'        : '.calculator__key--operator[data-key="+"]',
    '-'        : '.calculator__key--operator[data-key="-"]',
    'x'        : '.calculator__key--operator[data-key="x"]',
    '/'        : '.calculator__key--operator[data-key="/"]',
    '.'        : '.calculator__key--dot',
    'Enter'    : '.calculator__key--enter',
    'Escape'   : '.calculator__key--cleanDisplay'
}

const mapearTeclado = (evento) => {
        const tecla = evento.key;
        const seletor = mapaTeclado[tecla];
        if (seletor) {
            const elemento = document.querySelector(seletor);
            if (elemento) {
                elemento.click();
            }
    }
}
document.addEventListener('keydown', mapearTeclado);