const Conhecimentos = {

  criarEAdicionarDivConhecimento(habilidade) {
    const containerMobile = document.querySelector('.tags-conhecimentos');
    const containerDesktop = document.querySelector('.conteudo-tags');
    const {
      nome, icone, descricao, experiencia, cor,
    } = habilidade;

    const divConhecimentoMobile = `
      <li data-tag="inativo" data-btn-conteudo="${nome.toLowerCase()}">
        <div class="header-tag">
          <span class="icon-tag" style="background-color:${cor}">
            <i class="${icone}"></i>
          </span>${nome}
        </div>
        <div class="conteudo-conhecimento-mobile">
          <p class="descricao-tag">${descricao}</p>
          <p class="experiencia-tag">${experiencia}</p>
        </div>
      </li>
    `;

    const divConhecimentoDesktop = `
      <div class="conteudo-tag" data-conteudo="${nome.toLowerCase()}" data-conteudo-visivel="false">
        <p class="descricao-tag">${descricao}</p>
        <p class="experiencia-tag">${experiencia}</p>
      </div>
    `;

    containerMobile.innerHTML += divConhecimentoMobile;
    containerDesktop.innerHTML += divConhecimentoDesktop;
  },

  accordionEHover() {
    const itensConhecimentos = document.querySelectorAll('li[data-btn-conteudo]');
    const itensDesktop = document.querySelectorAll('.conteudo-tag');
    const instrucao = document.querySelector('.instrucoes');

    function accordion(item, indexItem, itens) {
      function scrollParaOItem(item) {
        if (window.innerWidth <= 991) {
          setTimeout(() => {
            item.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 500);
        }
      }

      if (itens[indexItem].dataset.tag === 'ativo') {
        itens[indexItem].dataset.tag = 'inativo';
      } else if (itens[indexItem].dataset.tag === 'inativo') {
        itens.forEach(item => {
          item.dataset.tag = 'inativo';
        });
        itens[indexItem].dataset.tag = 'ativo';
        scrollParaOItem(item);
      }
    }

    function ativarHoverDesktop(itensConhecimentos, itensDesktop) {
      itensConhecimentos.forEach(item => {
        item.addEventListener('mouseenter', () => {
          const conteudoAtivo = item.dataset.btnConteudo;
          itensDesktop.forEach((itemDesktop) => {
            if (itemDesktop.dataset.conteudo === conteudoAtivo) {
              itemDesktop.dataset.conteudoVisivel = 'true';
            }
          });
        });

        item.addEventListener('mouseleave', () => {
          const conteudoAtivo = item.dataset.btnConteudo;
          itensDesktop.forEach((itemDesktop) => {
            if (itemDesktop.dataset.conteudo === conteudoAtivo) {
              itemDesktop.dataset.conteudoVisivel = 'false';
            }
          });
        });
      });
    }

    function checarProporcaoDeTela() {
      if (window.innerWidth <= 991) {
        instrucao.innerHTML = 'Toque na tecnologia';
      } else if (window.innerWidth >= 992) {
        instrucao.innerHTML = 'Passe o mouse por cima';
        ativarHoverDesktop(itensConhecimentos, itensDesktop);
      }
    }

    itensConhecimentos.forEach((item, indexItem, itens) => {
      item.addEventListener('click', () => {
        accordion(item, indexItem, itens);
      });
    });

    checarProporcaoDeTela();
    window.addEventListener('resize', checarProporcaoDeTela);
  },
};

export default Conhecimentos;
