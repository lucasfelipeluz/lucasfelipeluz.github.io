class Projetos {
  constructor(containerPrincipal) {
    this.containerPrincipal = document.querySelector(containerPrincipal);
  }

  adicionandoConteudoATag(elemento, conteudo) {
    elemento.innerText = conteudo;
  }

  adicionandoClasses(elemento, nomeClasse) {
    elemento.classList.add(nomeClasse);
  }

  adicionarProjetoAoDOM(container, projeto) {
    container.appendChild(projeto);
  }

  criandoBotoes(projeto, linksProjetos) {
    const botoes = Object.values(projeto.botoes);

    botoes.forEach(botao => {
      const divBotao = document.createElement('a');
      divBotao.href = botao.url;

      const icones = Object.values(botao.icone);
      const divIcone = document.createElement('i');
      icones.forEach(icone => {
        this.adicionandoClasses(divIcone, icone);
      });

      this.adicionarProjetoAoDOM(divBotao, divIcone);
      divBotao.append(botao.conteudo);

      linksProjetos.append(divBotao);
    });
  }

  criandoTags(projeto, conteudoContainer) {
    const tagsProjetos = document.createElement('div');
    this.adicionandoClasses(tagsProjetos, projeto.classeTags);
    const tags = Object.values(projeto.tecnologias);
    tags.forEach((item) => {
      const containerTag = document.createElement('span');
      this.adicionandoConteudoATag(containerTag, item);
      this.adicionarProjetoAoDOM(tagsProjetos, containerTag);
    });
    this.adicionarProjetoAoDOM(conteudoContainer, tagsProjetos);
  }

  criandoElementos(item) {
    const projeto = item[1];

    const container = document.createElement('div');
    this.adicionandoClasses(container, projeto.classeTitulo);
    this.adicionarProjetoAoDOM(this.containerPrincipal, container);

    const titulo = document.createElement('h3');
    this.adicionandoConteudoATag(titulo, projeto.titulo);
    this.adicionarProjetoAoDOM(container, titulo);

    const conteudoContainer = document.createElement('div');
    this.adicionandoClasses(conteudoContainer, projeto.classeConteudo);
    this.adicionarProjetoAoDOM(container, conteudoContainer);

    const descricaoProjetos = document.createElement('div');
    this.adicionandoClasses(descricaoProjetos, projeto.classeDescricao);
    this.adicionandoConteudoATag(descricaoProjetos, projeto.descricao);
    this.adicionarProjetoAoDOM(conteudoContainer, descricaoProjetos);

    const linksProjetos = document.createElement('div');
    this.adicionandoClasses(linksProjetos, projeto.classeLinks);
    this.adicionarProjetoAoDOM(conteudoContainer, linksProjetos);

    this.criandoBotoes(projeto, linksProjetos);
    this.criandoTags(projeto, conteudoContainer);
  }

  async fetchProjetos() {
    const arquivo = await (await fetch('../assets/content/projetos.json'));
    const arquivoJson = Object.entries(await arquivo.json());
    this.criandoContainerProjeto(arquivoJson);
  }

  criandoContainerProjeto(projeto) {
    projeto.forEach((item) => {
      this.criandoElementos(item);
    });
  }

  iniciar() {
    this.fetchProjetos();
  }
}

export default Projetos;
