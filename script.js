const hamburgerButton = document.querySelector("#hamburgerButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
const imagens = document.querySelectorAll('.galeria li img');
const cartItemsContainer = document.querySelector('#cart-items')
const cartTotal = document.querySelector('#cart-total');


//menu hamburger
hamburgerButton.addEventListener("click", function () {
    mobileMenu.classList.add("flex");
})

closeButton.addEventListener("click", function () {
    mobileMenu.classList.remove("flex");
})


//galeria de img
function galeriaTrocar(galeria) {
    const clicada = galeria.currentTarget;
    const principal = document.querySelector('.principal');
    principal.src = clicada.src;
    principal.alt = clicada.alt;
}

function galeriaClique(imagem) {
    imagem.addEventListener('click', galeriaTrocar);
}

imagens.forEach(galeriaClique);

//Contador carrinho
let cart = [];









document.addEventListener('DOMContentLoaded', function () {
    // Função para preencher os campos com os valores do localStorage
    preencherCampos();

    // Evento para o botão "CONFIRMAR PAGAMENTO"
    document.getElementById('confirmButton').addEventListener('click', function () {
        alert('Botão Confirmar Pagamento clicado'); // Alerta para verificação
        window.location.href = './pedido-concluido.html';
    });

    // Evento para o botão "VOLTAR"
    document.getElementById('backButton2').addEventListener('click', function () {
        window.location.href = './index.html';
    });
});



// Função para preencher os campos com os valores do localStorage
function preencherCampos() {
    document.getElementById('personalData').innerText = 'Destinatário: ' + localStorage.getItem('destinatario') +
        ' | Contato: ' + localStorage.getItem('contato') +
        ' | CPF: ' + localStorage.getItem('cpf') +
        ' | Email: ' + localStorage.getItem('email');

    document.getElementById('addressData').innerText = 'Endereço: ' + localStorage.getItem('logradouro') +
        ', ' + localStorage.getItem('complemento') +
        ' - ' + localStorage.getItem('cep') +
        '. Ponto de Referência: ' + localStorage.getItem('pontoReferencia');
}

// Função para salvar os dados do formulário no localStorage
function salvarDadosLocalStorage() {
    localStorage.setItem('destinatario', document.getElementById('word1').value);
    localStorage.setItem('contato', document.getElementById('word2').value);
    localStorage.setItem('cpf', document.getElementById('word3').value);
    localStorage.setItem('email', document.getElementById('word4').value);
    localStorage.setItem('cep', document.getElementById('word5').value);
    localStorage.setItem('logradouro', document.getElementById('word6').value);
    localStorage.setItem('complemento', document.getElementById('word7').value);
    localStorage.setItem('pontoReferencia', document.getElementById('word8').value);
}

// Função para preencher os campos com os valores do localStorage
function preencherCampos() {
    document.getElementById('word1').value = localStorage.getItem('destinatario') || '';
    document.getElementById('word2').value = localStorage.getItem('contato') || '';
    document.getElementById('word3').value = localStorage.getItem('cpf') || '';
    document.getElementById('word4').value = localStorage.getItem('email') || '';
    document.getElementById('word5').value = localStorage.getItem('cep') || '';
    document.getElementById('word6').value = localStorage.getItem('logradouro') || '';
    document.getElementById('word7').value = localStorage.getItem('complemento') || '';
    document.getElementById('word8').value = localStorage.getItem('pontoReferencia') || '';

    // Atualizar também os dados exibidos na página de pagamento
    document.getElementById('addressData').innerText = localStorage.getItem('logradouro') + ', ' + localStorage.getItem('complemento') + ' - ' + localStorage.getItem('cep');
    document.getElementById('personalData').innerText = 'Destinatário: ' + localStorage.getItem('destinatario') + ' | Contato: ' + localStorage.getItem('contato') + ' | CPF: ' + localStorage.getItem('cpf') + ' | Email: ' + localStorage.getItem('email');
}