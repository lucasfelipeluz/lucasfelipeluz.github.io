class Conhecimentos {
  constructor(itensConhecimentos, itensDesktop) {
    this.itensConhecimentos = itensConhecimentos;
    this.itensDesktop = itensDesktop;
  }

  AccordionEHover() {
    const itensConhecimentos = document.querySelectorAll(this.itensConhecimentos);
    const itensDesktop = document.querySelectorAll(this.itensDesktop);
    const instrucao = document.querySelector('.instrucoes');

    function Accordion(item, indexItem, itens) {
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
        Accordion(item, indexItem, itens);
      });
    });

    checarProporcaoDeTela();
    window.addEventListener('resize', checarProporcaoDeTela);
  }

  adicionarClasse(elemento, nomeClasse) {
    elemento.classList.add(nomeClasse);
  }

  criarElemento(elemento) {
    return document.createElement(elemento);
  }

  adicionarDataset(elemento, dataset) {
    elemento.dataset.tag = 'inativo';
    elemento.dataset.btnConteudo = `${dataset}`;
  }

  criarDivConhecimento(habilidade) {
    const container = document.querySelector('.tags-conhecimentos');

    const criarDivConteudo = (elemento, habilidade) => {
      const conteudo = this.criarElemento(elemento);
      this.adicionarDataset(conteudo, habilidade.toLowerCase());
      return conteudo;
    };

    const criarHeaderTag = (elemento, iconeSpan, nome) => {
      const headerTag = this.criarElemento(elemento);
      this.adicionarClasse(headerTag, 'header-tag');

      const span = this.criarElemento('span');
      this.adicionarClasse(span, 'icon-tag');
      span.innerHTML = iconeSpan;

      headerTag.append(span);
      headerTag.append(nome);
      return headerTag;
    };

    const criarDivDescricao = (elemento, descricao, experiencia) => {
      const divDescricao = this.criarElemento(elemento);
      this.adicionarClasse(divDescricao, 'conteudo-conhecimento-mobile');

      const containerDescricao = this.criarElemento('p');
      this.adicionarClasse(containerDescricao, 'descricao-tag');
      containerDescricao.innerHTML = descricao;

      const containerExperiencia = this.criarElemento('p');
      this.adicionarClasse(containerExperiencia, 'experiencia-tag');
      containerExperiencia.innerHTML = experiencia;

      divDescricao.append(containerDescricao);
      divDescricao.append(containerExperiencia);
      return divDescricao;
    };

    const conteudo = criarDivConteudo('li', habilidade.nome);
    const HeaderTag = criarHeaderTag('div', habilidade.icone, habilidade.nome);
    const Descricao = criarDivDescricao('div', habilidade.descricao, habilidade.experiencia);

    conteudo.append(HeaderTag);
    conteudo.appendChild(Descricao);
    container.append(conteudo);
  }

  async iniciar() {
    const arquivo = await fetch('../assets/content/conhecimentos.json');
    const habilidades = Object.entries(await arquivo.json());
    habilidades.forEach((habilidade) => this.criarDivConhecimento(habilidade[1]));

    this.AccordionEHover();
  }
}

export default Conhecimentos;
