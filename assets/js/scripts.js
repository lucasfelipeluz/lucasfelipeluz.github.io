/* eslint-disable import/extensions */
import NavBar from './navBar.js';
import ScrollNavBar from './navBarScroll.js';
import Conhecimentos from './Conhecimentos.js';
import Projetos from './Projetos.js';

const navBarClass = new NavBar('.nav-button', '.menu-mobile', '[data-target]', '.sair-menu', '.burger-button');
navBarClass.iniciar();

const navBarScroll = new ScrollNavBar('[data-target]');
navBarScroll.iniciar();

const conhecimentos = new Conhecimentos('li[data-btn-conteudo]', '.conteudo-tag');
conhecimentos.iniciar();

const carregarProjetos = new Projetos('.conteudo-projetos');
carregarProjetos.iniciar();
