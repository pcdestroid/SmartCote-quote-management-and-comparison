document.getElementById("comprador_form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const senha = document.getElementById("senha").value;
    const hashedPassword = CryptoJS.SHA256(senha).toString(); // Hash the password
    const appKey = document.getElementById("app_key").value; // Adicione um campo App Key no seu formulário HTML


    async function registerUser(nome, email, telefone, senha, appKey) {
        let action = "register"
        await fetch(`${webAppUrl}?action=${action}&nome=${nome}&email=${email}&telefone=${telefone}&senha=${senha}&key=${appKey}`)
            .then(response => response.json()).then(data => {

                console.log('log: ' + data.message)
                console.log('Key: ' + data.appKey)
                document.getElementById("comprador_form").reset()
                
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    registerUser(nome, email, telefone, hashedPassword, appKey)

});