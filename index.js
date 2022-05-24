// global variable and array declarations and
// required node modules 

const PORT = 8888
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const app = express()
const articles = []

// root dir and starting page 

app.get('/', (req, res) => {
    res.json('This is a climate monitoring API service')
})

// scrape website or url for any 'href' containing the word "climate"
// stored response.data in local variable 'html' and use local variables 'url' and 'title' to 
// order a function to organize and render content

app.get('/news', (req, res) => {
    axios.get('https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature')
        .then((response) => {

            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err) => console.log(err))
})

// built in node module function using 'start' under test in the package.json file 

app.listen(PORT, () => console.log(`server initialized on PORT: ${PORT}`))