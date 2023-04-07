const erros = document.querySelector(".erros")

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        return false;
    }
    // Verifica se todos os dígitos são iguais
    let allDigitsEqual = true;
    for (let i = 1; i < cpf.length; i++) {
        if (cpf[i] !== cpf[0]) {
            allDigitsEqual = false;
            break;
        }
    }
    if (allDigitsEqual) {
        return false;
    }

    let soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    let resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) {
        return false;
    }

    // Elimina CNPJs invalidos conhecidos
    if (cnpj === "00000000000000" ||
        cnpj === "11111111111111" ||
        cnpj === "22222222222222" ||
        cnpj === "33333333333333" ||
        cnpj === "44444444444444" ||
        cnpj === "55555555555555" ||
        cnpj === "66666666666666" ||
        cnpj === "77777777777777" ||
        cnpj === "88888888888888" ||
        cnpj === "99999999999999") {
        return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado !== parseInt(digitos.charAt(0))) {
        return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado !== parseInt(digitos.charAt(1))) {
        return false;
    }

    return true;
}

function validarCPForCNPJ(value) {
    const valueClean = value.replace(/\D/g, ""); // Remove todos os caracteres que não sejam dígitos

    if (valueClean.length === 11) {
        return validarCPF(valueClean);
    } else if (valueClean.length === 14) {
        return validarCNPJ(valueClean);
    } else {
        return false;
    }
}

document.getElementById("cpf_cnpj").addEventListener("change", function (event) {
    if (!validarCPForCNPJ(event.target.value)) {
        erros.innerHTML = "CPF ou CNPJ inválido. Por favor, insira um valor válido."
    } else {
        erros.innerHTML = ""
    }
});



async function buscarCEP(cep) {
    // Remove traço do CEP, se houver
    cep = cep.replace('-', '');

    if (cep.length !== 8) {
        erros.innerHTML = "CEP inválido."
    } else {
        erros.innerHTML = ""
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            erros.innerHTML = "CEP não encontrado."
        } else {
            erros.innerHTML = ""
        }

        document.getElementById("endereco").value = data.logradouro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("uf").value = data.uf;
    } catch (error) {
        erros.innerHTML = "Erro ao buscar o CEP."
        console.error(error);
    }
}