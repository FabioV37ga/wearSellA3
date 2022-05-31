/*
    Documento temporário.
    Esse arquivo executa depurações e gera logs.
*/



// IIFE mostraRes-cart(), mostra a resolução ao clicar no carrinho de compras.
(function () {
    const cart = document.querySelector(".icons").children[1];

    cart.addEventListener("click", () => {
        alert(window.innerWidth + " / " + window.innerHeight)
    })
})()




// IIFE trocaHrefLocal()
(function(){

    // Var local: 
    // 0 - Modo local desativa, não há alteração de codigo
    // 1 - Modo local ativado, algumas hrefs são alteradas
    var local = 1;

    
})()
