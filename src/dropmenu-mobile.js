// Este arquivo controla a funcionamento do dropmenu (mobile)

(function (){
    // Icone menu mobile
    const menuMobile = document.querySelector(".menu");
    // DropMenu mobile
    const dropMenuMobile = document.querySelector(".top-menu-mobile").children[1];
    // Outside area mobile
    const outer = document.querySelector(".outer");

    //Faz o dropmenu abrir no click do icone menu
    menuMobile.addEventListener("click", () =>{

        // Adiciona classe 'active', troca opacidade
        dropMenuMobile.classList.add("active");
    })

    dropMenuMobile.children[0].addEventListener("mouseleave", () =>{
        dropMenuMobile.classList.remove("active");
    })

    outer.addEventListener("click", () =>{
        dropMenuMobile.classList.remove("active");
    })
})()
