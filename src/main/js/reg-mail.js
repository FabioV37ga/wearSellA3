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
const cpfField = document.querySelector(".register-CPF").children[1];

// [Element / HTML] Input da senha (registro)
const passField = document.querySelector(".register-pass").children[1];
// Essa IIFE é responsavel por formatar o display do CPF na tela, adicionando '.' e '-'
// 1 -- IIFE formatCPF() -- 1
formatCpf()
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




// Essa IIFE é responsavel por remover quaisquer caracteres que atrapalhem na verificação do cpf
// 2 -- IIFE reformatCPF() -- 2
(function () {
    // Botão final, commit.
    const registerButton = document.querySelectorAll(".commit-button")[1];
    
    const buttons = document.querySelectorAll(".-final");

    for (let i = 0; i <= buttons.length - 1; i++) {
        // Field senha
        const registerPassField = document.querySelector(".register-pass").children[1]
    
        // Adiciona listener.click no botao.
        buttons[i].addEventListener("click", regCommit);
    
        registerPassField.addEventListener("keypress", function(e){
            if (e.key == "Enter"){
                regCommit()
            }
        });
    }
})();




// Essa sub-funcao remove espaços, pontos e hifens
function regCommit() {
    // console.log("rgc")
    var field = cpfField.value.replaceAll(" ", "");
    field = field.replaceAll(".", "");
    field = field.replaceAll("-", "");

    var split = field.split("")

    console.log("CPF: " + field)

    var password = document.querySelector(".register-pass").children[1]
    // Controla o tamanho minimo da senha (7 caracteres)
    if (TestaCPF(field) == true) {
        if (password.value.length >= 7) {

            var field = split[0] + "" + split[1] + "" +
            split[2] + "." + split[3] + split[4] + split[5] +
            "." + split[6] + split[7] + split[8] + "-"
            + split[9] + split[10];
   
            window.localStorage.setItem('cpf', field)
            window.localStorage.setItem('pass', passField.value)
            
            switch (window.DEV_MODE){
                case 0:
                    window.open("registrar", "_self")
                    break;
                case 1:
                    window.open("registrar.html","_self")
                    break;
            }
            
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


