# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

![Sem título](https://user-images.githubusercontent.com/128416021/229384565-f69510b7-2377-4b8b-a0c1-679cbe3ae736.png)
![dddd](https://user-images.githubusercontent.com/128416021/229384669-1b05d47f-0530-4837-8f96-f0f25c13bf22.png)
![xsssss](https://user-images.githubusercontent.com/128416021/229384672-ebdfbc63-2e9c-4d10-ab86-15dfe5bfa051.png)


## Histórias de Usuários



Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO...                  | QUERO/PRECISO ...                       |PARA ...                                                                             |
|----------------------------|-----------------------------------------|-------------------------------------------------------------------------------------|
|Laura Ferreira              |Ferramentas de dupla checagem de exames                           |Evitar que resultados sejam liberados de forma errada       |
|Victor Almeida              |Mais tempo para receber orientações                               |Realizar a entrada de materiais de forma correta            |
|Gabriela Isidoro            |Questionários digitados                                           |	Melhor interpretação da caligrafia                         |
|Laura Ferreira     	        |Pastas individualizadas de pacientes com os documentos pertinentes|	Conferir todas as informações antes de liberar um resultado|
|Victor Almeida              |Programas de treinamento       	                      |Vídeo aulas disponíveis em plataformas para aprender o fluxo da empresa |
|Gabriela Isidoro            |	Conferência de emissão de etiquetas                              |	Não correr o risco de trocar as amostras de pacientes      |


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-01| Registro de pacientes; registrar informações de pacientes | MÉDIA | 
|RF-02| Solicitação de exames; solicitar exames laboratoriais para pacientes e registrar as informações   | MÉDIA |
|RF-03| Coleta de amostras; O sistema deve permitir o registro da coleta de amostras, incluindo o local da coleta e o horário da coleta | MÉDIA |
|RF-04|	Análise de amostras; permitir o registro de informações sobre a análise de amostras, tipo de teste realizado, data da análise, resultados e observações| ALTO |
|RF-05|	Armazenamento de resultados; O sistema deve ser capaz de armazenar os resultados dos testes e permitir o acesso aos resultados pelos profissionais de saúde autorizados| ALTO |
|RF-06|Comunicação de resultados; permitir a comunicação e compartilhamento de resultados de exames aos pacientes e/ou profissionais autorizados| ALTO |
|RF-07|Geração de relatórios; gerar de relatórios de exames para pacientes, médicos e outros profissionais de saúde| BAIXO |
|RF-08|Segurança e privacidade; O sistema deve garantir a segurança e privacidade das informações do paciente e dos resultados de exames| ALTO |
|RF-09|Integração; O sistema deve ser capaz de se integrar com outros sistemas de saúde| BAIXO |
|RF-10|Tela de buscas; pesquisa por exames e termos específicos| ALTO |
|RF-11|Digitalização; A plataforma permitirá salvar pedidos médicos scaneados|MÉDIA |
|RF-12|Rastreabilidade; Alertas para atraso em alguma etapa nos exames| ALTO |

|
|
|
|
|
|
|






### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA | 

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
