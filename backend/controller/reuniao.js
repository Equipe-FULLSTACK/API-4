const con = require('../database/dbConnection');
const axios = require('axios');

let globalToken = ""; // Certifique-se de que este token seja atualizado conforme necessário

async function createZoomMeeting(meetingData, token) {
    const { titulo: topic, data_inicio: start_time, descricao: agenda, duracao } = meetingData;
    const timezone = 'UTC-3';
    const type = 2;

    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type,
            start_time,
            duration: duracao,
            timezone,
            agenda,
            settings: {
                host_video: true,
                participant_video: true,
                join_before_host: true,
                mute_upon_entry: true,
                watermark: false,
                use_pmi: false,
                approval_type: 0,
                audio: 'both',
                auto_recording: 'none'
            }
        }, {
            headers: {
                'Authorization': `Bearer ${token}` // Token de autorização
            }
        });
        console.log('Resposta do Zoom:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar reunião no Zoom:', error.response ? error.response.data : error.message);
        throw new Error('Erro ao criar reunião no Zoom: ' + (error.response ? error.response.data : error.message));
    }
}

exports.createReuniao = async (reuniaoData) => {
    try {
        console.log('Dados recebidos para criar reunião:', reuniaoData);
        const token = ''; // Defina seu token de autorização do Zoom aqui
        const zoomMeeting = await createZoomMeeting(reuniaoData, token);
        console.log('Reunião criada no Zoom:', zoomMeeting);

        const newReuniaoData = {
            ...reuniaoData,
            zoom_meeting_id: zoomMeeting.id,
            zoom_meeting_join_url: zoomMeeting.join_url,
            zoom_meeting_start_url: zoomMeeting.start_url
        };

        // Código para inserir a reunião no banco de dados aqui

        return { meeting: newReuniaoData };
    } catch (error) {
        console.error('Erro ao criar reunião:', error.message);
        throw new Error(error.message);
    }
};

exports.getAllReunioes = async () => {
    try {
        const query = 'SELECT * FROM reuniao';
        const [rows] = await con.promise().query(query);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getReuniaoById = async (reuniaoId) => {
    try {
        const query = 'SELECT * FROM reuniao WHERE id_reuniao = ?';
        const [rows] = await con.promise().query(query, [reuniaoId]);
        if (rows.length === 0) {
            throw new Error('Reunião não encontrada');
        }
        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getReunioesByUserId = async (userId) => {
    try {
        const query = `
            SELECT DISTINCT r.*
            FROM reuniao r
            LEFT JOIN participante_reuniao pr ON r.id_reuniao = pr.reuniao_id
            WHERE r.organizador_id = ? OR pr.usuario_id = ?;
        `;
        const [rows] = await con.promise().query(query, [userId, userId]);
        return rows;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateReuniaoById = async (reuniaoId, reuniaoData) => {
    try {
        const query = 'UPDATE reuniao SET ? WHERE id_reuniao = ?';
        const [result] = await con.promise().query(query, [reuniaoData, reuniaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Reunião não encontrada');
        }
        return { message: 'Reunião atualizada com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteReuniaoById = async (reuniaoId) => {
    try {
        const query = 'DELETE FROM reuniao WHERE id_reuniao = ?';
        const [result] = await con.promise().query(query, [reuniaoId]);
        if (result.affectedRows === 0) {
            throw new Error('Reunião não encontrada');
        }
        return { message: 'Reunião excluída com sucesso' };
    } catch (error) {
        throw new Error(error.message);
    }
};
