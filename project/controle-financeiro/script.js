const UlTransacoes = document.querySelector("#transactions")
const DivReceita = document.querySelector("#money-plus")
const DivDespesa = document.querySelector("#money-minus")
const DivBalanco = document.querySelector("#balance")
const form = document.querySelector('#form')
const inputNomeTransacao = document.querySelector('#text')
const inputValorTransacao = document.querySelector('#amount')
const svg = '<svg fill="#00" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px"><path d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z"/></svg>'

const transacoesNoArmazenamentoLocal = 
    JSON.parse(localStorage.getItem('transacoes'))

let transacoes = localStorage
    .getItem('transacoes') !== null ? transacoesNoArmazenamentoLocal : []

function removerTransacao(id){

    transacoes = transacoes.filter(transacoes => {
        return transacoes.id !== id

    })

    atualizarArmazenamentoLocal()
    init()
}

function adicionarTransacoesAoDom(transacoes){

    const operador = transacoes.valor < 0 ? '-' : ''
    const ClasseCSS = transacoes.valor < 0 ? 'minus' : 'plus'
    const valorComOperador = Math.abs(transacoes.valor)
    const li = document.createElement('li')

    li.classList.add(ClasseCSS, 'transacao-filho')
    li.innerHTML = `
        <p> ${transacoes.nome} </p>
        <span class="valor"> R$ ${operador}${valorComOperador}</span>
        <button class="delete-btn" data-btn-visibilidade="false"
        onclick="removerTransacao(${transacoes.id})">
        ${svg}
        </button>`
        
    UlTransacoes.append(li)
        
}
    
    

function atualizarValores(){

    const valoresTransacoes = transacoes.map(transacoes => transacoes.valor)

    const total = valoresTransacoes
        .reduce((acumulador, transacao)=> acumulador + transacao, 0)
        .toFixed(2)

    const receitas = valoresTransacoes.filter(item => item > 0)
        .reduce((acumulador, valor)=>acumulador + valor,0)
        .toFixed(2)

    const despesas = Math.abs(valoresTransacoes.filter(item => item < 0)
        .reduce((acumulador, valor)=>acumulador + valor,0)
        .toFixed(2))


    DivBalanco.innerHTML = `<span>R$</span> ${total}`
    DivReceita.textContent = `R$ ${receitas}`
    DivDespesa.textContent = `R$ ${despesas}`

}

function init(){

    UlTransacoes.innerHTML = ''
    transacoes.forEach(adicionarTransacoesAoDom)
    atualizarValores()
    identificarListas()
}

init()

function atualizarArmazenamentoLocal(){

    localStorage.setItem('transacoes', JSON.stringify(transacoes))

}

form.addEventListener('submit', lidandoComForm)

function lidandoComForm(evento){

    evento.preventDefault();

    const nomeTransacao = inputNomeTransacao.value.trim()
    const valorTransacao = inputValorTransacao.value.trim()

    const checarSeInputEstaVazio = inputNomeTransacao.value.trim() === '' || inputValorTransacao.value.trim() === ''
    if(checarSeInputEstaVazio){
        alerta()
        return
    }

    const transacao = {

        id: +geradorID(),
        nome: nomeTransacao,
        valor: +valorTransacao,

    }

    transacoes.push(transacao)
    init()
    atualizarArmazenamentoLocal()

    inputNomeTransacao.value = ''
    inputValorTransacao.value = ''
}

function geradorID(){
    return Math.round(Math.random() * 1000)
}


function identificarListas(){
    let lista = document.querySelectorAll('.transacao-filho')
    ativarEdicao(lista)
    /* console.log(lista); */
}
function ativarEdicao(lista){
    lista.forEach(item => {
        item.addEventListener('click', ()=> {


            let btn = item.querySelector('button')
            let checarSeItemEstaAtivo = btn.dataset.btnVisibilidade === 'true'

            if(checarSeItemEstaAtivo){

                btn.dataset.btnVisibilidade = 'false'

            }else if(!checarSeItemEstaAtivo){

                btn.dataset.btnVisibilidade = 'true'

            }

        })
    })
}



/* ALERTA */
const divAlerta = document.querySelector('.alerta')
function alerta(){

    divAlerta.dataset.visivel = 'true'

    const tempo = setInterval(() => {
        divAlerta.dataset.visivel = 'false'
        clearInterval(tempo)
    }, 4000);
}