export default function conteudoHabilidade(){
    const tagsHabilidades = document.querySelectorAll('[data-tag]');

    /* Accordion */
    tagsHabilidades.forEach((item, index, array) => {

        item.addEventListener('click', () => {
            accordion(index, array)
        })

    })

    /* Instruções */
    window.addEventListener('resize', instrucaoHabilidade);

}

function accordion(index, array){

    if(array[index].dataset.tag === 'ativo'){

        array[index].dataset.tag = 'inativo';
        scrollParaATag(array[index]);


    }else if(array[index].dataset.tag === 'inativo'){

        array.forEach(item=>{
            item.dataset.tag = 'inativo';
        })

        array[index].dataset.tag = 'ativo';
        scrollParaATag(array[index]);
    }
}

function scrollParaATag(item){

    item.scrollIntoView({
        behavior:'smooth',
        block:'center',
    })

}

function instrucaoHabilidade(){

    const instrucoes = document.querySelector('.instrucoes');

    if(innerWidth <= 991){
        instrucoes.innerHTML = "Toque na tecnologia"
    }
    else if(innerWidth >= 992){
        instrucoes.innerHTML = "Passe o mouse por cima";
    }

}

instrucaoHabilidade();
