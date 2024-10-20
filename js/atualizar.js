function AtualizarUsuario(userId) {
  const token = localStorage.getItem('token');
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const user = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(user.password)) {
      mensagem.textContent = 'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.';
      return;
    }

    fetch(`http://localhost:8000/api/user/atualizar/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          mensagem.textContent = `Usuário ${user.name} foi atualizado com sucesso!`;
          form.reset();
        } else {
          mensagem.textContent = 'Erro ao atualizar usuário: ' + data.message;
        }
      })
      .catch(error => {
        mensagem.textContent = 'Erro ao realizar a atualização. Tente novamente.' + 'Erro: ' + error.message;
      });
  });
}