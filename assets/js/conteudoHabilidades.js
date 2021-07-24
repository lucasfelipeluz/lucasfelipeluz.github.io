function conteudoHabilidade(){
    const tagsHabilidades = document.querySelectorAll('li[data-tag]');

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

    if(innerWidth <= 991){
   
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

    }else if(innerWidth >= 992){

        array.forEach(item => {
            return item.dataset.tag = 'inativo'
        })

        conteudoHabilidadeDesktop()
        
    }
}

function conteudoHabilidadeDesktop(){
    
    const tagsHabilidades = document.querySelectorAll('li[data-tag]');
    const conteudoTag = document.querySelectorAll('.conteudo-tag');


    tagsHabilidades.forEach(item => {
        item.addEventListener('mouseenter',()=>{
            
            const conteudoAtivo = item.dataset.btnConteudo;

            conteudoTag.forEach(item => {

                if(item.dataset.conteudo === conteudoAtivo){
                    
                    item.dataset.conteudoVisivel = "true";

                }
                
            })

        })
    })

    tagsHabilidades.forEach(item => {
        item.addEventListener('mouseleave',()=>{
            
            const conteudoAtivo = item.dataset.btnConteudo;

            conteudoTag.forEach(item => {

                if(item.dataset.conteudo === conteudoAtivo){
                    
                    item.dataset.conteudoVisivel = "false";

                }
                
            })

        })
    
    })

}

function scrollParaATag(item){

    if(innerWidth <= 991){

        item.scrollIntoView({
            behavior:'smooth',
            block:'center',
        })
    }
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
conteudoHabilidade()
instrucaoHabilidade();
conteudoHabilidadeDesktop();