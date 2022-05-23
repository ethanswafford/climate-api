const PORT = 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

app.get('/', (req, res) => {
    res.json('This is a climate monitoring API service')
})
app.listen(PORT, () => console.log(`server initialized on PORT: ${PORT}`))