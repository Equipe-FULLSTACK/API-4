const express = require('express');
const axios = require('axios');
const router = express.Router();

let globalToken = ""; // Definindo a variável global

router.get("/auth", (req, res) => {
    console.log('Route token')
   /*  const redirectUri = encodeURIComponent("http://localhost:3000/zoom/token"); */
    /* const redirectUri = encodeURIComponent("http://localhost:3000/zoom/token");
    res.redirect(`https://zoom.us/oauth/authorize?client_id=${process.env.ZOOM_API_KEY}&response_type=code&redirect_uri=${redirectUri}`); */

    res.redirect("https://zoom.us/oauth/authorize?client_id=" + process.env.ZOOM_API_KEY + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftoken")
});

router.get('/token', async (req, res) => {
    const code = req.query.code;
    console.log('Route token')
    try {
        const response = await axios.post(
            'https://zoom.us/oauth/token',
            null,
            {
                params: {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: process.env.REDIRECT_URI
                },
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
                }
            }
        );

        globalToken = response.data.access_token; // Atualizando a variável global
        console.log(`Valor do Token de Acesso: ${globalToken} \n`);
        res.send(response.data.access_token);
    } catch (error) {
        console.log('Erro', error);
        res.send('ERRO');
    }

});

router.post('/meetings', async (req, res) => {
    console.log('Request body:', req.body); // Log the request body

    const { topic, start_time, duration, agenda } = req.body;
    const timezone = 'UTC';
    const type = 2;

    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
            topic,
            type,
            start_time,
            duration,
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
                'Authorization': `Bearer ${globalToken}` // Usando a variável global
            }
        });

        const createdMeeting = response.data;
        console.log('Meeting created:', createdMeeting);

        // Send a success response to the frontend
        res.status(200).json({ success: true, meeting: createdMeeting });
    } catch (error) {
        console.error('Error creating meeting:', error);

        // Send an error response to the frontend
        res.status(500).json({ success: false, error: 'Error creating meeting' });
    }
});

router.delete('/meetings/:meetingId', async (req, res) => {
    const meetingId = req.params.meetingId;

    try {
        const response = await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
            headers: {
                'Authorization': `Bearer ${globalToken}` // Usando a variável global
            }
        });

        // Send a success response to the frontend
        res.status(200).json({ success: true, message: 'Meeting deleted successfully' });
    } catch (error) {
        console.error('Error deleting meeting:', error);

        // Send an error response to the frontend
        res.status(500).json({ success: false, error: 'Error deleting meeting' });
    }
});

router.put('/meetings/:meetingId', async (req, res) => {
    const meetingId = req.params.meetingId;
    const { topic, start_time, duration, agenda } = req.body;
    const timezone = 'UTC';
    const type = 2;

    try {
        const response = await axios.put(`https://api.zoom.us/v2/meetings/${meetingId}`, {
            topic,
            type,
            start_time,
            duration,
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
                'Authorization': `Bearer ${globalToken}` // Usando a variável global
            }
        });

        // Send a success response to the frontend
        res.status(200).json({ success: true, message: 'Meeting updated successfully' });
    } catch (error) {
        console.error('Error updating meeting:', error);

        // Send an error response to the frontend
        res.status(500).json({ success: false, error: 'Error updating meeting' });
    }
});

async function getMeetings() {
    try {
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
            headers: {
                'Authorization': `Bearer ${globalToken}` // Usando a variável global
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching meetings:', error);
        throw error; // Rethrow the error to handle it in the route handler
    }
}

module.exports = router;



/*  PROGRAMA ORIGINAL CASO PRECISE RESTAURAR PARA RODAR //// 

global.token = "";


app.get("/auth", (req, res) => {
	res.redirect("https://zoom.us/oauth/authorize?client_id=" + process.env.ZOOM_API_KEY + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftoken")
});


app.get('/token', async (req, res) => {
	const code = req.query.code;

	try {
		const response = await axios.post(
			'https://zoom.us/oauth/token',
			null,
			{
				params: {
					grant_type: 'authorization_code',
					code: code,
					redirect_uri: process.env.REDIRECT_URI
				},
				headers: {
					'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
				}
			}
		);

		global.token = response.data.access_token;
		console.log(`Valor do Token de Acesso: ${global.token} \n`);
		res.send(response.data.access_token);
	} catch (error) {
		console.log('Erro', error);
		res.send('ERRO');
	}

});


async function createMeeting(topic, start_time, type, duration, timezone, agenda) {
	try {
		const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
			topic,
			type,
			start_time,
			duration,
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
				'Authorization': `Bearer ${global.token}`
			}
		});
		const body = response.data;

	} catch (error) {
		console.log('Error', error)
	}
}


app.post('/criar_reuniao', async (req, res) => {
	console.log('Request body:', req.body); // Log the request body

	const { topic, start_time, duration, agenda } = req.body;
	const timezone = 'UTC';
	const type = 2;

	try {
		const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', {
			topic,
			type,
			start_time,
			duration,
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
				'Authorization': `Bearer ${global.token}`
			}
		});

		const createdMeeting = response.data;
		console.log('Meeting created:', createdMeeting);


		// Send a success response to the frontend
		res.status(200).json({ success: true, meeting: createdMeeting });
	} catch (error) {
		console.error('Error creating meeting:', error);

		// Send an error response to the frontend
		res.status(500).json({ success: false, error: 'Error creating meeting' });
	}
});

async function getMeetings() {
	try {
		const response = await axios.get('https://api.zoom.us/v2/users/me/meetings', {
			headers: {
				'Authorization': `Bearer ${global.token}`
			}
		});
		const data = response.data;
		return data;
	} catch (error) {
		console.error('Error fetching meetings:', error);
		throw error; // Rethrow the error to handle it in the route handler
	}
}
 */