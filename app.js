const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const router = require('./routes/router')
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))
app.use('/', router)


// Server listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})