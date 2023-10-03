import { fetchProdutos } from './main.js';

export function getProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtos'));
    if (!produtos) {
        return fetchProdutos().then(produtos => {
            localStorage.setItem('produtos', JSON.stringify(produtos));
            return produtos;
        });
    } else {
        return Promise.resolve(produtos);
    }
}

export function saveProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

window.onload = function () {

    getProdutos().then(produtos => {
        let allItemsList = document.getElementById('produtos');

        for (let categoria in produtos) {
            let lista = document.createElement('ul');
            lista.className = 'produtos__lista'

            if (Array.isArray(produtos[categoria])) {

                produtos[categoria].forEach((item, index) => {
                    let listItem = document.createElement('li');
                    listItem.className = 'produtos__item'
                    listItem.innerHTML = `<div class="produtos__item-box">
                            <div class="produtos__item-imagem">
                                <img src="${item.imagemURL}">
                                <div class="produtos__item-icone">
                                    <img src="../assets/deletar.png" id="deletar">
                                    <img src="../assets/editar.png" id="editar">
                                </div>
                            </div>
                            <p class="produtos__item-titulo">${item.titulo}</p>
                            <p class="produtos__item-preco">R$${item.preco}</p>
                            <p class="produtos__item-id">${item.id}</p>
                        </div>`;

                    listItem.addEventListener('click', function (e) {
                        const target = e.target.closest("#editar");

                        if (target) {
                            localStorage.setItem('editItemIndex', JSON.stringify({ categoria: categoria, index: index }));
                            window.location.href = `./editar-produto.html?id=${item.id}`;
                        }
                    });

                    listItem.addEventListener('click', function (e) {
                        const target = e.target.closest("#deletar");

                        if (target) {
                            produtos[categoria].splice(index, 1);
                            saveProdutos(produtos);
                            window.location.reload();
                        }
                    });

                    lista.appendChild(listItem);
                    allItemsList.appendChild(lista);
                });
            }
        }
    });
}