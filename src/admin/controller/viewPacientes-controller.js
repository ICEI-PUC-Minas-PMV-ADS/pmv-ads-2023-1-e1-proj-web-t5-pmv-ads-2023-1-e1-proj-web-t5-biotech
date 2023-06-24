import { pacienteService } from "../service/service.js";

function criarPacientePreview(paciente) {
  const pacienteDiv = criarElemento('div', 'paciente-preview', '');

  const nomeCpfDiv = criarElemento('div', 'nome-cpf', '');
  nomeCpfDiv.innerHTML = `<strong>${capitalizeFirstLetter(paciente.nome)} ${capitalizeFirstLetter(paciente.sobrenome)}</strong> - CPF: ${paciente.cpf} - Data de Nascimento: ${paciente.dataNascimento}<br>Exames Ativos: `;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Adicionar a marcação da solicitação de recoleta
  if (paciente.recoleta) {
    nomeCpfDiv.appendChild(document.createElement('br')); // Inserir uma quebra de linha
    const recoletaSolicitadaSpan = criarElemento('span', 'recoleta-solicitada', 'Recoleta Solicitada <br>');
    recoletaSolicitadaSpan.style.color = 'red'; // Alterar a cor do texto para vermelho
    nomeCpfDiv.appendChild(recoletaSolicitadaSpan);
  }
  pacienteDiv.appendChild(nomeCpfDiv);

  // Listar os exames para o preview
  const exames = paciente.Exame;
  let nomesExames = '';
  if (Array.isArray(exames)) {
    exames.forEach(exame => {
      nomesExames += exame.exame + ', ';
    });
    nomesExames = nomesExames.slice(0, -2);
  }

  nomeCpfDiv.innerHTML += nomesExames;

  // Botões
  const deleteBtn = criarElemento('button', 'btn-detalhes', 'Excluir');
  deleteBtn.addEventListener('click', () => {
    deletarPaciente(paciente.id);
  });

  pacienteDiv.appendChild(deleteBtn);

  const editarPacienteBtn = criarElemento('button', 'btn-detalhes', 'Editar Paciente');
  editarPacienteBtn.addEventListener('click', () => exibirEdicaoPaciente(paciente.id));
  pacienteDiv.appendChild(editarPacienteBtn);

  const detalhesBtn = criarElemento('button', 'btn-detalhes', 'Documentos');
  detalhesBtn.addEventListener('click', () => exibirDetalhesPaciente(paciente.id));
  pacienteDiv.appendChild(detalhesBtn);

  const cadastrarExamesBtn = criarElemento('button', 'btn-detalhes', 'Cadastrar Pedido de Exame');
  cadastrarExamesBtn.addEventListener('click', () => exibirCadastroPedidoExames(paciente.id));
  pacienteDiv.appendChild(cadastrarExamesBtn);

  if (paciente.recoleta) {
    const finalizarRecoletaBtn = criarElemento('button', 'btn-detalhes', 'Finalizar Recoleta');
    finalizarRecoletaBtn.addEventListener('click', () => finalizarRecoleta(paciente.id, pacienteDiv, nomeCpfDiv));
    pacienteDiv.appendChild(finalizarRecoletaBtn);
  } else {
    const solicitarRecoletaBtn = criarElemento('button', 'btn-detalhes', 'Solicitar Recoleta');
    solicitarRecoletaBtn.addEventListener('click', () => solicitarRecoleta(paciente.id, pacienteDiv, nomeCpfDiv));
    pacienteDiv.appendChild(solicitarRecoletaBtn);
  }

  return pacienteDiv;
}

function deletarPaciente(pacienteId) {
  // Exibir uma mensagem de confirmação ao usuário
  if (!confirm('Tem certeza de que deseja excluir este paciente?')) {
    return; // Abortar a exclusão caso o usuário cancele
  }

  pacienteService.deletarPaciente(pacienteId)
    .then(() => {
      console.log('Paciente excluído com sucesso.');
      // Atualizar a página ou realizar outras ações necessárias após a exclusão
    })
    .catch(error => {
      console.error('Erro ao excluir o paciente:', error);
    });
}

function exibirEdicaoPaciente(pacienteId) {
  // Redirecionar para a página de edição do paciente junto com o ID do paciente
  window.location.href = `/src/admin/screens/editar-paciente/index.html?id=${pacienteId}`;
}

function exibirCadastroPedidoExames(pacienteId) {
  // Redirecionar para a página de cadastro de pedido de exames junto com o ID do paciente
  window.location.href = `/src/admin/screens/cadastro-pedido-exame/index.html?id=${pacienteId}`;
}

function exibirDetalhesPaciente(pacienteId) {
  window.location.href = `./documento.html?id=${pacienteId}`;
}

