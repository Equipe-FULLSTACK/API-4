const express = require('express');
const router = express.Router();
const reuniaoController = require('../controller/reuniao');

router.post('/', async (req, res) => {
    try {
        console.log('Recebendo dados para criação de reunião:', req.body);
        const newReuniao = await reuniaoController.createReuniao(req.body);
        res.status(201).json(newReuniao);
    } catch (error) {
        console.error('Erro ao criar reunião:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const reunioes = await reuniaoController.getAllReunioes();
        res.json(reunioes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const reuniao = await reuniaoController.getReuniaoById(req.params.id);
        res.json(reuniao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/usuario/:id', async (req, res) => {
    try {
        const reunioes = await reuniaoController.getReunioesByUserId(req.params.id);
        res.json(reunioes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedReuniao = await reuniaoController.updateReuniaoById(req.params.id, req.body);
        res.json(updatedReuniao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await reuniaoController.deleteReuniaoById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
