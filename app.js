const express = require('express')
const app = express()
const port = 3000

app.post('/api/contact', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const memo = req.body.memo;

    const data = `${name} ${phone} ${email} ${memo}`

    res.send(data) 
})

app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})