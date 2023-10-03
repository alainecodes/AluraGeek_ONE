import { fetchProdutos } from './main.js';

window.onload = function () {
    let itemId = localStorage.getItem('itemId');

    fetchProdutos().then(produtos => {
        let allItems = [];

        for (let categoria in produtos) {
            if (Array.isArray(produtos[categoria])) {

                produtos[categoria].forEach(item => {
                    allItems.push(item);

                    if (item.id == itemId) {
                        document.getElementById('produto').innerHTML = `<div class="produto__container">
                                <img src="${item.imagemURL}">
                                <div class="produto__info">
                                    <h1 class="produto__titulo">${item.titulo}</h1>
                                    <p class="produto__preco">R$${item.preco}</p>
                                    <p class="produto__descricao">${item.descricao}</p>
                                </div>
                            </div>`;
                    }
                });
            }
        }

        let similarItems = allItems.filter(item => item.id != itemId);
        similarItems.sort(() => Math.random() - 0.5);
        similarItems = similarItems.slice(0, 6);
        
        let similarItemsList = document.getElementById('produtos-similares');
        let lista = document.createElement('ul');
        lista.className = 'galeria__produtos-lista'

        similarItems.forEach(item => {
            let listItem = document.createElement('li');
            listItem.className = 'galeria__produtos-item'

            let link = document.createElement('a');
            link.href = `./produto.html?id=${item.id}`;

            link.innerHTML = `<div class="galeria__produtos-item-box">
                        <img src="${item.imagemURL}">
                        <p class="galeria__produtos-item-titulo">${item.titulo}</p>
                        <p class="galeria__produtos-item-preco">R$${item.preco}</p>
                        Ver produto
                    </div>`;

            link.addEventListener('click', function (event) {
                localStorage.setItem('itemId', item.id);
                window.location.href = this.href;
                event.preventDefault();
            });

            listItem.appendChild(link);
            lista.appendChild(listItem);
            similarItemsList.appendChild(lista);
        });
    });
}
