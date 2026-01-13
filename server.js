// Instale antes: npm install express express-validator
const express = require('express');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Rota para servir o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processar formulário
app.post('/enviar', [
  body('nome')
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),

  body('email')
    .isEmail().withMessage('Digite um e-mail válido'),

  body('senha')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),

  body('telefone')
    .optional()
    .matches(/^[0-9]{10,11}$/).withMessage('Telefone deve ter 10 ou 11 dígitos'),

  body('aceite')
    .equals('on').withMessage('Você deve aceitar os termos')
], (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  res.send('Formulário enviado com sucesso!');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
