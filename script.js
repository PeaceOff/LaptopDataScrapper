require('dotenv').config()

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient
let dbo;

MongoClient.connect(process.env.MONGO_URI, (err, db) => {
    if(err) throw err

    // Get db instance
    dbo = db.db('db')

    // Start scrapping
    Start()
})


// Base url for worten's website
const baseUrl = 'https://www.worten.pt'

// Getting all product pages from the list
const Start = function () {
    for (i = 1; i < 6; i++) {
        axios.get(`https://www.worten.pt/informatica/computadores/computadores-portateis?per_page=24&page=${i}`).then((response) => {
            if (response.status === 200) {
                let $ = cheerio.load(response.data)
                
                $('.w-product').each((i , elem) => {
                    scrapProductDetails($(elem).attr('data-category'))
                })
            }
        }).catch((error) => {
            console.error(error)
        })
    }
}

// Scraping each product detail page
const scrapProductDetails = function(url) {
    axios.get(baseUrl + url).then((response) => {
        if (response.status === 200) {
            let $ = cheerio.load(response.data)
            let wrapper = $('.w-section-content__box__wrapper')
            
            let obj = {
                nome: wrapper.find('.w-product__name').text(),
                'preço': wrapper.find('.w-product__price__current').attr('content'),
                foto: baseUrl + wrapper.find('#product-main-image').attr('src')
            }

            let details = wrapper.find('.w-product-details__column')

            details.find('.clearfix').each((i, elem) => {
                obj[$(elem).find('.details-label').text()] = $(elem).find('.details-value').text()
            })

            // Send to DB instead
            dbo.collection('Products').insertOne(obj, (err, res) => {
                if (err) console.error(err)
                console.log("OK")
            })
            // Saving product information to a file
            /*
            fs.appendFile('data.json', JSON.stringify(obj) + '\n', (err) => {
                if (err) 
                    console.error(error)
                console.log('Saved!')
              })
              */
        }
    }).catch((error) => {
        console.error(error)
    })
}