function solicitarRecoleta(pacienteId, pacienteDiv, nomeCpfDiv) {
  pacienteService.solicitarRecoleta(pacienteId)
    .then(response => {
      console.log('Recoleta solicitada com sucesso.');

      // Adicionar a marcação no nomeCpfDiv
      const recoletaSolicitadaSpan = criarElemento('span', 'recoleta-solicitada ', 'Recoleta Solicitada <br>');
      nomeCpfDiv.appendChild(document.createElement('br')); // Inserir uma quebra de linha antes
      nomeCpfDiv.appendChild(recoletaSolicitadaSpan);

      // Alterar a cor do texto para vermelho
      nomeCpfDiv.style.color = 'red';

      // Substituir o botão "Solicitar Recoleta" pelo botão "Finalizar Recoleta"
      const solicitarRecoletaBtn = pacienteDiv.querySelector('.btn-detalhes');
      pacienteDiv.removeChild(solicitarRecoletaBtn);

      const finalizarRecoletaBtn = criarElemento('button', 'btn-detalhes', 'Finalizar Recoleta');
      finalizarRecoletaBtn.addEventListener('click', () => finalizarRecoleta(pacienteId, pacienteDiv, nomeCpfDiv));
      pacienteDiv.appendChild(finalizarRecoletaBtn);
    })
    .catch(error => {
      console.error('Erro ao solicitar recoleta:', error);
      // Tratar o erro adequadamente, como exibir uma mensagem de erro para o usuário.
    });
}

function finalizarRecoleta(pacienteId, pacienteDiv, nomeCpfDiv) {
  pacienteService.finalizarRecoleta(pacienteId)
    .then(response => {
      console.log('Recoleta finalizada com sucesso.');

      // Remover a marcação de recoleta solicitada
      const recoletaSolicitadaSpan = pacienteDiv.querySelector('.recoleta-solicitada');
      nomeCpfDiv.removeChild(recoletaSolicitadaSpan);

      // Restaurar a cor do texto para a cor padrão
      nomeCpfDiv.style.color = '';
      
      // Substituir o botão "Finalizar Recoleta" pelo botão "Solicitar Recoleta"
      const finalizarRecoletaBtn = pacienteDiv.querySelector('.btn-detalhes');
      pacienteDiv.removeChild(finalizarRecoletaBtn);

      const solicitarRecoletaBtn = criarElemento('button', 'btn-detalhes', 'Solicitar Recoleta');
      solicitarRecoletaBtn.addEventListener('click', () => solicitarRecoleta(pacienteId, pacienteDiv, nomeCpfDiv));
      pacienteDiv.appendChild(solicitarRecoletaBtn);
    })
    .catch(error => {
      console.error('Erro ao finalizar recoleta:', error);
      // Tratar o erro adequadamente, como exibir uma mensagem de erro para o usuário.
    });
}

function criarElemento(tag, classes, conteudo) {
  const elemento = document.createElement(tag);
  elemento.className = classes;
  elemento.innerHTML = conteudo;
  return elemento;
}

document.addEventListener('DOMContentLoaded', function() {
  const pacientesContainer = document.getElementById('pacientes-container');

  pacienteService.carregarPacientes()
    .then(pacientes => {
      // Ordenar os pacientes por nome em ordem alfabética
      pacientes.sort((a, b) => (a.nome && b.nome) ? a.nome.localeCompare(b.nome) : 0);

      // Limitar o número de pacientes exibidos no preview
      const numPacientesPreview = 50;
      const pacientesPreview = pacientes.slice(0, numPacientesPreview);

      // Gerar o preview dos pacientes
      if (pacientesContainer) {
        pacientesPreview.forEach(paciente => {
          const pacientePreviewDiv = criarPacientePreview(paciente);
          pacientesContainer.appendChild(pacientePreviewDiv);
        });
      } else {
        console.log('O elemento pacientes-container não foi encontrado.');
      }

      // Renderizar os pacientes para o recurso de pesquisa
      renderPatients(pacientes);
    })
    .catch(error => {
      console.log('Erro ao carregar os dados: ', error);
    });
});

// Search
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.cabecalho__pesquisar input[name="pesquisa"]');
  const pacientesContainer = document.getElementById('pacientes-container');

  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm.trim() === '') {
      pacientesContainer.innerHTML = '';
      return;
    }

    // Carregar os pacientes usando o service
    pacienteService.carregarPacientes()
      .then(function(pacientes) {
        const resultados = pacientes.filter(function(paciente) {
          const nomeCompleto = paciente.nome + ' ' + paciente.sobrenome;
          return nomeCompleto.toLowerCase().includes(searchTerm);
        });

        pacientesContainer.innerHTML = '';

        resultados.forEach(function(paciente) {
          const pacientePreviewDiv = criarPacientePreview(paciente);
          pacientesContainer.appendChild(pacientePreviewDiv);
        });
      })
      .catch(function(error) {
        console.log('Erro ao carregar os dados: ', error);
      });
  });

  function renderPatients(pacientes) {
    if (pacientesContainer) {
      pacientes.forEach(function(paciente) {
        const pacientePreviewDiv = criarPacientePreview(paciente);
        pacientesContainer.appendChild(pacientePreviewDiv);
      });
    } else {
      console.log('O elemento pacientes-container não foi encontrado.');
    }
  }
});
