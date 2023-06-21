let participantes = [];
let numerosSorteados = [];
let numeroAtual = null;
let bingoIniciado = false;
let intervalId = null;

function adicionarParticipante() {
    const inputParticipante = document.getElementById("participant");
    const nomeParticipante = inputParticipante.value.trim();

    if (nomeParticipante !== "") {
        participantes.push(nomeParticipante);
        inputParticipante.value = "";
        inputParticipante.focus();
    }
}

function gerarCartelas() {
    const containerCartelas = document.getElementById("cards");
    containerCartelas.innerHTML = "";

    participantes.forEach(participante => {
        const cartela = document.createElement("div");
        cartela.classList.add("card");

        const nome = document.createElement("h3");
        nome.classList.add("name");
        nome.textContent = participante;

        const numeros = gerarNumerosAleatorios(25, 1, 99);

        const listaNumeros = document.createElement("ul");
        listaNumeros.classList.add("numbers-list");
        numeros.forEach(numero => {
            const itemLista = document.createElement("li");
            itemLista.textContent = numero;
            listaNumeros.appendChild(itemLista);
        });

        cartela.appendChild(nome);
        cartela.appendChild(listaNumeros);
        containerCartelas.appendChild(cartela);
    });
}

function gerarNumerosAleatorios(quantidade, minimo, maximo) {
    const numeros = [];
    const numerosUnicos = new Set();

    while (numerosUnicos.size < quantidade) {
        const numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
        numerosUnicos.add(numeroAleatorio);
    }

    numerosUnicos.forEach(numero => {
        numeros.push(numero);
    });

    return numeros;
}

function iniciarBingo() {
    if (!bingoIniciado) {
        bingoIniciado = true;
        intervalId = setInterval(sortearNumero, 800); // Sorteia um número a cada 2 segundos
    }
}

function pararBingo() {
    if (bingoIniciado) {
        bingoIniciado = false;
        clearInterval(intervalId);
    }
}

function sortearNumero() {
    const minimo = 1;
    const maximo = 99;

    if (numerosSorteados.length === maximo - minimo + 1) {
        pararBingo();
        alert("Todos os números já foram sorteados!");
        return;
    }

    let numeroAleatorio;

    do {
        numeroAleatorio = Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
    } while (numerosSorteados.includes(numeroAleatorio));

    numerosSorteados.push(numeroAleatorio);
    numeroAtual = numeroAleatorio;

    marcarNumero(numeroAtual);
    verificarBingo();
    exibirNumerosSorteados();
}

function marcarNumero(numero) {
    const elementosNumeros = document.querySelectorAll('.numbers-list li');
    elementosNumeros.forEach(elemento => {
        if (elemento.textContent === numero.toString()) {
            elemento.classList.add('selected');
        }
    });
}

function verificarBingo() {
    const cartelas = document.querySelectorAll('.card');
    cartelas.forEach(cartela => {
        const listaNumeros = cartela.querySelector('.numbers-list');
        if (!listaNumeros.querySelector('li:not(.selected)')) {
            const nome = cartela.querySelector('.name').textContent;
            pararBingo();
            alert(`Bingo! ${nome} venceu!`);
        }
    });
}

function exibirNumerosSorteados() {
    const containerNumerosSorteados = document.getElementById("called-numbers");
    containerNumerosSorteados.textContent = numerosSorteados.join(", ");
}
