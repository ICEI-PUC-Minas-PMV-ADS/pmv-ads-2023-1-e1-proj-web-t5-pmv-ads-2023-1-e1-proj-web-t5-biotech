document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.querySelector('.cabecalho__pesquisar input[name="pesquisa"]');
    var pacientesContainer = document.getElementById('pacientes-container');
  
    searchInput.addEventListener('input', function() {
      var searchTerm = searchInput.value.toLowerCase();
  
      if (searchTerm.trim() === '') {
        pacientesContainer.innerHTML = '';
        return;
      }
  
      // Carregar o arquivo JSON com as informações dos pacientes
      fetch('./exames.json')
        .then(response => response.json())
        .then(data => {
          var pacientes = data.pacientes;
  
          var filteredPatients = pacientes.filter(function(paciente) {
            // Verificar se o termo de pesquisa corresponde ao nome ou ao CPF do paciente
            var nomeMatches = paciente.nome.toLowerCase().includes(searchTerm);
            var cpfMatches = paciente.cpf && paciente.cpf.replace(/\D/g, '').includes(searchTerm);
  
            // Verificar se o termo de pesquisa corresponde ao nome de algum exame do paciente
            var exameMatches = paciente.exames && paciente.exames.some(function(exame) {
              return exame.nome.toLowerCase().includes(searchTerm);
            });
  
            return nomeMatches || cpfMatches || exameMatches;
          });
  
          renderPatients(filteredPatients);
        })
        .catch(function(error) {
          console.log('Erro ao carregar o arquivo JSON:', error);
        });
    });
  
    function renderPatients(pacientes) {
      if (pacientes.length === 0) {
        pacientesContainer.innerHTML = 'Nenhum dado correspondente encontrado.';
        return;
      }
  
      pacientesContainer.innerHTML = '';
  
      pacientes.forEach(function(paciente) {
        var pacienteDiv = document.createElement('div');
        pacienteDiv.className = 'paciente';
  
        var nomeCpfDiv = document.createElement('div');
        nomeCpfDiv.className = 'nome-cpf';
        nomeCpfDiv.innerHTML = `<strong>${paciente.nome}</strong> - CPF: ${paciente.cpf} - Data de Nascimento: ${paciente.data_nascimento}<br>Exames registrados: `;
        pacienteDiv.appendChild(nomeCpfDiv);
  
        // Listar os exames para o preview
        var exames = paciente.exames || [];
        var nomesExames = '';
        exames.forEach(function(exame) {
          nomesExames += exame.nome + ', ';
        });
        nomesExames = nomesExames.slice(0, -2);
        nomeCpfDiv.innerHTML += nomesExames;
  
        var detalhesBtn = document.createElement('button');
        detalhesBtn.className = 'btn-detalhes';
        detalhesBtn.textContent = 'Detalhes';
        detalhesBtn.addEventListener('click', function() {
          exibirDetalhesPaciente(paciente.id);
        });
        pacienteDiv.appendChild(detalhesBtn);
  
        pacientesContainer.appendChild(pacienteDiv);
      });
    }
  
    function exibirDetalhesPaciente(pacienteId) {
      window.location.href = `documento.html?id=${pacienteId}`;
    }
  });
  
  