/*
    Esse arquivo controla a consistência dos campos de registro.
    Também verifica o estado em que estão e exportam o resultado.

    target:
        'login.html'
            → Sessão 2 (cadastro)
        'registrar.html'
            → Sessão 1 (Dados para acesso)

    Indice:
        1. IIFE addConsistency()
            1.1 commit()
                1.1.1 campoCPF
                1.1.2 campoSenha
                1.1.3 campoEmail
        2. IIFE addProps()
            1.1 campoSenha
            1.2 campoCPF
*/


// Essa variavel define de a primeira sessão da pagina de registro está preenchida corretamente;
// 0 : false;
// 1 : true;
window.acesso = 0;


// addConsistency()
// inicializa junto com o documento, adiciona regras de consistência nos campos.
(function () {

    // Seleciona todos os botões '.-final'
    const buttons = document.querySelectorAll(".-final");
    // Adiciona eventListener click -> commit()
    for (let i = 0; i <= buttons.length - 1; i++) {
        buttons[i].addEventListener('click', () => { commit() })
    }

    function commit() {

        // Essas 3 variaveis definem se o campo é verdadeiro ou falso:
        // CPF:
        window.cpfValid = 0;
        // Senha:
        window.passValid = 0;
        // Email:
        window.mailValid = 0;


        /*          ---------------  CPF  ---------------      */
        {
            // Elemento 'input' do CPF
            const campoCPF = document.querySelector(".register-CPF").children[1]

            // Essa parte faz a consistência do CPF:
            function TestaCPF(strCPF) {
                // Formata dado p/ rodar função.
                strCPF = strCPF.replaceAll(".", "");
                strCPF = strCPF.replaceAll("-", "");
                var Soma;
                var Resto;
                Soma = 0;
                if (strCPF == "00000000000") return false;
                for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
                Resto = (Soma * 10) % 11;
                if ((Resto == 10) || (Resto == 11)) Resto = 0;
                if (Resto != parseInt(strCPF.substring(9, 10))) return false;
                Soma = 0;
                for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;
                if ((Resto == 10) || (Resto == 11)) Resto = 0;
                if (Resto != parseInt(strCPF.substring(10, 11))) return false;
                return true;
            }

            // Verifica o CPF no campo e retorna se é valido.
            if (TestaCPF(campoCPF.value) == true) {
                // CPF VALIDO
                // Efeito visual:
                campoCPF.placeholder = ""
                campoCPF.style.border = "1px solid #ccc"
                // Verificação:
                window.cpfValid = 1;

            } else {
                // CPF INVALIDO
                // Efeito visual:
                campoCPF.value = ""
                campoCPF.length--;
                campoCPF.placeholder = "O CPF inserido é inválido."
                campoCPF.style.border = "1px solid red"
                // Verificação:
                window.cpfValid = 0;
            }
        }






        /*          --------------  SENHA  --------------      */
        {
            // Elemento 'div' da senha
            const passField = document.querySelectorAll(".register-pass")

            // Essa parte faz a consistência da senha:
            // Verifica se a senha possui ao menos 7 caracteres
            if (passField[0].children[1].value.length >= 7) {

                // Verifica se há necessidade de confirmar senha ('registrar.html')
                // há necessidade de confirmar: ('registrar.html')
                if (passField.length > 1) {

                    // Verifica se o campo de confirmação é igual ao campo de senha:
                    if (passField[0].children[1].value == passField[1].children[1].value) {
                        // Verificação bem sucedida:
                        // Efeito visual:
                        passField[1].children[1].placeholder = ""
                        passField[1].children[1].style.border = "1px solid #ccc";
                        // Verificação:
                        window.passValid = 1;
                    } else {
                        // Verificação falha:
                        // Efeito visual:
                        passField[1].children[1].value = null;
                        passField[1].children[1].placeholder = "As senhas não são iguais!"
                        passField[1].children[1].style.border = "1px solid red";
                        // Verificação:
                        window.passValid = 0
                    }
                } else {
                    // Não há necessidade de confirmar:
                    // Efeito visual:
                    passField[0].children[1].placeholder = ""
                    passField[0].children[1].style.border = "1px solid #ccc";
                    // Verificação:
                    window.passValid = 1;
                }
            } else {
                // Não possui 7 caracteres!
                // Efeito visual:
                passField[0].children[1].value = null;
                passField[0].children[1].placeholder = "Mínimo de 7 caracteres!"
                passField[0].children[1].style.border = "1px solid red"
                // Verificação
                window.passValid = 0;
            }

            if (window.passValid == 1) {
                passField[0].children[1].style.border = "1px solid #ccc";
            }
        }






        /*          --------------- E-MAIL ---------------      */
        // Essa consistência só precisa acontecer na página 'registrar.html', portanto:
        if (document.URL.toString().includes("registrar")) {

            // Elemento 'input' do E-MAIL
            const campoMail = document.querySelector(".register-mail").children[1];

            // Essa parte faz a consistência do e-mail:
            // Troca o valor do email por letrar minusculas p/ consistencia
            campoMail.value = campoMail.value.toString().toLowerCase()

            // Regras:
            if (campoMail.value.length > 7 &&
                // Precisa incluir '@'
                campoMail.value.toString().includes("@") &&
                // Precisa incluir '.com'.
                campoMail.value.toString().includes(".com") &&
                // Não pode possuir espaços
                campoMail.value.toString().includes(" ") == false) {
                // Verificação bem sucedida:
                // Efeito visual
                campoMail.placeholder = ""
                campoMail.style.border = "1px solid #ccc"
                // Verificação
                window.mailValid = 1;
            } else {
                // Verificação falha:
                // Efeito visual
                campoMail.value = ""
                campoMail.length--;
                campoMail.placeholder = "O E-mail inserido é inválido."
                campoMail.style.border = "1px solid red"
                // verificação
                window.mailValid = 0;
            }
        }

        // Printa o resultado:
        console.log(`
            CONSISTENCIA DE CAMPOS - 1ª SESSÃO \n
            * Email: ${window.mailValid} \n
            * CPF: ${window.cpfValid} \n
            * Senha: ${window.passValid}`)


        // Verifica se a sessão foi desbloqueada.
        if (
            window.mailValid == 1 &&
            window.cpfValid == 1 &&
            window.passValid == 1
        ) {
            console.log("A sessão 1 foi desbloqueada")
            window.acesso = 1;
        } else {
            window.acesso = 0;
        }
    }
})();




// addProps()
// Adiciona propriedades para alguns campos
(function () {
    // Verifica se a pagina é 'registrar.html'
    if (document.URL.toString().includes("registrar")) {

        // ------------ SENHA: ------------
        {
            // Seleciona campo de confirmação de senha
            const confirm = document.querySelector(".confirm").children[1];

            // Adiciona eventListener "keydown" == 'Enter' -> commit()
            confirm.addEventListener("keydown", function (e) {
                switch (e.key) {
                    case "Enter": commit();
                }
            })
        }

        // ------------ CPF: ------------
        {
            // [Element / HTML] Input do CPF (registro)
            const cpfField = document.querySelector(".register-CPF").children[1];

            // Adiciona listener keydown
            cpfField.addEventListener("keydown", () => {
                var cpfLeng = cpfField.value.length
                // troca os valores nos caracteres respectivos por . e -
                if (cpfLeng == 3 || cpfLeng == 7) {
                    cpfField.value = cpfField.value + "."
                } else if (cpfLeng == 11) {
                    cpfField.value = cpfField.value + "-"
                }
            })
            // Resultado final = xxx.xxx.xxx-xx
        }
    }
})()
