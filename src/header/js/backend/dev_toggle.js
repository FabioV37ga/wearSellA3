/*
    Esse arquivo é responsável por ativar/desativar dinamicamente o modo de desenvolvimento
 */



(function(){
    
    const url = document.URL.toString();

    switch(url.includes("github")){
        case true:
            console.log("DEV_OFF")
            window.DEV_MODE = 0;
            redirectTo("");
            break;

        case false:
            console.log("DEV_ON")
            window.DEV_MODE = 1;
            redirectTo(".html")
            break; 
    }
    
    function redirectTo(e){
        var ext = e;
        console.log("+.html")

        var perfilMobile = document.querySelector(".profile-pic-mobile").children[0];
        var loginMobile = document.querySelector(".profile-text").children[0];
        var perfilDesktop = document.querySelectorAll(".icon")[0].children[0];
        var loginDesktop = document.querySelectorAll(".icon")[0].children[1].children[0];
        var loginDesktop_1 = document.querySelectorAll(".icon")[0].children[1].children[2];

        var elements = [perfilMobile,loginMobile,perfilDesktop,loginDesktop,loginDesktop_1]

        console.log(elements)

        for (let i = 0; i <= elements.length-1; i++){
            var elemento = elements[i];
            elemento.href = elemento.href + ext
        }
    }
    
})()
