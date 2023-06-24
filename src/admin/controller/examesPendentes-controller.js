import { pacienteService } from "../service/service.js";

// Função para carregar exames pendentes
function carregarExames() {
  return pacienteService.carregarExames();
}

// Função para carregar nomes de pacientes com exames pendentes no dropdown
function carregarNomesPacientes(exames) {
  const dropdown = document.getElementById('nomePaciente');

  const idsPacientes = exames
    .filter(exame => {
      return !exame.hasOwnProperty('exame') || !exame.hasOwnProperty('exame1') || !exame.hasOwnProperty('exame2');
    })
    .map(exame => exame.id);

  const promises = idsPacientes.map(id => carregarDadosPaciente(id));

  Promise.all(promises)
    .then(pacientes => {
      for (const paciente of pacientes) {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = `${paciente.nome} ${paciente.sobrenome}`; // Corrigido: Acessar a propriedade nome diretamente em vez de exame.pacienteNome e sobrenome
        dropdown.appendChild(option);
      }
    })
    .catch(erro => {
      console.error('Erro ao carregar pacientes:', erro);
    });
}

// Função para carregar os dados do paciente pelo ID
function carregarDadosPaciente(id) {
  return pacienteService.idCarregarPaciente(id)
    .then(paciente => paciente)
    .catch(erro => {
      console.error('Erro ao carregar dados do paciente:', erro);
      return null;
    });
}

// Função para atualizar a data de cadastro do paciente selecionado
function atualizarDataCadastro() {
  const dropdown = document.getElementById('nomePaciente');
  const dataEntrada = document.getElementById('dataSolicitacao');

  dropdown.addEventListener('change', () => {
    const idPacienteSelecionado = dropdown.value;

    if (!idPacienteSelecionado) {
      dataEntrada.value = '';
      return;
    }

    carregarDadosPaciente(idPacienteSelecionado)
      .then(paciente => {
        dataEntrada.value = paciente.dataCadastro;
        const cpfPaciente = document.getElementById('cpfPaciente');

        // Obter o CPF do paciente
        const cpf = paciente.cpf;

        // Exibir o CPF
        cpfPaciente.textContent = `CPF: ${cpf}`;

        // Verificar exames pendentes
        const examesPendentes = verificarExamesPendentes(paciente);

        // Exibir exame pendente no HTML
        const examePendente = document.getElementById('examePendente');
        examePendente.textContent = examesPendentes.length > 0 ? examesPendentes[0] : 'Nenhum exame pendente';
      })
      .catch(erro => {
        console.error('Erro ao carregar paciente:', erro);
      });
  });
}

// Verificar exames pendentes com base no objeto paciente
function verificarExamesPendentes(paciente) {
  const examesPendentes = [];

  if (!paciente.hasOwnProperty('exame')) {
    examesPendentes.push('Exames de Sangue');
  }

  if (!paciente.hasOwnProperty('exame1')) {
    examesPendentes.push('Exames de Fezes');
  }

  if (!paciente.hasOwnProperty('exame2')) {
    examesPendentes.push('Exames de Urina');
  }

  return examesPendentes;
}

// Obter ID do paciente selecionado e redirecionar para URL com o ID como parâmetro
function redirecionarParaURL(id) {
  const url = `../cadastro-pedido-exame/index.html?id=${id}`;
  window.location.href = url;
}

// Evento ao clicar no botão "Verificar"
function verificarDiferenca() {
  const dropdown = document.getElementById('nomePaciente');
  const idPacienteSelecionado = dropdown.value;

  if (!idPacienteSelecionado) {
    console.log('Nenhum paciente selecionado');
    return;
  }

  redirecionarParaURL(idPacienteSelecionado);
}

// Carregar nomes de pacientes ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  carregarExames()
    .then(exames => {
      carregarNomesPacientes(exames);
      atualizarDataCadastro();
    })
    .catch(erro => {
      console.error('Erro ao carregar exames:', erro);
    });

  // Atualizar o campo de data atual com a data atual
  const dataAtual = document.getElementById('dataAtual');
  const dataAtualValue = new Date().toISOString().split('T')[0];
  dataAtual.value = dataAtualValue;
});

// Evento ao clicar no botão "Verificar"
const buttonVerificar = document.getElementById('buttonVerificar');
buttonVerificar.addEventListener('click', verificarDiferenca);
