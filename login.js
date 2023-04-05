const erros = document.querySelector(".erros")
//Login
document.getElementById("login_form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;
    const hashedPassword = CryptoJS.SHA256(password).toString(); // Hash the password
    await loginUser(email, hashedPassword);
});

async function loginUser(email, senha) {
    let action = 'login'
    await fetch(`${webAppUrl}?action=${action}&email=${email}&senha=${senha}`)
        .then(response => response.json()).then(data => {

            if (data.message === "Comprador logado.") {
                // Implemente aqui a lógica para mostrar "Comprador logado" no lugar do botão de login.

                // Armazene os dados do usuário no localStorage
                localStorage.setItem('email', data.email);
                localStorage.setItem('nome', data.nome);
                localStorage.setItem('key', data.key);

                // Atualize o texto do botão de login
                const firstName = data.nome.split(' ')[0];
                btnLoginPopup.textContent = firstName;

                // Feche o popup de login
                loginPopup.style.display = "none";

                toggleSlideShow(false);
                
                // try { cardContainer.style.display = "flex"; } catch (e) { }
                window.location.href = "../index.html";
            } else {
                // Implemente aqui a lógica para informar o usuário sobre email ou senha incorretos.
                erros.innerHTML = data.message;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}
