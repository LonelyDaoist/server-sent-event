const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/',express.static('public'));

app.get('/api/quote',(req,res) => {
    
    res.writeHead(200,{
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    setTimeout(async () => {
        const result = await axios.get('https://api.quotable.io/random');
        res.write(`data: ${JSON.stringify(result.data) }\n\n`);
        res.write('event: result\n');
        res.write('data: \n\n');
    },5000);
    let i = 1;
    setInterval(() => {
        res.write('event: wait\n');
        res.write(`data: ${i++}\n\n`);
    }, 1000);    
});

app.listen(PORT,() => console.log(`Listening on port ${PORT}`));