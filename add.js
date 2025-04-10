document.getElementById('btnCadastrar').addEventListener('click', () => {
  const questao = document.getElementById('pergunta').value.trim();
  const questao1 = document.getElementById('alternativaA').value.trim();
  const questao2 = document.getElementById('alternativaB').value.trim();
  const questao3 = document.getElementById('alternativaC').value.trim();
  const questao4 = document.getElementById('alternativaD').value.trim();
  const gabarito = document.getElementById('gabarito').value.trim();
  const nivel = document.getElementById('nivel').value.trim();

  if (!questao || !questao1 || !questao2 || !questao3 || !questao4 || !gabarito || !nivel) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const dados = { questao, questao1, questao2, questao3, questao4, gabarito, nivel };

  fetch('http://192.168.1.24:3000/questao/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
});


document.getElementById('btnCadastrar').addEventListener('click', function () {
  const inputs = document.querySelectorAll('.campo_texto');
  const pergunta = inputs[0].value;
  const alternativas = [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value];
  const respostaCorreta = inputs[5].value;
  const dificuldade = inputs[6].value;

  const novaPergunta = document.createElement('li');
  novaPergunta.style.marginBottom = '15px';
  novaPergunta.style.color = '#fff'
  novaPergunta.style.marginLeft = '7%'
  novaPergunta.style.fontSize = '20px'
  novaPergunta.style.marginBottom = '25px';

  novaPergunta.innerHTML = `
      <strong>Pergunta:</strong> ${pergunta}<br>
      A) ${alternativas[0]}<br>
      B) ${alternativas[1]}<br>
      C) ${alternativas[2]}<br>
      D) ${alternativas[3]}<br>
      <strong>Correta:</strong> ${respostaCorreta}<br>
      <strong>Dificuldade:</strong> ${dificuldade}
    `;

  document.getElementById('perguntasContainer').appendChild(novaPergunta);

  inputs.forEach(input => input.value = '');
});