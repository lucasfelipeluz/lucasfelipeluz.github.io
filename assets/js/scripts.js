/* eslint-disable import/extensions */
import NavBar from './navBar.js';
import Habilidades from './habilidades.js';
import ScrollNavBar from './navBarScroll.js';

const navBarClass = new NavBar('.nav-button', '.menu-mobile', '[data-target]', '.sair-menu', '.burger-button');
navBarClass.iniciar();

const habilidades = new Habilidades('li[data-tag]', '.conteudo-tag');
habilidades.iniciar();

const navBarScroll = new ScrollNavBar('[data-target]');
navBarScroll.iniciar();
