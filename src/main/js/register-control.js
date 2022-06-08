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
var acesso = 0;

// Essa variavel define de a primeira sessão da pagina de registro está preenchida corretamente;
// 0 : false;
// 1 : true;
var pessoal = 0;

/*
    Essa função é responsavel por testar os campos e verificar consistencias, caso todos os
    requisitos estejam preenchidos, executa função de registro de cliente.
*/
(function () {

    const buttons = document.querySelectorAll(".-final");

    for (let i = 0; i <= buttons.length - 1; i++) {
        buttons[i].addEventListener('click', () => { commit() })
    }

    const campoMail = document.querySelector(".register-mail").children[1];
    const confirm = document.querySelector(".confirm").children[1];

    // Adiciona evento click no botão 
    confirm.addEventListener("keypress", function (e) {
        switch (e.key) {
            case "Enter": commit();
        }
    })

    function commit() {

        // Primeira sessão
        {// Essas variaveis controlam se a condicao dos campos é verdadeira(1) ou falsa(0)
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
                acesso = 1;
            } else {
                acesso = 0;
            }

            console.log(`
        CONSISTENCIA DE CAMPOS - 1ª SESSÃO \n
        * Email: ${mailValid} \n
        * CPF: ${cpfValid} \n
        * Senha: ${passValid}`)
        }









        // Segunda sessão
        if (document.URL.toString().includes("registrar")) {

            // Variaveis para controlar se a condicao dos campos é verdadeira ou falsa:
            var nameValid = 0;
            var dateValid = 0;

            {
                // Consistência nome completo
                {//
                    // [HTML / Element] input - nome completo
                    const nomeCompleto = document.querySelector(".register-name").children[1]

                    // Primeiro nome obtido atraves do nome completo
                    var primeiroNome = nomeCompleto.value.toString().split(" ")[0];
                    // Segundo nome obtido atraves do nome completo
                    var segundoNome = nomeCompleto.value.toString().split(" ")[1];

                    // Faz consistência de dados
                    // Tamanho > 5
                    // Precisa ter 1 espaço

                    // Loop p/ verificar existencia de numeros
                    for (let i = 0; i <= nomeCompleto.value.toString().length - 1; i++) {

                        if (texto.split("")[i] == "0" ||
                            texto.split("")[i] == "1" ||
                            texto.split("")[i] == "2" ||
                            texto.split("")[i] == "3" ||
                            texto.split("")[i] == "4" ||
                            texto.split("")[i] == "5" ||
                            texto.split("")[i] == "6" ||
                            texto.split("")[i] == "7" ||
                            texto.split("")[i] == "8" ||
                            texto.split("")[i] == "9") {
                            // Existem numeros.
                            passValid = 0;
                            break;
                        } else {
                            // Nao existem numeros.
                            if (nomeCompleto.value.length > 5 &&
                                nomeCompleto.value.toString().includes(" ") == true) {
                                nameValid = 1;
                            } else {
                                nameValid = 0;
                            }
                        }
                    }
                }




                // Consistencia Data de Nascimento
                {//
                    // [HTML / Element] input - campo data de nascimento
                    const dataField = document.querySelector(".register-DNS").children[1]

                    var dia = dataField.value.split("/")[0];
                    var mes = dataField.value.split("/")[1];
                    var ano = dataField.value.split("/")[2];

                    if ((dia > 0 && dia <= 31) &&
                        (mes > 0 && mes <= 12) &&
                        (ano >= 1900)) {

                        var atual = new Date()
                        if (atual.getFullYear() - ano == 18) {

                            if (atual.getMonth() + 1 == mes) {
                                if (atual.getDate() >= dia) {
                                    // 18 literal
                                    dateValid = 1;
                                } else {
                                    // 17
                                    dateValid = 0;
                                }
                            } else if (atual.getMonth() + 1 > mes) {
                                // 18 literal
                                dateValid = 1;
                            } else {
                                // 17
                                dateValid = 0;
                            }
                        } else if (atual.getFullYear() - ano < 18) {
                            // menor de idade
                            dateValid = 0;
                        } else {
                            dateValid = 1;
                        }
                    } else {
                        // input invalido
                        dateValid = 0;
                    }
                }


                // Consistencia numero (endereço)
                {
                    const numeroField = document.querySelector(".register-numero").children[1]

                    if (numeroField.value.length > 0){
                        window.numeroValid = 1
                    }else{
                        window.numeroValid = 0
                    }
                }
            }


            //LOG
            console.log(`
        CONSISTENCIA DE CAMPOS - 2ª SESSÃO \n
        * Nome: ${nameValid} \n
        * Data de Nascimento: ${dateValid}\n
        * CEP: ${window.cepValid} \n
        * Rua: ${window.enderecoStates[0]} \n
        * Numero: 0 \n
        * Complemento: 1 \n
        * Cidade: ${window.enderecoStates[1]}\n
        * Estado: ${window.enderecoStates[2]}\n`)

            if (
                nameValid == 1 &&
                dateValid == 1 &&
                window.cepValid == 1 &&
                window.enderecoStates[0] == 1 &&
                window.numeroValid == 1 &&
                window.enderecoStates[1] == 1 &&
                window.enderecoStates[2] == 1) {
                console.log("2 sessao full")
                pessoal = 1
                
                if (acesso == 1 && acesso == pessoal){
                    console.log("fim")
                }
            }
        }
    }

})();






(function () {

    window.cepValid = 0;

    // Sessão 2
    if (document.URL.toString().includes("registrar")) {
        // [Element / HTML] Input do nome (registrar.html)
        const dataField = document.querySelector(".register-DNS").children[1]

        // Adiciona listener keypress
        dataField.addEventListener("keypress", () => {
            dataLeng = dataField.value.toString().length;
            // adiciona o caractere '-' na quinta posição do cep
            if (dataLeng == 2 || dataLeng == 5) {
                dataField.value = dataField.value + "/";
            }
        })



        // Consistencia campo CEP
        {
            // [HTML / Element] input - campo CEP
            const cepField = document.querySelector(".register-CEP").children[1]

            cepField.addEventListener('keypress', () => {
                if (cepField.value.length == 5) {
                    cepField.value = cepField.value + "-"
                }
            })

            cepField.addEventListener("focusout", () => {
                // Busca cep no api
                consultaCep()
            })

            function consultaCep() {

                var $cep = cepField.value.replace("-", "")
                var url = 'https://viacep.com.br/ws/' + $cep + "/json"
                var request = new XMLHttpRequest();
                request.open('GET', url);

                request.onerror = () => {
                    window.cepValid = 0
                }
                request.onload = () => {
                    window.cepValid = 1;
                    var response = JSON.parse(request.responseText)
                }
                if ($cep.length == 8) {
                    request.send();
                }

            }
        }

    }
})()


// [Element / HTML] Input do CPF (registro)
const cpfField = document.querySelector(".register-CPF").children[1];

// [Element / HTML] Input da senha (registro)
const passField = document.querySelector(".register-pass").children[1];

// Essa IIFE é responsavel por formatar o display do CPF na tela, adicionando '.' e '-'
// 1 -- IIFE formatCPF() -- 1
(function () {

    // Sessão 1
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

