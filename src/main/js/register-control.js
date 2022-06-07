/*
    target: registrar.html

    Esse arquivo é responsável por preencher automaticamente os campos de CPF e SENHA
    com so respectivos valores dos campos em 'login.html', Bem como faz consistencia
    de campos de cadastro seguindo um padrao de regras.
*/




// Essa iife é responsável por preencher automaticamente os campos de CPF e SENHA
// com os valores digitados na tela anterior.
(function () {

    // Campos
    const cpfField = ["cpf", document.querySelector(".register-CPF").children[1]]
    const passField = ["pass", document.querySelector(".register-pass").children[1]]
    var fields = [cpfField, passField]

    // Loop p/ trocar valor.
    for (let i = 0; i <= fields.length - 1; i++) {
        fields[i][1].value = localStorage.getItem(fields[i][0])
    }

    // localStorage.setItem("cpf", "")
    // localStorage.setItem("pass", "")
})();






// Essa variavel define de a primeira sessão da pagina de registro está preenchida corretamente;
// 0 : false;
// 1 : true;
var pessoal = 0;

/*
    Essa função é responsavel por testar os campos e verificar consistencias, caso todos os
    requisitos estejam preenchidos, executa função de registro de cliente.
*/
(function () {

    const button = document.querySelector(".commit-button");
    const campoMail = document.querySelector(".register-mail").children[1];
    const confirm = document.querySelector(".confirm").children[1];

    // Adiciona evento click no botão 
    confirm.addEventListener("keypress", function (e) {
        switch (e.key) {
            case "Enter": commit();
        }
    })
    button.addEventListener("click", commit);
    function commit() {

        // Essas variaveis controlam se a condicao dos campos é verdadeira(1) ou falsa(0)
        var passValid = 0;
        var mailValid = 0;
        var cpfValid = 0;


        // CONSISTENCIA EMAIL
        var texto = (campoMail.value).toLowerCase()
        var texto_split = texto.split("");
        var arroba = 0;
        for (let i = 0; i <= texto_split.length - 1; i++) {
            if (texto_split[i] == "@") {
                if (i > 3) {
                    mailValid = 1;

                    arroba++;
                    if (arroba > 1) {
                        mailValid = 0;
                        break;
                    }

                    if (texto.toString().includes(".com")) {
                        mailValid = 1
                    } else {
                        mailValid = 0
                    }
                }
            }
        }




        // CONSISTENCIA CPF (função externa)
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

        // Campo CPF
        const campoCPF = document.querySelector(".register-CPF").children[1]

        // Checa o CPF no campo e retorna se é valido.
        if (TestaCPF(campoCPF.value) == true) {
            // CPF VALIDO
            cpfValid = 1;
        } else {
            // CPF INVALIDO
            cpfValid = 0;
        }



        // Consistencia SENHA
        const passwords = document.querySelectorAll(".register-pass")

        /**  Regras p/ senha:
         *  1. Senha deve ser igual entre os 2 campos;
         *  2. Senha deve ter mais de 7 chars;
         *  3. Senha não pode ser vazia;
         **/

        // Aplica as regras acima:
        if (passwords[0].children[1].value ==
            passwords[1].children[1].value &&
            passwords[0].children[1].value != "" &&
            passwords[0].children[1].value.length > 7) {
            passValid = 1;
        } else {
            passValid = 0;
        }


        // Função final da primeira sessão, retorna se todos os campos da sessão estão preenchidos corretamente
        // 0 : false
        // 1 : true;
        if (passValid == 1 && passValid == 1 && mailValid == 1 && cpfValid == 1) {
            // -> PROSSEGUIR AQUI <-
            // .
            // .
            document.querySelector("#sect2").scrollIntoView({ behavior: 'smooth' });
            pessoal = 1;
        } else {
            pessoal = 0;
        }

        console.log(`
        CONSISTENCIA DE CAMPOS - 1ª SESSÃO \n
        * Email: ${mailValid} \n
        * CPF: ${cpfValid} \n
        * Senha: ${passValid} \n`)
    }
})();




// [Element / HTML] Input do CPF (registro)
const cpfField = document.querySelector(".register-CPF").children[1];

// [Element / HTML] Input da senha (registro)
const passField = document.querySelector(".register-pass").children[1];

// Essa IIFE é responsavel por formatar o display do CPF na tela, adicionando '.' e '-'
// 1 -- IIFE formatCPF() -- 1
(function () {

    // Adiciona listener keypress
    cpfField.addEventListener("keypress", () => {
        var cpfLeng = cpfField.value.length
        // troca os valores nos caracteres respectivos por . e -
        if (cpfLeng == 3 || cpfLeng == 7) {
            cpfField.value = cpfField.value + "."
        } else if (cpfLeng == 11) {
            cpfField.value = cpfField.value + "-"
        }
    })
})()



