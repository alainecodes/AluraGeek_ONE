document.addEventListener('DOMContentLoaded', function () {

    var produtos = JSON.parse(localStorage.getItem('produtos'));
    var form = document.getElementById('form__adicionar-produto');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var novoProduto = {
            imagemURL: form.elements['imagemURL'].value,
            categoria: form.elements['categoria'].value,
            titulo: form.elements['nome'].value,
            preco: form.elements['preco'].value,
            descricao: form.elements['descricao'].value
        };

        if (!produtos[novoProduto.categoria]) {
            produtos[novoProduto.categoria] = [];
        }

        produtos[novoProduto.categoria].push(novoProduto);

        localStorage.setItem('produtos', JSON.stringify(produtos));

        window.location.href = './produtos.html';
    });

});