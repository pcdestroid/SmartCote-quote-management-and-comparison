// Substitua 'YOUR_WEB_APP_URL' pela URL do seu aplicativo da web do Google App Script
const webAppUrl = 'https://script.google.com/macros/s/AKfycbzDNhGqh0LU9np_h4jSiTQaa0KRIE82F5OP7uPSY4iKpF8DLuptxUVJoxHzEdNAWOsUFQ/exec';

const loginPopup = document.getElementById("login_popup");
const userPopup = document.getElementById("user_popup");
const btnLoginPopup = document.querySelector(".btnLogin-popup");
const span = document.getElementsByClassName("close")[0];
const closeUserPopup = document.querySelector('.close-user_popup');
const cardContainer = document.querySelector(".cards-container");
const slideShow = document.querySelector(".slideshow-container");
let slideIndex = 0;

if (localStorage.getItem('nome')) {
    // Atualize o texto do botão de login
    const firstName = localStorage.getItem('nome').split(' ')[0];
    btnLoginPopup.textContent = firstName;
    toggleSlideShow(false)
    try { cardContainer.style.display = "flex"; } catch (e) { }
} else {
    try { cardContainer.style.display = "none"; } catch (e) { }
    toggleSlideShow(true);
    showSlides();
}

function toggleNav() {
    const navigation = document.querySelector('.navigation');
    navigation.classList.toggle('open');
}


btnLoginPopup.onclick = function () {
    if (localStorage.getItem('nome')) {

        userPopup.style.display = "flex";
        const tabelaUser = document.getElementById("tabela_user");
        tabelaUser.innerHTML = "";
        let descUser = ['Nome:', 'Email:', 'Key:']
        let valueUser = [localStorage.getItem('nome'), localStorage.getItem('email'), localStorage.getItem('key')]

        for (let i = 0; i < descUser.length; i++) {
            const linha = document.createElement("tr");
            const desc = document.createElement("td");
            desc.textContent = descUser[i];
            linha.appendChild(desc);
            const value = document.createElement("td");
            value.textContent = valueUser[i];
            linha.appendChild(value);
            tabelaUser.appendChild(linha);
        }

        

    } else {
        loginPopup.style.display = "flex";
    }
}



try {
    slideShow.onclick = function () {
        showSlides();
    }
} catch (e) { }

try {
    span.onclick = function () {
        loginPopup.style.display = "none";
    }
} catch (e) { }


if (closeUserPopup) {
    closeUserPopup.onclick = function () {
        userPopup.style.display = "none";
    }
}


window.onclick = function (event) {
    if (event.target == loginPopup) {
        loginPopup.style.display = "none";
    }
    if (event.target == userPopup) {
        userPopup.style.display = "none";
    }
}

const pedidos = [
    // Exemplo de pedidos
    {
        numero_solicitacao: "123",
        itens: [
            { codigo: "001", descricao: "Produto 1", quantidade: 10 },
            { codigo: "002", descricao: "Produto 2", quantidade: 20 },
        ],
    },
    // Adicione mais pedidos conforme necessário
];

function buscarPedido() {
    const numeroSolicitacao = document.getElementById("numero_solicitacao").value;
    const pedido = pedidos.find((pedido) => pedido.numero_solicitacao === numeroSolicitacao);

    if (pedido) {
        document.getElementById("tabela_pedido").style.display = "block";
        const tabelaCorpo = document.getElementById("tabela_corpo");
        tabelaCorpo.innerHTML = "";

        for (const item of pedido.itens) {
            const linha = document.createElement("tr");
            const colunaCodigo = document.createElement("td");
            const colunaDescricao = document.createElement("td");
            const colunaQuantidade = document.createElement("td");

            colunaCodigo.textContent = item.codigo;
            colunaDescricao.textContent = item.descricao;
            colunaQuantidade.textContent = item.quantidade;

            linha.appendChild(colunaCodigo);
            linha.appendChild(colunaDescricao);
            linha.appendChild(colunaQuantidade);

            tabelaCorpo.appendChild(linha);
        }
    } else {
        alert("Número de solicitação não encontrado!");
    }
}

function clearUserData() {
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
    localStorage.removeItem('key');
    toggleSlideShow(true);
    cardContainer.style.display = "none";
}


//slide

function showSlides() {
    try {
        let i;
        let slides = document.getElementsByClassName("slide");

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }

        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 10000); // Muda a imagem a cada 10 segundos
    } catch (e) { }
}

function toggleSlideShow(show) {

    try {
        if (show) {
            slideShow.style.display = "block";
        } else {
            slideShow.style.display = "none";
        }
    } catch (e) { }

}




