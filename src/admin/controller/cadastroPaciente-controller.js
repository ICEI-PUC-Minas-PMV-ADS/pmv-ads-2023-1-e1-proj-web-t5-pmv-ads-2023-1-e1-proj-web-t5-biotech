import { pacienteService } from '../service/service.js';

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', async (event) => {
  event.preventDefault();

  const paciente = {};

  const getValue = (id) => {
    const element = document.getElementById(id);
    return element.value || null;
  };

  paciente.nome = getValue("nome");
  paciente.sobrenome = getValue("sobrenome");
  paciente.genero = getValue("gênero");
  paciente.idade = getValue("idade");
  paciente.dataNascimento = getValue("data-nascimento");
  paciente.endereco = getValue("endereço");
  paciente.cep = getValue("cep");
  paciente.convenio = getValue("convênio");
  paciente.email = getValue("email");
  paciente.diabetes = getValue("diabetes");
  paciente.medicamentos = getValue("medicamentos");
  paciente.motivoConsulta = getValue("motivo-consulta");
  paciente.alergias = getValue("alergias");

  const dataCadastro = new Date().toISOString().split('T')[0];
  paciente.dataCadastro = dataCadastro;

  const doencaImportante = getValue("doença-importante");
  const doencaImportanteOutro = getValue("doença-importante-outro");
  if (doencaImportante === "sim" && doencaImportanteOutro) {
    paciente.doencaImportante = doencaImportanteOutro;
  } else {
    paciente.doencaImportante = doencaImportante;
  }

  paciente.fuma = getValue("fuma");
  paciente.historicoFamiliar = getValue("historico-familiar");
  paciente.observacoes = getValue("observacoes");

  let cpf = getValue("cpf");
  if (cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length === 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      paciente.cpf = cpf;
    } else {
      alert("CPF inválido");
      return;
    }
  }

  try {
    const cpfExists = await pacienteService.verificarCPFExistente(cpf);
    if (cpfExists) {
      alert('CPF já existe na base de dados. Por favor, verifique os dados informados.');
      return;
    }
  } catch (error) {
    console.error('Erro ao verificar CPF existente:', error);
    return;
  }

  try {
    await pacienteService.cadastroPaciente(paciente);
    window.location.href = '/src/admin/screens/exames-cadastrados/index.html';
  } catch (error) {
    console.error('Erro ao cadastrar paciente:', error);
  }
});
