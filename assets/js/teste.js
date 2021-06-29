const divTester = document.querySelector('.tester');

export default function testeTamanhoTela(){

    window.addEventListener('resize', setarDivTeste)

    function setarDivTeste(){

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
    
        divTester.innerText = `Width: ${windowWidth} Height: ${windowHeight}`;

    }
    
    setarDivTeste();

}
