/* eslint-disable import/extensions */
import NavBar from './navBar.js';
import ScrollNavBar from './navBarScroll.js';
import CarregarHabilidades from './CarregarHabilidades.js';

const navBarClass = new NavBar('.nav-button', '.menu-mobile', '[data-target]', '.sair-menu', '.burger-button');
navBarClass.iniciar();

const navBarScroll = new ScrollNavBar('[data-target]');
navBarScroll.iniciar();

const carregarHabilidades = new CarregarHabilidades();
carregarHabilidades.iniciar();
