/*
    Esse arquivo é responsável por fazer consistência de alguns campos e
    manter informações entre telas diferentes.

    Indice:
        1 - IIFE formatCPF()
        2 - IIFE reformatCPF()
        3 - function TestaCPF()
        4 - function transferInputs()
*/



// [Element / HTML] Input do CPF (registro)
const cpfField = document.querySelector(".register-mail").children[1];

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
})();




// Essa IIFE é responsavel por remover quaisquer caracteres que atrapalhem na verificação do cpf
// 2 -- IIFE reformatCPF() -- 2
(function () {
    // Botão final, commit.
    const registerButton = document.querySelectorAll(".commit-button")[1];

    // Adiciona listener.click no botao.
    registerButton.addEventListener("click", regCommit);

})();




// Essa sub-funcao remove espaços, pontos e hifens
function regCommit() {
    var field = cpfField.value.replaceAll(" ", "");
    field = field.replaceAll(".", "");
    field = field.replaceAll("-", "");

    console.log("CPF: " + field)

    var password = document.querySelector(".register-pass").children[1]
    // Controla o tamanho minimo da senha (7 caracteres)
    if (TestaCPF(field) == true) {
        if (password.value.length >= 7) {
            window.localStorage.setItem('cpf', field)
            window.localStorage.setItem('pass', passField.value)
        } else {
            password.value = "";
            password.value.length--;
            password.placeholder = "Mínimo de 7 caracteres!"
        }
    }
}




// Essa função é responsável por verificar se o CPF inserido é válido, função oficial do site da receita federal.
// 3 -- function TestaCPF -- 3
function TestaCPF(strCPF) {
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