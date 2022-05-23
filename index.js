const PORT = 8000
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()

app.get('/', (req, res) => {
    res.json('This is a climate monitoring API service')
})

app.get('/news', (req, res) => {
    axios.get('https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature')
        .then((response) => {
            const html = response.data
            res.json('This the current events page')
            console.log(html)
        })
})
app.listen(PORT, () => console.log(`server initialized on PORT: ${PORT}`))