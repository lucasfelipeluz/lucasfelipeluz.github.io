class CarregarHabilidades {
  adicionandoDataSet(conteudo, btnConteudo) {
    conteudo.dataset.tag = 'inativo';
    conteudo.dataset.btnConteudo = `${btnConteudo}`;
    return conteudo;
  }

  criandoHeaderTag(headerTag, icone, name) {
    headerTag.classList.add('header-tag');
    const span = document.createElement('span');
    span.classList.add('icon-tag');
    span.innerHTML = icone;
    headerTag.appendChild(span);
    headerTag.append(name);
    return headerTag;
  }

  criandoDivDescricao(divDescricao, descricao, experiencia) {
    divDescricao.classList.add('conteudo-conhecimento-mobile');
    const containerdescricao = document.createElement('p');
    containerdescricao.classList.add('descricao-tag');
    containerdescricao.innerHTML = descricao;
    const containerExperiencia = document.createElement('p');
    containerExperiencia.classList.add('experiencia-tag');
    containerExperiencia.innerHTML = experiencia;

    divDescricao.append(containerdescricao);
    divDescricao.appendChild(containerExperiencia);

    return divDescricao;
  }

  criandoHTML(item) {
    const container = document.querySelector('.tags-conhecimentos');
    const tecnologia = item[1];

    const conteudo = document.createElement('li');
    this.adicionandoDataSet(conteudo, tecnologia.nome.toLowerCase());

    const headerTag = document.createElement('div');
    this.criandoHeaderTag(headerTag, tecnologia.icone, tecnologia.nome);

    const divDescricao = document.createElement('div');
    this.criandoDivDescricao(divDescricao, tecnologia.descricao, tecnologia.experiencia);

    conteudo.append(headerTag);
    conteudo.appendChild(divDescricao);
    container.appendChild(conteudo);
  }

  async iniciar() {
    const arquivo = await fetch('../assets/content/conhecimentos.json');
    const novoArquivo = Object.entries(await arquivo.json());
    novoArquivo.forEach((item) => { this.criandoHTML(item); });
  }
}

export default CarregarHabilidades;
