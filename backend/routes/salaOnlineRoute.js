const express = require('express');
const router = express.Router();
const salaController = require('../controller/salaOnline');

// Rotas CRUD para salas

router.post('/', async (req, res) => {
    try {
        const newSala = await salaController.createSalaOnline(req.body);
        res.status(201).json(newSala);
        console.log(`SALA criada com sucesso, dados: ${req.body}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const salas = await salaController.getAllSalasOnline();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const sala = await salaController.getSalaByIdOnline(req.params.id);
        res.json(sala);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedSala = await salaController.updateSalaByIdOnline(req.params.id, req.body);
        res.json(updatedSala);
        console.log(`Sala ${req.params.id} ATUALIZADA com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await salaController.deleteSalaByIdOnline(req.params.id);
        res.json(result);
        console.log(`Sala ${req.params.id} DELETADA com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
