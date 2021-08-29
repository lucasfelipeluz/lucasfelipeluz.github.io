class NavBar {
  constructor(botaoNavBar, nav, itensNav, botaoEscape, botaoBurger) {
    this.botaoNavBar = document.querySelector(botaoNavBar);
    this.nav = document.querySelector(nav);
    this.itensNav = document.querySelectorAll(itensNav);
    this.botaoEscape = botaoEscape ? document.querySelector(botaoEscape) : null;
    this.botaoBurger = botaoBurger ? document.querySelectorAll(botaoBurger) : null;
  }

  mostrarNavMenu() {
    const verificacao = this.nav.dataset.menu === 'ativo';

    if (verificacao) {
      this.nav.dataset.menu = 'inativo';
      this.botaoBurger.forEach((item) => {
        item.dataset.filhoBurger = 'inativo';
      });
    } else {
      this.nav.dataset.menu = 'ativo';
      this.botaoBurger.forEach((item) => {
        item.dataset.filhoBurger = 'ativo';
      });
    }
  }

  iniciar() {
    this.bindEventos();
    this.botaoNavBar.addEventListener('click', this.mostrarNavMenu);
    this.botaoEscape.addEventListener('click', this.mostrarNavMenu);
    this.itensNav.forEach((item) => {
      item.addEventListener('click', this.mostrarNavMenu);
    });
  }

  bindEventos() {
    this.mostrarNavMenu = this.mostrarNavMenu.bind(this);
  }
}

export default NavBar;
