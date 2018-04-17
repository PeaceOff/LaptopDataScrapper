const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs');

// Base url for worten's website
const baseUrl = 'https://www.worten.pt'
// URL for list of laptops
const url = 'https://www.worten.pt/informatica/computadores/computadores-portateis?per_page=12&page=1'
// URL example url for a detailed product page
const testUrl = '/informatica/computadores/computadores-portateis/portatil-15-6-hp-15-bs109np-6435327'

// Getting all product pages from the list
axios.get(url).then((response) => {
    if (response.status === 200) {
        let $ = cheerio.load(response.data)
        
        $('.w-product').each((i , elem) => {
            scrapProductDetails($(elem).attr('data-category'))
        })
    }
}).catch((error) => {
    console.error(error)
})


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

            // Saving product information to a file
            fs.appendFile('data.json', JSON.stringify(obj) + ',\n', (err) => {
                if (err) 
                    console.error(error)
                console.log('Saved!')
              })
        }
    }).catch((error) => {
        console.error(error)
    })
}