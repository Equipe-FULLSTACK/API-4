const express = require('express');
const router = express.Router();
const reuniaoController = require('../controller/reuniao');

// Rotas CRUD para reuniões

router.post('/', async (req, res) => {
    try {
        const newReuniao = await reuniaoController.createReuniao(req.body);
        res.status(201).json(newReuniao);
        console.log(`Reuniao criada com sucesso, dados: ${req.body.json}`);
    } catch (error) {
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

router.put('/:id', async (req, res) => {
    try {
        const updatedReuniao = await reuniaoController.updateReuniaoById(req.params.id, req.body);
        res.json(updatedReuniao);
        console.log(`Reuniao ${req.params.id} ATUALIZADA com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await reuniaoController.deleteReuniaoById(req.params.id);
        res.json(result);
        console.log(`Reuniao ${req.params.id} DELETADA com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
