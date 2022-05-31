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
