/*
    Esse arquivo é responsável por preencher automaticamente os campos de CPF e SENHA
    com so respectivos valores dos campos em 'login.html'
*/



(function () {
    console.log(localStorage.getItem("cpf"))
    console.log(localStorage.getItem("pass"))

    const cpfField = ["cpf", document.querySelector(".register-CPF").children[1]]
    const passField = ["pass", document.querySelector(".register-pass").children[1]]

    var fields = [cpfField, passField]

    for (let i = 0; i <= fields.length - 1; i++) {
        fields[i][1].value = localStorage.getItem(fields[i][0])
    }

    localStorage.setItem("cpf","")
    localStorage.setItem("pass","")
})()


