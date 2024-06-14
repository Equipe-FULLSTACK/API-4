const express = require('express');
const router = express.Router();
const participanteController = require('../controller/participante');

// Rotas CRUD para participantes

router.post('/', async (req, res) => {
    try {
        const newParticipante = await participanteController.createParticipante(req.body);
        res.status(201).json(newParticipante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const participantes = await participanteController.getAllParticipantes();
        res.json(participantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const participante = await participanteController.getParticipanteById(req.params.id);
        res.json(participante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/reuniao/:meetingId', async (req, res) => {
    try {
        const participantes = await participanteController.getParticipantsByMeetingId(req.params.meetingId);
        res.json(participantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

router.put('/:id', async (req, res) => {
    try {
        const updatedParticipante = await participanteController.updateParticipanteById(req.params.id, req.body);
        res.json(updatedParticipante);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await participanteController.deleteParticipanteById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
