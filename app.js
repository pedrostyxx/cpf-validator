const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Limitador de taxa de solicitação
const limiter = rateLimit({
    windowMs: 1000,
    max: 5, // permite apenas 5 solicitação a cada 2 segundos
    message: "Too many requests, please try again later."
});

app.use(limiter);

function identifyState(stateDigit) {
    switch (stateDigit) {
        case '1':
            return 'Distrito Federal, Goiás, Mato Grosso do Sul e Tocantins';
        case '2':
            return 'Pará, Amazonas, Acre, Amapá, Rondônia e Roraima';
        case '3':
            return 'Ceará, Maranhão e Piauí';
        case '4':
            return 'Pernambuco, Rio Grande do Norte, Paraíba e Alagoas';
        case '5':
            return 'Bahia e Sergipe';
        case '6':
            return 'Minas Gerais';
        case '7':
            return 'Rio de Janeiro e Espírito Santo';
        case '8':
            return 'São Paulo';
        case '9':
            return 'Paraná e Santa Catarina';
        case '0':
            return 'Rio Grande do Sul';
        default:
            return 'Estado Desconhecido';
    }
}

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais, o que não é válido para um CPF
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10 || firstDigit === 11) {
        firstDigit = 0;
    }
    if (firstDigit !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Validação do segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10 || secondDigit === 11) {
        secondDigit = 0;
    }
    if (secondDigit !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

app.get('/validate-cpf/:cpf', (req, res) => {
    const cpf = req.params.cpf;
    const isValid = validateCPF(cpf);

    if (isValid) {
        const stateDigit = cpf.charAt(8);
        const state = identifyState(stateDigit);

        const result = {
            isValid: true,
            state: state,
        };

        res.json(result);
    } else {
        const result = {
            isValid: false,
            state: 'Invalid CPF',
        };

        res.json(result);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
