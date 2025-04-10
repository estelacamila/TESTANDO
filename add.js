const apiUrl = 'http://192.168.1.24:3000/questao';

const inputs = document.querySelectorAll('.campo_texto');
const perguntasContainer = document.getElementById('perguntasContainer');
const btnCadastrar = document.getElementById('btnCadastrar');

let editandoId = null; // Guarda o ID da pergunta em edição

// Carregar perguntas do backend
function carregarPerguntas() {
  fetch(`${apiUrl}/listar`)
    .then(res => res.json())
    .then(perguntas => {
      perguntas.forEach(p => {
        adicionarPerguntaNaTela(p);
      });
    })
    .catch(err => console.error('Erro ao carregar perguntas:', err));
}

// Adiciona uma pergunta na interface com botões de ação
function adicionarPerguntaNaTela(perguntaObj) {
  const li = document.createElement('li');
  li.style.marginBottom = '25px';
  li.style.color = '#fff';
  li.style.marginLeft = '7%';
  li.style.fontSize = '20px';

  const { id, questao, questao1, questao2, questao3, questao4, gabarito, nivel } = perguntaObj;

  li.innerHTML = `
    <strong>Pergunta:</strong> ${questao}<br>
    A) ${questao1}<br>
    B) ${questao2}<br>
    C) ${questao3}<br>
    D) ${questao4}<br>
    <strong>Correta:</strong> ${gabarito}<br>
    <strong>Dificuldade:</strong> ${nivel}<br><br>
  `;

  // Botão Editar
  const btnEditar = document.createElement('button');
  btnEditar.textContent = 'Editar';
  btnEditar.style.marginRight = '10px';
  btnEditar.addEventListener('click', () => {
    inputs[0].value = questao;
    inputs[1].value = questao1;
    inputs[2].value = questao2;
    inputs[3].value = questao3;
    inputs[4].value = questao4;
    inputs[5].value = gabarito;
    inputs[6].value = nivel;
    editandoId = id;
    btnCadastrar.textContent = 'Atualizar';
  });

  // Botão Excluir
  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'Excluir';
  btnExcluir.addEventListener('click', () => {
    if (confirm('Deseja realmente excluir esta pergunta?')) {
      fetch(`${apiUrl}/excluir/${id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (!res.ok) throw new Error('Erro ao excluir');
          li.remove();
        })
        .catch(err => {
          console.error('Erro ao excluir:', err);
          alert('Erro ao excluir pergunta.');
        });
    }
  });

  li.appendChild(btnEditar);
  li.appendChild(btnExcluir);
  perguntasContainer.appendChild(li);
}

// Evento de cadastrar ou atualizar
btnCadastrar.addEventListener('click', () => {
  const questao = inputs[0].value.trim();
  const questao1 = inputs[1].value.trim();
  const questao2 = inputs[2].value.trim();
  const questao3 = inputs[3].value.trim();
  const questao4 = inputs[4].value.trim();
  const gabarito = inputs[5].value.trim();
  const nivel = inputs[6].value.trim();

  if (!questao || !questao1 || !questao2 || !questao3 || !questao4 || !gabarito || !nivel) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const dados = { questao, questao1, questao2, questao3, questao4, gabarito, nivel };

  // Atualizar pergunta
  if (editandoId) {
    fetch(`${apiUrl}/editar/${editandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar');
        return res.json();
      })
      .then(() => {
        alert('Pergunta atualizada com sucesso!');
        window.location.reload();
      })
      .catch(err => {
        console.error('Erro:', err);
        alert('Erro ao atualizar pergunta.');
      });
  } else {
    // Cadastrar nova pergunta
    fetch(`${apiUrl}/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao cadastrar');
        return res.json();
      })
      .then(() => {
        alert('Pergunta cadastrada com sucesso!');
        window.location.reload();
      })
      .catch(err => {
        console.error('Erro:', err);
        alert('Erro ao cadastrar pergunta.');
      });
  }

  // Limpar campos
  inputs.forEach(input => input.value = '');
  editandoId = null;
  btnCadastrar.textContent = 'Cadastrar';
});

// Inicializa carregando as perguntas
carregarPerguntas();
