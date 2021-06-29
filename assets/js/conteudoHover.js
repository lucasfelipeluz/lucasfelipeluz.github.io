export default function conteudoHover(){
    function selecionarElemento(element){
        return document.querySelector(element);
    }

    const barraHover = selecionarElemento('.hover-sobremim');
    const setaDireita = selecionarElemento('.seta-direita');
    const setaEsquerda = selecionarElemento('.seta-esquerda');
    const conteudoHover = selecionarElemento('.conteudo-hover');

    barraHover.addEventListener('click', alteracoesHover);

    function alteracoesHover(){
        setaDireita.classList.toggle('seta-esquerda-hover')
        setaEsquerda.classList.toggle('seta-direita-hover')
        conteudoHover.classList.toggle('hover-ativado')
        barraHover.classList.toggle('border-hover');
    }
}