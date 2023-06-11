# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.
 
## Ferramentas de Testes (Opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e Técnicas de Testes Ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)

|Caso de Teste        | [CT-01](09-Registro%20de%20Testes%20de%20Software.md) O site deve permitir o cadastro de Pacientes e guardar as suas informações|
|---------------------|--------------------------------------------------------------------|
|	Requisito Associado | [RF-01] Registro de pacientes; registrar informações de pacientes. <br> [RF-15]  O site deve permitir ao aluno, ao criar o grupo, a sugerir horários de reunião. |
| Objetivo do Teste 	 | Verificar se o sistema está permitindo o cadastro de pacientes. |
| Passos 	            | - Acessar através da página inicial no botão cadastrar paciente ; <br> - Preencher os campos pertinentes; <br> - Caso necessario inserir algum comentario sobre condições de saude. <br> - Clicar no botão "Cadastrar Paciente". |
| Critério de Êxito   | O usuario deve conseguir cadastrar o paciente e o mesmo será exibido na tela de preview, como  também a inserção dos dados que serão armazenados (utilizando JSON Server).|
