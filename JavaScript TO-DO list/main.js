'use strict';

let bank = [];

const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem ('todoList', JSON.stringify(bank));

const criarItem = (lists, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${lists}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const DoLists = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    DoLists();
    const bank = getBank(); 
    bank.forEach ( (item, indice) => criarItem (item.lists, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const bank = getBank();
        bank.push ({'lists': texto, 'status': ''});
        setBank(bank);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const bank = getBank();
    bank.splice (indice, 1);
    setBank(bank);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const bank = getBank();
    bank[indice].status = bank[indice].status === '' ? 'checked' : '';
    setBank(bank);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();