/*
    Esse arquivo é responsável por identificar o estado de login, e redirecionar
    o usuário se necessário.
*/



// Variavel anexado na window, responsável por identificar se o usuário está autenticado
// 0 = desconectado;
// 1 = conectado;
window.LOGIN_STATE = 0;

// Essa IIFE é responsavel por redirecionar o usuário para a tela de login,
// caso ainda não esteja autenticado e tente acessar o perfil.
// IIFE checkAndRedirect()
(function () {
    if (window.LOGIN_STATE == 0) {
        // switch (window.DEV_MODE){
        //     case 0:
                console.log("Desconectado, redirecionando...")
                window.open("login", "_self")
        //         break;
        //     case 1:
        //         console.log("Desconectado, redirecionando...")
        //         // window.open("login.html", "_self")
        //         window.open("http://facebook.com", "_self")
        //         break;
        // }
    }
})()
