const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://www.worten.pt'
const url = 'https://www.worten.pt/informatica/computadores/computadores-portateis?per_page=48&page=1'
let items = []

axios.get(url).then((response) => {
    if (response.status === 200) {
        let $ = cheerio.load(response.data)
        $('.w-product').each((i , elem) => {
            console.log($(elem).attr('data-category'))
        })
    }
});

/* TODO finish
const scrapProductDetails = function(url) {
    axios.get(baseUrl + url).then((response) => {
        if (response.status === 200) {
            let $ = cheerio.load(response.data)
            items.push({
                $('.std').children('ul')
            })
        }
    })
}
*/ 
