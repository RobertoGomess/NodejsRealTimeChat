const {validationResult} = require('express-validator');

module.exports.iniciarChat = (application, req, res) => {
    var dadosForm = req.body;
    var result = validationResult(req);
    if(result.errors && result.errors.length > 0){
        res.render('index', {validacao : result.errors});
        return;
    }
    application.get('io').emit(
        'mgsParaCliente',
        {apelido: dadosForm.apelido, mensagem : 'acabou de entrar no chat!'});

    res.render('chat', {dadosForm : dadosForm});
}