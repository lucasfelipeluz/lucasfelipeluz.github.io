const UlTransacoes = document.querySelector("#transactions")
const DivReceita = document.querySelector("#money-plus")
const DivDespesa = document.querySelector("#money-minus")
const DivBalanco = document.querySelector("#balance")
const form = document.querySelector('#form')
const inputNomeTransacao = document.querySelector('#text')
const inputValorTransacao = document.querySelector('#amount')
const svg = '<svg fill="#00" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="20px" height="20px"><path d="M 10.3125 -0.03125 C 8.589844 -0.03125 7.164063 1.316406 7 3 L 2 3 L 2 5 L 6.96875 5 L 6.96875 5.03125 L 17.03125 5.03125 L 17.03125 5 L 22 5 L 22 3 L 17 3 C 16.84375 1.316406 15.484375 -0.03125 13.8125 -0.03125 Z M 10.3125 2.03125 L 13.8125 2.03125 C 14.320313 2.03125 14.695313 2.429688 14.84375 2.96875 L 9.15625 2.96875 C 9.296875 2.429688 9.6875 2.03125 10.3125 2.03125 Z M 4 6 L 4 22.5 C 4 23.300781 4.699219 24 5.5 24 L 18.59375 24 C 19.394531 24 20.09375 23.300781 20.09375 22.5 L 20.09375 6 Z M 7 9 L 8 9 L 8 22 L 7 22 Z M 10 9 L 11 9 L 11 22 L 10 22 Z M 13 9 L 14 9 L 14 22 L 13 22 Z M 16 9 L 17 9 L 17 22 L 16 22 Z"/></svg>'
const divAlerta = document.querySelector('.alerta');
const campoMsg = document.querySelector('[data-alerta]')

const transacoesNoArmazenamentoLocal = JSON.parse(localStorage.getItem('transacoes'))

let transacoes = localStorage.getItem('transacoes') !== null ? transacoesNoArmazenamentoLocal : []

const funcoesDOM = {
  adicionarTransacoesAoDom(transacoes) {
    
    const operador = transacoes.valor < 0 ? '-' : ''
    const ClasseCSS = transacoes.valor < 0 ? 'minus' : 'plus'
    const li = document.createElement('li');
    const displayValor = utilidades.ajustarValorParaMostrar(transacoes.valor, false);
    li.classList.add(ClasseCSS, 'transacao-filho')
    li.innerHTML = `
        <p> ${transacoes.nome} </p>
        <span class="valor"> R$ ${displayValor}</span>
        <button class="delete-btn" data-btn-visibilidade="false"
        onclick="armazenamento.remover(${transacoes.id})">
        ${svg}
        </button>`
        
    UlTransacoes.append(li)
 
  },

  atualizarValores() {
    const valoresTransacoes = transacoes.map(transacoes => transacoes.valor)

    const total = valoresTransacoes
      .reduce((acumulador, transacao) => acumulador + transacao, 0);

    const receitas = valoresTransacoes.filter(item => item > 0)
      .reduce((acumulador, valor) => acumulador + valor, 0);
      
    const despesas = Math.abs(valoresTransacoes.filter(item => item < 0)
      .reduce((acumulador, valor) => acumulador + valor, 0));

    DivBalanco.innerHTML = `<span>R$</span> ${utilidades.ajustarValorParaMostrar(total, false)}`
    DivReceita.textContent = `R$ ${utilidades.ajustarValorParaMostrar(receitas, false)}`
    DivDespesa.textContent = `R$ ${utilidades.ajustarValorParaMostrar(despesas, false)}`
  },

  lidandoComForm(evento) {
    
    evento.preventDefault();

    const nomeTransacao = inputNomeTransacao.value.trim();
    const valorTransacao = utilidades.validandoValorForm(inputValorTransacao.value.trim())

    const checarSeInputEstaVazio = inputNomeTransacao.value.trim() === '' || inputValorTransacao.value.trim() === ''
    if(checarSeInputEstaVazio){
      alertaDOM.alerta('Preencha todos os campos!');
      return
    }

    const transacao = {
      id: +funcoesDOM.geradorID(),
      nome: nomeTransacao,
      valor: +valorTransacao,
    }

    transacoes.push(transacao)
    init()
    armazenamento.atualizar();

    inputNomeTransacao.value = ''
    inputValorTransacao.value = ''
  },

  removerLetrasForm(evento) {
    const campo = evento.srcElement;
    const valorCampo = campo.value.trim();

    const regex = /[\d\.\,\-]+/g;
    campo.value = valorCampo.match(regex)
  },

  geradorID() {
      return Math.round(Math.random() * 1000)
  }
};

const armazenamento = {
  atualizar() {
    localStorage.setItem('transacoes', JSON.stringify(transacoes))
  },
  
  remover(id) {
    transacoes = transacoes.filter(transacoes => {
      return transacoes.id !== id

    })

    armazenamento.atualizar()
    init()
  },
};

const editandoEExcluindo = {
  identificarListas() {
    let lista = document.querySelectorAll('.transacao-filho');
    this.ativarEdicao(lista);
  },

  ativarEdicao(lista) {
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
};

const alertaDOM = {
  alerta(msg) {
    campoMsg.innerText = msg;
    divAlerta.dataset.visivel = 'true';
  
    const tempo = setInterval(() => {
        divAlerta.dataset.visivel = 'false'
        clearInterval(tempo)
    }, 4000)
  }
}

const utilidades = {
  ajustarValorParaMostrar(valor, removerSinal) {
    if (typeof valor === 'number') {
      
      if (removerSinal == true) {
        valor = Math.abs(valor)
          .toFixed(2)
      } else {
        valor = valor.toFixed(2)
      }

      if (valor.includes('.')) {
        valor = valor.replace('.', ',')
        return valor;
      }
    } else {
      console.log('nao é number');
    }
    /* if (removerSinal == true) {
      valor = Math.abs(valor)
        .toFixed(2)
        .toString()
      
      if (valor.includes('.')) valor = valor.replace('.', ',')
      return valor;
      
    } else {
      valor = valor
        .toString()

      if (valor.includes('.')) valor = valor.replace('.', ',')
      return valor;

    } */
  },

  validandoValorForm(valor) {
    valor = valor.toString();

    if (valor.includes(',')) {
      valor = valor.toString()
        .replace(',', '.')

      return parseFloat(valor);
      
    } else {

      return parseFloat(valor);

    }

    
  }
}

form.addEventListener('submit', funcoesDOM.lidandoComForm)
inputValorTransacao.addEventListener('keyup', funcoesDOM.removerLetrasForm);

/* Iniciar Aplicação */
function init(){
  UlTransacoes.innerHTML = ''
  transacoes.forEach(funcoesDOM.adicionarTransacoesAoDom)
  funcoesDOM.atualizarValores()
  editandoEExcluindo.identificarListas();
}

init()