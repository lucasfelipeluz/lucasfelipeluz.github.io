class Habilidades {
  constructor(tagsHabilidades, conteudoTag) {
    this.tagsHabilidades = document.querySelectorAll(tagsHabilidades);
    this.conteudoTag = document.querySelectorAll(conteudoTag);
  }

  ativarHoverHabilidadesDesktop() {
    this.tagsHabilidades.forEach((tagHabilidade) => {
      tagHabilidade.addEventListener('mouseenter', () => {
        const conteudoAtivo = tagHabilidade.dataset.btnConteudo;
        this.conteudoTag.forEach((item) => {
          if (item.dataset.conteudo === conteudoAtivo) {
            item.dataset.conteudoVisivel = 'true';
          }
        });
      });
    });
  }

  desativarHoverHabilidadesDesktop() {
    this.tagsHabilidades.forEach((tagHabilidade) => {
      tagHabilidade.addEventListener('mouseleave', () => {
        const conteudoAtivo = tagHabilidade.dataset.btnConteudo;
        this.conteudoTag.forEach((item) => {
          if (item.dataset.conteudo === conteudoAtivo) {
            item.dataset.conteudoVisivel = 'false';
          }
        });
      });
    });
  }

  ajudaHabilidades() {
    const instrucao = document.querySelector('.instrucoes');

    if (window.innerWidth <= 991) {
      instrucao.innerHTML = 'Toque na tecnologia';
    } else if (window.innerWidth >= 992) {
      instrucao.innerHTML = 'Passe o mouse por cima';
    }
  }

  scrollParaTag(item) {
    if (window.innerWidth <= 991) {
      setTimeout(() => {
        item.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 500);
    }
  }

  accordion(index, array) {
    if (window.innerWidth <= 991) {
      if (array[index].dataset.tag === 'ativo') {
        array[index].dataset.tag = 'inativo';
      } else if (array[index].dataset.tag === 'inativo') {
        array.forEach((item) => {
          item.dataset.tag = 'inativo';
        });
        array[index].dataset.tag = 'ativo';
        this.scrollParaTag(array[index]);
      }
    }
  }

  bindEventos() {
    this.accordion = this.accordion.bind(this);
    this.ajudaHabilidades = this.ajudaHabilidades.bind(this);
  }

  iniciar() {
    this.tagsHabilidades.forEach((item, index, array) => {
      item.addEventListener('click', () => {
        this.accordion(index, array);
      });
    });
    window.addEventListener('resize', this.ajudaHabilidades);
    this.ativarHoverHabilidadesDesktop();
    this.desativarHoverHabilidadesDesktop();
    this.ajudaHabilidades();
  }
}

export default Habilidades;
