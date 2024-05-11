const express = require('express');
const router = express.Router();
const agendamentoController = require('../controller/agendamento');

// Rotas CRUD para agendamentos

router.post('/', async (req, res) => {
    try {
        const newAgendamento = await agendamentoController.createAgendamento(req.body);
        res.status(201).json(newAgendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const agendamentos = await agendamentoController.getAllAgendamentos();
        res.json(agendamentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const agendamento = await agendamentoController.getAgendamentoById(req.params.id);
        res.json(agendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedAgendamento = await agendamentoController.updateAgendamentoById(req.params.id, req.body);
        res.json(updatedAgendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await agendamentoController.deleteAgendamentoById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
