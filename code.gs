function onFormSubmit(e) {
  const docTemplateId = '1Apu5CiIxJUrSruqYJuzp4nnwcHYIx9_InlJLMZxvMpQ';
  const folderId = '1inxtBA4BMcsfqfC8cA_9tLFc2X0IhSO-';
  const latestResponse = e.response;
  const responseItems = latestResponse.getItemResponses();

  const data = responseItems[0].getResponse();
  const dataOriginal = new Date(data)
  const dataFormatada = Utilities.formatDate(dataOriginal, Session.getScriptTimeZone(), "dd/MM/yyyy");
  const nome = responseItems[1].getResponse();
  const identificador = responseItems[2].getResponse();
  const nascimento = responseItems[3].getResponse();
  const endereco = responseItems[4].getResponse();
  const telefone = responseItems[5].getResponse();
  const email = responseItems[6].getResponse();
  const finalidade = responseItems[7].getResponse();

  const timestampExecucao = new Date().toISOString().replace(/[-:.]/g, "");
  const uniqueId = 'ID-' + timestampExecucao;

  const docCopy = DriveApp.getFileById(docTemplateId).makeCopy('Termo de consentimento - ' + nome, DriveApp.getFolderById(folderId));
  const doc = DocumentApp.openById(docCopy.getId());
  const body = doc.getBody();

  let identificadorFormatado;
  if (identificador && identificador.length === 11) {
    identificadorFormatado = identificador.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    Logger.log("Identificador (CPF) formatado: " + identificadorFormatado);
  } else {
    Logger.log(`O identificador "${identificador}" não tem 11 dígitos ou é inválido. Não foi possível formatar como CPF.`);
    identificadorFormatado = `Erro de formatação: ${identificador || 'Não informado'}`;
  }

  let telefoneFormatado;
  const telefoneLimpo = telefone ? telefone.replace(/\D/g, '') : '';
  if (telefoneLimpo.length === 11) {
    telefoneFormatado = telefoneLimpo.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    Logger.log("Número de telefone (celular) formatado: " + telefoneFormatado);
  } else if (telefoneLimpo.length === 10) {
    telefoneFormatado = telefoneLimpo.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
    Logger.log("Número de telefone (fixo) formatado: " + telefoneFormatado);
  } else {
    Logger.log(`O número de telefone "${telefone}" não tem 10 ou 11 dígitos após a limpeza. Não foi possível formatar.`);
    telefoneFormatado = `Erro: "${telefone || 'Não informado'}" não pôde ser formatado (esperado 10 ou 11 dígitos).`;
  }

  body.replaceText('{{id}}', uniqueId);
  body.replaceText('{{NOME_COMPLETO_TITULAR}}', nome);
  body.replaceText('{{CPF_TITULAR}}', identificadorFormatado);
  body.replaceText('{{DATA_NASCIMENTO}}', nascimento);
  body.replaceText('{{ENDERECO_COMPLETO}}', endereco);
  body.replaceText('{{TELEFONE}}', telefoneFormatado);
  body.replaceText('{{EMAIL}}', email);
  body.replaceText('{{FINALIDADE_TRATAMENTO}}', finalidade);
  body.replaceText('{{DATA_DO_CONSENTIMENTO}}', dataFormatada);

  doc.saveAndClose();

  const emailParaEnviar = latestResponse.getRespondentEmail() || email;

  try {
    const pdfBlob = docCopy.getAs(MimeType.PDF);
    pdfBlob.setName(docCopy.getName() + '.pdf');

    const subject = `Seu Termo de Consentimento - ${nome}`;

    let bodyEmail = `Prezado(a) ${nome},\n\n`;
    bodyEmail += `Agradecemos por preencher o formulário. Em anexo, você encontrará seu Termo de Consentimento.\nAcesse as políticas de privacidade aqui: https://politicaprivacidade.com/\n\n`;
    bodyEmail += `Atenciosamente,\nSua Equipe`;

    GmailApp.sendEmail(
      emailParaEnviar,
      subject,
      bodyEmail,
      {
        attachments: [pdfBlob],
        name: 'Termo de Consentimento'
      }
    );

    Logger.log(`E-mail com o Termo de Consentimento enviado para: ${emailParaEnviar}`);

  } catch (err) {
    Logger.log("Erro ao enviar o e-mail: " + err.toString());
    Logger.log("Verifique se o script tem permissão para enviar e-mails (GmailApp).");
    Logger.log("Certifique-se de que o campo de e-mail no formulário foi preenchido corretamente ou que a coleta de e-mails está ativada no Forms.");
  }
}
