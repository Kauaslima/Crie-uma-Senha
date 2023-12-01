document.addEventListener('DOMContentLoaded', function () {
    const entradaSenha = document.getElementById('entradaSenha');
    const medidorPoder = document.getElementById('medidorPoder');
    const reqComprimento = document.getElementById('reqComprimento');
    const reqMaiuscula = document.getElementById('reqMaiuscula');
    const reqNumero = document.getElementById('reqNumero');
    const reqEspecial = document.getElementById('reqEspecial');
    const textoPoder = document.getElementById('textoPoder');
    const mostrarSenha = document.getElementById('mostrarSenha');

    entradaSenha.addEventListener('input', avaliarSenha);
    mostrarSenha.addEventListener('click', toggleMostrarSenha);

    function avaliarSenha() {
        const senha = entradaSenha.value;
        const comprimentoValido = senha.length >= 8;
        const possuiMaiuscula = /[A-Z]/.test(senha);
        const possuiNumero = /[0-9]/.test(senha);
        const possuiEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

        reqComprimento.style.color = comprimentoValido ? 'green' : 'red';
        reqMaiuscula.style.color = possuiMaiuscula ? 'green' : 'red';
        reqNumero.style.color = possuiNumero ? 'green' : 'red';
        reqEspecial.style.color = possuiEspecial ? 'green' : 'red';

        const forcaSenha = calcularForcaSenha(senha);
        exibirTextoPoder(forcaSenha);
        atualizarMedidorPoder(forcaSenha);
    }

    function calcularForcaSenha(senha) {
        // Implemente sua lógica para calcular a força da senha aqui
        // Pode ser uma pontuação baseada no comprimento, caracteres especiais, etc.
        // Retorne um número indicando a força da senha.
        return senha.length * 2;
    }

    function exibirTextoPoder(forcaSenha) {
        if (forcaSenha < 10) {
            textoPoder.innerText = 'Sua senha é fraca. Melhore isso!';
        } else if (forcaSenha < 20) {
            textoPoder.innerText = 'Sua senha é razoável. Pode melhorar!';
        } else {
            textoPoder.innerText = 'Sua senha é forte. Continue assim!';
        }
    }

    function atualizarMedidorPoder(forcaSenha) {
        const cor = calcularCorMedidor(forcaSenha);
        medidorPoder.style.width = `${forcaSenha}%`;
        medidorPoder.style.backgroundColor = cor;
    }

    function calcularCorMedidor(forcaSenha) {
        const verde = Math.min(255, Math.floor(forcaSenha * 2.55));
        const vermelho = 255 - verde;
        return `rgb(${vermelho},${verde},0)`;
    }

    function toggleMostrarSenha() {
        const tipoAtual = entradaSenha.type;
        entradaSenha.type = tipoAtual === 'password' ? 'text' : 'password';
    }
});
