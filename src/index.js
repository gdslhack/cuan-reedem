const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/api/redeem', async (req, res) => {
    const { hrn, msisdn, voucher_type } = req.body;
    try {
        const response = await axios.post('https://www.telkomsel.com/api/voucher/redeem', {
            hrn,
            msisdn,
            no-captcha: true,
            voucher_type
        });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json(error.response ? error.response.data : { error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
