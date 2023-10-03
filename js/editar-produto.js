import { getProdutos } from "./produtos.js";
import { saveProdutos } from "./produtos.js";

window.onload = function () {

    let { categoria, index } = JSON.parse(localStorage.getItem('editItemIndex'));

    getProdutos().then(produtos => {
        let item = produtos[categoria][index];

        var precoNumerico = parseFloat(item.preco.replace(',', '.'));
        document.getElementById('preco').value = precoNumerico.toFixed(2);

        document.getElementById('preco').addEventListener('input', function (e) {
            var valor = this.value;
            valor = valor.replace(/[^0-9,]/g, '');
            valor = valor.replace(',', '.');
            valor = valor.replace(/,/g, '');
            var precoNumerico = parseFloat(valor);

            if (!isNaN(precoNumerico)) {
                this.value = precoNumerico;
            } else {
                this.value = valor.substr(0, valor.length - 1);
            }
            if (valor.length > 2) {
                valor = valor.slice(0, -2) + ',' + valor.slice(-2);
            }
            this.value = valor
        });

        document.getElementById('preco').addEventListener('blur', function (e) {
            var valor = this.value;
            var precoNumerico = parseFloat(valor);
            if (!isNaN(precoNumerico)) {
                this.value = precoNumerico.toFixed(2);
            }
        });

        document.getElementById('imagemURL').value = item.imagemURL;
        document.getElementById('categoria').value = item.categoria;
        document.getElementById('nome').value = item.titulo;
        document.getElementById('descricao').value = item.descricao;

        document.getElementById('form__edit').addEventListener('submit', function (event) {
            event.preventDefault();
            item.imagemURL = document.getElementById('imagemURL').value;
            item.categoria = document.getElementById('categoria').value;
            item.titulo = document.getElementById('nome').value;
            item.preco = document.getElementById('preco').value;
            item.descricao = document.getElementById('descricao').value;
            saveProdutos(produtos);
            window.location.href = './produtos.html';
        });
    });
}

