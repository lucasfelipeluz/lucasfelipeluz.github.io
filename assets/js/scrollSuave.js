export default function scrollSuave(){
    const linksInternos = document.querySelectorAll('[data-target]');

    linksInternos.forEach(link => {
        link.addEventListener('click', scrollParaSecao)
    })
}

function scrollParaSecao(event){
    event.preventDefault();
    const classeDaSecao = event.currentTarget.getAttribute('href');
    const secao = document.querySelector('.'+classeDaSecao)

    secao.scrollIntoView({
        behavior:'smooth',
        block:'start',
    })

    /* Modo alternativo */
/*  const topo = secao.offsetTop;

     window.scrollTo({
        top:topo,
        behavior:'smooth',
    }); */
}