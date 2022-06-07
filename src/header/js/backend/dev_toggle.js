/*
    Esse arquivo é responsável por ativar/desativar dinamicamente o modo de desenvolvimento
 */



(function () {

    const url = document.URL.toString();

    switch (url.includes("github")) {
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

    function redirectTo(ext) {
        // Elementos a terem href modificado:
        {
            // click no perfil - perfil.html
            var perfilMobile = document.querySelector(".profile-pic-mobile").children[0];

            // click no 'acesse sua conta' - login.html
            var loginMobile = document.querySelector(".profile-text").children[0];

            // click no 'ou cadastre-se' - login.html
            var cadastrarMobile = document.querySelector(".profile-text").children[2].children[0];

            // click no perfil - perfil.html
            var perfilDesktop = document.querySelectorAll(".icon")[0].children[0];

            // click no entrar - login.html
            var loginDesktop = document.querySelectorAll(".icon")[0].children[1].children[0];

            // click no cadastrar - login.html
            var loginDesktop_1 = document.querySelectorAll(".icon")[0].children[1].children[2];
        }

        // Lista de todos os elementos:
        var elements = [
            perfilMobile,
            loginMobile,
            cadastrarMobile,
            perfilDesktop,
            loginDesktop,
            loginDesktop_1
        ]

        // Coloca '.html' no final das urls que ainda não tem a extensão.
        for (let i = 0; i <= elements.length - 1; i++) {
            var elemento = elements[i];
            //  Se o url já possuir '.html', não adicionar novamente
            // if (document.URL.toString().contains(".html") == false) {
                elemento.href = elemento.href + ext
            // }
        }
    }
})()
