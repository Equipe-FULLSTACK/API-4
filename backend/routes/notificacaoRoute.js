const express = require('express');
const router = express.Router();
const notificacaoController = require('../controller/notificacao');

// Rotas CRUD para notificações

router.post('/', async (req, res) => {
    try {
        const newNotificacao = await notificacaoController.createNotificacao(req.body);
        res.status(201).json(newNotificacao);
        console.log(`Notificação criada com sucesso, dados: ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const notificacoes = await notificacaoController.getAllNotificacoes();
        res.json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const notificacao = await notificacaoController.getNotificacaoById(req.params.id);
        res.json(notificacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/usuario/:userId', async (req, res) => {
    try {
        const notificacoes = await notificacaoController.getNotificacaoByUserId(req.params.userId);
        res.json(notificacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedNotificacao = await notificacaoController.updateNotificacaoById(req.params.id, req.body);
        res.json(updatedNotificacao);
        console.log(`Notificação ${req.params.id} atualizada com sucesso. Dados atualizados: ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await notificacaoController.deleteNotificacaoById(req.params.id);
        res.json(result);
        console.log(`Notificação ${req.params.id} deletada com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
