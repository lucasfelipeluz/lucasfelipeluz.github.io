class ScrollNavBar {
  constructor(navItens) {
    this.navItens = document.querySelectorAll(navItens);
  }

  scrollParaSecao(event) {
    event.preventDefault();
    const classeDaSecao = event.currentTarget.getAttribute('href');
    const secao = document.querySelector(`.${classeDaSecao}`);

    secao.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  iniciar() {
    this.navItens.forEach((item) => {
      item.addEventListener('click', this.scrollParaSecao);
    });
  }
}

export default ScrollNavBar;
