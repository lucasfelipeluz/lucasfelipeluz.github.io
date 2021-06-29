const navBarButton = document.querySelector('.nav-button');
const menuMobile = document.querySelector('.menu-mobile');
const sairDoMenu = document.querySelector('.sair-menu');
const burgerFilho = document.querySelectorAll('.burger-button');
const section = document.querySelectorAll('section');
const linksInternos = document.querySelectorAll('[data-target]');

export function navBar(){

    navBarButton.addEventListener('click', mostrarNavMenu);
    sairDoMenu.addEventListener('click', mostrarNavMenu);
    linksInternos.forEach(item => item.addEventListener('click', mostrarNavMenu))
}

function mostrarNavMenu(){

    const verificacao = menuMobile.dataset.menu === "ativo";

    if(verificacao){

        menuMobile.dataset.menu = 'inativo';
        burgerFilho.forEach(item => item.dataset.filhoBurger = 'inativo')

    }else { 

        menuMobile.dataset.menu = 'ativo';
        burgerFilho.forEach(item => item.dataset.filhoBurger = 'ativo')
        
    }
}
