# LaptopDataScrapper (Only works on wortens website)

Node.js script to scrap data from worten's website relative to laptops.
The script will automatically load the data to a mongodb database feed from the .env file.

## Usage

* ```git clone https://github.com/PeaceOff/LaptopDataScrapper.git```
* ```cd LaptopDataScrapper```
* Create a '.env' file with a variable 'MONGO_URI' and set it to the mongo uri for your database.
* run ```npm install``` and ```npm start```

**Disclaimer** : All this data is in Portuguese