document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const categorias = document.querySelector('.categorias');

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            categorias.classList.toggle('open');
        });
    }
});


const imagens = document.querySelectorAll('.galeria li img');

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


// Função para atualizar a quantidade do produto
function atualizarQuantidadeProduto(botao, itemCarrinho) {
    const spanQuantidade = itemCarrinho.querySelector('.quantidade-produto');
    let quantidadeAtual = parseInt(spanQuantidade.textContent);

    // Aumenta a quantidade
    if (botao.classList.contains('botaomais')) {
        quantidadeAtual++;
    }
    // Diminui a quantidade (se não for zero)
    else if (botao.classList.contains('botaomenos') && quantidadeAtual > 0) {
        quantidadeAtual--;
    }

    // Atualiza o valor no span
    spanQuantidade.textContent = quantidadeAtual;

    // Atualizar dados do carrinho no localStorage ou back-end (opcional)
    // ...
}

// Adicionar eventos de clique aos botões
const botoesMais = document.querySelectorAll('.botaomais');
const botoesMenos = document.querySelectorAll('.botaomenos');

botoesMais.forEach(botao => {
    botao.addEventListener('click', () => {
        const itemCarrinho = botao.closest('.item-carrinho');
        atualizarQuantidadeProduto(botao, itemCarrinho);
    });
});

botoesMenos.forEach(botao => {
    botao.addEventListener('click', () => {
        const itemCarrinho = botao.closest('.item-carrinho');
        atualizarQuantidadeProduto(botao, itemCarrinho);
    });
});




document.addEventListener('DOMContentLoaded', function () {
    // Evento para o botão "ENTRAR/CADASTRAR"
    document.getElementById('enterButton').addEventListener('click', function() {
        // Salvar dados no localStorage ao clicar em "ENTRAR/CADASTRAR"
        salvarDadosLocalStorage();

        // Redirecionar para página de dados de pagamento
        window.location.href = './dadosPagamento.html';
    });

    
});
x
document.addEventListener('DOMContentLoaded', function () {
    // Recuperar dados do localStorage e preencher os campos na página de pagamento
    preencherCampos();

   
});

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