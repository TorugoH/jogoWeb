let botaoAbreEl = document.querySelector("#botao-modal");
let modalFundoEl = document.querySelector("#modal-fundo");

let botaoFechaEl = document.querySelector("#fechar");

function abreModal(){
    modalFundoEl.classList.add('mostrar');
}

function fechaModal(){
    modalFundoEl.classList.remove('mostrar');
}

botaoAbreEl.addEventListener('click', abreModal);
botaoFechaEl.addEventListener('click', fechaModal);

