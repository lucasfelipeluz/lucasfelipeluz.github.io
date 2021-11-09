/* eslint-disable import/extensions */
import NavBar from './navBar.js';
import ScrollNavBar from './navBarScroll.js';
import Conhecimentos from './Conhecimentos.js';
import Projetos from './Projetos.js';

const navBarClass = new NavBar('.nav-button', '.menu-mobile', '[data-target]', '.sair-menu', '.burger-button');
navBarClass.iniciar();

const navBarScroll = new ScrollNavBar('[data-target]');
navBarScroll.iniciar();

const carregarProjetos = new Projetos('.conteudo-projetos');
carregarProjetos.iniciar();

async function iniciarConhecimentos() {
  const arquivo = await fetch('../assets/content/conhecimentos.json');
  const conhecimentos = Object.entries(await arquivo.json());

  conhecimentos.forEach(conhecimento => {
    Conhecimentos.criarEAdicionarDivConhecimento(conhecimento[1]);
  });
  Conhecimentos.accordionEHover();
}

iniciarConhecimentos();
