/*
    target: registrar.html

    Esse arquivo é responsável por preencher automaticamente os campos de CPF e SENHA
    com so respectivos valores dos campos em 'login.html'
*/


(function () {
    // console.log(localStorage.getItem("cpf"))
    // console.log(localStorage.getItem("pass"))

    const cpfField = ["cpf", document.querySelector(".register-CPF").children[1]]
    const passField = ["pass", document.querySelector(".register-pass").children[1]]

    var fields = [cpfField, passField]



    for (let i = 0; i <= fields.length - 1; i++) {


        fields[i][1].value = localStorage.getItem(fields[i][0])
    }

    localStorage.setItem("cpf", "")
    localStorage.setItem("pass", "")


})();




(function () {
    const button = document.querySelector(".commit-button");


    const campoMail = document.querySelector(".register-mail").children[1];




    button.addEventListener("click", commit);
    function commit() {
        var passValid = 0;
        var mailValid = 0;
        var cpfValid = 0;
        console.log("click")
        var texto = campoMail.value
        // console.log(texto)

        var texto_split = texto.split("");

        // CONSISTENCIA EMAIL

        var mailAmount = 0;
        for (let i = 0; i <= texto_split.length - 1; i++) {
            if (texto_split[i] == "@") {
                if (i > 3) {
                    mailValid = 1;
                    mailAmount++;
                    if (mailAmount > 1) {
                        mailValid = 0;
                        console.log("multiple")
                        break;
                    }
                }
            } else {

            }
        }

        if (mailValid == 1) {
            console.log("Email valido.")

        } else {

        }

        // CONSISTENCIA CPF


        function TestaCPF(strCPF) {

            strCPF = strCPF.replaceAll(".","");
            strCPF = strCPF.replaceAll("-","");


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
        if (TestaCPF(document.querySelector(".register-CPF").children[1].value) == true) {
            console.log("cpf valido")
            cpfValid = 1;
        }

        // Consistencia SENHA


        const passwords = document.querySelectorAll(".register-pass")

        if (passwords[0].children[1].value == passwords[1].children[1].value && passwords[0].children[1].value != "") {
            if (passwords[0].children[1].value.length > 7) {
                passValid = 1;
            }
        }

        if (passValid == 1 && passValid == 1 && mailValid == 1 && cpfValid == 1) {
            console.log("todos validos.")
        }
        console.log(mailValid + " / " + cpfValid + " / " + passValid)
    }
})()


// [Element / HTML] Input do CPF (registro)
const cpfField = document.querySelector(".register-CPF").children[1];

// [Element / HTML] Input da senha (registro)
const passField = document.querySelector(".register-pass").children[1];
// Essa IIFE é responsavel por formatar o display do CPF na tela, adicionando '.' e '-'
// 1 -- IIFE formatCPF() -- 1

function formatCpf(){

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
}
formatCpf()