document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let usuario = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;

    if (usuario === 'admin' && senha === 'senha') {
        window.location.href = '../pages/produtos.html';
    } else {
        alert('Usuário e/ou senha incorretos! Por favor, tente novamente.');
    }
});