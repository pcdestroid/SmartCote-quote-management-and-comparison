const key = document.getElementById("app_key"); // Adicione um campo App Key no seu formulário HTML



document.getElementById("comprador_form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const hashedPassword = CryptoJS.SHA256(senha).toString(); // Hash the password


    async function registerUser(nome, email, telefone, senha, key) {
        let action = "register"
        await fetch(`${webAppUrl}?action=${action}&nome=${nome}&email=${email}&telefone=${telefone}&senha=${senha}&key=${key}`)
            .then(response => response.json()).then(data => {

                document.getElementById("comprador_form").reset()
                document.getElementById("comprador_form").innerHTML = data.message

            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }



    registerUser(nome, email, telefone, hashedPassword, key.value)

});

if (localStorage.getItem('key')) {
    key.value = localStorage.getItem('key')
}