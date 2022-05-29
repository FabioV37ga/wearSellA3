/*
    Este arquivo controla o funcionamento do dropmenu (mobile)

    indice:
        1 - Function abreFechaMenu(); (iife)        
        2 - Function dropmenuCloseAnimation();
        3 - Function toggleExtend(); (iife) 
        3 - Function animateExtend(); 
 */



// Essa IIFE é responsável pelo funcionamento da entrada e saida do dropmenu.
// 1 --- function abreFechaMenu() -- 1 //
; (function () {

    // [HTML / Element] Icone menu mobile
    const menuMobile = document.querySelector(".menu");

    // [HTML / Element] DropMenu mobile
    const dropMenuMobile = document.querySelector(".top-menu-mobile").children[1];

    // [HTML / Element] Outside area mobile
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
})();



// Essa função é responsável pela animação de fechamento do dropmenu mobile.
// 2 --- function dropmenuCloseAnimation() -- 2 //
function dropmenuCloseAnimation() {

    // [HTML / Element] DropMenu mobile
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
};



// Essa IIFE é responsável pelo funcionamento do extend de cada item do dropmenu mobile.
// 3 --- function toggleExtend() --- 3 //
; (function () {

    // [HTML / Element 'a'] Setas indicadoras de drop (array)
    const arrowsMobile = document.querySelectorAll(".mobile-nav-item")

    // loop de seleção de todos os itens da lista de nav
    for (let i = 0; i <= arrowsMobile.length - 1; i++) {

        // Adiciona eventlistener click em todas as 4 setas do menu + ação.
        arrowsMobile[i].children[1].addEventListener("click", () => {

            // Condicional p/ determinar se o click fechará ou abrira o extend.
            if (arrowsMobile[i].children[1].children[0].classList.contains("fa-angle-down")) {

                // (OPEN) No click da seta, troca a arrowUP p/ arrowDown.
                if (BLOCK_INDEX == 0){
                    arrowsMobile[i].children[1].children[0].classList.remove("fa-angle-down")
                    arrowsMobile[i].children[1].children[0].classList.add("fa-angle-up")
                    animateExtend(1, arrowsMobile[i].children[2])
                }


            } else if (arrowsMobile[i].children[1].children[0].classList.contains("fa-angle-up")) {

                // (CLOSE) No click da seta, troca a arrowDown p/ arrowUP.
                if (BLOCK_INDEX == 0){
                arrowsMobile[i].children[1].children[0].classList.add("fa-angle-down")
                arrowsMobile[i].children[1].children[0].classList.remove("fa-angle-up")
                animateExtend(2, arrowsMobile[i].children[2])
                }
            }

            // this.removeEventListener("click", arguments.callee, false)
        })
    }
})();



// Variavel global, serve para bloquear o click das setas enquanto a animação estiver ocorrendo, evita bugs.
var BLOCK_INDEX = 0;

// Essa função controla as animações do extend mobile.
// 4 --- function animateExtent() --- 4 //
function animateExtend(tipo, alvo) {
    // [HTML / Element] .mobile-nav-item
    const itemExtend = document.querySelectorAll(".item-extend");

    // Define a altura maxima que o alvo deve atingir.
    var extend_height = (alvo.children.length * 40);

    // Executa função anima().
    anima(alvo)

    // função anima(): Fecha ou abre um extend atraves de uma animação utilizando a propriedade height.
    function anima(target) {

        // Switch: decide o funcionamento da function anima(), 
        // 1 para abrir, 2 para fechar.
        switch (tipo) {

            // CASO 1: ABRIR
            case 1:
                // Adiciona classe p/ aparecer
                target.classList.add("extend")

                // Altura atual do alvo, inicializada como 0.
                var actual_height = 0;

                // Timer para animação de abertura
                var timer = setInterval(function () {

                    // Enquando a altura atual for menor que a altura desejada...
                    if (actual_height <= extend_height) {
                        BLOCK_INDEX = 1;
                        // Adicione +2 para altura atual a cada .1ms.
                        target.style.height = `${actual_height}px`
                        actual_height+= 2;
                        // Quando a altura atual for igual a desejada:
                    } else {
                        // Remove timer.
                        clearInterval(timer);
                        BLOCK_INDEX = 0;
                    }
                }, .1)
                break;

            // CASO 2: FECHAR
            case 2:
                // Altura atual do alvo, sabendo que está aberto, é igual a altura final.
                var actual_height = extend_height;

                // Timer para animação de fechadura
                var timer = setInterval(function () {

                    // Enquanto a altura atual for maior que 0...
                    if (actual_height >= 0) {

                        // Remova 2px para altura atual a cada 3ms.
                        target.style.height = `${actual_height}px`
                        actual_height-= 2;
                        BLOCK_INDEX = 1;

                        // Quando a altura atual for igual a 0...
                        if (actual_height == 0) {

                            // Remove classe de aparecimento.
                            target.classList.remove("extend")
                        }
                        // Quando a altura atual for igual a desejada:
                    } else {
                        // Remove timer.
                        clearInterval(timer);
                        BLOCK_INDEX = 0;
                    }
                }, 3)
                break;
        }
    }
}