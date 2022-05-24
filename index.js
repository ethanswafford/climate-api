// global variable and array declarations and
// required node modules 

const PORT = 8888
const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")
const app = express()

// array of objects to scrape content from 

const onlinePublications = [{
        name: 'US Gov',
        address: 'https://www.climate.gov/news-features/understanding-climate/climate-change-global-temperature'
    },
    {
        name: 'Nasa',
        address: 'https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-climate-change-k4.html'
    },
    {
        name: 'MicroSoft/Bing',
        address: 'https://www.bing.com/news/search?q=Climate+Change&qpvt=climate+change+&FORM=EWRE'
    },
    {
        name: 'the Guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis'
    }
]

const articles = []

// adding content to the array of objects 

onlinePublications.forEach(onlinePublication => {
    axios.get(onlinePublication.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)


            $('a:contains("climate")', html).each(function() {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url,
                    source: onlinePublication.name
                })
            })
        })
})

// root dir and starting page 

app.get('/', (req, res) => {
    res.json('This is a climate monitoring API service request and response')
})

// scrape website or url for any 'href' containing the word "climate"
// stored response.data in local variable 'html' and use local variables 'url' and 'title' to 
// order a function to organize and render content in the array

app.get('/news', (req, res) => {
    axios.get('https://www.theguardian.com/environment/climate-crisis')
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

// built in node module function using 'start' under scripts in the package.json file 

app.listen(PORT, () => console.log(`server initialized on PORT: ${PORT}`))