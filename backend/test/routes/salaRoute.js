const express = require('express');
const router = express.Router();
const salaController = require('../controller/sala');

// Rotas CRUD para salas

router.post('/', async (req, res) => {
    try {
        const newSala = await salaController.createSala(req.body);
        res.status(201).json(newSala);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const salas = await salaController.getAllSalas();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sala = await salaController.getSalaById(req.params.id);
        res.json(sala);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedSala = await salaController.updateSalaById(req.params.id, req.body);
        res.json(updatedSala);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await salaController.deleteSalaById(req.params.id);
        res.json(result);
        console.log("deletado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
