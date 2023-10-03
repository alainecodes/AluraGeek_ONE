export function fetchProdutos() {
    return fetch('https://run.mocky.io/v3/f5d731bc-78a2-4c70-9643-988057eb46cc')
        .then(response => response.json())
        .then(produtos => {
            localStorage.setItem('produtos', JSON.stringify(produtos));
            return produtos;
        });
}

fetchProdutos().then(produtos => {

    for (let categoria in produtos) {
        let section = document.getElementById(categoria);
        let lista = document.createElement('ul');
        lista.className = 'galeria__produtos-lista'

        produtos[categoria].forEach(item => {

            let listItem = document.createElement('li');
            item.className = 'galeria__produtos-item'

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
        section.appendChild(lista);
    }
});
