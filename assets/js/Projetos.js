class Projetos {
  constructor(containerPrincipal) {
    this.containerPrincipal = document.querySelector(containerPrincipal);
  }

  async fetchProjetos() {
    const arquivo = await (await fetch('../assets/content/projetos.json'));
    const arquivoJson = Object.entries(await arquivo.json());
    this.criandoContainerProjeto(arquivoJson);
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

  criandoBotaoWebSite(projeto, linksProjetos) {
    const linkWebSite = document.createElement('a');
    linkWebSite.href = projeto.url;
    this.adicionandoConteudoATag(linkWebSite, projeto.conteudoUrl);
    const iconeWebsite = document.createElement('i');
    const classeIconeWebsite = Object.values(projeto.iconeUrl);
    classeIconeWebsite.forEach((item) => {
      this.adicionandoClasses(iconeWebsite, item);
    });
    this.adicionarProjetoAoDOM(linkWebSite, iconeWebsite);
    this.adicionarProjetoAoDOM(linksProjetos, linkWebSite);
  }

  criandoBotaoCodigo(projeto, linksProjetos) {
    const linkCodigo = document.createElement('a');
    linkCodigo.href = projeto.codigo;
    this.adicionandoConteudoATag(linkCodigo, projeto.conteudoCodigo);
    const iconeCodigo = document.createElement('i');
    const classeIconeCodigo = Object.values(projeto.iconeCodigo);
    classeIconeCodigo.forEach((item) => {
      this.adicionandoClasses(iconeCodigo, item);
    });
    this.adicionarProjetoAoDOM(linkCodigo, iconeCodigo);
    this.adicionarProjetoAoDOM(linksProjetos, linkCodigo);
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

    this.criandoBotaoWebSite(projeto, linksProjetos);
    this.criandoBotaoCodigo(projeto, linksProjetos);

    this.criandoTags(projeto, conteudoContainer);
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
