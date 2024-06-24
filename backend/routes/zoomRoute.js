const express = require('express');
const axios = require('axios');
const router = express.Router();

let globalToken = ""; // Definindo a variável global

router.get("/auth", (req, res) => {
    console.log('Route token');
    const redirectUri = encodeURIComponent("http://localhost:3000/zoom/token");
    res.redirect(`https://zoom.us/oauth/authorize?client_id=${process.env.ZOOM_API_KEY}&response_type=code&redirect_uri=${redirectUri}`);
});

router.get('/token', async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).send('Código de autorização não fornecido');
    }

    try {
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: "http://localhost:3000/zoom/token"
        }).toString();

        const response = await axios.post(
            'https://zoom.us/oauth/token',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
                }
            }
        );

        // Atualizar o token de acesso global
        globalToken = response.data.access_token;

        // Redireciona após obter o token de acesso
        axios.get('http://localhost:3000/ck')
        .then(response => {
            if (response.data.valid) {
                if (response.data.role == '1') {
                    res.redirect(`http://localhost:5173/admin`);
                }
            } else{
                res.redirect(`http://localhost:5173/user`);
            }
        })
        .catch(error => {
            console.error('Erro ao verificar a rota', error);
            res.redirect(`http://localhost:5173/`);
        });
    } catch (error) {
        console.log('Erro ao obter o token de acesso', error.response ? error.response.data : error.message);
        res.status(500).send('Erro ao obter o token de acesso');
    }
});


router.post('/meetings', async (req, res) => {
    const { topic, start_time, duration, agenda } = req.body;
    const timezone = 'America/Sao_Paulo'; // Fuso horário do Brasil (GMT-3)

    if (!globalToken) {
        return res.status(401).json({ message: 'Token de acesso não disponível' });
    }

    try {
        const response = await axios.post(
            'https://api.zoom.us/v2/users/me/meetings',
            {
                topic,
                type: 2,
                start_time,
                duration,
                timezone,
                agenda
            },
            {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log(`DADOS REQ ----------${topic}--${start_time}--${duration}--${agenda}----------`)
        console.log(`${ (response.data.id) }`)
        res.status(201).json({ meeting: response.data });
    } catch (error) {
        console.error('Erro ao criar reunião:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro ao criar reunião' });
    }
});

router.put('/meetings/:id', async (req, res) => {
    const meetingId = req.params.id;
    const { topic, start_time, duration, agenda } = req.body;
    const timezone = 'America/Sao_Paulo'; // Fuso horário do Brasil (GMT-3)
    
    if (!globalToken) {
        return res.status(401).json({ message: 'Token de acesso não disponível' });
    }

    try {
        const response = await axios.patch(
            `https://api.zoom.us/v2/meetings/${meetingId}`,
            {
                topic,
                type: 2, // Tipo 2 indica uma reunião agendada
                start_time,
                duration,
                timezone,
                agenda
            },
            {
                headers: {
                    'Authorization': `Bearer ${globalToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ meeting: response.data });
    } catch (error) {
        console.error('Erro ao atualizar reunião:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro ao atualizar reunião' });
    }
});

router.delete('/meetings/:id', async (req, res) => {
    const meetingId = req.params.id;
    console.log(`Excluindo reunião com ID: ${meetingId}`); // Adicionar log

    if (!globalToken) {
        return res.status(401).json({ message: 'Token de acesso não disponível' });
    }

    try {
        await axios.delete(
            `https://api.zoom.us/v2/meetings/${meetingId}`,
            {
                headers: {
                    'Authorization': `Bearer ${globalToken}`
                }
            }
        );

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir reunião:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Erro ao excluir reunião' });
    }
});


module.exports = router;

