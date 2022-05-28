/*
    Este arquivo controla o funcionamento do dropmenu (mobile)

    indice:
        1 - Function abreFechaMenu(); (iife)        
        2 - Function dropmenuCloseAnimation();
        
 */



// Essa IIFE é responsável pelo funcionamento da entrada e saida do dropmenu.
// 1 --- function abreFechaMenu() -- 1 //
(function () {

    // Icone menu mobile
    const menuMobile = document.querySelector(".menu");

    // DropMenu mobile
    const dropMenuMobile = document.querySelector(".top-menu-mobile").children[1];

    // Outside area mobile
    const outer = document.querySelector(".outer");

    // Faz o dropmenu abrir no click do icone menu
    menuMobile.addEventListener("click", () => {

        // Adiciona classe 'active', troca opacidade
        dropMenuMobile.classList.add("active");
    })

    // mouseleave faz menu desaparecer, funciona no desktop.
    dropMenuMobile.children[0].addEventListener("mouseleave", () => {
        dropmenuCloseAnimation()
    })

    // Click na div outer também faz o menu desaparecer. mobile e desktop. 
    outer.addEventListener("click", () => {
        dropmenuCloseAnimation()
    })
})()



//Essa função é responsável pela animação de fechamento do dropmenu mobile.
// 2 --- function dropmenuCloseAnimation() -- 2 //
function dropmenuCloseAnimation() {

    // DropMenu mobile
    const dropMenuMobile = document.querySelector(".top-menu-mobile").children[1];

    // Adiciona evento animationend
    dropMenuMobile.addEventListener("animationend", desliga);

    // Adiciona animacao de saida
    dropMenuMobile.classList.add("disable");

    //  Funcao desliga: faz o objeto sumir apenas no final da animação.
    function desliga() {

        // Remove listener de animationend, para evitar conflitos com a animação de entrada
        this.removeEventListener("animationend", arguments.callee, false)

        // Remove classe active, fazendo o objeto sumir.
        dropMenuMobile.classList.remove("active");

        // remove classe disable, para que possa ser adicionada novamente sem conflitos.
        dropMenuMobile.classList.remove("disable");
    }
}
