export default function verificarTamanho(pixelsParaAtivar, MinOuMax){

    window.addEventListener('resize', ola)
    
    function ola(){

        const mobile = MinOuMax === 'max'? innerWidth < pixelsParaAtivar : innerWidth > pixelsParaAtivar

        if(mobile){
            return true;
        }else if(!mobile){
            return false;
        }

    }
}