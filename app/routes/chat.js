const { check } = require('express-validator');

module.exports = (application) => {

    application.post('/chat', [
        // username must be an email
        check('apelido', 'Nome ou apelido é obrigatório').not().isEmpty(),
        // password must be at least 5 chars long
        check('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres').isLength({min:3, max: 15})
    ], (req, res) =>{
        application.app.controllers.chat.iniciarChat(application, req, res);
    });

    application.get('/chat', (req, res) => {
        application.app.controllers.chat.iniciarChat(application, req, res);
    });
}