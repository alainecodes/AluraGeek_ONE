export function fetchProdutos() {
    return fetch('/db.json')
        .then(response => response.json())
        .then(produtos => {
            let categorias = produtos.reduce((acc, produto) => {
                if (!acc[produto.categoria]) {
                    acc[produto.categoria] = [];
                }
                acc[produto.categoria].push(produto);
                return acc;
            }, {});
            localStorage.setItem('produtos', JSON.stringify(categorias));
            return categorias;
        });
}

fetchProdutos().then(categorias => {

    for (let categoria in categorias) {

        let section = document.querySelector(`section#${categoria.replace(/[^a-zA-Z0-9-]/g, '')}`);
        if (!section) continue;

        let lista = section.querySelector('ul.galeria__produtos-lista');
        if (!lista) continue;

        lista.innerHTML = '';

        categorias[categoria].forEach(item => {

            let listItem = document.createElement('li');
            listItem.className = 'galeria__produtos-item'

            let link = document.createElement('a');
            link.href = `./pages/produto.html?id=${item.id}`;

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
        });
    }
});