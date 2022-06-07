/*
Esse arquivo é reponsável por avisar ao usuário se algum dos campos foi
preenchido de forma incorreta.

target: 1.  'login.html'
2.  'registrar.html'
*/

//  Essa iife é reponsável por selecionar os elementos a terem a consistencia 
// verificada e também notifica o usuário por algum meio.
(function () {
    const buttons = document.querySelectorAll(".-final");

    for (let i = 0; i <= buttons.length - 1; i++) {
        buttons[i].addEventListener('click', commit)
    }


    function commit() {




        { // Sessão CPF
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
            // [HTML / Element] input do cpf
            const campoCPF = document.querySelector(".register-CPF").children[1]

            // Checa o CPF no campo e retorna se é valido.
            if (TestaCPF(campoCPF.value) == true) {
                // CPF VALIDO
                campoCPF.placeholder = ""
                campoCPF.style.border = "1px solid #ccc"

            } else {
                // CPF INVALIDO
                campoCPF.value = ""
                campoCPF.length--;
                campoCPF.placeholder = "O CPF inserido é inválido."
                campoCPF.style.border = "1px solid red"

            }
        }




        {// Sessão senha
            const passField = document.querySelectorAll(".register-pass")
            var passValue = passField[0].children[1].value

            // Verifica se a senha possui ao menos 7 caracteres
            if (passField[0].children[1].value.length >= 7) {
                // Verifica se há necessidade de confirmar senha
                // há necessidade de confirmar:
                if (passField.length > 1) {
                    // Verifica se o campo de confirmação é igual ao campo de senha:
                    if (passField[0].children[1].value == passField[1].children[1].value) {
                        // Verificação bem sucedida:
                        passField[1].children[1].placeholder = ""
                        passField[1].children[1].style.border = "1px solid #ccc";
                    } else {
                        // Verificação falha:
                        passField[1].children[1].value = null;
                        passField[1].children[1].placeholder = "As senhas não são iguais!"
                        passField[1].children[1].style.border = "1px solid red";
                    }
                }
            } else {
                // Não possui 7 caracteres!
                passField[0].children[1].value = null;
                passField[0].children[1].placeholder = "Mínimo de 7 caracteres!"
                passField[0].children[1].style.border = "1px solid red"
            }
        }




        {// Sessão E-mail
            // Só executa na aba 'registrar'
            if (document.URL.toString().includes("registrar")) {

                // [HTML / Element] input - campo e-mail
                const campoMail = document.querySelector(".register-mail").children[1];
                // Troca o valor do email por letrar minusculas p/ consistencia
                campoMail.value = campoMail.value.toString().toLowerCase()

                // Faz consistencia:
                // Minimo de 7 chars, precisa incluir '@',
                // precisa incluir '.com', não pode ter espaços.
                if (campoMail.value.length > 7 &&
                    campoMail.value.toString().includes("@") &&
                    campoMail.value.toString().includes(".com") &&
                    campoMail.value.toString().includes(" ") == false) {
                    // Aplica efeito visual 'correto'.
                    campoMail.placeholder = ""
                    campoMail.style.border = "1px solid #ccc"
                } else {
                    // Aplica efeito sual 'incorreto'
                    campoMail.value = ""
                    campoMail.length--;
                    campoMail.placeholder = "O E-mail inserido é inválido."
                    campoMail.style.border = "1px solid red"
                }
            }
        }



    }
})()


