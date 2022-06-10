/*
    Esse arquivo controla a consistência dos campos de registro
    Também verifica o estado em que estão e exportam o resultado.

    target:
        'registrar.html'
            → Sessão 2 (Dados pessoais)

    indice:
        1. IIFE addConsistency()
            1.1 commit()
                1.1.1 nomeCompleto
                1.1.2 dataDeNascimento
        3. IIFE cepConsistency()
        3. IIFE addProps()
*/

// Essa variavel define de a segunda sessão da pagina de registro está preenchida corretamente;
window.pessoal = 0;

(function () {

    // Seleciona todos os botões '.-final'
    const buttons = document.querySelectorAll(".-final");
    // Adiciona eventListener click -> commit()
    for (let i = 0; i <= buttons.length - 1; i++) {
        buttons[i].addEventListener('click', () => { commit() })
    }

    function commit() {

        // Essas 3 variaveis definem se o campo é verdadeiro ou falso:
        // Nome completo:
        window.nameValid = 0;
        // Data de nascimento:
        window.dateValid = 0;



        /*          ---------------  nome completo  ---------------      */
        {
            // [HTML / Element] input - nome completo
            const nomeCompleto = document.querySelector(".register-name").children[1]


            // Essa parte faz a consistência de dados:

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
                    // Efeito visual:
                    nomeCompleto.value = null
                    nomeCompleto.placeholder = "Não pode haver números!"
                    nomeCompleto.style.border = "1px solid red"
                    // Verificação:
                    window.nameValid = 0;
                    break;
                } else {
                    // Nao existem numeros.
                    // Filtra por regras:
                    if (
                        // Tamanho maior que 5
                        nomeCompleto.value.length > 5 &&
                        // Precisa conter 1 espaço
                        nomeCompleto.value.toString().includes(" ") == true &&
                        // Não pode ter valor vazio
                        nomeCompleto.value.toString() != "") {
                        // Verificação bem sucedida
                        // Efeito visual:
                        nomeCompleto.placeholder = ""
                        nomeCompleto.style.border = "1px solid #ccc"
                        // verificação:
                        window.nameValid = 1;
                    } else {
                        // Verificação falha
                        // Efeito visual:
                        nomeCompleto.value = ""
                        nomeCompleto.value.length--
                        nomeCompleto.placeholder = "Insira o nome completo."
                        nomeCompleto.style.border = "1px solid red"
                        // verificação:
                        window.nameValid = 0;
                    }
                }
            }
        }





        /*          ---------------  Data de nascimento  ---------------      */
        {
            // [HTML / Element] input - campo data de nascimento
            const dataField = document.querySelector(".register-DNS").children[1]

            // Split() p/ definir dia/mes/ano.
            var dia = dataField.value.split("/")[0];
            var mes = dataField.value.split("/")[1];
            var ano = dataField.value.split("/")[2];

            // Regras para execução:
            if (
                // Dia deve estar no intervalo de 1 - 31;
                (dia > 0 && dia <= 31) &&
                // Mes deve estar no intervalo de 1 - 12;
                (mes > 0 && mes <= 12) &&
                // Ano deve ser maior ou igual a 1900;
                (ano >= 1900)) {

                // Pega data atual
                var atual = new Date()

                // Esse trecho não permite a criação de contas menores de idade.

                // Se o ano atual - ano inserido for igual a 18...
                if (atual.getFullYear() - ano == 18) {
                    // E o mês atual for igual ao mês inserido...
                    if (atual.getMonth() + 1 == mes) {
                        // E se a data atual for maior que a inserida...
                        if (atual.getDate() >= dia) {
                            // Possui 18 anos.
                            // efeito visual:
                            dataField.style.border = "1px solid #ccc"
                            dataField.placeholder = "dd/mm/aaaa"
                            // verificação:
                            window.dateValid = 1;

                        } else {
                            // Possui 17 anos.
                            // efeito visual:
                            dataField.value = ""
                            dataField.length--
                            dataField.placeholder = "Menor de idade."
                            dataField.style.border = "1px solid red"
                            // verificação:
                            window.dateValid = 0;
                        }
                    } else if (atual.getMonth() + 1 > mes) {
                        // possui 18 anos
                        // efeito visual:
                        dataField.style.border = "1px solid #ccc"
                        dataField.placeholder = "dd/mm/aaaa"
                        // verificação:
                        window.dateValid = 1;
                    } else {
                        // possui 17 anos
                        // efeito visual
                        dataField.value = ""
                        dataField.length--
                        dataField.placeholder = "Menor de idade."
                        dataField.style.border = "1px solid red"
                        // verificação:
                        window.dateValid = 0;
                    }
                } else if (atual.getFullYear() - ano < 18) {
                    // menor de idade
                    // efeito visual:
                    dataField.value = ""
                    dataField.length--
                    dataField.placeholder = "Menor de idade."
                    dataField.style.border = "1px solid red"
                    // verificação:
                    window.dateValid = 0;
                } else {
                    // Maior de idade
                    // efeito visual:
                    dataField.style.border = "1px solid #ccc"
                    dataField.placeholder = "dd/mm/aaaa"
                    // verificação:
                    window.dateValid = 1;
                }
            } else {
                // input invalido
                // efeito visual:
                dataField.style.border = "1px solid red"
                // verificação:
                window.dateValid = 0;
            }
        }



        /*          ---------------  NUMERO (endereço)  ---------------      */
        {
            // Consistencia numero (endereço)
            {
                const numeroField = document.querySelector(".register-numero").children[1]

                if (parseInt(numeroField.value) > 0 &&
                    numeroField.value != "") {
                    window.numeroValid = 1
                } else {
                    window.numeroValid = 0
                }
            }
        }

        // Printa o resultado:
        console.log(`
         CONSISTENCIA DE CAMPOS - 1ª SESSÃO \n
         * Nome: ${window.nameValid} \n
         * Data: ${window.dateValid} \n
         * CEP: ${window.cepValid} \n
         * Rua: ${window.enderecoStates[0]} \n
         * Numero: ${window.numeroValid} \n
         * Complemento: 1 \n
         * Cidade: ${window.enderecoStates[1]}\n
        * Estado: ${window.enderecoStates[2]}\n`)

        // Verifica se a sessão foi desbloqueada.
        if (
            window.nameValid == 1 &&
            window.dateValid == 1 &&
            window.cepValid == 1 &&
            window.enderecoStates[0] == 1 &&
            window.numeroValid == 1 &&
            window.enderecoStates[1] == 1 &&
            window.enderecoStates[2] == 1) {

            console.log("A sessão 2 foi desbloqueada")
            window.pessoal = 1
        }
    }

})();





