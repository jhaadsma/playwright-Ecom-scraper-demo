Data tool to compare the US MSRP of Japanese fishing reels to JDM reels to find price discrepancies. 

 This program scrapes product data for Japanese brand fishing reels(Shimano and Daiwa) from a US fishing retailer website and a Japanese Ecommerce aggregator website. It then compares the datasets between the two, and with a translation key matches equivilent models from the two websites. It then displays the price discrepency between the two equivilent models and links to the Japanese product page. Its purpose is to compile, match and organize the price data for equivilent fishing reels from both sites to track price discrepencies between US market prices and Japanese market prices.


 How to run: 

1.) Clone repository

2.) Install required packages: 


`npm i playwright`

`npm i objects-to-csv`
 
 3.) Run program `node ./test.js`
 
 
 After the program is completed, the data is outputted in the form of an easy to read CSV file as shown here:
![](https://user-images.githubusercontent.com/104689110/209743562-c83e7fe0-7ab4-4b0d-92d5-2eb3dca6706e.png)
- 1st Column: Model name from US website
- 2nd Column: Translation key English Value
- 3rd Column: Model name from Japanese website
- 4th Column: US website price in USD
- 5th Column: Japanese website price in Yen
- 6th Column: Japanese website price converted to USD
- 7th Column: Discount percentage(if bought from Japanese website)
- 8th Column: Link to Japanese product page

<br>
<br>
Uses playwright to scrape website data. 
<br>
<br>
Current problems to solve:

1. Matching of sub models not implemented (ie Shimano Stradic 4000XG will match with Shimano Stradic 4000HG)
2. A small portion of products with unusually high or low prices or size numbers data do not output accurate data to the final array. (ie Shimano Stella 14000)
3. Products that do not have size numbers will not match. (ie Shimano Ultegra surf)
4. The scraper for kakaku.com(the japanese ecom aggregate site) on rare occasion does not load to the point of scraping being possible, and will not load at all if scraping in headless chromium browser mode. After some investigation of the network behavior of the website, this appears to have to do with the websites implementation of the scroll based lazy-loading the product images. The website will also occasionally loads quite slow during extremely busy traffic (for example during the week before christmas), which made page loading too slow to scrape at times. 


