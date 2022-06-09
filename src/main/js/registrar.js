// Seleciona todos os botões '.-final'
const buttons = document.querySelectorAll(".-final");
// Adiciona eventListener click -> commit()
for (let i = 0; i <= buttons.length - 1; i++) {
    buttons[i].addEventListener('click', () => { verificaConsistencia() })
}

function verificaConsistencia() {
    
    if (window.acesso == 1 && window.pessoal == 1) {
        console.log("Todos os campos estão preenchidos e consitentes. \nRegistrar()")
    }else{
        console.log("algo esta incosistente")
    }
}