// cepConsistency()
// controla a consistência do cep, requer inicialização junto com a página.
(function () {
    // CEP:
    window.cepValid = 0;
    // Rua, Cidade, Estado
    window.enderecoStates = [0, 0, 0];

    /*          ---------------  CEP  ---------------      */
    {
        // [HTML / Element] input - campo CEP
        const cepField = document.querySelector(".register-CEP").children[1]

        cepField.addEventListener("focusout", () => {
            // Busca cep no api
            consultaCep()
        })

        function consultaCep() {

            var $cep = cepField.value.replace("-", "")
            var url = 'https://viacep.com.br/ws/' + $cep + "/json"
            var request = new XMLHttpRequest();
            request.open('GET', url);

            request.onload = () => {
                // Carregou com sucesso
                // efeito visual:
                var response = JSON.parse(request.responseText)
                changeAddress(response.logradouro, response.localidade, response.uf)
                // verificação:
                window.cepValid = 1;

            }
            request.onerror = () => {
                // Erro no carregamento
                // efeito visual:
                cepField.style.border = "1px solid red"
                changeAddress(" ", " ", " ")
                // verificacao:
                window.cepValid = 0
            }
            if ($cep.length == 8) {
                request.send();
            } else {
                changeAddress(" ", " ", " ", 1)
            }
        }

        // change Address()
        // Função para auto preenchimento de acordo com CEP.
        function changeAddress(rua, cidade, estado, error) {
            const inputRua = document.querySelector(".register-address").children[1]
            const inputCidade = document.querySelector(".register-cidade").children[1]
            const inputEstado = document.querySelector(".register-estado").children[1]

            var endereco = [rua, cidade, estado]
            var inputs = [inputRua, inputCidade, inputEstado];


            for (let i = 0; i <= endereco.length - 1; i++) {
                if (cepField.value.length < 9) {
                    inputs[i].value = ""
                    inputs[i].removeAttribute("disabled")
                    window.enderecoStates[i] = 0;

                } else if (endereco[i] == undefined || endereco[i] == "") {
                    inputs[i].value = ""
                    inputs[i].removeAttribute("disabled")
                    window.enderecoStates[i] = 0;
                } else {
                    inputs[i].value = endereco[i]
                    inputs[i].setAttribute("disabled", true)
                    window.enderecoStates[i] = 1;
                }

            }

        }
    }
})();





// addProps()
// Adiciona propriedades para alguns campos
(function () {

    /*          ---------------  Data de nascimento  ---------------      */
    {
        // [Element / HTML] Input do nome (registrar.html)
        const dataField = document.querySelector(".register-DNS").children[1]

        // Adiciona listener keydown
        dataField.addEventListener("keydown", function (e) {
            if (e.keyCode != 8 && e.keyCode != 46) {
                dataLeng = dataField.value.toString().length;
                // adiciona o caractere '/' nas posições '2' e '5'
                if (dataLeng == 2 || dataLeng == 5) {
                    dataField.value = dataField.value + "/";
                }
                // resultado final: xx/xx/xxxx
            }
        })
    }


    /*          ---------------  CEP  ---------------      */
    {
        // [HTML / Element] input - campo CEP
        const cepField = document.querySelector(".register-CEP").children[1]

        // Adiciona listener keydown
        cepField.addEventListener("keydown", function (e) {
            if (e.keyCode != 8 && e.keyCode != 46) {
                // adiciona o caractere '-' na posicao 5
                if (cepField.value.length == 5) {
                    cepField.value = cepField.value + "-"
                }
                //resultado final: xxxxx-xxx
            }
        })
    }

})()

