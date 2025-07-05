# Automação de Geração de Documentos com Google Forms e Apps Script

Este repositório contém um projeto de automação desenvolvido com Google Apps Script, Google Forms, Google Docs e Google Drive. O objetivo é simplificar e agilizar a criação de documentos padronizados (como termos de consentimento, contratos simples, certificados) a partir de dados coletados via Google Forms, salvando-os no Google Drive e enviando-os por e-mail automaticamente.

Ideal para empresas e indivíduos que buscam reduzir o trabalho manual, minimizar erros e otimizar a gestão de documentos.

# A automação segue um fluxo simples e eficiente:

1.  **Preenchimento do Formulário:** Um usuário preenche um formulário no Google Forms.
2.  **Captura da Resposta:** No envio do formulário, um gatilho configurado no Google Apps Script é acionado, capturando a resposta mais recente.
3.  **Criação do Documento:** O script faz uma cópia de um template pré-definido no Google Docs.
4.  **Preenchimento Dinâmico:** Os dados da resposta do formulário são usados para preencher os placeholders (ex: `{{NOME_COMPLETO_TITULAR}}`) no documento copiado.
5.  **Salvamento e Conversão:** O documento preenchido é salvo como um arquivo PDF na pasta especificada no Google Drive.
6.  **Envio por E-mail:** O PDF gerado é anexado a um e-mail e enviado para o respondente do formulário.

# Tecnologias utilizadas

* **Google Apps Script:** A plataforma de desenvolvimento baseada em JavaScript que conecta todos os serviços Google.
* **Google Forms:** Para a coleta estruturada de dados.
* **Google Docs:** Para criar templates de documentos com placeholders.
* **Google Drive:** Para armazenamento organizado dos documentos gerados.
* **GmailApp (Apps Script):** Para o envio automatizado de e-mails com anexos.

# Links
* *Link para o formulário: [Formulário](https://forms.gle/iyctvgqerF5QLVrZ7)
* *Link para a pasta raiz do projeto: [Pasta raiz](https://drive.google.com/drive/folders/1inxtBA4BMcsfqfC8cA_9tLFc2X0IhSO-?usp=drive_link)
* *Link para acessar o código: [Código JavaScript](https://github.com/caetanossauro/automa-o-de-processo-com-ferramentas-google/blob/main/code.gs)

# Contato

* **Seu Nome:** Cleidson Oliveira
* **LinkedIn:** [Link para o meu perfil do LinkedIn](https://www.linkedin.com/in/cleidson-oliveira-7b7248215/)
* **E-mail:** queusantos858@gmail.com

# Licença
Este projeto está licenciado sob a Licença Apache 2.0.
