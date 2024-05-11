const express = require('express');
const router = express.Router();
const anexoController = require('../controller/anexo');

// Rotas CRUD para anexos

router.post('/', async (req, res) => {
    try {
        const newAnexo = await anexoController.createAnexo(req.body);
        res.status(201).json(newAnexo);
        console.log(`Anexo criado com sucesso, dados: ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const anexos = await anexoController.getAllAnexos();
        res.json(anexos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const anexo = await anexoController.getAnexoById(req.params.id);
        res.json(anexo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedAnexo = await anexoController.updateAnexoById(req.params.id, req.body);
        res.json(updatedAnexo);
        console.log(`Anexo ${req.params.id} atualizado com sucesso. Dados atualizados: ${JSON.stringify(req.body)}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await anexoController.deleteAnexoById(req.params.id);
        res.json(result);
        console.log(`Anexo ${req.params.id} deletado com sucesso.`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
