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


// window.DEV_MODE = 0;
// Function toggleLocal() é responsável por alterar entre o desenvolvimento local e git.
toggleLocal()
function toggleLocal(){

    // Botoes temporarios p/ alternar entre git e local
    var parent = document.querySelectorAll(".dropmenu-wrap");
    var on = parent[3].children[2].children[0].children[0]
    var off = parent[3].children[2].children[1].children[0]

    on.addEventListener("click", tOn);
    off.addEventListener("click", tOff);

    // Hrefs a serem trocados
    var perfilIcoMobile = document.querySelector(".profile-pic-mobile").children[0]
    var perfilIcoDesktop = document.querySelectorAll(".icon")[0].children[0]

    // Array p/ facilitar
    var perfilIcons = [perfilIcoMobile, perfilIcoDesktop];

    function tOn(){
        console.log("LOCALMODE: TRUE")
        for (let i = 0; i <= perfilIcons.length-1; i++){
            perfilIcons[i].href = "conta/perfil.html"
            window.DEV_MODE = 1
        }
    }

    function tOff(){
        console.log("LOCALMODE: OFF")
        for (let i = 0; i <= perfilIcons.length-1; i++){
            perfilIcons[i].href = "conta/perfil"
            window.DEV_MODE = 0
        }
    }
}