const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve the HTML page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redeem Voucher Telkomsel</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                form { max-width: 300px; margin: 0 auto; }
                input { margin-bottom: 10px; padding: 10px; width: 100%; }
                button { padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer; }
                button:hover { background-color: #0056b3; }
                #result { margin-top: 20px; }
                .success { color: green; }
                .error { color: red; }
                .info { padding: 10px; border-radius: 5px; }
            </style>
        </head>
        <body>
            <h1>Redeem Voucher Telkomsel</h1>
            <form id="redeem-form">
                <input type="text" id="phone-number" placeholder="Masukkan nomor HP" required>
                <input type="text" id="voucher-serial" placeholder="Masukkan serial voucher" required>
                <button type="submit">Redeem Voucher</button>
            </form>
            <div id="result"></div>
            <script>
                document.getElementById('redeem-form').addEventListener('submit', async function(event) {
                    event.preventDefault();
                    const phoneNumber = document.getElementById('phone-number').value;
                    const voucherSerial = document.getElementById('voucher-serial').value;
                    const resultDiv = document.getElementById('result');

                    try {
                        const response = await fetch('/api/redeem', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                hrn: voucherSerial,
                                msisdn: phoneNumber,
                                no_captcha: true,
                                recaptcharesponse: 'MG4sJ@b3MqUoMtdFRFWw2g7r', // Dummy response, adjust as needed
                                voucher_type: 'voucher'
                            })
                        });
                        const data = await response.json();

                        if (data.status) {
                            if (data.message === "400" && data.data.code === "15") {
                                resultDiv.innerHTML = '<div class="info error">Voucher sudah digunakan. Deskripsi: ' + data.data.description + '</div>';
                            } else {
                                resultDiv.innerHTML = '<div class="info success">Voucher berhasil diredeem!</div>';
                            }
                        } else {
                            resultDiv.innerHTML = '<div class="info error">Terjadi kesalahan: ' + data.message + '</div>';
                        }
                    } catch (error) {
                        resultDiv.innerHTML = '<div class="info error">Error: ' + error.message + '</div>';
                    }
                });
            </script>
        </body>
        </html>
    `);
});

// API endpoint
app.post('/api/redeem', async (req, res) => {
    const { hrn, msisdn, no_captcha, recaptcharesponse, voucher_type } = req.body;
    try {
        const response = await axios.post('https://www.telkomsel.com/api/voucher/redeem', {
            hrn,
            msisdn,
            no_captcha,
            recaptcharesponse,
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
