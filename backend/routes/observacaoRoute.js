const express = require('express');
const router = express.Router();
const observacaoController = require('../controller/observacao');

// Rotas CRUD para observações

router.post('/', async (req, res) => {
    try {
        const newObservacao = await observacaoController.createObservacao(req.body);
        res.status(201).json(newObservacao);
        console.log(`Observação criada com sucesso, dados: ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const observacoes = await observacaoController.getAllObservacoes();
        res.json(observacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const observacao = await observacaoController.getObservacaoById(req.params.id);
        res.json(observacao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedObservacao = await observacaoController.updateObservacaoById(req.params.id, req.body);
        res.json(updatedObservacao);
        console.log(`Observação ${req.params.id} atualizada com sucesso. Dados atualizados: ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await observacaoController.deleteObservacaoById(req.params.id);
        res.json(result);
        console.log(`Observação ${req.params.id} deletada com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
