if (!localStorage.getItem('nome')) { window.location.replace('../index.html'); }

const products = ["Construção", "Limpeza", "Elétricos", "Escritório", "Hidráulicos", "Pintura", "Jardinagem", "Serralheria", "Marcenaria", "Iluminação", "Comunicação", "Segurança", "Automação", "Refrigeração", "Mecânica", "Ferramentas", "Equipamentos de Proteção Individual (EPIs)", "Equipamentos de Segurança", "Equipamentos de Medição", "Produtos Químicos", "Alimentação", "Embalagem", "Material de Limpeza Automotiva", "Material Esportivo", "Produtos de Beleza e Cuidado Pessoal", "Produtos para Animais", "Produtos de Papelaria", "Material para Festas", "Artesanato", "Produtos Eletrônicos", "Instrumentos Musicais", "Móveis", "Equipamentos de Informática", "Roupas e Acessórios", "Calçados", "Produtos para Jóias e Bijuterias", "Produtos de Limpeza Industrial", "Produtos Químicos para Limpeza", "Material de Construção Civil", "Acessórios para Celulares e Tablets", "Produtos para Cama, Mesa e Banho", "Artigos para Decoração", "Produtos de Limpeza para Cozinha", "Fios e Cabos Elétricos", "Equipamentos para Academia", "Produtos para Piscina", "Produtos para Spa e Sauna", "Ferragens", "Produtos para Impressão", "Informática", "Equipamentos para Fotografia", "Equipamentos para Áudio e Vídeo", "Produtos para Agricultura", "Produtos para Pesca", "Produtos para Camping", "Produtos para Náutica", "Artigos para Bebês e Crianças", "Produtos para Saúde e Bem-Estar", "Produtos para Fitness", "Produtos de Limpeza para Carpetes e Tapetes", "Produtos para Limpeza de Vidros", "Produtos de Limpeza para Pisos", "Produtos para Animais de Estimação", "Acessórios para Veículos", "Peças para Veículos", "Produtos para Manutenção de Veículos", "Produtos para Embelezamento de Veículos", "Produtos para Construção Naval", "Equipamentos para Laboratório", "Produtos para Cervejarias", "Produtos para Vinícolas", "Produtos para Destilarias", "Alimentos e Bebidas", "Cosméticos", "Produtos Farmacêuticos (Hospitalares)", "Produtos para Plásticos", "Rolamentos", "Borracha", "Produtos para Pintura Automotiva"];

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {

                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("autocomplete"), products);

const groupList = document.getElementById("group-list");
const addGroupBtn = document.getElementById("add-group");
const groupInput = document.getElementById("autocomplete");
let groupListAdd = []

addGroupBtn.addEventListener("click", () => {
    const groupName = groupInput.value.trim();
    if (groupName) {
        const listItem = document.createElement("li");
        listItem.textContent = groupName;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-group"
        deleteBtn.addEventListener("click", () => {
            groupList.removeChild(listItem);
            groupListAdd.splice(groupListAdd.indexOf(groupName), 1);
        });

        listItem.appendChild(deleteBtn);
        groupListAdd.push(groupName);
        groupList.appendChild(listItem);
        groupInput.value = "";
        erros.innerHTML = ""
    } else {
        erros.innerHTML = "Informe um grupo de materiais"
    }
});

document.getElementById("fornecedor_form").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf_cnpj = document.getElementById("cpf_cnpj").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const cep = document.getElementById("cep").value;
    const uf = document.getElementById("uf").value;
    const endereco = document.getElementById("endereco").value;
    const cidade = document.getElementById("cidade").value;
    const key = localStorage.getItem('key')

    async function registerSupplier() {
        let action = "addFornecedor"

        await fetch(`${webAppUrl}?action=${action}&nome=${nome}&cpf_cnpj=${cpf_cnpj}&email=${email}&telefone=${telefone}&cep=${cep}&uf=${uf}&endereco=${endereco}&cidade=${cidade}&groups=${JSON.stringify(groupListAdd)}&key=${key}`)
            .then(response => response.json()).then(data => {

                document.getElementById("fornecedor_form").reset()

                console.log(data.message)
                groupList.innerHTML = ""
                groupListAdd = []

            })
            .catch((error) => {
                console.error('Error:', error);
            })

    }

    registerSupplier()

});