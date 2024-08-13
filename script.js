const hamburgerButton = document.querySelector("#hamburgerButton");
const closeButton = document.querySelector("#closeButton");
const mobileMenu = document.querySelector("#mobileMenu");
const imagens = document.querySelectorAll('.galeria li img');
const cartItemsContainer = document.querySelector('#cart-items')
const cartTotal = document.querySelector('#cart-total');
const cartCounter = document.querySelector('#cart-counter');
const emptyCart = document.querySelector('#empty-cart');

let cart = [];

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



// Seleciona todos os contadores de carrinho na página
const cartCounters = document.querySelectorAll('.cart-counter');

cartCounters.forEach(cartCounter => {
    const minusButton = cartCounter.querySelector('.minus');
    const plusButton = cartCounter.querySelector('.plus');
    const quantityDisplay = cartCounter.querySelector('.quantidade-produto');

    // Verifica se os elementos existem antes de prosseguir
    if (!minusButton || !plusButton || !quantityDisplay) {
        console.error("Elemento de contador não encontrado. Verifique o HTML.");
        return;
    }

    // Inicializa a quantidade com o valor atual do HTML
    let quantity = parseInt(quantityDisplay.textContent);

    // Função para atualizar a exibição da quantidade
    function updateQuantityDisplay() {
        quantityDisplay.textContent = quantity;
    }

    // Evento de clique no botão de subtração
    minusButton.addEventListener('click', () => {
        if (quantity > 0) { // Previne que a quantidade fique negativa
            quantity--;
            updateQuantityDisplay();
        }
    });

    // Evento de clique no botão de adição
    plusButton.addEventListener('click', () => {
        quantity++;
        updateQuantityDisplay();
    });

    // Atualiza a exibição inicial
    updateQuantityDisplay();
});



//Itens carrinho


menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn");
    
    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        const img = parentButton.getAttribute("data-img");
        addToCart(name, price, img)
    }

})

function addToCart(name, price, img) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;

    } else {

        cart.push({
            img,
            name,
            price,
            quantity: 1,
        });

    }

    updateCartModal()
}


function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        emptyCart.style.display = 'block';
    } else {
        emptyCart.style.display = 'none';
    }

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");
        const totalPriceItem = item.price * item.quantity;

        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                <p class="font-medium">${item.src}</p>
                    <img>${item.img}</img>
                    <p>qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">${totalPriceItem.toFixed(2)}</p>
                </div>
                
                <div>
                    <button class="remove-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>
            </div> 
        `

        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });

    cartCounter.innerHTML = cart.length;

}


cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-btn")) {
        const name = event.target.getAttribute("data-name")
        
        removeItemCart(name);
    }   
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index]

        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal();
            return
        }

        cart.splice(index, 1);
        updateCartModal();
    }
}



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