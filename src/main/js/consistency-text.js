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
        buttons[i].addEventListener('click', () => { commit() })
    }


    function commit() {

        // Primeira sessão
        {
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







        // Segunda sessão
        if (document.URL.toString().includes("registrar")) {

            // Variaveis para controlar se a condicao dos campos é verdadeira ou falsa:
            var nameValid = 0;

            { // Consistência nome completo

                // [HTML / Element] input - nome completo
                const nomeCompleto = document.querySelector(".register-name").children[1]

                // Primeiro nome obtido atraves do nome completo
                var primeiroNome = nomeCompleto.value.toString().split(" ")[0];
                // Segundo nome obtido atraves do nome completo
                var segundoNome = nomeCompleto.value.toString().split(" ")[1];

                // Texto separado em chars
                var texto = nomeCompleto.value.toString();

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
                        // Erro: Possui numeros
                        nomeCompleto.value = null
                        nomeCompleto.placeholder = "Não pode haver números!"
                        nomeCompleto.style.border = "1px solid red"
                        break;
                    } else {
                        // Nao existem numeros.
                        // Verifica se tem tamanho > 5 e possui 1 espaço
                        if (nomeCompleto.value.length > 5 &&
                            nomeCompleto.value.toString().includes(" ") == true) {
                            // Sucesso
                            nomeCompleto.placeholder = ""
                            nomeCompleto.style.border = "1px solid #ccc"
                        } else {
                            // Erro: Nome incompleto
                            nomeCompleto.value = null
                            nomeCompleto.placeholder = "Insira o nome completo."
                            nomeCompleto.style.border = "1px solid red"
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
                                dataField.style.border = "1px solid #ccc"
                                dataField.placeholder = "dd/mm/aaaa"

                            } else {
                                // 17
                                dataField.value = ""
                                dataField.length--
                                dataField.placeholder = "Menor de idade."
                                dataField.style.border = "1px solid red"
                            }
                        } else if (atual.getMonth() + 1 > mes) {
                            // 18 literal
                            dataField.style.border = "1px solid #ccc"
                            dataField.placeholder = "dd/mm/aaaa"

                        } else {
                            // 17
                            dataField.value = ""
                            dataField.length--
                            dataField.placeholder = "Menor de idade."
                            dataField.style.border = "1px solid red"
                        }
                    } else if (atual.getFullYear() - ano < 18) {
                        // menor de idade
                        dataField.value = ""
                        dataField.length--
                        dataField.placeholder = "Menor de idade."
                        dataField.style.border = "1px solid red"
                    } else {
                        dataField.style.border = "1px solid #ccc"
                        dataField.placeholder = "dd/mm/aaaa"
                    }
                } else {
                    // input invalido
                    dataField.style.border = "1px solid red"
                }
            }
        }
    }
})()


